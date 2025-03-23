import React, { useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonationForm from "@/components/DonationForm";
import { motion } from "framer-motion";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ||
  'pk_test_placeholder'
);

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Gift, Calendar, Users, Briefcase } from "lucide-react";

const Support = () => {
  // Create a state for payment amount
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  // Use a key to force re-render of Elements when needed
  const [elementsKey, setElementsKey] = useState<string>('initial');

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
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Support Our Cause</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your generosity makes a lasting impact on the lives of children in our community.
          </p>
        </div>
      </div>

      {/* Donation Options */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Ways to Give</h2>
              <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                There are many ways to support the Tulip Kids Foundation. Choose the option that works best for you.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-8 shadow-soft border border-gray-100 transition-all duration-300 hover:shadow-md">
                  <div className="w-12 h-12 bg-tulip-muted rounded-lg flex items-center justify-center mb-6">
                    <Heart className="text-tulip" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">One-Time Donation</h3>
                  <p className="text-gray-600 mb-6">
                    Make an immediate impact with a one-time contribution of any amount. Every dollar helps support our programs.
                  </p>

                </div>

                <div className="bg-white rounded-xl p-8 shadow-soft border border-tulip transition-all duration-300 hover:shadow-glow">
                  <div className="w-12 h-12 bg-tulip-muted rounded-lg flex items-center justify-center mb-6">
                    <Calendar className="text-tulip" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">Monthly Giving</h3>
                  <p className="text-gray-600 mb-6">
                    Join our Blooming Futures program and make a recurring monthly gift to provide sustainable support for our work.
                  </p>

                </div>

                <div className="bg-white rounded-xl p-8 shadow-soft border border-gray-100 transition-all duration-300 hover:shadow-md">
                  <div className="w-12 h-12 bg-tulip-muted rounded-lg flex items-center justify-center mb-6">
                    <Gift className="text-tulip" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">Legacy Giving</h3>
                  <p className="text-gray-600 mb-6">
                    Create a lasting impact by including Tulip Kids Foundation in your estate planning or as a beneficiary.
                  </p>

                </div>
              </div>
            </div>

            {/* Donation Information Section */}
            <div className="mb-16 bg-tulip-muted p-8 rounded-xl">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary mb-4">Why Your Support Matters</h3>
                <p className="text-gray-700 font-medium mb-2">
                  Tulip Kids Foundation is a 501(c)(3) and all donations are fully tax-deductible.
                </p>
                <p className="text-gray-700 font-medium mb-6">
                  Our Tax ID number is 84-4858209.
                </p>
              </div>

              <div className="mb-8">
                <p className="text-gray-600 mb-4">
                  At Tulip Kids Foundation, we believe that every child deserves the opportunity to learn, grow, and thrive.
                  Your generous donation will help us provide educational resources, enrichment programs, and vital support
                  to children, especially those from underserved communities.
                </p>

                <p className="text-gray-600 mb-4">By contributing, you are:</p>

                <ul className="list-disc pl-6 mb-4 text-gray-600 space-y-2">
                  <li>Empowering children with access to quality education and creative learning experiences.</li>
                  <li>Helping us nurture the next generation of thinkers, creators, and leaders.</li>
                </ul>

                <p className="text-gray-600 mb-4">
                  No matter the size of your gift, your donation will make a lasting difference in the lives of the children we serve.
                  Together, we can ensure that every child has the tools and opportunities they need to succeed.
                </p>

                <p className="text-gray-600 font-medium">
                  Donate today and be a part of something truly impactful. Together, we can build brighter futures, one child at a time.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-bold text-primary mb-4">Donate by Mail</h4>
                <p className="text-gray-600 font-medium mb-2">Mail – By Check</p>
                <address className="text-gray-600 not-italic mb-4">
                  Tulip Kids Foundation<br />
                  1159 Willow Ave<br />
                  Sunnyvale, CA 94086
                </address>
                <p className="text-gray-600 italic">
                  Please include your contact information!<br />
                  We would love to acknowledge your contribution.
                </p>
              </div>
            </div>

            {/* Donation Form */}
            <div className="mb-16">
              <div className="bg-white rounded-xl shadow-soft border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-primary mb-6 text-center">Make a Donation</h3>

                <Elements
                  key={elementsKey}
                  stripe={stripePromise}
                  options={{
                    appearance: {
                      theme: 'stripe',
                    },
                    currency: 'usd',
                  }}
                >
                  <DonationForm setPaymentAmount={setPaymentAmount} />
                </Elements>
              </div>
            </div>

            {/* Other Ways to Support */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Other Ways to Support</h2>

              <div className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="md:flex items-start">
                    <div className="w-16 h-16 bg-tulip-muted rounded-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                      <Users className="text-tulip" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Volunteer Your Time</h3>
                      <p className="text-gray-600 mb-4">
                        Contribute your time and talents to support our mission. From event assistance to program volunteers, there are many ways to get involved.
                      </p>

                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="md:flex items-start">
                    <div className="w-16 h-16 bg-tulip-muted rounded-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                      <Briefcase className="text-tulip" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">Corporate Partnerships</h3>
                      <p className="text-gray-600 mb-4">
                        Partner with us to make a meaningful impact in the community while enhancing your company's social responsibility initiatives. Sponsorship opportunities are available.
                      </p>

                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="md:flex items-start">
                    <div className="w-16 h-16 bg-tulip-muted rounded-lg flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                      <Gift className="text-tulip" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">In-Kind Donations</h3>
                      <p className="text-gray-600 mb-4">
                        Donate goods, services, or expertise to support our programs. We welcome contributions of supplies, equipment, and professional services.
                      </p>

                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Impact Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-6 text-center">Your Impact</h2>
              <p className="text-lg text-gray-600 mb-10 text-center max-w-3xl mx-auto">
                Here's how your support helps children in our community:
              </p>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6">
                  <div className="text-4xl font-bold text-tulip mb-2">$25</div>
                  <p className="text-gray-600">
                    Provides art supplies for a child to participate in creative expression activities for a month
                  </p>
                </div>

                <div className="p-6">
                  <div className="text-4xl font-bold text-tulip mb-2">$100</div>
                  <p className="text-gray-600">
                    Sponsors a child for a week of educational summer camp activities
                  </p>
                </div>

                <div className="p-6">
                  <div className="text-4xl font-bold text-tulip mb-2">$500</div>
                  <p className="text-gray-600">
                    Funds a field trip for 20 children to experience cultural and educational opportunities
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="mb-16 bg-tulip-muted p-10 rounded-2xl">
              <div className="text-center max-w-3xl mx-auto">
                <div className="text-5xl text-tulip mb-6">"</div>
                <p className="text-xl text-gray-600 italic mb-6">
                  The support from Tulip Kids Foundation changed my daughter's life. Through their summer program, she discovered a passion for science and made friends who share her interests. We're so grateful to the donors who make these programs possible.
                </p>
                <div className="font-semibold text-primary">Lisa M., Parent</div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Donation FAQs</h2>

              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <h3 className="text-xl font-bold text-primary mb-2">Is my donation tax-deductible?</h3>
                  <p className="text-gray-600">
                    Yes. Tulip Kids Foundation is a registered 501(c)(3) nonprofit organization, and your donation is tax-deductible to the full extent allowed by law. You will receive a tax receipt for your records.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <h3 className="text-xl font-bold text-primary mb-2">How is my donation used?</h3>
                  <p className="text-gray-600">
                    Your donation directly supports our programs for children, including educational initiatives, recreational activities, and family support services. We are committed to transparency and publish our annual reports on our website.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <h3 className="text-xl font-bold text-primary mb-2">Can I specify how my donation is used?</h3>
                  <p className="text-gray-600">
                    Yes, you can designate your gift to support a specific program or initiative. If you prefer, you can also make an unrestricted donation, which allows us to allocate funds where they are most needed.
                  </p>
                </div>
              </div>
            </div>

            {/* Final CTA */}
            <div className="bg-gradient-to-r from-tulip to-tulip-dark p-10 rounded-2xl text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Join Us in Making a Difference</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Every contribution, no matter the size, helps us create opportunities for children to learn, grow, and thrive.
              </p>
              <button className="bg-white text-tulip-dark hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors duration-300 shadow-sm">
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </motion.div>
  );
};

export default Support;
