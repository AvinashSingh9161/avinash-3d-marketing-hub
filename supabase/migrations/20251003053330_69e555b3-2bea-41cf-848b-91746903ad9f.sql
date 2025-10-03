-- Add public SELECT policy for author profiles
-- This allows readers to view profiles of users who have published blog posts
-- CRITICAL: Email field must NEVER be queried directly - always use get_public_profile() function
CREATE POLICY "Public can view published author profiles"
ON public.profiles
FOR SELECT
TO public
USING (
  EXISTS (
    SELECT 1 
    FROM public.blog_posts 
    WHERE blog_posts.author_id = profiles.id 
    AND blog_posts.published = true
  )
);

-- Add index for better performance on author profile lookups
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_published 
ON public.blog_posts(author_id, published) 
WHERE published = true;