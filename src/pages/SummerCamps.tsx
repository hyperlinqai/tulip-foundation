
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, MapPin, Users, Clock, Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const SummerCamps = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="bg-tulip-muted pt-40 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">Tulip Summer Camp</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-tulip mb-6">Enhance, Explore & Empower!</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tulip Young Explorers Summer Camp - an exciting summer program for kindergarten through 5th-grade children, offering a perfect mix of creativity, curiosity, and holistic development.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">

            {/* Camp Details Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Camp Details</h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 bg-tulip-muted rounded-lg flex items-center justify-center mb-4">
                    <Users className="text-tulip" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Ages</h3>
                  <p className="text-gray-600">
                    Grades: K-5
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 bg-tulip-muted rounded-lg flex items-center justify-center mb-4">
                    <Clock className="text-tulip" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Timings</h3>
                  <p className="text-gray-600">
                    Mon – Fri: 8 am – 3 pm<br />
                    Extended Care: 3 pm – 6 pm
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <div className="w-12 h-12 bg-tulip-muted rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="text-tulip" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">Fees</h3>
                  <p className="text-gray-600">
                    Camp Fees: $325 per week<br />
                    Extended Care: $125 per week
                  </p>
                </div>
              </div>
            </div>

            {/* Daily Schedule */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Daily Schedule</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="bg-tulip text-white p-4">
                    <h3 className="text-xl font-bold">Regular Camp Hours</h3>
                    <p>8:00 AM - 3:00 PM</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-bold text-tulip">8:00–9:30 | Arrival & Quiet Time</h4>
                      <p className="text-gray-600">Reading, puzzles, journaling, or quiet games.</p>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-bold text-tulip">9:30–10:30 | Morning Movement</h4>
                      <p className="text-gray-600">Mon, Wed, Fri – Dance & Movement<br />Tue, Thu – Yoga & Mindfulness</p>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-bold text-tulip">10:30–11:00 | Morning Snack</h4>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-bold text-tulip">11:00–12:00 | Academics</h4>
                      <p className="text-gray-600">Mon, Wed – Math & Problem-Solving<br />Tue, Thu – Literacy & Creative Writing<br />Fri – Fun Review</p>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-bold text-tulip">12:00–1:00 | Lunch & Free Play</h4>
                      <p className="text-gray-600">Socializing, outdoor games, or relaxation.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-tulip">1:00–2:45 | Afternoon Creative Exploration</h4>
                      <p className="text-gray-600">Mon, Wed – Science<br />Tue, Thu – Art<br />Fri – Fun-themed activities</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-tulip">3:00 | Camp Ends</h4>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl overflow-hidden">
                  <div className="bg-tulip text-white p-4">
                    <h3 className="text-xl font-bold">Extended Care</h3>
                    <p>3:00 PM - 6:00 PM</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-bold text-tulip">3:00–4:00 | Fun Time</h4>
                      <p className="text-gray-600">Games, crafts, and creative activities.</p>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h4 className="font-bold text-tulip">4:00–5:00 | Quiet Time</h4>
                      <p className="text-gray-600">Reading, journaling, or relaxing.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-tulip">5:00–6:00 | Play Time</h4>
                      <p className="text-gray-600">Outdoor play or free-choice activities.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Themes */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Weekly Themes</h2>

              <div className="space-y-6">
                {[
                  {
                    week: 1,
                    title: "Welcome to Camp Wonders",
                    description: "Kids build friendships through icebreakers, teamwork activities, and fun games. They explore movement with yoga and dance, engage in math and literacy challenges, and create collaborative art and science projects."
                  },
                  {
                    week: 2,
                    title: "Nature Explorers",
                    description: "A journey into the wonders of nature, learning about plants, animals, and ecosystems. Activities include animal-themed yoga, nature-inspired puzzles, planting seeds, and creating eco-art like leaf prints and rock paintings."
                  },
                  {
                    week: 3,
                    title: "Space & Beyond",
                    description: "Kids dive into space exploration with planet-themed activities, \"floating in space\" mindfulness, and rocket-building challenges. They create constellation art, explore gravity experiments, and imagine life beyond Earth."
                  },
                  {
                    week: 4,
                    title: "Around the World",
                    description: "A cultural adventure exploring traditions, music, and global stories. Children enjoy folk dances, math and literacy activities tied to world travel, and hands-on projects like crafting cultural art, flags, and food experiments."
                  },
                  {
                    week: 5,
                    title: "Time Travelers",
                    description: "Travel through history and into the future! Kids explore famous historical figures, inventions, and timelines while creating dioramas, writing \"letters from the past,\" and designing futuristic gadgets."
                  },
                  {
                    week: 6,
                    title: "Science Explorers",
                    description: "A week of hands-on STEM fun with exciting experiments like making slime and chemical reactions. Kids solve science puzzles, build structures, and engage in movement games inspired by nature and physics."
                  },
                  {
                    week: 7,
                    title: "Artful Imagination",
                    description: "A celebration of creativity through painting, storytelling, and mixed-media art. Kids explore poetry, mural painting, and collaborative projects while expressing themselves through freestyle movement and dance."
                  }
                ].map((theme) => (
                  <div key={theme.week} className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-tulip rounded-full flex items-center justify-center text-white font-bold mr-4 shrink-0">
                        {theme.week}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary mb-2">{theme.title}</h3>
                        <p className="text-gray-600">{theme.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Contact Information</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <h3 className="text-xl font-bold text-primary mb-4">Tulip Kids Academy</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="text-tulip shrink-0 mt-1" size={20} />
                      <p className="ml-2 text-gray-600">
                        1159 Willow Ave<br />
                        Sunnyvale, CA 94086
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                  <h3 className="text-xl font-bold text-primary mb-4">Get in Touch</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="text-tulip shrink-0 mt-1" size={20} />
                      <div className="ml-2 text-gray-600">
                        <p>info@tulipkidsinc.com</p>
                        <p>sneha@tulipkidsinc.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Phone className="text-tulip shrink-0 mt-1" size={20} />
                      <p className="ml-2 text-gray-600">(408) 930 – 1862</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-tulip-muted p-10 rounded-2xl text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">Ready to Register?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Secure your child's spot in our popular summer camp! Registration is open now, but spaces fill quickly.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-tulip hover:bg-tulip-dark text-white"
                  onClick={() => window.open("https://tulipkidsfoundation.jumbula.com/SummerCamp2025/TulipYoungExplorers", "_blank")}
                >
                  Register Now <ExternalLink className="ml-1" size={18} />
                </Button>

              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SummerCamps;
