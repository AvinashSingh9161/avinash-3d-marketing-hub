
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-animation -z-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 animate-slide-up">
            <div className="badge-modern mb-8 inline-block">
              🚀 Digital Marketing Expert
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-poppins mb-8 text-white leading-tight">
              Hi, I'm <span className="gradient-text bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">Avinash Singh</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-white/90 font-poppins">
              Digital Marketing Specialist
            </h2>
            <p className="text-xl text-white/80 mb-10 leading-relaxed max-w-lg">
              I help brands grow through data-driven strategies and creative campaigns. 
              Specialized in social media management, SEO, content marketing, and paid advertising.
            </p>
            <div className="flex flex-wrap gap-6">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elegant font-semibold px-8 py-4 text-lg glow-effect">
                <Link to="/contact">
                  Hire Me <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 text-lg">
                <Link to="/portfolio">
                  View My Work
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center animate-scale-in">
            <div className="relative">
              <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-white/30 shadow-elegant-xl animate-float backdrop-blur-sm">
                <img 
                  src="https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg" 
                  alt="Avinash Singh - Digital Marketing Specialist" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Enhanced Floating Badges */}
              <div className="absolute -bottom-8 -right-8 bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-glass animate-pulse-glow">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  fill="currentColor" 
                  viewBox="0 0 16 16"
                  className="text-brand-primary"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
                <span className="text-xs font-semibold text-brand-primary mt-2 block">Location</span>
              </div>
              
              <div className="absolute -top-8 -left-8 bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-glass animate-pulse-glow" style={{ animationDelay: '1s' }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="48" 
                  height="48" 
                  fill="currentColor" 
                  viewBox="0 0 16 16"
                  className="text-brand-secondary"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <span className="text-xs font-semibold text-brand-secondary mt-2 block">Strategy</span>
              </div>
              
              <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-glass animate-pulse-glow" style={{ animationDelay: '2s' }}>
                <div className="text-2xl font-bold text-brand-accent">5+</div>
                <div className="text-xs font-semibold text-brand-accent">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
