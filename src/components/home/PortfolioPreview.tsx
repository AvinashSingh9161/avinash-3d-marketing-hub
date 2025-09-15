
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Star } from "lucide-react";
import educationCampaignImage from "@/assets/education-social-campaign.jpg";
import seoProjectImage from "@/assets/ias-seo-project.jpg";
import ppcCampaignImage from "@/assets/elearning-ppc-campaign.jpg";

const PortfolioPreview = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  
  const projects = [
    {
      title: "Social Media Campaign",
      category: "Marketing",
      image: educationCampaignImage,
      description: "Comprehensive social media strategy for an education platform with 300% engagement increase",
      tags: ["Social Media", "Strategy", "Content"],
      client: "EduTech Solutions",
      results: "+300% Engagement"
    },
    {
      title: "SEO Optimization",
      category: "Marketing", 
      image: seoProjectImage,
      description: "Website optimization resulting in 60% organic traffic increase and improved search rankings",
      tags: ["SEO", "Analytics", "Growth"],
      client: "Tech Startup",
      results: "+60% Traffic"
    },
    {
      title: "PPC Ad Campaign",
      category: "Design",
      image: ppcCampaignImage,
      description: "Google Ads campaign with 4.5x return on ad spend and conversion optimization",
      tags: ["PPC", "Design", "ROI"],
      client: "E-commerce Brand",
      results: "4.5x ROAS"
    }
  ];

  const filters = ["All", "Design", "Marketing", "Branding"];
  
  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="particles-bg"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 gradient-text">
            Featured Work
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Explore my latest projects showcasing innovative design and strategic digital marketing solutions
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className="glass-card p-2 rounded-2xl border border-white/20">
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeFilter === filter
                      ? 'neon-button text-white'
                      : 'text-muted-foreground hover:text-purple-400'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className="tilt-card card-3d overflow-hidden group perspective-1000 h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-64">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="flex gap-4">
                    <button className="glass-card p-3 rounded-full hover:bg-white/20 transition-colors">
                      <Eye className="w-5 h-5 text-white" />
                    </button>
                    <button className="glass-card p-3 rounded-full hover:bg-white/20 transition-colors">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 glass-card px-3 py-1 rounded-full border border-white/20">
                  <span className="text-sm font-semibold text-purple-300">{project.category}</span>
                </div>
              </div>
              
              {/* Project Info */}
              <div className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-foreground font-space">{project.title}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-muted-foreground">4.9</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 flex-grow leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Client & Results */}
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <div>
                    <p className="text-xs text-muted-foreground">Client</p>
                    <p className="text-sm font-semibold text-foreground">{project.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Results</p>
                    <p className="text-sm font-semibold gradient-text">{project.results}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="neon-button font-semibold px-8 py-4 text-lg rounded-xl">
            <Link to="/portfolio" className="flex items-center gap-2">
              View All Projects
              <ExternalLink className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPreview;
