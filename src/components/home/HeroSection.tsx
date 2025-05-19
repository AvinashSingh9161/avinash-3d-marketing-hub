
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Modern gradient background with animation */}
      <div className="absolute inset-0 bg-gradient-animation opacity-90 -z-10" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-20 -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full mb-4">
              <span className="text-white/90 font-medium text-sm">Digital Marketing Specialist</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-poppins tracking-tight text-white">
              Hi, I'm <span className="gradient-text">Avinash Singh</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg">
              I help brands grow through data-driven strategies and creative campaigns. 
              Specialized in social media management, SEO, content marketing, and paid advertising.
            </p>
            
            <div className="flex flex-wrap gap-5 pt-2">
              <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-white/90 shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Link to="/contact">
                  Hire Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1">
                <Link to="/portfolio">
                  View My Work
                </Link>
              </Button>
              <Button asChild variant="ghost" size="icon" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 hover:-translate-y-1">
                <Link to="/contact" aria-label="Message me">
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </Button>
            </div>
            
            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-brand-purple to-brand-blue flex items-center justify-center text-xs font-bold text-white">
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-sm text-white/80">
                <span className="font-bold text-white">20+</span> satisfied clients in the last year
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              {/* Modern 3D profile image with better styling */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-4 border-white/20 shadow-3d animate-float backdrop-blur-sm bg-gradient-to-r from-brand-purple/20 to-brand-blue/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-purple/40 to-transparent mix-blend-overlay"></div>
                <img 
                  src="/placeholder.svg" 
                  alt="Avinash Singh" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Modern decorative elements */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-3d transform rotate-6 animate-float backdrop-blur-md">
                <div className="bg-gradient-to-r from-brand-purple to-brand-blue rounded-xl p-1">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="32" 
                    height="32" 
                    fill="currentColor" 
                    viewBox="0 0 16 16"
                    className="text-white"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                </div>
              </div>
              
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-3d transform -rotate-6 animate-float backdrop-blur-md" style={{animationDelay: '1s'}}>
                <div className="bg-gradient-to-r from-brand-blue to-brand-orange rounded-xl p-1">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="32" 
                    height="32" 
                    fill="currentColor" 
                    viewBox="0 0 16 16"
                    className="text-white"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                  </svg>
                </div>
              </div>
              
              {/* Modern floating badge */}
              <div className="absolute top-1/2 -right-10 transform translate-y-1/2 bg-white rounded-full p-3 shadow-3d animate-float" style={{animationDelay: '0.5s'}}>
                <div className="bg-gradient-to-r from-brand-purple to-brand-blue rounded-full h-12 w-12 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">2+</span>
                </div>
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-white text-xs font-medium bg-black/30 px-2 py-0.5 rounded-full whitespace-nowrap backdrop-blur-sm">Years Exp</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
