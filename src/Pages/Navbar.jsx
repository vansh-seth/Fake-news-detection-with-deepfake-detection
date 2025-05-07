import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  BarChart2, 
  FileText, 
  User, 
  Menu, 
  X, 
  ChevronDown 
} from "lucide-react";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setNav(false);
  }, [location.pathname]);

  const handleNav = () => {
    setNav(!nav);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navItems = [
    { title: "Home", path: "/", icon: <Home size={20} /> },
    { title: "Educational Hub", path: "/EducationalHub", icon: <BookOpen size={20} /> },
    { title: "Dashboard", path: "/Dashboard", icon: <BarChart2 size={20} /> },
    { title: "API Documentation", path: "/APIDocumentation", icon: <FileText size={20} /> },
    { title: "Account", path: "/UserAccountSystem", icon: <User size={20} /> }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-[#000300]/90 shadow-lg py-3" : "bg-[#000300] py-5"
    }`}>    
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl md:text-3xl font-bold text-[#00df9a] hover:text-[#00c589] transition-colors">
                Fake News Detection
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-[#00df9a]/10 text-[#00df9a]"
                      : "text-white hover:bg-gray-800 hover:text-[#00df9a]"
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={handleNav}
              className="text-white hover:text-[#00df9a] focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {nav ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div 
        className={`md:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          nav ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setNav(false)}
      >
        <div 
          className={`fixed right-0 top-0 w-64 h-full bg-[#0f1419] transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            nav ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="text-2xl font-bold text-[#00df9a]" onClick={() => setNav(false)}>
                FND
              </Link>
              <button 
                onClick={handleNav}
                className="text-white hover:text-[#00df9a] focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`block px-4 py-3 rounded-md flex items-center space-x-3 transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-[#00df9a]/10 text-[#00df9a]"
                      : "text-white hover:bg-gray-800 hover:text-[#00df9a]"
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
              
              <div className="border-t border-gray-700 my-4"></div>
              
              <div className="relative mt-3">
                <button
                  className="w-full px-4 py-3 rounded-md flex items-center justify-between text-white hover:bg-gray-800"
                  onClick={toggleDropdown}
                >
                  <div className="flex items-center space-x-3">
                    <FileText size={20} />
                    <span>Resources</span>
                  </div>
                  <ChevronDown size={18} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                
                {dropdownOpen && (
                  <div className="pl-4 mt-1 space-y-1 border-l border-gray-700 ml-4">
                    <Link
                      to="/help"
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-[#00df9a] hover:bg-gray-800 rounded"
                    >
                      Help Center
                    </Link>
                    <Link
                      to="/blog"
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-[#00df9a] hover:bg-gray-800 rounded"
                    >
                      Blog
                    </Link>
                    <Link
                      to="/contact"
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-[#00df9a] hover:bg-gray-800 rounded"
                    >
                      Contact
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;