import { supabase } from "@/integrations/supabase/client";

// Example query
const fetchData = async () => {
  const { data, error } = await supabase
    .from('your_table')
    .select('*');
    
  if (error) {
    console.error('Error fetching data:', error);
    return;
  }
  
  console.log('Data:', data);
};