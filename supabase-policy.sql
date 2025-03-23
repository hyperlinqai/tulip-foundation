-- Example policy to allow authenticated users to read donations
CREATE POLICY "Allow authenticated users to read donations" 
ON "public"."donations"
FOR SELECT
USING (auth.role() = 'authenticated');

-- If you need to allow admins to update donations
CREATE POLICY "Allow admins to update donations" 
ON "public"."donations"
FOR UPDATE
USING (auth.role() = 'authenticated');