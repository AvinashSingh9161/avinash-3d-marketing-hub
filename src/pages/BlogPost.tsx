import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  published_at: string | null;
  author_id: string;
  profiles: { full_name: string | null; bio: string | null; avatar_url: string | null } | null;
  categories: { name: string; slug: string } | null;
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      // First, fetch the blog post with author ID
      const { data: postData, error: postError } = await supabase
        .from("blog_posts")
        .select(`
          id,
          title,
          content,
          excerpt,
          featured_image,
          published_at,
          author_id,
          categories (name, slug)
        `)
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (postError) throw postError;

      // Fetch the author's public profile using the secure function
      const { data: profileData } = await supabase
        .rpc('get_public_profile', { profile_id: postData.author_id });

      // Combine post with author profile
      const postWithProfile = {
        ...postData,
        profiles: profileData && profileData.length > 0 ? profileData[0] : null
      };

      setPost(postWithProfile);
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <Helmet>
          <title>Post Not Found | Portfolio Blog</title>
        </Helmet>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Helmet>
        <title>{post.title} | Portfolio Blog</title>
        <meta name="description" content={post.excerpt || post.title} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
      </Helmet>

      <article className="py-12">
        <div className="container mx-auto px-4">
          <Link to="/blog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>

          <div className="max-w-4xl mx-auto">
            {post.featured_image && (
              <div className="aspect-video w-full overflow-hidden rounded-lg mb-8">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="mb-6">
              {post.categories && (
                <Badge variant="secondary" className="mb-4">
                  {post.categories.name}
                </Badge>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

              <div className="flex items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  {post.profiles?.avatar_url ? (
                    <img
                      src={post.profiles.avatar_url}
                      alt={post.profiles.full_name || "Author"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                  <span>{post.profiles?.full_name || "Anonymous"}</span>
                </div>
                {post.published_at && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>{format(new Date(post.published_at), "MMMM d, yyyy")}</span>
                  </div>
                )}
              </div>
            </div>

            {post.excerpt && (
              <div className="text-xl text-muted-foreground mb-8 pb-8 border-b">
                {post.excerpt}
              </div>
            )}

            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.profiles && (post.profiles.bio || post.profiles.avatar_url) && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-start gap-4">
                  {post.profiles.avatar_url && (
                    <img
                      src={post.profiles.avatar_url}
                      alt={post.profiles.full_name || "Author"}
                      className="w-16 h-16 rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {post.profiles.full_name || "Anonymous"}
                    </h3>
                    {post.profiles.bio && (
                      <p className="text-muted-foreground">{post.profiles.bio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default BlogPost;