-- Fix infinite recursion in user_roles RLS policies
-- Drop the problematic policy that causes recursion
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Recreate the policy using the security definer function instead
-- This prevents recursion by using a function that bypasses RLS
CREATE POLICY "Admins can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (public.has_role(auth.uid(), 'admin'::app_role));