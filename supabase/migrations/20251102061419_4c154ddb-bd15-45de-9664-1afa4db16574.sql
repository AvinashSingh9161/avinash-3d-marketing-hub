-- Fix email exposure: Restrict public profile access to only use the secure function
-- Drop the overly permissive policy that exposes emails
DROP POLICY IF EXISTS "Public can view published author profiles" ON public.profiles;

-- Create a more restrictive policy that prevents direct email access
-- Users can still get public profiles via the get_public_profile() function
CREATE POLICY "Public profiles via function only" 
ON public.profiles 
FOR SELECT 
USING (false);
-- This effectively blocks direct SELECT access to profiles table for public users
-- They must use the get_public_profile() function which filters out sensitive data

-- Fix storage bucket ownership validation
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Users can update their uploaded images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their uploaded images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;

-- Create secure INSERT policy with path enforcement
CREATE POLICY "Users can upload to their own folder"
ON storage.objects 
FOR INSERT
WITH CHECK (
  bucket_id = 'blog-images' 
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Create secure UPDATE policy with ownership check
CREATE POLICY "Users can update own images"
ON storage.objects 
FOR UPDATE
USING (
  bucket_id = 'blog-images' 
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Create secure DELETE policy with ownership check
CREATE POLICY "Users can delete own images"
ON storage.objects 
FOR DELETE
USING (
  bucket_id = 'blog-images' 
  AND auth.uid() IS NOT NULL
  AND (storage.foldername(name))[1] = auth.uid()::text
);