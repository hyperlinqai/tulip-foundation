
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Target, Award, Clock } from "lucide-react";

const About = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">About Us</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about our mission, values, and the work we do to support children in our community.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Our Story */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Our Story</h2>
              <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-8">
                <p className="text-lg text-gray-600 mb-6">
                  Tulip Kids Foundation was born out of a simple observation: children flourish when they have access to the right resources, support, and opportunities. In 2008, our founder, Maria Johnson, a retired elementary school teacher, noticed that many children in our community lacked access to enriching summer activities.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  With the help of dedicated volunteers and community partners, Maria launched a small summer program for 20 children in a local community center. The program focused on reading, art, and outdoor activities – providing a safe, engaging environment for children during the summer months.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  The impact was immediate and significant. Parents reported improvements in their children's reading skills, confidence, and social abilities. Word spread, and the following summer, enrollment doubled. Soon, community members began asking for year-round programming.
                </p>
                <p className="text-lg text-gray-600">
                  As the organization grew, we expanded our offerings to include after-school programs, family support services, and community events. In 2010, we officially became the Tulip Kids Foundation, named after Maria's favorite flower and a symbol of growth, beauty, and renewal – qualities we hope to nurture in every child we serve.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Our Journey</h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-tulip-light md:left-1/2"></div>

                {/* Timeline items */}
                <div className="space-y-12">
                  <div className="relative md:flex">
                    <div className="md:w-1/2 md:pr-8 md:text-right mb-6 md:mb-0">
                      <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 md:ml-auto">
                        <h3 className="text-xl font-bold text-primary mb-2">2008</h3>
                        <p className="text-gray-600">
                          Founded as a small summer program serving 20 children in our local community center.
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-5 w-7 h-7 rounded-full bg-tulip transform -translate-x-1/2 flex items-center justify-center md:left-1/2">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div className="md:w-1/2 md:pl-8 md:hidden"></div>
                  </div>

                  <div className="relative md:flex">
                    <div className="md:w-1/2 md:pr-8 md:text-right hidden md:block"></div>
                    <div className="absolute left-5 w-7 h-7 rounded-full bg-tulip transform -translate-x-1/2 flex items-center justify-center md:left-1/2">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                      <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                        <h3 className="text-xl font-bold text-primary mb-2">2010</h3>
                        <p className="text-gray-600">
                          Officially established as Tulip Kids Foundation with expanded year-round programming.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative md:flex">
                    <div className="md:w-1/2 md:pr-8 md:text-right mb-6 md:mb-0">
                      <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 md:ml-auto">
                        <h3 className="text-xl font-bold text-primary mb-2">2013</h3>
                        <p className="text-gray-600">
                          Launched first Tulip Trot fundraising event and opened dedicated program center.
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-5 w-7 h-7 rounded-full bg-tulip transform -translate-x-1/2 flex items-center justify-center md:left-1/2">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div className="md:w-1/2 md:pl-8 md:hidden"></div>
                  </div>

                  <div className="relative md:flex">
                    <div className="md:w-1/2 md:pr-8 md:text-right hidden md:block"></div>
                    <div className="absolute left-5 w-7 h-7 rounded-full bg-tulip transform -translate-x-1/2 flex items-center justify-center md:left-1/2">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                      <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                        <h3 className="text-xl font-bold text-primary mb-2">2016</h3>
                        <p className="text-gray-600">
                          Expanded to serve five local school districts and introduced family support programming.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative md:flex">
                    <div className="md:w-1/2 md:pr-8 md:text-right mb-6 md:mb-0">
                      <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100 md:ml-auto">
                        <h3 className="text-xl font-bold text-primary mb-2">2020</h3>
                        <p className="text-gray-600">
                          Adapted to virtual programming during the pandemic and received community service award.
                        </p>
                      </div>
                    </div>
                    <div className="absolute left-5 w-7 h-7 rounded-full bg-tulip transform -translate-x-1/2 flex items-center justify-center md:left-1/2">
                      <span className="text-white font-bold">5</span>
                    </div>
                    <div className="md:w-1/2 md:pl-8 md:hidden"></div>
                  </div>

                  <div className="relative md:flex">
                    <div className="md:w-1/2 md:pr-8 md:text-right hidden md:block"></div>
                    <div className="absolute left-5 w-7 h-7 rounded-full bg-tulip transform -translate-x-1/2 flex items-center justify-center md:left-1/2">
                      <span className="text-white font-bold">6</span>
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                      <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                        <h3 className="text-xl font-bold text-primary mb-2">Today</h3>
                        <p className="text-gray-600">
                          Serving over 1,000 children annually through 25 different programs and initiatives.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission and Vision */}
            <div className="mb-16">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="glass-card rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Target className="text-tulip mr-3" size={30} />
                    <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
                  </div>
                  <p className="text-gray-600">
                    Tulip Kids Foundation is driven by two primary goals:
                  </p>
                  <p className="text-gray-600 mt-4">
                    <strong>Providing Educational & Enrichment Programs:</strong> We are dedicated to offering high-quality educational programs that cater to children of all ages. Our initiatives are designed to engage young minds, encouraging continual learning and growth in a positive, nurturing setting.
                  </p>
                  <p className="text-gray-600 mt-4">
                    <strong>Supporting Underprivileged Children:</strong> We are committed to giving back to the community by providing scholarships, resources, and opportunities to children in need. Our mission is to promote educational equity, ensuring every child has the tools and support they need to succeed.
                  </p>
                </div>

                <div className="glass-card rounded-2xl p-8">
                  <div className="flex items-center mb-4">
                    <Award className="text-tulip mr-3" size={30} />
                    <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
                  </div>
                  <p className="text-gray-600">
                    Our vision is to create a world where every child has access to quality educational and enrichment opportunities that help them thrive. We aim to inspire curiosity, nurture talents, and foster the development of essential life skills, ensuring each child grows in a fun, supportive, and inclusive environment.
                  </p>
                </div>
              </div>
            </div>

            {/* Who We Are Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Who We Are</h2>
              <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-8">
                <p className="text-lg text-gray-600">
                  Tulip Kids Foundation is a non-profit organization devoted to supporting the educational growth and well-being of children. We focus on providing enriching programs that encourage creativity, critical thinking, and holistic development. Our commitment extends to making a meaningful difference in the lives of underprivileged children, providing resources and opportunities that promote educational equity and inspire every child to reach their full potential.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Our Core Values</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="mr-4 flex-shrink-0">
                    <CheckCircle className="text-tulip" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Child-Centered Approach</h3>
                    <p className="text-gray-600">
                      We put children's needs, interests, and well-being at the center of everything we do, recognizing each child as a unique individual.
                    </p>
                  </div>
                </div>

                <div className="flex bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="mr-4 flex-shrink-0">
                    <CheckCircle className="text-tulip" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Inclusion & Diversity</h3>
                    <p className="text-gray-600">
                      We embrace and celebrate differences, ensuring our programs are accessible and welcoming to children of all backgrounds and abilities.
                    </p>
                  </div>
                </div>

                <div className="flex bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="mr-4 flex-shrink-0">
                    <CheckCircle className="text-tulip" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Community Partnership</h3>
                    <p className="text-gray-600">
                      We believe in the power of collaboration, working closely with families, schools, and community organizations to create comprehensive support systems.
                    </p>
                  </div>
                </div>

                <div className="flex bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="mr-4 flex-shrink-0">
                    <CheckCircle className="text-tulip" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">Excellence & Innovation</h3>
                    <p className="text-gray-600">
                      We strive for the highest quality in our programs, continuously learning, improving, and adapting to meet evolving needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Approach */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Our Approach</h2>
              <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                We believe in a holistic approach to supporting children, addressing their educational, social, emotional, and physical needs.
              </p>

              <div className="bg-tulip-muted p-8 rounded-2xl">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Education & Enrichment</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-tulip-light flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-tulip-dark font-semibold text-sm">✓</span>
                        </div>
                        <span>Academic support programs that reinforce and supplement school learning</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-tulip-light flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-tulip-dark font-semibold text-sm">✓</span>
                        </div>
                        <span>STEAM (Science, Technology, Engineering, Arts, Math) activities that foster creativity and critical thinking</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-tulip-light flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-tulip-dark font-semibold text-sm">✓</span>
                        </div>
                        <span>Literacy initiatives that develop reading and communication skills</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Social & Emotional Development</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-tulip-light flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-tulip-dark font-semibold text-sm">✓</span>
                        </div>
                        <span>Group activities that build teamwork, communication, and social skills</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-tulip-light flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-tulip-dark font-semibold text-sm">✓</span>
                        </div>
                        <span>Programs that foster self-confidence, resilience, and emotional regulation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-tulip-light flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                          <span className="text-tulip-dark font-semibold text-sm">✓</span>
                        </div>
                        <span>Mentorship opportunities that provide positive role models and guidance</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Contact Us</h2>
              <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Get in Touch</h3>
                    <p className="text-gray-600 mb-6">
                      We'd love to hear from you! Whether you have questions about our programs, want to volunteer, or are interested in supporting our mission, please reach out.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-3 text-tulip">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary">Address</h4>
                          <p className="text-gray-600">123 Tulip Lane, Bloomington, IN 47401</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 text-tulip">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary">Phone</h4>
                          <p className="text-gray-600">+1 (408) 930 – 1862</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 text-tulip">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary">Email</h4>
                          <p className="text-gray-600">info@tulipkidsfoundation.org</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="mr-3 text-tulip">
                          <Clock size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-primary">Office Hours</h4>
                          <p className="text-gray-600">Monday-Friday: 9am-5pm</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-primary mb-4">Send Us a Message</h3>
                    <form className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tulip focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tulip focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <input
                          type="text"
                          id="subject"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tulip focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-tulip focus:border-transparent"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="bg-tulip hover:bg-tulip-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 shadow-sm"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default About;
