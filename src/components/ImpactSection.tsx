
import { useState, useEffect, useRef } from 'react';

const ImpactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Stats with countUp animation
  const stats = [
    { value: 500, label: "Children Helped", prefix: "", suffix: "+" },
    { value: 15, label: "Years of Service", prefix: "", suffix: "" },
    { value: 50, label: "Community Partners", prefix: "", suffix: "+" },
    { value: 10, label: "Annual Programs", prefix: "", suffix: "" }
  ];

  // Animated counter
  const Counter = ({ end, duration = 2000, prefix = "", suffix = "" }: { end: number, duration?: number, prefix?: string, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
      if (!isVisible) return;

      const animate = (timestamp: number) => {
        if (startTimeRef.current === null) {
          startTimeRef.current = timestamp;
        }

        const progress = timestamp - startTimeRef.current;
        const percentComplete = Math.min(progress / duration, 1);
        const newCount = Math.floor(end * percentComplete);

        if (countRef.current !== newCount) {
          countRef.current = newCount;
          setCount(newCount);
        }

        if (progress < duration) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);

      return () => {
        startTimeRef.current = null;
      };
    }, [end, duration, isVisible]);

    return (
      <div className="text-4xl md:text-5xl font-bold text-tulip">
        {prefix}{count}{suffix}
      </div>
    );
  };

  // Intersection observer to trigger animation when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of the target is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-tulip-muted">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-tulip uppercase tracking-wider text-sm font-medium mb-2 block">Our Impact</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Making a Real Difference</h2>
          <p className="text-gray-600 text-lg">
            Over the years, we've created lasting change in our community. See the impact we've made together.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center staggered-item">
              {isVisible && (
                <Counter
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              )}
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
