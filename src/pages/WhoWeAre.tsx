
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const WhoWeAre = () => {
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
      <div className="bg-tulip-muted pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Who We Are</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about our mission, history, and the people behind the Tulip Kids Foundation.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Our Story</h2>
              <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-8">
                <p className="text-lg text-gray-600 mb-6">
                  Tulip Kids Foundation was founded in 2008 by a group of parents, educators, and community leaders who recognized the need for comprehensive support programs for children in our community. What began as a small summer program serving 20 children has grown into a multifaceted organization that reaches thousands each year.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Our name, Tulip Kids, reflects our belief that like tulips, children need the right environment, care, and support to bloom to their full potential. We are committed to creating those nurturing conditions for every child we serve.
                </p>
                <p className="text-lg text-gray-600">
                  Today, Tulip Kids Foundation offers a range of programs focused on education, recreation, arts, and family support. We collaborate with schools, businesses, and other nonprofit organizations to create a community-wide approach to supporting children's development and wellbeing.
                </p>
              </div>
            </div>
            
            {/* Mission and Vision */}
            <div className="mb-16 grid md:grid-cols-2 gap-10">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-gray-600 mb-6">
                  To nurture the growth and development of children by providing educational, recreational, and support programs that inspire hope and create opportunities for them to thrive.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center text-tulip hover:text-tulip-dark transition-colors"
                >
                  Learn more about our approach <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
              
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-gray-600 mb-6">
                  A community where every child has the support, resources, and opportunities they need to reach their full potential and lead fulfilling lives.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center text-tulip hover:text-tulip-dark transition-colors"
                >
                  Learn about our core values <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            
            {/* Navigation Cards */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Explore Who We Are</h2>
              
              <div className="grid md:grid-cols-2 gap-10">
                <div className="glass-card rounded-2xl overflow-hidden hover:shadow-glow transition-shadow duration-300 group">
                  <div className="h-60 bg-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-tulip-light/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <h3 className="text-2xl font-bold text-primary">About Our Foundation</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Learn about our history, programs, approach, and the impact we're making in the community.
                    </p>
                    <Link
                      to="/about"
                      className="inline-flex items-center text-tulip hover:text-tulip-dark transition-colors"
                    >
                      About Us <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
                
                <div className="glass-card rounded-2xl overflow-hidden hover:shadow-glow transition-shadow duration-300 group">
                  <div className="h-60 bg-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 bg-tulip-light/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <h3 className="text-2xl font-bold text-primary">Our Leadership</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      Meet the dedicated team of staff and board members guiding our organization.
                    </p>
                    <Link
                      to="/leadership"
                      className="inline-flex items-center text-tulip hover:text-tulip-dark transition-colors"
                    >
                      Meet Our Team <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Impact Stats */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Our Impact</h2>
              
              <div className="bg-tulip-muted rounded-2xl p-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div>
                    <div className="text-4xl font-bold text-tulip mb-2">15</div>
                    <p className="text-gray-600">Years of Service</p>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-bold text-tulip mb-2">5,000+</div>
                    <p className="text-gray-600">Children Served</p>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-bold text-tulip mb-2">25</div>
                    <p className="text-gray-600">Programs</p>
                  </div>
                  
                  <div>
                    <div className="text-4xl font-bold text-tulip mb-2">100+</div>
                    <p className="text-gray-600">Community Partners</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Annual Reports */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Transparency & Accountability</h2>
              <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                We are committed to transparency and responsible stewardship of the resources entrusted to us.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 text-center">
                  <h3 className="text-xl font-bold text-primary mb-3">Annual Report</h3>
                  <p className="text-gray-600 mb-4">
                    Review our annual reports for detailed information about our programs, finances, and impact.
                  </p>
                  <button className="bg-tulip hover:bg-tulip-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 shadow-sm">
                    Download Report
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 text-center">
                  <h3 className="text-xl font-bold text-primary mb-3">Financial Statements</h3>
                  <p className="text-gray-600 mb-4">
                    Access our audited financial statements and Form 990 tax returns.
                  </p>
                  <button className="bg-tulip hover:bg-tulip-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 shadow-sm">
                    View Financials
                  </button>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 text-center">
                  <h3 className="text-xl font-bold text-primary mb-3">Accreditations</h3>
                  <p className="text-gray-600 mb-4">
                    Learn about our nonprofit accreditations and affiliations.
                  </p>
                  <button className="bg-tulip hover:bg-tulip-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 shadow-sm">
                    View Accreditations
                  </button>
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <div className="bg-gradient-to-r from-tulip to-tulip-dark p-10 rounded-2xl text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Whether you volunteer, donate, or spread the word, your support helps us create brighter futures for children.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/support"
                  className="bg-white text-tulip-dark hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-sm"
                >
                  Support Our Cause
                </Link>
                <Link
                  to="/join-team"
                  className="bg-transparent hover:bg-white/10 border border-white text-white font-medium py-3 px-8 rounded-md transition-colors duration-300"
                >
                  Join Our Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </motion.div>
  );
};

export default WhoWeAre;
