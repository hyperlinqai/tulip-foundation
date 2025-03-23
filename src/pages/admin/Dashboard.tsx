// Import necessary components and libraries
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Mail, Users, User, Check, Clock, Search, LogOut } from "lucide-react";
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define types based on Supabase tables
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
  t_shirt_sizes: string[];
  updated_at?: string;
};

type Donation = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  amount: number;
  designation: string;
  is_anonymous: boolean;
  payment_id: string;
  donation_type: string;
  status: string;
  created_at: string;
  updated_at?: string;
  certificate_sent?: boolean; // Add this field
};

// Utility function to escape CSV fields
function escapeCSV(value: any): string {
  if (value == null) return '';
  const str = String(value);
  if (str.includes(',') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

// Inside your Dashboard component
const Dashboard = () => {
  // Add state for data
  const [donations, setDonations] = useState<Donation[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('registrations');
  const [donationFilter, setDonationFilter] = useState('all');
  const [registrationFilter, setRegistrationFilter] = useState('all');
  const navigate = useNavigate();

  // Stats state
  const [statsData, setStatsData] = useState({
    totalRegistrations: 0,
    totalParticipants: 0,
    totalPaid: 0,
    totalPending: 0,
    totalRevenue: 0,
    totalDonations: 0,
    totalDonationAmount: 0,
  });

  // Add this function to check available tables
  const checkTables = async () => {
    try {
      console.log('Checking available tables in Supabase...');

      // Use a raw query instead of RPC or direct schema access
      const { data, error } = await supabase
        .from('registrations')
        .select('count(*)', { count: 'exact', head: true });

      if (error) {
        console.error('Error checking tables:', error);
      } else {
        console.log('Registrations table exists');

        // Check donations table
        const { data: donationsData, error: donationsError } = await supabase
          .from('donations')
          .select('count(*)', { count: 'exact', head: true });

        if (donationsError) {
          console.error('Error checking donations table:', donationsError);
        } else {
          console.log('Donations table exists');
        }
      }
    } catch (e) {
      console.error('Exception checking tables:', e);
    }
  };



  // Add this function to check and debug RLS permissions
  const checkRLSPermissions = async () => {
    try {
      console.log('Checking RLS permissions...');

      // Get the current user to verify authentication
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error('Error getting current user:', userError);
        return;
      }

      console.log('Current authenticated user:', user?.id);

      // Try a simple select with explicit auth check
      const { data, error } = await supabase
        .from('donations')
        .select('count(*)', { count: 'exact' });

      if (error) {
        console.error('RLS permission error:', error);
        // If this is a permission error, you need to update your RLS policies
      } else {
        console.log('RLS check passed, count:', data);
      }
    } catch (e) {
      console.error('Exception checking RLS:', e);
    }
  };

  useEffect(() => {
    fetchData();
    checkTables();
    checkRLSPermissions();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch registrations
      const { data: registrationsData, error: registrationsError } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (registrationsError) {
        console.error('Error fetching registrations:', registrationsError);
        throw registrationsError;
      }
      setRegistrations(registrationsData || []);
      console.log('Registrations fetched:', registrationsData?.length || 0);

      // Try to fetch a single row from donations to check if table exists
      console.log('Checking if donations table exists...');
      const { data: donationCheck, error: donationCheckError } = await supabase
        .from('donations')
        .select('count(*)', { count: 'exact' })
        .limit(1);

      if (donationCheckError) {
        console.error('Error checking donations table:', donationCheckError);
        console.error('This suggests the table might not exist or you lack permissions');
      } else {
        console.log('Donations table check result:', donationCheck);
      }

      // Fetch donations with the same approach as registrations
      console.log('Attempting to fetch donations from Supabase...');
      const { data: donationsData, error: donationsError } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (donationsError) {
        console.error('Error fetching donations:', donationsError);
        throw donationsError;
      }

      console.log('Raw donations data:', donationsData);
      setDonations(donationsData || []);
      console.log('Donations fetched:', donationsData?.length || 0);

      // Calculate stats with the data we have
      calculateStats(registrationsData || [], donationsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Failed to load data", {
        description: "Please try again or contact support",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (regs: Registration[], dons: Donation[]) => {
    const totalRegistrations = regs.length;
    const totalParticipants = regs.reduce((sum, reg) => sum + (reg.adult_count || 0) + (reg.kids_count || 0), 0);
    const totalPaid = regs.filter(reg => reg.payment_status === 'paid').length;
    const totalPending = regs.filter(reg => reg.payment_status === 'pending').length;
    const totalRevenue = regs
      .filter(reg => reg.payment_status === 'paid')
      .reduce((sum, reg) => sum + (reg.total_amount || 0), 0);

    const totalDonations = dons.length;
    const totalDonationAmount = dons
      .filter(don => don.status === 'completed')
      .reduce((sum, don) => sum + (don.amount || 0), 0);

    setStatsData({
      totalRegistrations,
      totalParticipants,
      totalPaid,
      totalPending,
      totalRevenue,
      totalDonations,
      totalDonationAmount,
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
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

      if (error) throw error;

      // Update local state
      setRegistrations(registrations.map(reg => {
        if (reg.id === id) return { ...reg, ...updateData };
        return reg;
      }));

      toast.success(`Payment status updated to ${status}`);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error("Failed to update payment status");
    }
  };

  // Add a function to update donation status
  const handleUpdateDonationStatus = async (id: string, status: 'completed' | 'pending') => {
    try {
      const updateData = {
        status: status,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('donations')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setDonations(donations.map(don => {
        if (don.id === id) return { ...don, ...updateData };
        return don;
      }));

      toast.success(`Donation status updated to ${status}`);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error updating donation status:', error);
      toast.error("Failed to update donation status");
    }
  };

  const handleSendCertificate = async (id: string) => {
    try {
      console.log('Sending certificate for donation:', id);

      // Update the database
      const { error } = await supabase
        .from('donations')
        .update({ certificate_sent: true })
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Update local state
      setDonations(donations.map(don => {
        if (don.id === id) return { ...don, certificate_sent: true };
        return don;
      }));

      toast.success("Certificate sent successfully");
    } catch (error) {
      console.error('Error sending certificate:', error);
      toast.error("Failed to send certificate");
    }
  };

  const handleExportData = (type: 'registrations' | 'donations') => {
    const data = type === 'registrations' ? registrations : donations;
    let headers: string[] = [];
    let csvData: string[][] = [];

    if (type === 'registrations') {
      headers = ['Name', 'Email', 'Phone', 'Adults', 'Kids', 'Family Type', 'Amount', 'Status', 'Transaction ID', 'Date', 'T-Shirt Sizes'];
      csvData = data.map((reg) => [
        escapeCSV((reg as Registration).name || ''),
        escapeCSV((reg as Registration).email || ''),
        escapeCSV((reg as Registration).phone || ''),
        escapeCSV((reg as Registration).adult_count || 0),
        escapeCSV((reg as Registration).kids_count || 0),
        escapeCSV((reg as Registration).family_category || ''),
        escapeCSV((reg as Registration).total_amount || 0),
        escapeCSV((reg as Registration).payment_status || ''),
        escapeCSV((reg as Registration).transaction_id || 'N/A'),
        escapeCSV((reg as Registration).created_at ? new Date((reg as Registration).created_at).toLocaleDateString() : ''),
        escapeCSV((reg as Registration).t_shirt_sizes ? (reg as Registration).t_shirt_sizes.join(', ') : 'N/A')
      ]);
    } else {
      headers = ['Name', 'Email', 'Amount', 'Designation', 'Anonymous', 'Payment ID', 'Type', 'Status', 'Date'];
      csvData = data.map((don) => [
        escapeCSV(`${((don as Donation).first_name || '').trim()} ${((don as Donation).last_name || '').trim()}`.trim()),
        escapeCSV((don as Donation).email || ''),
        escapeCSV((don as Donation).amount || 0),
        escapeCSV((don as Donation).designation || ''),
        escapeCSV((don as Donation).is_anonymous ? 'Yes' : 'No'),
        escapeCSV((don as Donation).payment_id || ''),
        escapeCSV((don as Donation).donation_type || ''),
        escapeCSV((don as Donation).status || ''),
        escapeCSV((don as Donation).created_at ? new Date((don as Donation).created_at).toLocaleDateString() : '')
      ]);
    }

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${type}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add a debug useEffect to monitor the donations state
  useEffect(() => {
    console.log('Donations state updated:', donations);
  }, [donations]);

  // Fix the handleDonationFilterChange function by moving it inside the component
  const handleDonationFilterChange = (value: string) => {
    console.log('Donation filter changed to:', value);
    setDonationFilter(value);
  };

  // Filter data based on search term
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = (reg.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reg.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (reg.family_category || '').toLowerCase().includes(searchTerm.toLowerCase());

    if (registrationFilter === 'all') return matchesSearch;
    return matchesSearch && reg.payment_status === registrationFilter;
  });

  const filteredDonations = donations.filter(don => {
    const matchesSearch = `${(don.first_name || '')} ${(don.last_name || '')}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (don.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (don.designation || '').toLowerCase().includes(searchTerm.toLowerCase());

    if (donationFilter === 'all') return matchesSearch;
    return matchesSearch && don.status === donationFilter;
  });

  const handleRegistrationFilterChange = (value: string) => {
    console.log('Registration filter changed to:', value);
    setRegistrationFilter(value);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage registrations, donations, and payments</p>
        </div>
        <Button
          variant="outline"
          className="rounded-xl"
          onClick={() => navigate('/')}
        >
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
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
              <div className="p-3 rounded-full bg-purple-100 text-purple-700">
                <Download className="h-6 w-6" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Total Donations</p>
                <h3 className="text-2xl font-bold">{statsData.totalDonations}</h3>
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
                <p className="text-muted-foreground text-sm">Total Revenue</p>
                <h3 className="text-2xl font-bold">
                  ${(statsData.totalRevenue + statsData.totalDonationAmount).toFixed(2)}
                </h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
          <TabsTrigger value="registrations" className="rounded-l-xl">Registrations</TabsTrigger>
          <TabsTrigger value="donations" className="rounded-r-xl">Donations</TabsTrigger>
        </TabsList>

        {/* Registrations Tab */}
        <TabsContent value="registrations" className="mt-0">
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

                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => handleExportData('registrations')}
                  >
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </div>
              </div>
            </CardHeader>

            <div className="px-6 pt-4">
              <Tabs defaultValue="all" onValueChange={handleRegistrationFilterChange}>
                <TabsList className="grid grid-cols-3 w-full max-w-xs">
                  <TabsTrigger value="all" className="rounded-l-xl">All</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                  <TabsTrigger value="pending" className="rounded-r-xl">Pending</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {isLoading ? (
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Loading registrations data...</p>
              </CardContent>
            ) : (
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
                              {(reg.adult_count || 0) + (reg.kids_count || 0)}
                            </TableCell>
                            <TableCell className="text-center">${reg.total_amount || 0}</TableCell>
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
            )}
          </Card>
        </TabsContent>

        {/* Donations Tab */}
        <TabsContent value="donations" className="mt-0">
          <Card className="rounded-xl shadow-medium overflow-hidden">
            <CardHeader className="bg-primary/5">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <CardTitle>Donations</CardTitle>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search donations..."
                      className="pl-10 max-w-xs rounded-xl"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>

                  <Button
                    variant="outline"
                    className="rounded-xl"
                    onClick={() => handleExportData('donations')}
                  >
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </div>
              </div>
            </CardHeader>

            <div className="px-6 pt-4">
              <Tabs defaultValue="all" onValueChange={handleDonationFilterChange}>
                <TabsList className="grid grid-cols-3 w-full max-w-xs">
                  <TabsTrigger value="all" className="rounded-l-xl">All</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="pending" className="rounded-r-xl">Pending</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {isLoading ? (
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Loading donations data...</p>
              </CardContent>
            ) : (
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Designation</TableHead>
                        <TableHead className="text-center">Amount</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Date</TableHead>
                        <TableHead className="text-center">Certificate</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDonations.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No donations found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredDonations.map((don) => (
                          <TableRow key={don.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{`${don.first_name} ${don.last_name}`}</p>
                                <p className="text-sm text-muted-foreground">{don.email}</p>
                                {don.is_anonymous && (
                                  <Badge variant="outline" className="mt-1 bg-gray-100 text-gray-800">
                                    Anonymous
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{don.designation}</TableCell>
                            <TableCell className="text-center">${don.amount || 0}</TableCell>
                            <TableCell className="text-center">
                              <Badge variant={don.status === 'completed' ? 'default' : 'outline'}
                                className={
                                  don.status === 'completed'
                                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                    : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                                }
                              >
                                {don.status === 'completed' ? (
                                  <><Check className="h-3 w-3 mr-1" /> Completed</>
                                ) : (
                                  <><Clock className="h-3 w-3 mr-1" /> Pending</>
                                )}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center">{don.created_at ? new Date(don.created_at).toLocaleDateString() : 'N/A'}</TableCell>
                            <TableCell className="text-center">
                              {don.certificate_sent ? (
                                <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                                  <Check className="h-3 w-3 mr-1" /> Sent
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                                  Not Sent
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                {don.status === 'pending' ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800"
                                    onClick={() => handleUpdateDonationStatus(don.id, 'completed')}
                                  >
                                    <Check className="h-3.5 w-3.5 mr-1" />
                                    Mark Completed
                                  </Button>
                                ) : (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                                    onClick={() => handleUpdateDonationStatus(don.id, 'pending')}
                                  >
                                    <Clock className="h-3.5 w-3.5 mr-1" />
                                    Mark Pending
                                  </Button>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-8"
                                  onClick={() => handleSendCertificate(don.id)}
                                  disabled={don.certificate_sent}
                                >
                                  <Mail className="h-3.5 w-3.5 mr-1" />
                                  {don.certificate_sent ? 'Certificate Sent' : 'Send Certificate'}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
// function setDonationFilter(value: string) {
//   throw new Error("Function not implemented.");
// } // Removed duplicate function
