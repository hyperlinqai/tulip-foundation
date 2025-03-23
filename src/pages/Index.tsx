
import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import MissionSection from "@/components/MissionSection";
import ImpactSection from "@/components/ImpactSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Header />
      <Hero />
      <MissionSection />
      <ImpactSection />
      
      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-tulip uppercase tracking-wider text-sm font-medium mb-2 block">Our Programs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Programs That Make a Difference</h2>
            <p className="text-gray-600 text-lg">
              Explore our signature programs designed to support children in our community.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="glass-card rounded-2xl overflow-hidden hover:shadow-glow transition-shadow duration-300 group">
              <div className="h-60 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-tulip-light/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-2xl font-bold text-primary">Summer Camps</h3>
                    <p className="text-gray-700 mt-2">
                      Fun, educational summer programs for kids of all ages
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Our summer camps provide a safe, engaging environment where children can learn new skills, make friends, and create lasting memories.
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
                    <p className="text-gray-700 mt-2">
                      Annual fun run supporting children's programs
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Join our annual Tulip Trot, a community run/walk event that raises funds for our educational and enrichment programs for local children.
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
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-tulip to-tulip-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us in our mission to support and empower children in our community. 
            Every contribution makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/support"
              className="bg-white text-tulip-dark hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-sm"
            >
              Donate Now
            </Link>
            <Link
              to="/join-team"
              className="bg-transparent hover:bg-white/10 border border-white text-white font-medium py-3 px-8 rounded-md transition-colors duration-300"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
