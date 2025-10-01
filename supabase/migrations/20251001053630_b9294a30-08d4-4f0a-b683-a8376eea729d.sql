-- Drop the insecure view and implement a better solution
DROP VIEW IF EXISTS public.public_profiles;

-- Create a secure function that returns only public profile data
-- This function uses SECURITY DEFINER but with explicit column selection
-- to ensure no sensitive data (like email) is exposed
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_id uuid)
RETURNS TABLE (
  id uuid,
  full_name text,
  bio text,
  avatar_url text,
  website text,
  social_twitter text,
  social_linkedin text,
  social_instagram text,
  created_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
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
  FROM public.profiles
  WHERE id = profile_id;
$$;

-- Grant execute permission to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION public.get_public_profile(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_profile(uuid) TO authenticated;

-- Add comment to document the security measure
COMMENT ON FUNCTION public.get_public_profile IS 'Returns non-sensitive profile data for public display. Email and other sensitive fields are explicitly excluded to prevent data exposure.';

-- Verify that profiles table has no public SELECT policy
-- The only way to access profile data should be:
-- 1. Through get_public_profile function for public data
-- 2. Through "Users can view own complete profile" policy for own data