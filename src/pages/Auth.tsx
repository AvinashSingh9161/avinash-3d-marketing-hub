import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

// Input validation schemas
const authSchema = z.object({
  email: z.string().trim().email("Invalid email address").max(255, "Email too long"),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password too long"),
  fullName: z.string().trim().min(1, "Name is required").max(100, "Name too long").optional(),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/admin");
      }
    });
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate inputs
      const validationData = authSchema.safeParse({
        email: email.trim(),
        password,
        fullName: !isLogin ? fullName.trim() : undefined,
      });

      if (!validationData.success) {
        const firstError = validationData.error.errors[0];
        throw new Error(firstError.message);
      }

      if (isLogin) {
        // Login
        const { error } = await supabase.auth.signInWithPassword({
          email: validationData.data.email,
          password: validationData.data.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        navigate("/admin");
      } else {
        // Sign up with proper redirect URL
        const { data, error } = await supabase.auth.signUp({
          email: validationData.data.email,
          password: validationData.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
            data: {
              full_name: validationData.data.fullName,
            },
          },
        });

        if (error) throw error;

        // Check if we got a session (auto-confirm is enabled)
        if (data.session) {
          toast({
            title: "Welcome!",
            description: "Your account has been created successfully.",
          });
          navigate("/admin");
        } else if (data.user && !data.user.confirmed_at) {
          toast({
            title: "Account created!",
            description: "Please check your email to confirm your account.",
          });
        } else {
          toast({
            title: "Account created!",
            description: "You can now log in with your credentials.",
          });
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      let errorMessage = error.message || "An unexpected error occurred";
      
      // Handle specific error types
      if (error.message?.toLowerCase().includes("user already registered")) {
        errorMessage = "This email is already registered. Please login instead.";
        setIsLogin(true);
      } else if (error.message?.toLowerCase().includes("invalid") && error.message?.toLowerCase().includes("credentials")) {
        errorMessage = "Invalid email or password.";
      } else if (error.name === "TypeError" || errorMessage.includes("fetch")) {
        errorMessage = "Connection error. Please verify your internet connection and try again.";
      }
      
      toast({
        title: "Authentication error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Admin Login" : "Sign Up"} | Portfolio Blog</title>
        <meta name="description" content="Admin authentication for portfolio blog management" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent/10 px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              {isLogin ? "Admin Login" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin
                ? "Enter your credentials to access the admin dashboard"
                : "Sign up to start managing your blog"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  "Loading..."
                ) : isLogin ? (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Login
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" /> Sign Up
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Login"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Auth;