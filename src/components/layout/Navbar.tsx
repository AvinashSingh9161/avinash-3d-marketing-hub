
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
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 py-4 px-6 shadow-glass">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center shadow-elegant glow-effect group-hover:scale-110 transition-transform duration-300">
            <span className="font-poppins font-bold text-xl text-white">AS</span>
          </div>
          <span className="hidden sm:inline-block font-poppins font-bold text-xl gradient-text">Avinash Singh</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="font-medium text-foreground/80 hover:text-brand-primary transition-all duration-300 relative group py-2"
            >
              {item.title}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-primary to-brand-secondary group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
          <Button asChild className="glow-effect">
            <Link to="/contact" className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 shadow-elegant font-semibold">
              Hire Me
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="p-2 focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-white/90 border-t border-white/20 shadow-glass py-6">
          <div className="container mx-auto flex flex-col space-y-6 px-6">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="font-medium text-foreground/80 hover:text-brand-primary transition-all duration-300 py-3 text-lg"
                onClick={toggleMenu}
              >
                {item.title}
              </Link>
            ))}
            <Button asChild className="w-full glow-effect">
              <Link to="/contact" className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 shadow-elegant font-semibold">
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
