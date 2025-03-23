
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Clock, Trophy, Heart, Mail, Phone } from "lucide-react";
import RegistrationForm from "@/components/RegistrationForm";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with a placeholder key if the env variable is not available
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
  'pk_test_placeholder'
);

const TulipTrot = () => {
  const registrationRef = useRef<HTMLDivElement>(null);
  const [formStep, setFormStep] = useState(1);
  const [paymentAmount, setPaymentAmount] = useState(2000); // Default to $20.00 (in cents)
  
  const scrollToRegistration = () => {
    registrationRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Header />
      
      {/* Hero Section */}
      <div className="bg-tulip-muted pt-40 pb-16">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block bg-tulip-light/30 text-tulip-dark px-4 py-1 rounded-full text-sm font-medium mb-4">
            Annual Fundraising Event
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Tulip Trot – A Family Fun Walk</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join us for an exciting 5K Family Fun Walk that brings together families, friends, and the community for a day of fun, fitness, and togetherness!
          </p>
          <button 
            className="mt-6 bg-tulip hover:bg-tulip-dark text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-sm"
            onClick={scrollToRegistration}
          >
            Register Now
          </button>
        </div>
      </div>
      
      {/* Event Features */}
      <div className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-tulip-light rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🏆</span>
              </div>
              <p className="font-medium text-primary">Fun Prizes</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-tulip-light rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">👕</span>
              </div>
              <p className="font-medium text-primary">T-Shirt Included</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-tulip-light rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🍎</span>
              </div>
              <p className="font-medium text-primary">Healthy Snacks</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-tulip-light rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">🤝</span>
              </div>
              <p className="font-medium text-primary">Community Event</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Overview */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Event Details</h2>
              
              {/* Event Details Card */}
              <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-8 mt-10">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center mb-6">
                      <Calendar size={24} className="text-tulip mr-3" />
                      <div>
                        <h3 className="font-semibold text-primary">Date</h3>
                        <p>Sunday, May 4, 2025</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-6">
                      <Clock size={24} className="text-tulip mr-3" />
                      <div>
                        <h3 className="font-semibold text-primary">Time</h3>
                        <p>9:30 AM (Registration: 8:30 AM)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-6">
                      <MapPin size={24} className="text-tulip mr-3" />
                      <div>
                        <h3 className="font-semibold text-primary">Location</h3>
                        <p>Santa Clara High School</p>
                        <p className="text-sm text-gray-500">3000 Benton St, Santa Clara, CA 95051</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* What's Included */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">What's Included</h2>
              
              <div className="glass-card p-8 rounded-2xl">
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-tulip-light flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-tulip-dark font-semibold text-sm">✓</span>
                    </div>
                    <span>Free T shirts for all registered participants 5 yrs & above </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-tulip-light flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-tulip-dark font-semibold text-sm">✓</span>
                    </div>
                    <span>Snacks & Refreshments to keep you energized</span>
                  </li>
                  
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-tulip-light flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-tulip-dark font-semibold text-sm">✓</span>
                    </div>
                    <span>Kids under 4 - No registration required - (Free)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Registration */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Registration Details</h2>
              
              <div className="bg-white rounded-xl shadow-soft border border-tulip p-8 mb-8">
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-primary mb-2">Registration Timing</h3>
                    <p className="text-lg font-bold text-tulip">8:30 AM - 9:30 AM</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-primary mb-2">Walk Begins</h3>
                    <p className="text-lg font-bold text-tulip">9:30 AM</p>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-primary mb-2">Registration Fee</h3>
                    <p className="text-lg font-bold text-tulip">$20 per participant</p>
                  </div>
                </div>
                <div className="text-center">
                  <button 
                    className="bg-tulip hover:bg-tulip-dark text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-sm"
                    onClick={scrollToRegistration}
                  >
                    Register Now
                  </button>
                </div>
              </div>

              {/* Registration Form Section */}
      <div ref={registrationRef} id="registration-section" className="py-16 bg-tulip-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Register for Tulip Trot</h2>
          <div className="max-w-4xl mx-auto">
            <Elements 
              stripe={stripePromise}
              options={{
                appearance: {
                  theme: 'stripe',
                },
              }}
            >
              <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
                <RegistrationForm formStep={formStep} setFormStep={setFormStep} setPaymentAmount={setPaymentAmount} />
              </div>
            </Elements>
          </div>
        </div>
      </div>
              
              <h3 className="text-xl font-bold text-primary mb-4">Important Registration Notes</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
                  <h4 className="font-bold text-primary mb-2">T-Shirt Availability</h4>
                  <p className="text-gray-600">
                    Registrations after 15th April are not guaranteed a T-shirt.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
                  <h4 className="font-bold text-primary mb-2">Payment Required</h4>
                  <p className="text-gray-600">
                    Payment is mandatory to complete your registration. Don't miss out—secure your spot today!
                  </p>
                </div>
                
                <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
                  <h4 className="font-bold text-primary mb-2">Supporting a Cause</h4>
                  <p className="text-gray-600">
                    All proceeds from this event will support the Adopt-a-School Project.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Contact Information</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
                  <div className="flex items-center mb-4">
                    <Phone size={20} className="text-tulip mr-3" />
                    <h4 className="font-bold text-primary">Sneha Vedula</h4>
                  </div>
                  <p className="text-gray-600 pl-8">408-930-1862</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
                  <div className="flex items-center mb-4">
                    <Phone size={20} className="text-tulip mr-3" />
                    <h4 className="font-bold text-primary">Deepti</h4>
                  </div>
                  <p className="text-gray-600 pl-8">408-687-5823</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-6">
                  <div className="flex items-center mb-4">
                    <Mail size={20} className="text-tulip mr-3" />
                    <h4 className="font-bold text-primary">Email</h4>
                  </div>
                  <p className="text-gray-600 pl-8">sneha@tulipkidsinc.com</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gray-100 rounded-lg text-center text-gray-600">
                <p>Note: This event is not a SCUSD event.</p>
              </div>
            </div>
            
            {/* CTA */}
            <div className="bg-gradient-to-r from-tulip to-tulip-dark p-10 rounded-2xl text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Join us for the Tulip Trot!</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Join us for an unforgettable day filled with joy, movement, and community bonding! 
              </p>
              <button 
                className="bg-white text-tulip-dark hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-sm"
                onClick={scrollToRegistration}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      
      
      <Footer />
    </motion.div>
  );
};

export default TulipTrot;
