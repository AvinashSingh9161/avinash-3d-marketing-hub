
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import logoAs from "@/assets/logo-as.png";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm py-4 px-6 shadow-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logoAs} alt="AS Logo" className="w-8 h-8" />
          <span className="hidden sm:inline-block font-poppins font-semibold text-foreground">Avinash Singh</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.title}
            </Link>
          ))}
          <ThemeToggle />
          <Button asChild>
            <Link to="/contact">
              Hire Me
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button onClick={toggleMenu} className="p-2 focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg py-4">
          <div className="container mx-auto flex flex-col space-y-4 px-6">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="font-medium text-muted-foreground hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                {item.title}
              </Link>
            ))}
            <Button asChild className="w-full">
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
