
import { Heart, Users, TrendingUp } from 'lucide-react';

const MissionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-tulip uppercase tracking-wider text-sm font-medium mb-2 block">Our Mission</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">We're on a mission to help children flourish</h2>
          <p className="text-gray-600 text-lg">
            Through our programs, events, and community initiatives, we create environments where children can learn, grow, and thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-8 shadow-soft border border-gray-100 transition-all duration-300 hover:shadow-md staggered-item">
            <div className="w-12 h-12 bg-tulip-muted rounded-lg flex items-center justify-center mb-6">
              <Heart className="text-tulip" size={24} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Compassionate Care</h3>
            <p className="text-gray-600">
              We provide nurturing environments that support children's emotional and physical wellbeing, allowing them to thrive.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-soft border border-gray-100 transition-all duration-300 hover:shadow-md staggered-item">
            <div className="w-12 h-12 bg-tulip-muted rounded-lg flex items-center justify-center mb-6">
              <Users className="text-tulip" size={24} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Community Support</h3>
            <p className="text-gray-600">
              We engage communities to create support networks that empower families and provide children with diverse resources.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-soft border border-gray-100 transition-all duration-300 hover:shadow-md staggered-item">
            <div className="w-12 h-12 bg-tulip-muted rounded-lg flex items-center justify-center mb-6">
              <TrendingUp className="text-tulip" size={24} />
            </div>
            <h3 className="text-xl font-bold text-primary mb-3">Personal Growth</h3>
            <p className="text-gray-600">
              We create opportunities for children to develop skills, confidence, and resilience that will serve them throughout life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
