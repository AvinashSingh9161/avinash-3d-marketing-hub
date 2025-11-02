-- Fix duplicate storage INSERT policy issue
-- The previous migration didn't drop the correct policy name
-- This policy allows uploads to any path without ownership checks

DROP POLICY IF EXISTS "Authenticated users can upload blog images" ON storage.objects;

-- Verify only the secure policy remains
-- The "Users can upload to their own folder" policy is the correct one with path enforcement