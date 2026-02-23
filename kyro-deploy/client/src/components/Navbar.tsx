import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Bell, User, Menu, X, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "TV Shows", path: "/tv" },
    { name: "Movies", path: "/movies" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-gradient-to-b from-black/80 to-transparent"
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8 md:gap-12">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
                <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
              </div>
              <span className="text-xl md:text-2xl font-display font-bold text-primary tracking-wider">
                VIDKING
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    location === link.path ? "text-white" : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/search" className="text-muted-foreground hover:text-white transition-colors">
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <button className="text-muted-foreground hover:text-white transition-colors hidden sm:block">
              <Bell className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-purple-600 cursor-pointer hover:ring-2 ring-white/50 transition-all" />
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-background md:hidden flex flex-col"
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-3xl font-display font-bold ${
                    location === link.path ? "text-white" : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
