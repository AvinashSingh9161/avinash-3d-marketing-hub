import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import educationCampaignImage from "@/assets/education-social-campaign.jpg";
import seoProjectImage from "@/assets/ias-seo-project.jpg";
import ppcCampaignImage from "@/assets/elearning-ppc-campaign.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PortfolioPreview = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            y: 100,
            rotateX: 45
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
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
  const projects = [
    {
      title: "Social Media Campaign",
      category: "Social Media",
      image: educationCampaignImage,
      description: "Comprehensive social media strategy for an education platform"
    },
    {
      title: "SEO Optimization",
      category: "SEO",
      image: seoProjectImage,
      description: "Website optimization resulting in 60% organic traffic increase"
    },
    {
      title: "PPC Ad Campaign",
      category: "Paid Advertising",
      image: ppcCampaignImage,
      description: "Google Ads campaign with 4.5x return on ad spend"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Featured Work</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Take a look at some of my recent digital marketing projects and campaigns
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="card-3d overflow-hidden group"
            >
              <div className="relative overflow-hidden" style={{ paddingBottom: '70%' }}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium">{project.category}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <Link to="/portfolio" className="text-brand-purple font-medium hover:text-brand-blue transition-colors">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild>
            <Link to="/portfolio">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
