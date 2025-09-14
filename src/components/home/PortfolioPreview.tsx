
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import educationCampaignImage from "@/assets/education-social-campaign.jpg";
import seoProjectImage from "@/assets/ias-seo-project.jpg";
import ppcCampaignImage from "@/assets/elearning-ppc-campaign.jpg";

const PortfolioPreview = () => {
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
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-fade-in">
          <div className="badge-modern mb-6 inline-block">
            🚀 Featured Work
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-poppins mb-6 gradient-text">Portfolio Highlights</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent mx-auto mb-8 rounded-full"></div>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Take a look at some of my recent successful campaigns and digital marketing projects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {projects.map((project, index) => (
            <div key={index} className="card-glass overflow-hidden group animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <div className="badge-modern text-white bg-white/20 backdrop-blur-sm border-white/30">
                    {project.category}
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-4 font-poppins group-hover:text-brand-primary transition-colors duration-300">{project.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                <Link 
                  to="/portfolio" 
                  className="inline-flex items-center text-brand-primary font-semibold hover:text-brand-secondary transition-colors duration-300 group-hover:translate-x-2 transform"
                >
                  View Details
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center animate-fade-in">
          <Button asChild size="lg" className="shadow-elegant glow-effect">
            <Link to="/portfolio" className="font-semibold">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
