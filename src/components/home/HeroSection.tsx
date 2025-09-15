
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import FloatingShapes from "@/components/3d/FloatingShapes";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center animated-bg">
      {/* Floating 3D Background */}
      <FloatingShapes />
      
      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Available for Projects</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-orbitron mb-6 leading-tight">
              Hi, I'm{" "}
              <span className="gradient-text block lg:inline">
                Avinash Singh
              </span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 neon-text font-space">
              Graphic Designer & Digital Marketing Executive
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              I help brands <span className="text-purple-400 font-semibold">thrive in the digital landscape</span> through 
              innovative design, data-driven strategies, and creative campaigns that deliver exceptional results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button asChild size="lg" className="neon-button text-white font-semibold px-8 py-4 text-lg rounded-xl group">
                <Link to="/portfolio" className="flex items-center gap-2">
                  <Zap className="w-5 h-5 group-hover:animate-pulse" />
                  View My Work
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass-card border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 text-lg rounded-xl">
                <Link to="/contact">
                  Let's Collaborate
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text font-orbitron">150+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text font-orbitron">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text font-orbitron">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
          
          {/* 3D Profile Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative group">
              {/* Main Profile Image */}
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl animate-pulse-glow"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 glass-card animate-float group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src="https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg" 
                    alt="Avinash Singh - Graphic Designer & Digital Marketing Executive" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Floating Icons */}
              <div className="absolute -top-8 -right-8 glass-card rounded-full p-4 animate-float float-delay-1 glow-purple">
                <Sparkles className="w-8 h-8 text-purple-400" />
              </div>
              
              <div className="absolute -bottom-8 -left-8 glass-card rounded-full p-4 animate-float float-delay-2 glow-blue">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              
              <div className="absolute top-1/2 -right-12 glass-card rounded-full p-3 animate-float">
                <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
              </div>
              
              <div className="absolute top-1/4 -left-12 glass-card rounded-full p-3 animate-float float-delay-1">
                <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
