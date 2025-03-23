
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-tulip-muted overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-tulip-light/30 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-tulip-light/20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 rounded-full bg-tulip-light/10 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center max-w-5xl pt-8">
        <span className="inline-block bg-tulip-light/30 text-tulip-dark px-4 py-1 rounded-full text-sm font-medium mb-4 hero-text">
          Making a difference in children's lives
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight hero-text">
          Nurturing Growth, Inspiring Hope
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto hero-text">
          At Tulip Kids Foundation, we believe every child deserves a chance to bloom. 
          Through our programs and community support, we create opportunities for children to thrive.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 hero-button">
          <Link 
            to="/support" 
            className="inline-flex items-center justify-center gap-2 bg-tulip hover:bg-tulip-dark text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 shadow-sm"
          >
            Support Our Cause
            <ArrowRight size={18} />
          </Link>
          <Link 
            to="/about" 
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-primary font-medium py-3 px-6 rounded-md border border-gray-200 transition-colors duration-300 shadow-sm"
          >
            Learn About Us
          </Link>
        </div>
      </div>

      {/* Subtle wave shape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-white" style={{ 
        clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 80%)' 
      }}></div>
    </div>
  );
};

export default Hero;
