import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/layout/PageLayout";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
        <section className="py-20" id="about">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">About Me</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto mb-6"></div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/2">
                <div className="relative mb-8 flex justify-center lg:justify-start">
                  <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white shadow-3d">
                    <Avatar className="w-full h-full">
                      <AvatarImage 
                        src="https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg" 
                        alt="Avinash Singh - Digital Marketing Specialist" 
                        className="w-full h-full object-cover" 
                      />
                    </Avatar>
                  </div>
                </div>
                <div className="card-3d p-6">
                  <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                  <ul className="space-y-4">
                    <li className="flex flex-wrap">
                      <span className="font-semibold w-32">Name:</span>
                      <span className="text-gray-600">Avinash Singh</span>
                    </li>
                    <li className="flex flex-wrap">
                      <span className="font-semibold w-32">Location:</span>
                      <span className="text-gray-600">Pratapgarh, Uttar Pradesh, India</span>
                    </li>
                    <li className="flex flex-wrap">
                      <span className="font-semibold w-32">Email:</span>
                      <span className="text-gray-600">Kuwar.avinashsingh82@gmail.com</span>
                    </li>
                    <li className="flex flex-wrap">
                      <span className="font-semibold w-32">Experience:</span>
                      <span className="text-gray-600">2+ Years</span>
                    </li>
                    <li className="flex flex-wrap">
                      <span className="font-semibold w-32">Languages:</span>
                      <span className="text-gray-600">English, Hindi</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2">
                <h3 className="text-3xl font-bold font-poppins mb-6">Avinash Singh</h3>
                <h4 className="text-xl font-semibold text-brand-purple mb-4">Digital Marketing Specialist</h4>
                
                <p className="text-gray-600 mb-6">
                  I'm a passionate digital marketing professional with 2+ years of experience, specializing in helping brands establish a strong online presence and drive growth through data-driven strategies and creative campaigns.
                </p>
                
                <p className="text-gray-600 mb-6">
                  With a background in Mechanical Engineering and specialized skills in digital marketing, I bring an analytical mindset combined with creative problem-solving to every project I take on.
                </p>
                
                <p className="text-gray-600 mb-6">
                  My approach focuses on understanding business goals and target audiences to create tailored marketing solutions that deliver measurable results, whether it's increasing brand awareness, generating leads, or driving conversions.
                </p>
                
                <div className="flex flex-wrap gap-3 mt-8">
                  <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">SEO</span>
                  <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">Social Media</span>
                  <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">Content Marketing</span>
                  <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">PPC</span>
                  <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">Analytics</span>
                  <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">Email Marketing</span>
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
