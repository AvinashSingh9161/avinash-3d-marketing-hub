-- Create analytics tables for tracking real data

-- Page views table
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX idx_page_views_session ON public.page_views(session_id);
CREATE INDEX idx_page_views_page_path ON public.page_views(page_path);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Policies: Anyone can insert page views (for tracking)
CREATE POLICY "Anyone can insert page views"
ON public.page_views
FOR INSERT
WITH CHECK (true);

-- Only admins can view analytics
CREATE POLICY "Admins can view all page views"
ON public.page_views
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create a function to get analytics stats
CREATE OR REPLACE FUNCTION public.get_analytics_stats(days_ago INTEGER DEFAULT 30)
RETURNS TABLE(
  total_visitors BIGINT,
  total_page_views BIGINT,
  unique_sessions BIGINT,
  avg_pages_per_session NUMERIC
) 
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH date_filter AS (
    SELECT now() - (days_ago || ' days')::INTERVAL AS start_date
  ),
  stats AS (
    SELECT 
      COUNT(DISTINCT session_id) as sessions,
      COUNT(*) as page_views
    FROM public.page_views, date_filter
    WHERE created_at >= date_filter.start_date
  )
  SELECT 
    stats.sessions as total_visitors,
    stats.page_views as total_page_views,
    stats.sessions as unique_sessions,
    CASE 
      WHEN stats.sessions > 0 THEN ROUND(stats.page_views::NUMERIC / stats.sessions::NUMERIC, 2)
      ELSE 0
    END as avg_pages_per_session
  FROM stats;
$$;

-- Create a function to get daily traffic data for charts
CREATE OR REPLACE FUNCTION public.get_daily_traffic(days_ago INTEGER DEFAULT 30)
RETURNS TABLE(
  date DATE,
  page_views BIGINT,
  unique_sessions BIGINT
) 
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    DATE(created_at) as date,
    COUNT(*) as page_views,
    COUNT(DISTINCT session_id) as unique_sessions
  FROM public.page_views
  WHERE created_at >= now() - (days_ago || ' days')::INTERVAL
  GROUP BY DATE(created_at)
  ORDER BY date ASC;
$$;