
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Fundraising = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Header />
      
      {/* Page Header */}
      <div className="bg-tulip-muted pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Fundraising Initiatives</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Through our fundraising initiatives, we're able to create meaningful programs that support children in our community.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              At Tulip Kids Foundation, we host various fundraising events throughout the year to support our mission of nurturing growth and inspiring hope in children. 
              These initiatives not only help us raise funds but also bring our community together for a common cause.
            </p>
            
            <div className="grid md:grid-cols-2 gap-10 mb-16">
              <div className="glass-card rounded-2xl overflow-hidden hover:shadow-glow transition-shadow duration-300 group">
                <div className="h-60 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-tulip-light/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-2xl font-bold text-primary">Summer Camps</h3>
                      <p className="text-gray-700 mt-2">Educational and fun summer programs</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    Our summer camps provide children with enriching experiences while raising funds for our foundation's programs.
                  </p>
                  <Link
                    to="/summer-camps"
                    className="inline-flex items-center text-tulip hover:text-tulip-dark transition-colors"
                  >
                    Learn more <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              <div className="glass-card rounded-2xl overflow-hidden hover:shadow-glow transition-shadow duration-300 group">
                <div className="h-60 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-tulip-light/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <h3 className="text-2xl font-bold text-primary">Tulip Trot</h3>
                      <p className="text-gray-700 mt-2">Annual community run/walk</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">
                    The Tulip Trot is our signature fundraising event that brings the community together for a day of fun and fitness.
                  </p>
                  <Link
                    to="/tulip-trot"
                    className="inline-flex items-center text-tulip hover:text-tulip-dark transition-colors"
                  >
                    Learn more <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-tulip-muted p-8 rounded-2xl text-center mb-16">
              <h2 className="text-2xl font-bold text-primary mb-4">Corporate Sponsorships</h2>
              <p className="text-gray-600 mb-6">
                We partner with local businesses and corporations who share our vision for creating positive change in children's lives. 
                Our sponsors provide vital support that enables us to expand our programs and reach more children.
              </p>
              <Link
                to="/support"
                className="inline-flex items-center justify-center bg-tulip hover:bg-tulip-dark text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 shadow-sm"
              >
                Become a Sponsor
              </Link>
            </div>
            
            <div className="text-center mb-16">
              <h2 className="text-2xl font-bold text-primary mb-4">Other Ways to Support</h2>
              <p className="text-gray-600 mb-6">
                Beyond our major fundraising initiatives, there are many other ways you can support the Tulip Kids Foundation:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 border border-gray-100 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-primary mb-2">Monthly Giving</h3>
                  <p className="text-gray-600 text-sm">
                    Become a sustaining supporter through our monthly giving program.
                  </p>
                </div>
                
                <div className="p-6 border border-gray-100 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-primary mb-2">In-Kind Donations</h3>
                  <p className="text-gray-600 text-sm">
                    Donate supplies, equipment, or services that support our programs.
                  </p>
                </div>
                
                <div className="p-6 border border-gray-100 rounded-xl shadow-sm">
                  <h3 className="text-lg font-semibold text-primary mb-2">Volunteer</h3>
                  <p className="text-gray-600 text-sm">
                    Share your time and skills to help with our fundraising events.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Link
                to="/support"
                className="inline-flex items-center justify-center bg-tulip hover:bg-tulip-dark text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-sm"
              >
                Support Our Cause
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default Fundraising;
