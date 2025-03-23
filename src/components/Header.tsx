
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [fundraisingOpen, setFundraisingOpen] = useState(false);
  const [whoWeAreOpen, setWhoWeAreOpen] = useState(false);
  const fundraisingRef = useRef<HTMLDivElement>(null);
  const whoWeAreRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setFundraisingOpen(false);
    setWhoWeAreOpen(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fundraisingRef.current && !fundraisingRef.current.contains(event.target as Node)) {
        setFundraisingOpen(false);
      }
      if (whoWeAreRef.current && !whoWeAreRef.current.contains(event.target as Node)) {
        setWhoWeAreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Notification Bar - Fixed at the top */}
      <div className="notification-bar">
        Tulip Kids Foundation is a 501(C)(3) Non Profit Organization Tax ID: 84-4858209
      </div>
      
      <header 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
        }`}
        style={{ top: '2rem' }} // Position header below notification bar
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/images/tulip-foundation-logo-normal.png" 
                alt="Tulip Kids Foundation Logo" 
                className="h-8 sm:h-10 md:h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link to="/" className={`nav-item ${isActive('/') ? 'active-nav-item' : ''}`}>
                Home
              </Link>
            
              {/* Fundraising Dropdown */}
              <div className="relative" ref={fundraisingRef}>
                <button 
                  className={`nav-item flex items-center gap-1 ${
                    isActive('/fundraising') || isActive('/summer-camps') || isActive('/tulip-trot') 
                      ? 'active-nav-item' 
                      : ''
                  }`}
                  onClick={() => {
                    setFundraisingOpen(!fundraisingOpen);
                    setWhoWeAreOpen(false);
                  }}
                >
                  Fundraising
                  <ChevronDown size={16} className={`transform transition-transform ${fundraisingOpen ? 'rotate-180' : ''}`} />
                </button>
                {fundraisingOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="py-2">
                      <Link 
                        to="/summer-camps" 
                        className="block px-4 py-2 text-sm hover:bg-tulip-muted hover:text-tulip transition-colors"
                      >
                        Summer Camps
                      </Link>
                      <Link 
                        to="/tulip-trot" 
                        className="block px-4 py-2 text-sm hover:bg-tulip-muted hover:text-tulip transition-colors"
                      >
                        Tulip Trot
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            
              <Link 
                to="/join-team" 
                className={`nav-item ${isActive('/join-team') ? 'active-nav-item' : ''}`}
              >
                Join Our Team
              </Link>
            
              <Link 
                to="/support" 
                className={`nav-item ${isActive('/support') ? 'active-nav-item' : ''}`}
              >
                Support
              </Link>
            
              {/* Who We Are Dropdown */}
              <div className="relative" ref={whoWeAreRef}>
                <button 
                  className={`nav-item flex items-center gap-1 ${
                    isActive('/who-we-are') || isActive('/about') || isActive('/leadership') 
                      ? 'active-nav-item' 
                      : ''
                  }`}
                  onClick={() => {
                    setWhoWeAreOpen(!whoWeAreOpen);
                    setFundraisingOpen(false);
                  }}
                >
                  Who We Are
                  <ChevronDown size={16} className={`transform transition-transform ${whoWeAreOpen ? 'rotate-180' : ''}`} />
                </button>
                {whoWeAreOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20">
                    <div className="py-2">
                      <Link 
                        to="/about" 
                        className="block px-4 py-2 text-sm hover:bg-tulip-muted hover:text-tulip transition-colors"
                      >
                        About
                      </Link>
                      <Link 
                        to="/leadership" 
                        className="block px-4 py-2 text-sm hover:bg-tulip-muted hover:text-tulip transition-colors"
                      >
                        Our Leadership
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden rounded-md p-2 text-gray-600 hover:text-tulip hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}
          style={{ top: '2rem' }} // Start below notification bar
        >
          <div className="relative bg-white h-full w-64 shadow-xl p-6">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-tulip-muted hover:text-tulip transition-colors"
              >
                Home
              </Link>
            
              {/* Mobile Fundraising Dropdown */}
              <div>
                <button
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium hover:bg-tulip-muted hover:text-tulip transition-colors"
                  onClick={() => setFundraisingOpen(!fundraisingOpen)}
                >
                  <span>Fundraising</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${fundraisingOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {fundraisingOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    <Link
                      to="/summer-camps"
                      className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-tulip-muted hover:text-tulip transition-colors"
                    >
                      Summer Camps
                    </Link>
                    <Link
                      to="/tulip-trot"
                      className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-tulip-muted hover:text-tulip transition-colors"
                    >
                      Tulip Trot
                    </Link>
                  </div>
                )}
              </div>
            
              <Link
                to="/join-team"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-tulip-muted hover:text-tulip transition-colors"
              >
                Join Our Team
              </Link>
            
              <Link
                to="/support"
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-tulip-muted hover:text-tulip transition-colors"
              >
                Support
              </Link>
            
              {/* Mobile Who We Are Dropdown */}
              <div>
                <button
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md text-base font-medium hover:bg-tulip-muted hover:text-tulip transition-colors"
                  onClick={() => setWhoWeAreOpen(!whoWeAreOpen)}
                >
                  <span>Who We Are</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${whoWeAreOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {whoWeAreOpen && (
                  <div className="pl-4 mt-1 space-y-1">
                    <Link
                      to="/about"
                      className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-tulip-muted hover:text-tulip transition-colors"
                    >
                      About
                    </Link>
                    <Link
                      to="/leadership"
                      className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-tulip-muted hover:text-tulip transition-colors"
                    >
                      Our Leadership
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
