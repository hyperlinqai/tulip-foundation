
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Copy, Home, Calendar, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { registrationData, transactionId } = location.state || {};

  // Handle both naming conventions for total amount
  const totalAmount = registrationData?.totalAmount || registrationData?.total_amount || 0;

  useEffect(() => {
    // If the page is accessed directly without data, redirect to home
    if (!registrationData) {
      console.log("No registration data found, redirecting to home");
      navigate('/');
      return;
    }
    
    console.log("Success page loaded with data:", registrationData);
    console.log("Transaction ID:", transactionId);
  }, [registrationData, transactionId, navigate]);
  
  // Add this check to prevent rendering with undefined data
  if (!registrationData || !totalAmount) {
    return null; // Will redirect in the useEffect
  }
  
  const copyTransactionId = () => {
    if (transactionId) {
      navigator.clipboard.writeText(transactionId);
      toast("Transaction ID copied to clipboard");
    }
  };
  
  return (
    <motion.div
      className="min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Header />
      
      <div className="py-16 bg-tulip-muted">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-tulip to-tulip-dark p-8 text-white text-center">
                <motion.div
                  className="bg-white/20 w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.2 }}
                >
                  <Check className="h-10 w-10 text-white" />
                </motion.div>
                
                <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
                <p className="text-xl opacity-90">
                  Thank you for your registration to the Tulip Trot
                </p>
              </div>
              
              <div className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-4">Transaction Summary</h2>
                    <Card className="rounded-xl overflow-hidden shadow-sm">
                      <CardContent className="p-4 space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Name:</span>
                            <span className="font-medium">{registrationData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="font-medium">{registrationData.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Participants:</span>
                            <span className="font-medium">
                              {registrationData.adultCount} adults, {registrationData.kidsCount} kids
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount Paid:</span>
                            <span className="font-medium">${totalAmount.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Payment Status:</span>
                            <span className="font-medium text-green-600">Completed</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Payment Date:</span>
                            <span className="font-medium">{new Date().toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                          <div>
                            <p className="text-xs text-muted-foreground">Transaction ID</p>
                            <p className="font-mono text-sm">{transactionId}</p>
                          </div>
                          <Button variant="ghost" size="icon" onClick={copyTransactionId}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-4">Event Information</h2>
                    <Card className="rounded-xl overflow-hidden shadow-sm">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex items-start gap-3">
                          <Calendar className="h-5 w-5 text-tulip flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Saturday, May 15, 2023</p>
                            <p className="text-sm text-muted-foreground">Mark your calendar!</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <Clock className="h-5 w-5 text-tulip flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Registration: 8:00 AM</p>
                            <p className="font-medium">Race Start: 9:00 AM</p>
                            <p className="text-sm text-muted-foreground">Please arrive 30 minutes early</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <MapPin className="h-5 w-5 text-tulip flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium">Tulip Park</p>
                            <p className="text-sm text-muted-foreground">123 Flower Lane, Bloomington, IN 47401</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl h-12"
                    onClick={() => {
                      window.print();
                    }}
                  >
                    Print Receipt
                  </Button>
                  <Button 
                    className="w-full rounded-xl h-12 bg-tulip hover:bg-tulip-dark"
                    onClick={() => navigate('/')}
                  >
                    <Home className="mr-2 h-4 w-4" /> Return Home
                  </Button>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    A confirmation email has been sent to <span className="font-medium">{registrationData.email}</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Questions? Contact us at <span className="text-tulip font-medium">info@tulipkids.org</span> or call <span className="text-tulip font-medium">(555) 123-4567</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default Success;
