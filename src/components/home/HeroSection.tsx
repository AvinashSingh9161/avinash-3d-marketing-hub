
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-mesh-gradient -z-10" />
      <div className="absolute inset-0 bg-gradient-animation opacity-80 -z-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 animate-slide-up">
            <div className="badge-modern mb-8 inline-block">
              <span>✨ Digital Marketing Expert</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold font-playfair mb-8 text-white leading-tight text-shadow-glow">
              Hi, I'm <span className="gradient-text">Avinash Singh</span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-8 text-white/90 font-space tracking-wide">
              Creative Digital Marketing Specialist
            </h2>
            <p className="text-xl md:text-2xl text-white/85 mb-12 leading-relaxed max-w-2xl font-space font-light">
              Crafting digital experiences that captivate, engage, and convert. 
              I transform brands through innovative strategies, compelling visuals, and data-driven campaigns.
            </p>
            <div className="flex flex-wrap gap-8">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-designer font-bold px-10 py-5 text-lg glow-effect rounded-2xl font-space">
                <Link to="/contact">
                  Let's Collaborate <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/20 backdrop-blur-lg font-bold px-10 py-5 text-lg rounded-2xl font-space border-2">
                <Link to="/portfolio">
                  Explore Portfolio
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center animate-scale-in">
            <div className="relative design-highlight">
              <div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] rounded-3xl overflow-hidden border-4 border-white/40 shadow-designer-lg animate-float backdrop-blur-lg">
                <img 
                  src="https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg" 
                  alt="Avinash Singh - Creative Digital Marketing Specialist" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Enhanced Floating Badges */}
              <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-designer animate-pulse-glow">
                <div className="text-brand-primary text-5xl font-bold font-playfair mb-2">✨</div>
                <span className="text-sm font-bold text-brand-primary block font-space">Creative</span>
              </div>
              
              <div className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-2xl rounded-3xl p-8 shadow-designer animate-pulse-glow" style={{ animationDelay: '1s' }}>
                <div className="text-brand-secondary text-5xl font-bold font-playfair mb-2">🎯</div>
                <span className="text-sm font-bold text-brand-secondary block font-space">Strategic</span>
              </div>
              
              <div className="absolute top-1/2 -right-16 transform -translate-y-1/2 bg-white/95 backdrop-blur-2xl rounded-3xl p-6 shadow-designer animate-pulse-glow" style={{ animationDelay: '2s' }}>
                <div className="text-3xl font-black text-brand-accent font-playfair">5+</div>
                <div className="text-sm font-bold text-brand-accent font-space">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
