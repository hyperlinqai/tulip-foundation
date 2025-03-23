
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Check, Clock, Download, LogOut, Search, User, Users } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define Registration type based on our Supabase table
type Registration = {
  id: string;
  name: string;
  email: string;
  phone: string;
  adult_count: number;
  kids_count: number;
  family_category: string;
  total_amount: number;
  payment_status: string;
  transaction_id: string | null;
  created_at: string;
  is_tulip_parent: boolean;
  t_shirt_sizes: string[]; // Changed from tshirt_sizes to match database column name
};

const AdminPanel = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [statsData, setStatsData] = useState({
    totalRegistrations: 0,
    totalParticipants: 0,
    totalPaid: 0,
    totalPending: 0,
    totalRevenue: 0,
  });
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchRegistrations();
  }, []);
  
  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      console.log('Fetching registrations from Supabase...');
      
      // Check if supabase client is initialized
      if (!supabase) {
        console.error('Supabase client is not initialized');
        throw new Error('Database connection not available');
      }
      
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase query error:', error);
        throw error;
      }
      
      if (data) {
        console.log(`Successfully fetched ${data.length} registrations`);
        setRegistrations(data as Registration[]);
      } else {
        console.log('No data returned from Supabase');
        setRegistrations([]);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast.error("Failed to load data", {
        description: "Please try again or contact support",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    // Calculate stats from the registrations data
    const totalRegistrations = registrations.length;
    const totalParticipants = registrations.reduce((sum, reg) => sum + reg.adult_count + reg.kids_count, 0);
    const totalPaid = registrations.filter(reg => reg.payment_status === 'paid').length;
    const totalPending = registrations.filter(reg => reg.payment_status === 'pending').length;
    const totalRevenue = registrations
      .filter(reg => reg.payment_status === 'paid')
      .reduce((sum, reg) => sum + Number(reg.total_amount), 0);
      
    setStatsData({
      totalRegistrations,
      totalParticipants,
      totalPaid,
      totalPending,
      totalRevenue,
    });
  }, [registrations]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleFilterChange = (value: string) => {
    setFilter(value);
  };
  
  const handleUpdatePaymentStatus = async (id: string, status: 'paid' | 'pending') => {
    try {
      const updateData = {
        payment_status: status,
        transaction_id: status === 'paid' ? `tx_${Math.random().toString(36).substring(2, 11)}` : null,
        updated_at: new Date().toISOString()
      };
      
      const { error } = await supabase
        .from('registrations')
        .update(updateData)
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      // Update local state to reflect the change
      setRegistrations(registrations.map(reg => {
        if (reg.id === id) {
          return { ...reg, ...updateData };
        }
        return reg;
      }));
      
      toast.success(`Payment status updated to ${status}`, {
        description: `Registration #${id.substring(0, 8)} has been marked as ${status}.`,
      });
      
      // Refresh the data to ensure consistency with database
      fetchRegistrations();
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error("Failed to update payment status", {
        description: "Please try again or contact support",
      });
    }
  };
  
  const handleExportData = () => {
    // Create CSV data
    const headers = ['Name', 'Email', 'Phone', 'Adults', 'Kids', 'Family Type', 'Amount', 'Status', 'Transaction ID', 'Date', 'T-Shirt Sizes'];
    const csvData = registrations.map(reg => [
      reg.name,
      reg.email,
      reg.phone,
      reg.adult_count,
      reg.kids_count,
      reg.family_category,
      reg.total_amount,
      reg.payment_status,
      reg.transaction_id || 'N/A',
      new Date(reg.created_at).toLocaleDateString(),
      reg.t_shirt_sizes ? reg.t_shirt_sizes.join(', ') : 'N/A'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    // Create a blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `registrations-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const handleLogout = () => {
    navigate('/');
  };

  const handleViewDetails = (registration: Registration) => {
    setSelectedRegistration(registration);
    setShowDetailsModal(true);
  };
  
  // Filter and search the registrations
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = 
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.family_category.toLowerCase().includes(searchTerm.toLowerCase());
      
    if (filter === 'all') return matchesSearch;
    if (filter === 'paid') return matchesSearch && reg.payment_status === 'paid';
    if (filter === 'pending') return matchesSearch && reg.payment_status === 'pending';
    
    return matchesSearch;
  });
  
  // Add debug useEffect to monitor registrations state
  useEffect(() => {
    console.log('Registrations state updated:', registrations);
  }, [registrations]);

  return (
    <motion.div 
      className="max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage family registrations and payments</p>
        </div>
        <Button 
          variant="outline" 
          className="rounded-xl" 
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="rounded-xl shadow-soft bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Registrations</p>
                <h3 className="text-2xl font-bold">{statsData.totalRegistrations}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl shadow-soft bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-green-100 text-green-700">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Participants</p>
                <h3 className="text-2xl font-bold">{statsData.totalParticipants}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl shadow-soft bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-amber-100 text-amber-700">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Payments Completed</p>
                <h3 className="text-2xl font-bold">
                  {statsData.totalPaid}/{statsData.totalRegistrations}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="rounded-xl shadow-soft bg-white">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-purple-100 text-purple-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide"><path d="M2 5H6C8.76 5 10.14 5 11.1 5.9C12.07 6.8 12.07 8.27 12.07 11.2V12.8C12.07 15.73 12.07 17.2 13.04 18.1C14 19 15.38 19 18.14 19H22"></path><path d="M15 5H18.14C20.9 5 22.28 5 23.24 5.9C24.14 6.73 24.2 8.1 24.14 10.53"></path><path d="M10 12H14"></path><path d="M17 19V21"></path><path d="M14 16H22V22H14z"></path></svg>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold">${statsData.totalRevenue}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="rounded-xl shadow-medium overflow-hidden">
        <CardHeader className="bg-primary/5">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <CardTitle>Registrations</CardTitle>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search registrations..." 
                  className="pl-10 max-w-xs rounded-xl"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="rounded-xl"
                  onClick={handleExportData}
                >
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <Tabs defaultValue="all" onValueChange={handleFilterChange}>
          <div className="px-6 pt-4">
            <TabsList className="grid grid-cols-3 w-full max-w-xs">
              <TabsTrigger value="all" className="rounded-l-xl">All</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
              <TabsTrigger value="pending" className="rounded-r-xl">Pending</TabsTrigger>
            </TabsList>
          </div>
          
          {loading ? (
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Loading registrations data...</p>
            </CardContent>
          ) : (
            <TabsContent value="all" className="m-0">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Family Type</TableHead>
                        <TableHead className="text-center">Participants</TableHead>
                        <TableHead className="text-center">Amount</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegistrations.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No registrations found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredRegistrations.map((reg) => (
                          <TableRow key={reg.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{reg.name}</p>
                                <p className="text-sm text-muted-foreground">{reg.email}</p>
                                {reg.is_tulip_parent && (
                                  <Badge variant="outline" className="mt-1 bg-blue-100 text-blue-800">
                                    Tulip Parent
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{reg.family_category}</TableCell>
                            <TableCell className="text-center">
                              {reg.adult_count + reg.kids_count}
                            </TableCell>
                            <TableCell className="text-center">${reg.total_amount}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant={reg.payment_status === 'paid' ? 'default' : 'outline'}
                                className={
                                  reg.payment_status === 'paid' 
                                    ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                                    : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                                }
                              >
                                {reg.payment_status === 'paid' ? (
                                  <><Check className="h-3 w-3 mr-1" /> Paid</>
                                ) : (
                                  <><Clock className="h-3 w-3 mr-1" /> Pending</>
                                )}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="rounded-lg h-8"
                                  onClick={() => handleViewDetails(reg)}
                                >
                                  View Details
                                </Button>
                                {reg.payment_status === 'pending' ? (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="rounded-lg h-8 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                                    onClick={() => handleUpdatePaymentStatus(reg.id, 'paid')}
                                  >
                                    Mark as Paid
                                  </Button>
                                ) : (
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="rounded-lg h-8 bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 hover:text-amber-700" 
                                    onClick={() => handleUpdatePaymentStatus(reg.id, 'pending')}
                                  >
                                    Mark as Pending
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </TabsContent>
          )}
          
          <TabsContent value="paid" className="m-0">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Family Type</TableHead>
                      <TableHead className="text-center">Participants</TableHead>
                      <TableHead className="text-center">Amount</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No paid registrations found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRegistrations.map((reg) => (
                        <TableRow key={reg.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{reg.name}</p>
                              <p className="text-sm text-muted-foreground">{reg.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{reg.family_category}</TableCell>
                          <TableCell className="text-center">
                            {reg.adult_count + reg.kids_count}
                          </TableCell>
                          <TableCell className="text-center">${reg.total_amount}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="default"
                              className="bg-green-100 text-green-800 hover:bg-green-100"
                            >
                              <Check className="h-3 w-3 mr-1" /> Paid
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="rounded-lg h-8 bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100 hover:text-amber-700" 
                              onClick={() => handleUpdatePaymentStatus(reg.id, 'pending')}
                            >
                              Mark as Pending
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="pending" className="m-0">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Family Type</TableHead>
                      <TableHead className="text-center">Participants</TableHead>
                      <TableHead className="text-center">Amount</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No pending registrations found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRegistrations.map((reg) => (
                        <TableRow key={reg.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{reg.name}</p>
                              <p className="text-sm text-muted-foreground">{reg.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{reg.family_category}</TableCell>
                          <TableCell className="text-center">
                            {reg.adult_count + reg.kids_count}
                          </TableCell>
                          <TableCell className="text-center">${reg.total_amount}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant="outline"
                              className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                            >
                              <Clock className="h-3 w-3 mr-1" /> Pending
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="rounded-lg h-8 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
                              onClick={() => handleUpdatePaymentStatus(reg.id, 'paid')}
                            >
                              Mark as Paid
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
      
      {/* Add modal inside the component return statement */}
      {showDetailsModal && selectedRegistration && (
        <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Registration Details</DialogTitle>
              <DialogDescription>
                Complete information for {selectedRegistration.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Contact Info</h4>
                  <p className="font-medium">{selectedRegistration.name}</p>
                  <p className="text-sm">{selectedRegistration.email}</p>
                  <p className="text-sm">{selectedRegistration.phone}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Registration</h4>
                  <p className="text-sm">Family Type: <span className="font-medium">{selectedRegistration.family_category}</span></p>
                  <p className="text-sm">Adults: <span className="font-medium">{selectedRegistration.adult_count}</span></p>
                  <p className="text-sm">Kids: <span className="font-medium">{selectedRegistration.kids_count}</span></p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Payment</h4>
                <p className="text-sm">Amount: <span className="font-medium">${selectedRegistration.total_amount}</span></p>
                <p className="text-sm">Status: <span className="font-medium">{selectedRegistration.payment_status}</span></p>
                {selectedRegistration.transaction_id && (
                  <p className="text-sm">Transaction ID: <span className="font-medium">{selectedRegistration.transaction_id}</span></p>
                )}
              </div>
              
              {selectedRegistration.t_shirt_sizes && selectedRegistration.t_shirt_sizes.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">T-Shirt Sizes</h4>
                  <div className="mt-2 space-y-2">
                    {selectedRegistration.t_shirt_sizes.map((size, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">
                          {index < selectedRegistration.adult_count 
                            ? `Adult ${selectedRegistration.adult_count > 1 ? index + 1 : ''}` 
                            : `Child ${selectedRegistration.kids_count > 1 ? (index - selectedRegistration.adult_count) + 1 : ''}`}
                        </span>
                        <Badge variant="outline">{size}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedRegistration.is_tulip_parent && (
                <div>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Tulip Parent
                  </Badge>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </motion.div>
  );
};

export default AdminPanel;

// Remove this modal component from outside the component
// {showDetailsModal && selectedRegistration && (
//   <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
//     ...
//   </Dialog>
// )}
