import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Utility function to check if Supabase connection is working
 * @returns Promise<boolean> - true if connection is working, false otherwise
 */
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    console.log('Checking Supabase connection...');
    
    // Simple query to check if we can connect to Supabase
    const { data, error } = await supabase
      .from('registrations')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection error:', error);
      toast.error("Database connection error", {
        description: error.message,
      });
      return false;
    }
    
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Unexpected error checking Supabase connection:', error);
    toast.error("Database connection error", {
      description: "Could not connect to the database",
    });
    return false;
  }
};