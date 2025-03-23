-- More restrictive policy for admin-only access
CREATE POLICY "Allow admins to read donations" 
ON "public"."donations"
FOR SELECT
USING (auth.uid() IN (
  SELECT id FROM admin_users WHERE email = auth.email()
));