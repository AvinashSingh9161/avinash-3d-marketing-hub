
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
    { title: "Blog", path: "/blog" },
    { title: "Contact", path: "/contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-90 backdrop-blur-sm py-4 px-6 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-poppins font-bold text-2xl gradient-text">AS</span>
          <span className="hidden sm:inline-block font-poppins font-semibold text-brand-dark">Avinash Singh</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="font-medium text-gray-600 hover:text-brand-purple transition-colors"
            >
              {item.title}
            </Link>
          ))}
          <Button asChild>
            <Link to="/contact" className="bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90">
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg py-4">
          <div className="container mx-auto flex flex-col space-y-4 px-6">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="font-medium text-gray-600 hover:text-brand-purple transition-colors py-2"
                onClick={toggleMenu}
              >
                {item.title}
              </Link>
            ))}
            <Button asChild className="w-full">
              <Link to="/contact" className="bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90">
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
