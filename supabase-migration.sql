-- Add certificate_sent column to donations table
ALTER TABLE donations 
ADD COLUMN certificate_sent BOOLEAN DEFAULT false;