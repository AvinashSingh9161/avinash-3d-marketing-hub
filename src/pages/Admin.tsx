import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Plus } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { BlogPostList } from "@/components/admin/BlogPostList";
import { CreateEditPost } from "@/components/admin/CreateEditPost";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateEdit, setShowCreateEdit] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setLoading(false);
      } else {
        navigate("/auth");
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    navigate("/");
  };

  const handleEdit = (postId: string) => {
    setEditingPostId(postId);
    setShowCreateEdit(true);
  };

  const handleCreateNew = () => {
    setEditingPostId(null);
    setShowCreateEdit(true);
  };

  const handleCloseEditor = () => {
    setShowCreateEdit(false);
    setEditingPostId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Portfolio Blog</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-accent/10">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {showCreateEdit ? (
            <CreateEditPost
              postId={editingPostId}
              onClose={handleCloseEditor}
              userId={user?.id || ""}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold">Blog Posts</h2>
                  <p className="text-muted-foreground mt-1">
                    Manage your blog posts, categories, and content
                  </p>
                </div>
                <Button onClick={handleCreateNew}>
                  <Plus className="mr-2 h-4 w-4" /> New Post
                </Button>
              </div>

              <BlogPostList onEdit={handleEdit} userId={user?.id || ""} />
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Admin;