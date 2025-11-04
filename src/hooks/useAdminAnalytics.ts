import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsStats {
  totalVisitors: number;
  totalPageViews: number;
  uniqueSessions: number;
  avgPagesPerSession: number;
}

interface DailyTraffic {
  date: string;
  pageViews: number;
  uniqueSessions: number;
}

export const useAdminAnalytics = (daysAgo: number = 30) => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [dailyTraffic, setDailyTraffic] = useState<DailyTraffic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);

        // Fetch overall stats
        const { data: statsData, error: statsError } = await supabase
          .rpc('get_analytics_stats', { days_ago: daysAgo });

        if (statsError) throw statsError;

        if (statsData && statsData.length > 0) {
          const stat = statsData[0];
          setStats({
            totalVisitors: Number(stat.total_visitors),
            totalPageViews: Number(stat.total_page_views),
            uniqueSessions: Number(stat.unique_sessions),
            avgPagesPerSession: Number(stat.avg_pages_per_session),
          });
        }

        // Fetch daily traffic
        const { data: trafficData, error: trafficError } = await supabase
          .rpc('get_daily_traffic', { days_ago: daysAgo });

        if (trafficError) throw trafficError;

        if (trafficData) {
          setDailyTraffic(
            trafficData.map((item: any) => ({
              date: item.date,
              pageViews: Number(item.page_views),
              uniqueSessions: Number(item.unique_sessions),
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [daysAgo]);

  return { stats, dailyTraffic, loading };
};
