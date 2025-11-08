#!/usr/bin/env node
import fs from 'fs/promises';
import { createClient } from '@supabase/supabase-js';

// Config: set these environment variables before running
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SITE_URL = process.env.SITE_URL || 'https://avinashsingh.info';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.');
  console.error('Set them and re-run: npm run generate:sitemap');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false }
});

async function generate() {
  try {
    // static routes to include
    const staticRoutes = ['/', '/projects', '/contact', '/blog', '/auth'];

    // fetch published blog posts from Supabase
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) throw error;

    const urls = [];

    for (const route of staticRoutes) {
      urls.push({ loc: `${SITE_URL.replace(/\/$/, '')}${route}`, lastmod: new Date().toISOString() });
    }

    if (Array.isArray(data)) {
      for (const post of data) {
        if (!post.slug) continue;
        const lastmod = post.published_at ? new Date(post.published_at).toISOString() : new Date().toISOString();
        urls.push({ loc: `${SITE_URL.replace(/\/$/, '')}/blog/${post.slug}`, lastmod });
      }
    }

    const header = `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    const body = urls.map(u => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n');

    const footer = `\n</urlset>`;

    const content = header + body + footer;

    await fs.writeFile('public/sitemap.xml', content, 'utf8');
    console.log('Sitemap written to public/sitemap.xml — entries:', urls.length);
  } catch (err) {
    console.error('Failed to generate sitemap:', err.message || err);
    process.exit(1);
  }
}

generate();
