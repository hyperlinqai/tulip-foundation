
import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Leadership = () => {
  // Founders data
  const founders = [
    {
      name: "Sneha Vedula",
      title: "Founder",
      image: "/images/snhea.webp",
      email: "sneha@tulipkidsinc.com",
      bio: "Sneha Vedula is a passionate educator, entrepreneur, a philanthropist, and an inspiring Indian-American community leader. Her philosophy in life is to create a difference through education and make an impact by giving back to the community. She is the Co-founder of Tulip Kids Inc since 2010, a trusted & successful brand in the education sector and brings to the table her expertise in the areas of Administration, Leadership, Creative thinking, Marketing and Public Relations. Her belief is that every child should have continuous access to academic and non-academic learning, which will enable them to be creative, inquisitive, and innovative which will help them grow and create a strong foundation. She is grateful to her parents for creating opportunities for unlimited access to learning and knowledge, which has led to what she is today. Apart from Tulip Kids, Sneha is an active community leader for the past 25 yrs., and has supported, sponsored, and led key roles in various initiative and projects in education, socio cultural issues, women empowerment, and healthcare in USA and India. She is a strong advocate for empowering women, education at grassroots level and takes pride in her cultural background and roots. As she embarks on her journey to the Nonprofit education foundation, Sneha brings an immense knowledge and experience but most importantly \"A compassionate and a giving heart\".",
    },
    {
      name: "Deepti Mohta",
      title: "Founder",
      image: "/images/deepti.webp",
      email: "deepti@tulipkidsinc.com",
      bio: "Deepti Mohta is a dynamic entrepreneur, social activist, and educationist who has dedicated her career to empowering young minds and creating a better world through education. She is the founder and president of Tulip Kids, a leading provider of innovative and child-centric education solutions. Deepti is known for her expertise in early childhood education, pedagogy, and child psychology. Deepti has a deep passion for education and believes that every child deserves access to high-quality and affordable education. She started her career as a teacher and quickly realized the need for a more personalized approach to education that caters to the unique needs and strengths of every child. This inspired her to start Tulip Kids in 2005, which today operates several preschools and daycare centers across US and India, providing holistic and child-centric education to children from all backgrounds. Under Deepti's leadership, Tulip Kids has become a trusted name in the education sector, known for its innovative teaching methods, state-of-the-art facilities, and highly qualified and trained teachers. Deepti's vision for Tulip Kids is to create a nurturing and stimulating environment where children can learn and grow in a fun and engaging way, while also developing important life skills such as creativity, critical thinking, and emotional intelligence. In addition to her work with Tulip Kids, Deepti is also actively involved in various social initiatives and non-profit organizations that focus on education, child welfare and women rights. She is a member of several industry bodies and educational associations, where she shares her expertise and insights on early childhood education and pedagogy. Deepti's passion for education and her commitment to creating a better world for children have earned Tulip Kids numerous accolades and recognition, including the prestigious NAEYC accreditation for early childhood education. Deepti brings with her a wealth of knowledge and experience, and a deep commitment to the cause of education. Her expertise in early childhood education, child psychology, and pedagogy, coupled with her passion for innovation and social impact, make her an invaluable addition to the organization.",
    },
  ];

  // Advisors data
  const advisors = [
    {
      name: "Naval Mohta",
      title: "Advisor & Mentor",
      image: "/images/nvaal.webp",
      email: "naval@tulipkidsinc.com",
      bio: "Naval Mohta is a highly accomplished supply chain professional with a proven track record of success in the industry. With over 20 years of experience in supply chain management, logistics, and operations, Naval has developed a deep understanding of the complexities and challenges of the field. He has worked with some of the leading companies in the industry, where he has been responsible for streamlining operations, optimizing supply chains, and driving business growth. Naval's expertise lies in strategic planning, process improvement, and team leadership. He has a proven ability to identify inefficiencies in supply chain processes and implement effective solutions that result in cost savings, improved productivity, and enhanced customer satisfaction. His strategic approach to supply chain management has helped numerous organizations achieve their business objectives and gain a competitive edge in the market. In addition to his professional achievements, Naval is also a dedicated mentor who is passionate about sharing his knowledge and experience with others. He believes in the power of education and continuous learning, and is committed to helping the next generation of supply chain professionals develop the skills and knowledge they need to succeed in the field. Naval's combination of industry expertise, strategic thinking, and commitment to mentorship makes him an invaluable advisor to any organization looking to optimize their supply chain operations and drive business growth.",
    },
  ];

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
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Team</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated individuals who guide our organization and help us fulfill our mission.
          </p>
        </div>
      </div>

      {/* Founders Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Our Founders</h2>

              <div className="grid md:grid-cols-1 gap-8">
                {founders.map((member, index) => (
                  <div key={index} className="glass-card rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
                        <Avatar className="h-24 w-24 border-2 border-tulip">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-2xl font-bold text-primary">{member.name}</h3>
                          <p className="text-tulip font-medium">{member.title}</p>
                          <div className="mt-2">
                            <a
                              href={`mailto:${member.email}`}
                              className="p-2 rounded-full bg-tulip-muted text-tulip hover:bg-tulip hover:text-white transition-colors inline-flex items-center"
                              aria-label={`Email ${member.name}`}
                            >
                              <Mail size={18} />
                              <span className="ml-2">{member.email}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-4">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advisors Section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-primary mb-10 text-center">Advisors & Mentors</h2>
              <div className="grid md:grid-cols-1 gap-8">
                {advisors.map((member, index) => (
                  <div key={index} className="glass-card rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
                        <Avatar className="h-24 w-24 border-2 border-tulip">
                          <AvatarImage src={member.image} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-2xl font-bold text-primary">{member.name}</h3>
                          <p className="text-tulip font-medium">{member.title}</p>
                          <div className="mt-2">
                            <a
                              href={`mailto:${member.email}`}
                              className="p-2 rounded-full bg-tulip-muted text-tulip hover:bg-tulip hover:text-white transition-colors inline-flex items-center"
                              aria-label={`Email ${member.name}`}
                            >
                              <Mail size={18} />
                              <span className="ml-2">{member.email}</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-4">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Leadership;
