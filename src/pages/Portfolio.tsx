import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/layout/PageLayout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Globe, Calendar } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/home/HeroSection";
import ContactCTA from "@/components/home/ContactCTA";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const skillBarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate skill bars
    skillBarsRef.current.forEach((bar, index) => {
      if (bar) {
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: bar.getAttribute("data-width") + "%",
            duration: 1.5,
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

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://avinashsingh.info/#person",
        "name": "Avinash Singh",
        "url": "https://avinashsingh.info",
        "image": "https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg",
        "jobTitle": "Digital Marketing Executive",
        "description": "Results-driven Digital Marketing Executive specializing in SEO, content strategy, and organic growth",
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "SRMS College of Engineering & Technology"
        },
        "email": "Kuwar.avinashsingh82@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Pratapgarh",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "India"
        },
        "knowsAbout": ["Digital Marketing", "SEO", "Social Media Marketing", "PPC Advertising", "Content Marketing", "Email Marketing", "Analytics"],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Digital Marketing Specialist",
          "skills": ["SEO", "Social Media Management", "Content Marketing", "PPC Advertising", "Analytics", "Email Marketing"]
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://avinashsingh.info/#service",
        "name": "Avinash Singh Digital Marketing Services",
        "url": "https://avinashsingh.info",
        "description": "Professional digital marketing services including SEO, social media management, PPC advertising, and content marketing to help businesses grow online",
        "provider": {
          "@id": "https://avinashsingh.info/#person"
        },
        "areaServed": {
          "@type": "Place",
          "name": "India"
        }
      }
    ]
  };

  // Skills data
  const skills = [
    { name: "SEO", percentage: 90 },
    { name: "Social Media Management", percentage: 95 },
    { name: "Content Marketing", percentage: 85 },
    { name: "Paid Advertising", percentage: 80 },
    { name: "Analytics", percentage: 75 },
    { name: "Email Marketing", percentage: 70 },
    { name: "Graphic Design", percentage: 60 },
  ];

  // Experience data
  const experiences = [{
    position: "Digital Marketing Specialist",
    company: "VisionTech PVT LTD",
    period: "2023 - Present",
    description: "Leading digital marketing efforts including social media management, SEO optimization, and paid advertising campaigns. Developed and executed comprehensive marketing strategies resulting in increased brand awareness and lead generation."
  }, {
    position: "Freelance Digital Marketer",
    company: "Self-employed",
    period: "2021 - 2023",
    description: "Provided digital marketing services to clients including Prime Academy, NextAchiever's IAS & Cadets Prime. Managed social media accounts, created content strategies, and implemented SEO best practices."
  }];

  return (
    <>
      <Helmet>
        <title>Avinash Singh | Digital Marketing Executive & SEO Specialist</title>
        <meta name="description" content="Avinash Singh is a results-driven Digital Marketing Executive specializing in SEO, content strategy, and organic growth. Explore my portfolio, case studies, and get in touch." />
        <meta name="keywords" content="Avinash Singh, digital marketing specialist, SEO expert, social media marketing, PPC advertising, content marketing, digital marketing India, Avinash Singh digital marketer" />
        <link rel="canonical" href="https://avinashsingh.info/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://avinashsingh.info/" />
        <meta property="og:title" content="Avinash Singh | Digital Marketing Executive & SEO Specialist" />
        <meta property="og:description" content="Avinash Singh is a results-driven Digital Marketing Executive specializing in SEO, content strategy, and organic growth. Explore my portfolio, case studies, and get in touch." />
        <meta property="og:image" content="https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://avinashsingh.info/" />
        <meta name="twitter:title" content="Avinash Singh | Digital Marketing Executive & SEO Specialist" />
        <meta name="twitter:description" content="Avinash Singh is a results-driven Digital Marketing Executive specializing in SEO, content strategy, and organic growth. Explore my portfolio, case studies, and get in touch." />
        <meta name="twitter:image" content="https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <PageLayout>
        {/* Hero Section from Home */}
        <HeroSection />
        
        {/* About Me Section */}
        <section className="relative py-24 overflow-hidden" id="about">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-4">
                  About <span className="bg-gradient-to-r from-brand-purple via-brand-blue to-brand-orange bg-clip-text text-transparent">Me</span>
                </h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-brand-purple via-brand-blue to-brand-orange mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Personal Information Card */}
                <div className="lg:col-span-1">
                  <Card className="relative overflow-hidden border-2 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-card to-accent/10">
                    {/* Decorative gradient line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple via-brand-blue to-brand-orange"></div>
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg" alt="Avinash Singh" />
                          </Avatar>
                        </div>
                        <CardTitle className="text-2xl bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">Personal Info</CardTitle>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="space-y-1.5 group">
                        <p className="font-semibold text-xs uppercase tracking-wide text-muted-foreground">Full Name</p>
                        <p className="text-lg font-semibold text-foreground group-hover:text-brand-purple transition-colors">Avinash Singh</p>
                      </div>
                      
                      <div className="space-y-1.5 group">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-brand-blue" />
                          <p className="font-semibold">Location</p>
                        </div>
                        <p className="text-base text-foreground group-hover:text-brand-blue transition-colors">Pratapgarh, Uttar Pradesh, India</p>
                      </div>
                      
                      <div className="space-y-1.5 group">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                          <Mail className="w-3.5 h-3.5 text-brand-purple" />
                          <p className="font-semibold">Email</p>
                        </div>
                        <p className="text-sm break-all text-foreground group-hover:text-brand-purple transition-colors">Kuwar.avinashsingh82@gmail.com</p>
                      </div>
                      
                      <div className="space-y-1.5 group">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 text-brand-orange" />
                          <p className="font-semibold">Experience</p>
                        </div>
                        <p className="text-base font-bold bg-gradient-to-r from-brand-orange to-brand-purple bg-clip-text text-transparent">2+ Years</p>
                      </div>
                      
                      <div className="space-y-1.5 group">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                          <Globe className="w-3.5 h-3.5 text-brand-blue" />
                          <p className="font-semibold">Languages</p>
                        </div>
                        <p className="text-base text-foreground group-hover:text-brand-blue transition-colors">English, Hindi</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                {/* About Content */}
                <div className="lg:col-span-2 space-y-8">
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-card via-card to-accent/5 hover:shadow-xl transition-all duration-500">
                    <CardContent className="p-8 space-y-6">
                      <div className="space-y-5 text-base leading-relaxed">
                        <p className="text-muted-foreground relative pl-6 border-l-4 border-brand-purple">
                          I'm a passionate digital marketing professional with <span className="font-bold text-foreground bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">2+ years of experience</span>, specializing in helping brands establish a strong online presence and drive growth through data-driven strategies and creative campaigns.
                        </p>
                        
                        <p className="text-muted-foreground relative pl-6 border-l-4 border-brand-blue">
                          With a background in <span className="font-bold text-foreground bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">Mechanical Engineering</span> and specialized skills in digital marketing, I bring an analytical mindset combined with creative problem-solving to every project I take on.
                        </p>
                        
                        <p className="text-muted-foreground relative pl-6 border-l-4 border-brand-orange">
                          My approach focuses on understanding business goals and target audiences to create tailored marketing solutions that deliver measurable results, whether it's increasing brand awareness, generating leads, or driving conversions.
                        </p>
                      </div>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6">
                        <div className="text-center p-4 rounded-lg bg-gradient-to-br from-brand-purple/10 to-brand-purple/5 border border-brand-purple/20">
                          <div className="text-3xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">50+</div>
                          <div className="text-xs text-muted-foreground font-medium mt-1">Projects</div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 border border-brand-blue/20">
                          <div className="text-3xl font-bold bg-gradient-to-r from-brand-blue to-brand-orange bg-clip-text text-transparent">30+</div>
                          <div className="text-xs text-muted-foreground font-medium mt-1">Clients</div>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-gradient-to-br from-brand-orange/10 to-brand-orange/5 border border-brand-orange/20 col-span-2 md:col-span-1">
                          <div className="text-3xl font-bold bg-gradient-to-r from-brand-orange to-brand-purple bg-clip-text text-transparent">2+</div>
                          <div className="text-xs text-muted-foreground font-medium mt-1">Years Exp.</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Skills Section */}
                  <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-accent/5 hover:shadow-xl transition-all duration-500">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">Core Competencies</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-brand-purple/50 to-transparent"></div>
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <Badge variant="secondary" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-brand-purple/10 to-brand-purple/5 border border-brand-purple/20 hover:from-brand-purple/20 hover:to-brand-purple/10 transition-all hover:scale-105">
                          SEO
                        </Badge>
                        <Badge variant="secondary" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-brand-blue/10 to-brand-blue/5 border border-brand-blue/20 hover:from-brand-blue/20 hover:to-brand-blue/10 transition-all hover:scale-105">
                          Social Media
                        </Badge>
                        <Badge variant="secondary" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-brand-orange/10 to-brand-orange/5 border border-brand-orange/20 hover:from-brand-orange/20 hover:to-brand-orange/10 transition-all hover:scale-105">
                          Content Marketing
                        </Badge>
                        <Badge variant="secondary" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 border border-brand-purple/20 hover:from-brand-purple/20 hover:to-brand-blue/20 transition-all hover:scale-105">
                          PPC
                        </Badge>
                        <Badge variant="secondary" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-brand-blue/10 to-brand-orange/10 border border-brand-blue/20 hover:from-brand-blue/20 hover:to-brand-orange/20 transition-all hover:scale-105">
                          Analytics
                        </Badge>
                        <Badge variant="secondary" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-brand-orange/10 to-brand-purple/10 border border-brand-orange/20 hover:from-brand-orange/20 hover:to-brand-purple/20 transition-all hover:scale-105">
                          Email Marketing
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Skills */}
        <section className="py-20 bg-gray-50" id="skills">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">My Skills & Expertise</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">Specialized skills honed through years of practical experience in the digital marketing industry.</p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
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
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Experience */}
        <section className="py-20" id="experience">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Professional Experience</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto mb-6"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">My journey in the digital marketing industry and the valuable experience I've gained along the way.</p>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="card-3d p-8 relative">
                  <div className="absolute top-8 left-0 w-1 h-[calc(100%-4rem)] bg-gradient-to-b from-brand-purple to-brand-blue"></div>
                  <h3 className="text-xl font-bold mb-2">{exp.position}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <span className="font-medium">{exp.company}</span>
                    <span className="mx-3">|</span>
                    <span>{exp.period}</span>
                  </div>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact CTA from Home */}
        <ContactCTA />
      </PageLayout>
    </>
  );
};

export default Portfolio;
