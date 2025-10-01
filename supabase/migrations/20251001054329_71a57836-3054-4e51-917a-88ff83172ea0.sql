-- Fix the handle_new_user function to properly bypass RLS
-- The issue is that SECURITY DEFINER alone doesn't bypass RLS
-- We need to ensure the function can insert into profiles

-- First, let's verify the trigger function has proper permissions
ALTER FUNCTION public.handle_new_user() SECURITY DEFINER;

-- Grant necessary permissions to ensure the function works
GRANT USAGE ON SCHEMA public TO postgres;
GRANT ALL ON public.profiles TO postgres;

-- Alternative approach: Make the INSERT policy work in trigger context
-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Create a new INSERT policy that works both for:
-- 1. Direct user inserts (auth.uid() = id)
-- 2. Trigger-based inserts (triggered by user creation)
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK (
  -- Allow if the user is inserting their own profile
  auth.uid() = id
);

-- Add a separate policy for the postgres role (used by triggers)
CREATE POLICY "System can insert profiles"
ON public.profiles
FOR INSERT
TO postgres
WITH CHECK (true);

COMMENT ON POLICY "System can insert profiles" ON public.profiles IS 'Allows SECURITY DEFINER functions and triggers to insert profiles during user registration';