import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp Inc.",
      content: "Avinash transformed our digital presence completely. Our social media engagement increased by 300% and our conversion rates doubled. His strategic approach to digital marketing is exceptional.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Mike Rodriguez",
      role: "CEO",
      company: "StartupVision",
      content: "Working with Avinash was a game-changer for our startup. His SEO strategies helped us rank #1 for our target keywords within 6 months. Highly recommend his services!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Emily Chen",
      role: "Brand Manager",
      company: "Creative Studios",
      content: "Avinash's creative campaigns and graphic design work exceeded our expectations. The brand identity he created perfectly captured our vision and resonated with our target audience.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "David Thompson",
      role: "E-commerce Manager",
      company: "RetailPro",
      content: "Our PPC campaigns managed by Avinash generated 450% ROI. His attention to detail and data-driven approach made all the difference in our advertising success.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="particles-bg"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 gradient-text">
            Client Testimonials
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Hear what my clients say about working with me
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="relative h-96 perspective-1000">
            {testimonials.map((testimonial, index) => {
              const isActive = index === currentIndex;
              const isNext = index === (currentIndex + 1) % testimonials.length;
              const isPrev = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
              
              let transform = 'translateX(100%) rotateY(45deg) scale(0.8)';
              let opacity = 0;
              let zIndex = 1;
              
              if (isActive) {
                transform = 'translateX(0%) rotateY(0deg) scale(1)';
                opacity = 1;
                zIndex = 3;
              } else if (isPrev) {
                transform = 'translateX(-100%) rotateY(-45deg) scale(0.8)';
                opacity = 0.6;
                zIndex = 2;
              } else if (isNext) {
                transform = 'translateX(100%) rotateY(45deg) scale(0.8)';
                opacity = 0.6;
                zIndex = 2;
              }
              
              return (
                <div
                  key={index}
                  className="absolute inset-0 transition-all duration-700 ease-in-out preserve-3d"
                  style={{
                    transform,
                    opacity,
                    zIndex
                  }}
                >
                  <div className="glass-card p-8 h-full flex flex-col justify-center items-center text-center rounded-3xl border border-white/20 animate-pulse-glow">
                    {/* Profile Image */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-500/50 glow-purple">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full p-2">
                        <Star className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-lg mb-6 text-foreground leading-relaxed italic">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author Info */}
                    <div>
                      <h4 className="font-bold text-xl gradient-text mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 glass-card p-3 rounded-full hover:bg-white/10 transition-all duration-300 group z-10"
          >
            <ChevronLeft className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 glass-card p-3 rounded-full hover:bg-white/10 transition-all duration-300 group z-10"
          >
            <ChevronRight className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-purple-500 w-8' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;