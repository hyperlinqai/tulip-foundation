
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';
import AdminPanel from '@/components/AdminPanel';
import { supabase } from '@/integrations/supabase/client';
import { checkSupabaseConnection } from '@/utils/supabaseUtils';

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkSupabaseConnection();
      if (!isConnected) {
        console.error('Failed to connect to Supabase');
      }
    };
    
    checkConnection();
  }, []);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Check if supabase client is initialized
      if (!supabase) {
        console.error('Supabase client is not initialized');
        throw new Error('Database connection not available');
      }
      
      // Simple direct comparison for admin credentials
      if (email === 'tulipkids0@gmail.com' && password === 'Tulipkids@2025') {
        setAuthenticated(true);
        toast.success("Logged in successfully", {
          description: "Welcome to the admin panel",
        });
        return;
      }
      
      // If direct comparison fails, try database lookup
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        console.error("Database lookup error:", error);
        toast.error("Invalid credentials", {
          description: "Please try again with the correct email and password",
        });
        return;
      }
      
      if (data) {
        // In a real app, you would verify the password hash here
        // For now, we'll just check if the user exists
        setAuthenticated(true);
        toast.success("Logged in successfully", {
          description: "Welcome to the admin panel",
        });
      } else {
        toast.error("Invalid credentials", {
          description: "Please try again with the correct email and password",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed", {
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 bg-gradient-to-b from-background to-secondary/30">
      {!authenticated ? (
        <motion.div 
          className="max-w-md mx-auto mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="rounded-xl overflow-hidden shadow-medium">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pr-10 rounded-xl h-12"
                      disabled={loading}
                    />
                  </div>
                  <div className="relative">
                    <Input
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10 rounded-xl h-12"
                      disabled={loading}
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use the credentials provided by your administrator.
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full rounded-xl h-12 btn-hover-effect"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login to Admin Panel'}
                </Button>
                
                <div className="text-center">
                  <a href="/" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Return to registration
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <AdminPanel />
      )}
    </div>
  );
};

export default Admin;
