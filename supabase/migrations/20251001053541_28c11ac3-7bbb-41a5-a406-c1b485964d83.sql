-- Fix Critical Security Issue: Remove public access to sensitive profile data
-- Create a secure view that only exposes non-sensitive profile information

-- Drop the insecure public policy
DROP POLICY IF EXISTS "Public profiles viewable" ON public.profiles;

-- Create a view that only exposes public-safe profile data
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  full_name,
  bio,
  avatar_url,
  website,
  social_twitter,
  social_linkedin,
  social_instagram,
  created_at
FROM public.profiles;

-- Grant SELECT permission on the view to anonymous users
GRANT SELECT ON public.public_profiles TO anon;
GRANT SELECT ON public.public_profiles TO authenticated;

-- Add a comment to document the security measure
COMMENT ON VIEW public.public_profiles IS 'Public view of profiles table that excludes sensitive data like email addresses. Used for displaying author information on blog posts.';

-- The existing "Users can view own complete profile" policy remains for authenticated users
-- to access their own email and full profile data