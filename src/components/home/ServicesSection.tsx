
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Palette, Zap, BarChart3, ArrowRight, Check } from "lucide-react";
import socialMediaImage from "@/assets/social-media-campaign.jpg";
import seoImage from "@/assets/seo-optimization.jpg";
import ppcImage from "@/assets/ppc-advertising.jpg";

const ServicesSection = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      title: "Graphic Design",
      subtitle: "Visual Identity & Branding",
      image: socialMediaImage,
      icon: <Palette className="w-8 h-8" />,
      description: "Create stunning visual identities that capture your brand essence and resonate with your target audience through innovative design solutions.",
      features: ["Logo Design", "Brand Guidelines", "Print Design", "Digital Assets"],
      price: "From $500",
      gradient: "from-pink-500 to-purple-600"
    },
    {
      title: "Digital Marketing",
      subtitle: "Growth & Strategy",
      image: ppcImage,
      icon: <Zap className="w-8 h-8" />,
      description: "Accelerate your business growth with data-driven digital marketing strategies that deliver measurable results and ROI.",
      features: ["PPC Campaigns", "Social Media", "Content Strategy", "Email Marketing"],
      price: "From $800",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      title: "SEO & Analytics",
      subtitle: "Optimization & Insights", 
      image: seoImage,
      icon: <BarChart3 className="w-8 h-8" />,
      description: "Boost your online visibility and track performance with comprehensive SEO strategies and advanced analytics implementation.",
      features: ["SEO Optimization", "Analytics Setup", "Performance Tracking", "Reporting"],
      price: "From $600",
      gradient: "from-purple-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="particles-bg"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 gradient-text">
            My Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Comprehensive design and marketing solutions to elevate your brand and drive growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="tilt-card group h-full perspective-1000"
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="card-3d h-full flex flex-col relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-10 transition-opacity duration-500 group-hover:opacity-20">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div className={`mb-6 p-4 rounded-2xl bg-gradient-to-r ${service.gradient} w-fit glow-purple transition-all duration-500 ${hoveredService === index ? 'scale-110' : ''}`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  
                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-foreground font-space mb-1">
                      {service.title}
                    </h3>
                    <p className="text-purple-400 font-medium">
                      {service.subtitle}
                    </p>
                  </div>
                  
                  {/* Description */}
                  <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="mb-6 space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center group/item">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-3 group-hover/item:scale-110 transition-transform">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Price & CTA */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold gradient-text font-orbitron">
                        {service.price}
                      </span>
                      <div className="text-xs text-muted-foreground">
                        Starting Price
                      </div>
                    </div>
                    
                    <Button 
                      asChild 
                      className="w-full neon-button group/btn"
                    >
                      <Link to="/contact" className="flex items-center justify-center gap-2">
                        Get Started
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${hoveredService === index ? 'opacity-100' : 'opacity-0'}`}>
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} opacity-5`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="glass-card inline-block p-8 rounded-3xl border border-white/20 mb-8">
            <h3 className="text-2xl font-bold gradient-text mb-4 font-space">
              Need Something Custom?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              I also offer bespoke solutions tailored to your unique business needs and objectives.
            </p>
            <Button asChild className="neon-button">
              <Link to="/services" className="flex items-center gap-2">
                Explore All Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
