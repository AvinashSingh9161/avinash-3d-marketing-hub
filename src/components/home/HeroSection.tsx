import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.2, 
          ease: "power3.out",
          delay: 0.2
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1, 
          ease: "power2.out",
          delay: 0.5
        }
      );

      // Description animation
      gsap.fromTo(
        descriptionRef.current,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power2.out",
          delay: 0.8
        }
      );

      // Buttons animation
      gsap.fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "back.out(1.7)",
          delay: 1.1
        }
      );

      // Image container animation
      gsap.fromTo(
        imageContainerRef.current,
        { opacity: 0, scale: 0.8, rotation: -10 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0, 
          duration: 1.5, 
          ease: "elastic.out(1, 0.5)",
          delay: 0.6
        }
      );

      // Icon animations
      iconRefs.current.forEach((icon, index) => {
        if (icon) {
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0, rotation: -180 },
            { 
              opacity: 1, 
              scale: 1, 
              rotation: 0, 
              duration: 1, 
              ease: "elastic.out(1, 0.3)",
              delay: 1.4 + (index * 0.2)
            }
          );

          // Continuous floating animation for icons
          gsap.to(icon, {
            y: -15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.4 + (index * 0.2)
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 bg-gradient-animation -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins mb-6 text-white"
            >
              Hi, I'm <span className="text-white">Avinash Singh</span>
            </h1>
            <h2 
              ref={subtitleRef}
              className="text-2xl md:text-3xl font-semibold mb-6 text-white/90"
            >
              Digital Marketing Specialist
            </h2>
            <p 
              ref={descriptionRef}
              className="text-lg text-white/80 mb-8"
            >
              I help brands grow through data-driven strategies and creative campaigns. 
              Specialized in social media management, SEO, content marketing, and paid advertising.
            </p>
            <div ref={buttonsRef} className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-brand-purple hover:bg-white/90">
                <Link to="/contact">
                  Hire Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
                <Link to="/portfolio">
                  View My Work
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              <div 
                ref={imageContainerRef}
                className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden border-4 border-white shadow-3d"
              >
                <img 
                  src="https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg" 
                  alt="Avinash Singh - Digital Marketing Specialist" 
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                />
              </div>
              <div 
                ref={(el) => (iconRefs.current[0] = el)}
                className="absolute -bottom-6 -right-6 bg-white rounded-full p-4 shadow-3d"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  fill="currentColor" 
                  viewBox="0 0 16 16"
                  className="text-brand-purple"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
              </div>
              <div 
                ref={(el) => (iconRefs.current[1] = el)}
                className="absolute -top-6 -left-6 bg-white rounded-full p-4 shadow-3d"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="40" 
                  height="40" 
                  fill="currentColor" 
                  viewBox="0 0 16 16"
                  className="text-brand-blue"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                  <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
