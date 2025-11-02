import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutPreview = () => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const skillBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate avatar
    gsap.fromTo(
      avatarRef.current,
      { 
        opacity: 0, 
        scale: 0.5,
        rotation: -180
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: avatarRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate skill bars
    skillBarsRef.current.forEach((bar, index) => {
      if (bar) {
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: bar.getAttribute("data-width") + "%",
            duration: 1.5,
            delay: index * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: bar,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Skills data
  const skills = [
    { name: "SEO", percentage: 90 },
    { name: "Social Media Management", percentage: 95 },
    { name: "Content Marketing", percentage: 85 },
    { name: "Paid Advertising", percentage: 80 },
    { name: "Analytics", percentage: 75 },
  ];

  return (
    <section className="py-20 bg-gray-50" id="about-preview">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/2">
            <div className="flex justify-center lg:justify-start mb-6">
              <div ref={avatarRef}>
                <Avatar className="w-40 h-40 border-4 border-white shadow-3d">
                  <AvatarImage 
                    src="https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg" 
                    alt="Avinash Singh - Digital Marketing Specialist" 
                    className="w-full h-full object-cover" 
                  />
                </Avatar>
              </div>
            </div>
            <h3 className="text-2xl font-semibold mb-6">My Background</h3>
            <p className="text-gray-600 mb-4">
              I'm a passionate Digital Marketing Specialist with 2+ years of experience helping brands establish their online presence and grow their audience. 
              With a background in Mechanical Engineering and specialized skills in digital marketing, I bring a unique analytical and creative perspective to marketing challenges.
            </p>
            <p className="text-gray-600 mb-8">
              Currently working at VisionTech PVT LTD while also helping clients like Prime Academy and NextAchiever's IAS drive their digital growth through targeted strategies.
            </p>
            
            <div className="mb-8">
              <h4 className="text-xl font-medium mb-4">Education</h4>
              <div className="card-3d p-6 mb-4">
                <h5 className="font-semibold">Bachelor's in Mechanical Engineering</h5>
                <p className="text-gray-600">SRMS CET, 2020</p>
              </div>
            </div>
            
            <Button asChild>
              <Link to="/about">Learn More About Me</Link>
            </Button>
          </div>
          
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-600">{skill.percentage}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      ref={(el) => (skillBarsRef.current[index] = el)}
                      data-width={skill.percentage}
                      className="h-full bg-gradient-to-r from-brand-purple to-brand-blue rounded-full"
                      style={{ width: "0%" }}
                      role="progressbar"
                      aria-label={`${skill.name} skill level: ${skill.percentage}%`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={skill.percentage}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
