import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus, LogOut } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatsCard } from "@/components/admin/StatsCard";
import { TrafficChart } from "@/components/admin/TrafficChart";
import { CalendarWidget } from "@/components/admin/CalendarWidget";
import { RecentPostsTable } from "@/components/admin/RecentPostsTable";
import { BlogPostList } from "@/components/admin/BlogPostList";
import { CreateEditPost } from "@/components/admin/CreateEditPost";

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeView, setActiveView] = useState<"dashboard" | "blog" | "projects" | "settings">("dashboard");
  const [showCreateEdit, setShowCreateEdit] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    // Check authentication and admin role
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          if (mounted) navigate("/auth");
          return;
        }
        
        if (!session?.user) {
          if (mounted) navigate("/auth");
          return;
        }

        if (mounted) setUser(session.user);

        // Verify admin role using server-side edge function
        const { data: adminCheckData, error: adminError } = await supabase.functions.invoke('verify-admin', {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        console.log("Admin check results:", {
          userId: session.user.id,
          adminCheckData,
          error: adminError,
        });

        if (mounted) {
          setIsAdmin(adminCheckData?.isAdmin === true);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error in checkAuth:", err);
        if (mounted) {
          setLoading(false);
          navigate("/auth");
        }
      }
    };

    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        checkAuth();
      } else {
        if (mounted) navigate("/auth");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
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

      <div className="min-h-screen flex bg-background">
        <AdminSidebar
          user={user}
          activeView={activeView}
          onViewChange={setActiveView}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-auto">
          {showCreateEdit ? (
            <div className="p-8">
              <CreateEditPost
                postId={editingPostId}
                onClose={handleCloseEditor}
                userId={user?.id || ""}
              />
            </div>
          ) : (
            <>
              {activeView === "dashboard" && (
                <div className="p-8 space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Welcome back, John!</h1>
                    <Button onClick={handleCreateNew}>
                      <Plus className="mr-2 h-4 w-4" /> Create New Post
                    </Button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                      title="Total Visitors"
                      value="12,435"
                      change="+12.5%"
                      isPositive={true}
                    />
                    <StatsCard
                      title="Page Views"
                      value="54,123"
                      change="+8.2%"
                      isPositive={true}
                    />
                    <StatsCard
                      title="Bounce Rate"
                      value="34.5%"
                      change="-2.1%"
                      isPositive={false}
                    />
                    <StatsCard
                      title="New vs Returning"
                      value="8,123 vs 4,312"
                      change="+5.7%"
                      isPositive={true}
                    />
                  </div>

                  {/* Chart and Calendar */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <TrafficChart />
                    </div>
                    <div>
                      <CalendarWidget />
                    </div>
                  </div>

                  {/* Recent Posts Table */}
                  <RecentPostsTable onEdit={handleEdit} userId={user?.id || ""} />
                </div>
              )}

              {activeView === "blog" && (
                <div className="p-8 space-y-6">
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

              {activeView === "projects" && (
                <div className="p-8">
                  <h2 className="text-3xl font-bold">Projects</h2>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              )}

              {activeView === "settings" && (
                <div className="p-8">
                  <h2 className="text-3xl font-bold">Settings</h2>
                  <p className="text-muted-foreground mt-2">Coming soon...</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default Admin;