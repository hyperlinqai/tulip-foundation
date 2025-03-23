
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Users, Clock, Calendar, Award } from "lucide-react";
import { useState } from "react";

const JoinTeam = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    reason: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      console.log('Submitting form data:', formData);

      // Try the proxied endpoint first
      let response;
      try {
        response = await fetch('/api/send-volunteer-application', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } catch (fetchError) {
        console.log('Proxy fetch failed, trying direct URL:', fetchError);
        // Fallback to direct URL if proxy fails
        response = await fetch('http://localhost:3001/send-volunteer-application', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }

      // Check if the response is empty
      const text = await response.text();
      console.log('Raw response:', text);

      let data;
      try {
        // Only try to parse as JSON if there's content
        data = text ? JSON.parse(text) : {};
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSubmitSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        reason: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(error.message || "Failed to submit your application. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
      <div className="bg-tulip-muted pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Join Our Team</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Become part of a passionate community dedicated to making a difference in children's lives.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Why Join Us */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Why Join the Tulip Kids Foundation Team?</h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 bg-tulip-muted rounded-lg flex items-center justify-center mb-4">
                    <Heart className="text-tulip" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Make an Impact</h3>
                  <p className="text-gray-600">
                    Your work directly contributes to improving the lives of children in our community, creating lasting positive change.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 bg-tulip-muted rounded-lg flex items-center justify-center mb-4">
                    <Users className="text-tulip" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Join a Community</h3>
                  <p className="text-gray-600">
                    Become part of a passionate team of individuals who share your values and commitment to helping others.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 bg-tulip-muted rounded-lg flex items-center justify-center mb-4">
                    <Award className="text-tulip" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Grow Professionally</h3>
                  <p className="text-gray-600">
                    Develop new skills, gain valuable experience, and build meaningful relationships in a supportive environment.
                  </p>
                </div>
              </div>
            </div>

            {/* Employment Opportunities
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Employment Opportunities</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-3">Program Coordinator</h3>
                    <div className="flex items-center mb-4 text-gray-600">
                      <Clock size={18} className="mr-2" />
                      <span>Full-time</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Oversee the planning, implementation, and evaluation of our youth development programs. The ideal candidate has experience in program management and a passion for working with children.
                    </p>
                    <button className="w-full bg-tulip hover:bg-tulip-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 shadow-sm">
                      View Job Description
                    </button>
                  </div>
                </div>
                
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-3">Development Associate</h3>
                    <div className="flex items-center mb-4 text-gray-600">
                      <Clock size={18} className="mr-2" />
                      <span>Part-time</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Support our fundraising efforts through donor research, grant writing, and event coordination. Strong communication skills and attention to detail are essential.
                    </p>
                    <button className="w-full bg-tulip hover:bg-tulip-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 shadow-sm">
                      View Job Description
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <p className="text-gray-600 mb-4">
                  Don't see a position that fits your skills? We're always interested in connecting with passionate individuals.
                </p>
                <button className="bg-tulip/10 hover:bg-tulip/20 text-tulip font-medium py-2 px-6 rounded-md transition-colors duration-300">
                  Submit Your Resume
                </button>
              </div>
            </div> */}

            {/* Volunteer Introduction */}
            <div className="mb-10 bg-tulip-muted/50 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Join Us as a Volunteer and Make a Difference!</h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-gray-700 mb-4">
                  Are you passionate about empowering children and giving back to the community? The Tulip Kids Foundation is looking for dedicated and compassionate volunteers to help us create a brighter future for children through education, enrichment programs, and kindness-driven initiatives.
                </p>

                <p className="text-gray-700 mb-6">As a volunteer, you'll have the unique opportunity to:</p>

                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Support children's learning and development through fun and engaging programs.</li>
                  <li>Share your time, skills, and passion to make a lasting impact in the lives of underserved children.</li>
                </ul>

                <p className="text-gray-700 mb-6">
                  Whether you have a few hours a week or want to get involved in a bigger way, your contribution matters. Together, we can empower the next generation to thrive, learn, and succeed!
                </p>

                <p className="text-gray-700 mb-6">
                  Join us today and be part of a community that's changing lives—one child at a time.
                </p>

                <div className="text-center">
                  <button
                    className="bg-tulip hover:bg-tulip-dark text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-sm"
                    onClick={() => document.getElementById('join-form').scrollIntoView({ behavior: 'smooth' })}
                  >
                    Sign Up Now to Become a Volunteer
                  </button>
                </div>
              </div>
            </div>

            {/* Volunteer Opportunities */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Volunteer Opportunities</h2>
              <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                Can't join us full-time? There are many ways to contribute your time and talents as a volunteer.
              </p>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="md:flex items-start">
                    <div className="w-16 h-16 bg-tulip-muted rounded-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                      <Calendar className="text-tulip" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Event Volunteers</h3>
                      <p className="text-gray-600 mb-4">
                        Help with registration, setup, and coordination at our fundraising events like the Tulip Trot or our annual gala. This is a great way to get involved on a flexible, occasional basis.
                      </p>

                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="md:flex items-start">
                    <div className="w-16 h-16 bg-tulip-muted rounded-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                      <Users className="text-tulip" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Program Volunteers</h3>
                      <p className="text-gray-600 mb-4">
                        Work directly with children in our after-school programs, summer camps, or weekend activities. Regular commitment is preferred, and all volunteers undergo background checks.
                      </p>

                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="md:flex items-start">
                    <div className="w-16 h-16 bg-tulip-muted rounded-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                      <Award className="text-tulip" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Professional Skills Volunteering</h3>
                      <p className="text-gray-600 mb-4">
                        Contribute your professional expertise in areas like marketing, graphic design, legal services, or IT support. This is an excellent way for professionals to make a meaningful impact.
                      </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">What Our Team Members Say</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                    <div>
                      <h4 className="font-bold text-primary">Sarah Johnson</h4>
                      <p className="text-sm text-gray-500">Program Director, 5 years</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "Working at Tulip Kids Foundation has been the most rewarding experience of my career. Seeing the direct impact of our programs on children's lives makes every day meaningful. The team is supportive, and there's always room to grow and innovate."
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                    <div>
                      <h4 className="font-bold text-primary">Michael Chen</h4>
                      <p className="text-sm text-gray-500">Weekend Volunteer, 2 years</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "Volunteering with Tulip Kids has become the highlight of my weekends. The staff is incredibly supportive, and the children's enthusiasm is contagious. I've developed leadership skills I never knew I had, and made lasting friendships with other volunteers."
                  </p>
                </div>
              </div>
            </div>

            {/* Application Process */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Our Application Process</h2>
              <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                We're committed to a fair, transparent process for all applicants. Here's what to expect:
              </p>

              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-tulip-light"></div>

                  {/* Timeline items */}
                  <div className="space-y-8">
                    <div className="relative pl-20">
                      <div className="absolute left-5 w-7 h-7 rounded-full bg-tulip transform -translate-x-1/2 flex items-center justify-center">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">Application Submission</h3>
                      <p className="text-gray-600">
                        Submit your resume and cover letter through our online portal. Be sure to highlight your relevant experience and why you're passionate about our mission.
                      </p>
                    </div>

                    <div className="relative pl-20">
                      <div className="absolute left-5 w-7 h-7 rounded-full bg-tulip transform -translate-x-1/2 flex items-center justify-center">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">Initial Screening</h3>
                      <p className="text-gray-600">
                        Our team reviews applications and conducts phone interviews with promising candidates. This typically happens within 1-2 weeks of application.
                      </p>
                    </div>

                    <div className="relative pl-20">
                      <div className="absolute left-5 w-7 h-7 rounded-full bg-tulip transform -translate-x-1/2 flex items-center justify-center">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">In-Person Interview</h3>
                      <p className="text-gray-600">
                        Selected candidates are invited for an in-person interview with the hiring team. For some positions, this may include a skills assessment or presentation.
                      </p>
                    </div>

                    <div className="relative pl-20">
                      <div className="absolute left-5 w-7 h-7 rounded-full bg-tulip transform -translate-x-1/2 flex items-center justify-center">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">Background Check</h3>
                      <p className="text-gray-600">
                        Because we work with children, all potential team members undergo a comprehensive background check before final offers are made.
                      </p>
                    </div>

                    <div className="relative pl-20">
                      <div className="absolute left-5 w-7 h-7 rounded-full bg-tulip transform -translate-x-1/2 flex items-center justify-center">
                        <span className="text-white font-bold">5</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2">Onboarding</h3>
                      <p className="text-gray-600">
                        New team members participate in a thorough orientation program to learn about our organization, policies, and the specific responsibilities of their role.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-tulip-muted p-10 rounded-2xl text-center mb-16">
              <h2 className="text-2xl font-bold text-primary mb-4">Ready to Join Our Team?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Whether you're looking for employment, volunteer opportunities, or internships, we'd love to hear from you. Together, we can make a difference in children's lives.
              </p>

            </div>

            {/* Volunteer Application Form */}
            <div id="join-form" className="mb-20">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Join Now</h2>
              <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                Fill out the form below to start your journey with Tulip Kids Foundation.
              </p>

              <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-soft p-8 border border-gray-100">
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">Application Submitted!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for your interest in joining Tulip Kids Foundation. We'll review your application and get back to you soon.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-tulip hover:bg-tulip-dark text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 shadow-sm"
                    >
                      Submit Another Application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                        {submitError}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-tulip focus:border-tulip"
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-tulip focus:border-tulip"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-tulip focus:border-tulip"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-tulip focus:border-tulip"
                      />
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
                        Why do you want to join? *
                      </label>
                      <textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-tulip focus:border-tulip"
                      ></textarea>
                    </div>

                    <div className="text-center pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-tulip hover:bg-tulip-dark text-white font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-sm disabled:opacity-70"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Application'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default JoinTeam;
