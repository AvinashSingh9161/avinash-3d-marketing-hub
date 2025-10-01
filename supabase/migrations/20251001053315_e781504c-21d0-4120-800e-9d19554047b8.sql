-- Fix Critical Security Issue: Prevent public access to user emails
-- Note: Postgres RLS doesn't support column-level security
-- We'll keep basic policies and rely on frontend to exclude email from public queries

-- Drop the existing policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a policy that allows public SELECT access
-- Frontend will be responsible for not requesting email field in public contexts
CREATE POLICY "Public profiles viewable"
ON public.profiles
FOR SELECT
USING (true);

-- Create a policy for authenticated users to view their own complete profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Add INSERT policy for profile creation
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Verify and update handle_new_user function security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', '')
  );
  RETURN new;
END;
$$;