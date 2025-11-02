
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { title: "Portfolio", path: "/" },
    { title: "Blog", path: "/blog" },
    { title: "Projects", path: "/projects" }
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-lg shadow-lg border-b border-border/50" 
          : "bg-background/60 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-lg blur-sm opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative bg-gradient-to-br from-primary to-primary/80 p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Avinash Singh
              </span>
              <span className="text-xs text-muted-foreground -mt-1">Digital Marketing Expert</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className={`relative px-4 py-2 font-medium text-sm transition-all duration-200 rounded-lg group ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{item.title}</span>
                {isActive(item.path) && (
                  <span className="absolute inset-0 bg-primary/10 rounded-lg" />
                )}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-8" />
              </Link>
            ))}
            <Button 
              asChild 
              className="ml-4 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <Link to="/contact">
                Hire Me
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative w-10 h-10 rounded-lg bg-muted hover:bg-muted/80 transition-colors flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5">
              <span
                className={`absolute top-1/2 left-0 w-full h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 w-full h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 w-full h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-6 py-6 bg-background/95 backdrop-blur-lg border-t border-border/50">
          <div className="flex flex-col gap-2">
            {menuItems.map((item, index) => (
              <Link
                key={item.title}
                to={item.path}
                onClick={toggleMenu}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
                style={{
                  animation: isMenuOpen ? `fade-in 0.3s ease-out ${index * 0.05}s both` : "none"
                }}
              >
                {item.title}
              </Link>
            ))}
            <Button 
              asChild 
              className="mt-4 w-full bg-gradient-to-r from-primary to-primary/80"
              style={{
                animation: isMenuOpen ? `fade-in 0.3s ease-out ${menuItems.length * 0.05}s both` : "none"
              }}
            >
              <Link to="/contact" onClick={toggleMenu}>
                Hire Me
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
