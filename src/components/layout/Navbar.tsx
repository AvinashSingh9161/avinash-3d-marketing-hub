
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Services", path: "/services" },
    { title: "Portfolio", path: "/portfolio" },
    { title: "Contact", path: "/contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <span className="font-orbitron font-bold text-3xl gradient-text">AS</span>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="hidden sm:inline-block font-space font-semibold text-foreground">Avinash Singh</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="font-medium text-muted-foreground hover:text-purple-400 transition-all duration-300 relative group font-space"
            >
              {item.title}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
          <Button asChild className="neon-button font-semibold px-6 py-2 rounded-xl">
            <Link to="/contact">
              Hire Me
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="glass-card p-2 rounded-lg border border-white/20 text-purple-400 hover:text-purple-300 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-card border-t border-white/20 py-4 animate-slide-up">
          <div className="container mx-auto flex flex-col space-y-4 px-6">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="font-medium text-muted-foreground hover:text-purple-400 transition-colors py-2 font-space"
                onClick={toggleMenu}
              >
                {item.title}
              </Link>
            ))}
            <Button asChild className="w-full neon-button">
              <Link to="/contact">
                Hire Me
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
