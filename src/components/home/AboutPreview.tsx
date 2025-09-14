
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const AboutPreview = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in">
          <div className="badge-modern mb-6 inline-block">
            👋 Get to Know Me
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 gradient-text">About Me</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent mx-auto mb-8 rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/2 animate-slide-up">
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="relative">
                <Avatar className="w-48 h-48 border-4 border-white/30 shadow-elegant-xl glow-effect">
                  <AvatarImage 
                    src="https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg" 
                    alt="Avinash Singh - Digital Marketing Specialist" 
                    className="w-full h-full object-cover" 
                  />
                </Avatar>
                <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-lg rounded-2xl p-4 shadow-glass">
                  <div className="text-2xl font-bold text-brand-primary">5+</div>
                  <div className="text-xs font-semibold text-brand-primary">Years</div>
                </div>
              </div>
            </div>
            
            <h3 className="text-3xl font-bold mb-8 font-poppins gradient-text">My Background</h3>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              I'm a passionate Digital Marketing Specialist with 5+ years of experience helping brands establish their online presence and grow their audience. 
              With a background in Mechanical Engineering and specialized skills in digital marketing, I bring a unique analytical and creative perspective to marketing challenges.
            </p>
            <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
              Currently working at VisionTech PVT LTD while also helping clients like Prime Academy and NextAchiever's IAS drive their digital growth through targeted strategies.
            </p>
            
            <div className="mb-10">
              <h4 className="text-2xl font-semibold mb-6 font-poppins">Education</h4>
              <div className="card-glass p-6">
                <h5 className="font-bold text-lg text-brand-primary mb-2">Bachelor's in Mechanical Engineering</h5>
                <p className="text-muted-foreground font-medium">SRMS CET, 2020</p>
              </div>
            </div>
            
            <Button asChild size="lg" className="shadow-elegant glow-effect">
              <Link to="/about" className="font-semibold" aria-label="Learn more about Avinash Singh's digital marketing expertise">
                Learn More About Me
              </Link>
            </Button>
          </div>
          
          <div className="w-full lg:w-1/2 animate-scale-in">
            <div className="card-glass p-8 rounded-3xl">
              <h3 className="text-3xl font-bold mb-10 text-center font-poppins gradient-text">My Skills</h3>
              <div className="space-y-8">
                {[
                  { name: "SEO", percentage: 90 },
                  { name: "Social Media Management", percentage: 95 },
                  { name: "Content Marketing", percentage: 85 },
                  { name: "Paid Advertising", percentage: 80 },
                  { name: "Analytics", percentage: 88 }
                ].map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold text-foreground group-hover:text-brand-primary transition-colors duration-300 text-lg">{skill.name}</span>
                      <span className="text-brand-primary font-bold text-lg">{skill.percentage}%</span>
                    </div>
                    <div className="h-3 bg-surface-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full animate-pulse-glow transition-all duration-1000"
                        style={{ width: `${skill.percentage}%`, animationDelay: `${index * 0.2}s` }}
                        aria-label={`${skill.name} skill level: ${skill.percentage}%`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
