import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

export const useAnalytics = () => {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        const sessionId = getSessionId();
        const pagePath = window.location.pathname;
        const referrer = document.referrer;
        const userAgent = navigator.userAgent;

        // Get current user if logged in
        const { data: { user } } = await supabase.auth.getUser();

        // Track page view
        await supabase.from('page_views').insert({
          page_path: pagePath,
          user_id: user?.id || null,
          session_id: sessionId,
          referrer: referrer || null,
          user_agent: userAgent,
        });
      } catch (error) {
        console.error('Analytics tracking error:', error);
      }
    };

    trackPageView();
  }, []);
};
