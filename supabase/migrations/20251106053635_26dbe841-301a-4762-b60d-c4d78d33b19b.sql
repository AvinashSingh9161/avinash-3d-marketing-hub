-- Add scheduled_publish_at column to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN IF NOT EXISTS scheduled_publish_at timestamp with time zone;

-- Create index for efficient querying of scheduled posts
CREATE INDEX IF NOT EXISTS idx_blog_posts_scheduled 
ON public.blog_posts(scheduled_publish_at) 
WHERE scheduled_publish_at IS NOT NULL AND published = false;

-- Create function to automatically publish scheduled posts
CREATE OR REPLACE FUNCTION public.publish_scheduled_posts()
RETURNS TABLE(published_count integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  count integer;
BEGIN
  WITH updated AS (
    UPDATE public.blog_posts
    SET 
      published = true,
      published_at = now(),
      updated_at = now()
    WHERE 
      published = false 
      AND scheduled_publish_at IS NOT NULL 
      AND scheduled_publish_at <= now()
    RETURNING id
  )
  SELECT COUNT(*) INTO count FROM updated;
  
  RETURN QUERY SELECT count;
END;
$$;