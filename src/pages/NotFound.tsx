
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Avinash Singh</title>
        <meta name="description" content="Sorry, the page you're looking for doesn't exist. Explore Avinash Singh's digital marketing services and portfolio." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-animation">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-white mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
            <p className="text-white/80 mb-8">
              Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-white/90 w-full">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            
            <div className="flex gap-4">
              <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 flex-1">
                <Link to="/about">
                  About Me
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 flex-1">
                <Link to="/services">
                  Services
                </Link>
              </Button>
            </div>
            
            <Button asChild variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 w-full">
              <Link to="/contact">
                Get In Touch
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/60 text-sm">
              If you believe this is an error, please{" "}
              <Link to="/contact" className="text-white underline hover:text-white/80">
                contact me
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
