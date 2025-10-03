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
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCreateEdit, setShowCreateEdit] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication and admin role
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate("/auth");
        return;
      }

      setUser(session.user);

      // Check if user has admin role
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .single();

      setIsAdmin(!!roles);
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        // Recheck admin status
        checkAuth();
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

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <>
        <Helmet>
          <title>Access Denied | Portfolio Blog</title>
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
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="p-8 bg-card rounded-lg border border-destructive/50">
                <h2 className="text-2xl font-bold text-destructive mb-4">Access Denied</h2>
                <p className="text-muted-foreground mb-6">
                  You don't have admin privileges. To grant admin access to your account, 
                  you need to add an admin role in the backend.
                </p>
                <div className="bg-muted p-4 rounded-md text-left space-y-2">
                  <p className="font-semibold text-sm">To grant admin access:</p>
                  <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                    <li>Go to your backend dashboard</li>
                    <li>Navigate to the "user_roles" table</li>
                    <li>Insert a new row with:
                      <ul className="ml-6 mt-1 list-disc list-inside">
                        <li>user_id: <code className="bg-background px-1 rounded">{user?.id}</code></li>
                        <li>role: <code className="bg-background px-1 rounded">admin</code></li>
                      </ul>
                    </li>
                    <li>Refresh this page</li>
                  </ol>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
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