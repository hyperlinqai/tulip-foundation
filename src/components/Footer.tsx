
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About Column with Logo */}
          <div>
            <div className="mb-4">
              <img
                src="/images/tulip-foundation-logo-white.png"
                alt="Tulip Kids Foundation Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Dedicated to nurturing growth and inspiring hope in children through our community programs and initiatives.
            </p>
            {/* <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div> */}
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/summer-camps" className="text-gray-300 hover:text-white transition-colors">Summer Camps</Link>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <Link to="/tulip-trot" className="text-gray-300 hover:text-white transition-colors">Tulip Trot</Link>
                </li>
                <li>
                  <Link to="/join-team" className="text-gray-300 hover:text-white transition-colors">Join Our Team</Link>
                </li>
                <li>
                  <Link to="/support" className="text-gray-300 hover:text-white transition-colors">Support Us</Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-300">123 Tulip Lane, Bloomington, IN 47401</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">+1 (408) 930 – 1862</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">info@tulipkidsfoundation.org</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 pt-8 mt-8 text-center md:flex md:justify-between md:text-left">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tulip Kids Foundation. All rights reserved.
          </p>
          <div className="flex justify-center md:justify-end space-x-6">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/admin" className="text-sm text-gray-400 hover:text-white transition-colors">
              Admin
            </Link>
            {/* <Link to="/sitemap" className="text-sm text-gray-400 hover:text-white transition-colors">
              Sitemap
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
