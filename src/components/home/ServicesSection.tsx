
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import socialMediaImage from "@/assets/social-media-campaign.jpg";
import seoImage from "@/assets/seo-optimization.jpg";
import ppcImage from "@/assets/ppc-advertising.jpg";

const ServicesSection = () => {
  const services = [
    {
      title: "Social Media Management",
      image: socialMediaImage,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
          <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
        </svg>
      ),
      description: "Strategic content planning, post design, hashtag research, and community engagement to grow your social media presence and increase brand awareness.",
      features: ["Content Planning", "Post Design", "Hashtag Research", "Community Engagement"]
    },
    {
      title: "Paid Advertising",
      image: ppcImage,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
        </svg>
      ),
      description: "Effective ad campaigns across multiple platforms with precise audience targeting, compelling ad copy, and budget optimization to maximize ROI.",
      features: ["Campaign Setup", "Audience Targeting", "Ad Copywriting", "Budget Optimization"]
    },
    {
      title: "SEO Services",
      image: seoImage,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
          <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
        </svg>
      ),
      description: "Comprehensive SEO strategies including website audits, on-page optimization, keyword research, and backlink building to improve search rankings.",
      features: ["SEO Audits", "On-page Optimization", "Keyword Research", "Backlink Strategies"]
    }
  ];

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 animate-fade-in">
          <div className="badge-modern mb-8 inline-block">
            <span>🎨 Creative Solutions</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-playfair mb-8 gradient-text">My Expertise</h2>
          <div className="w-40 h-2 bg-designer-gradient mx-auto mb-10 rounded-full shadow-neon"></div>
          <p className="text-muted-foreground max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed font-space font-light">
            Transforming brands through innovative digital strategies, compelling visual narratives, and data-driven creative campaigns that deliver exceptional results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div key={index} className="card-glass p-10 flex flex-col h-full group animate-scale-in design-highlight" style={{ animationDelay: `${index * 0.2}s` }}>
              {/* Service Image */}
              <div className="mb-10 rounded-3xl overflow-hidden shadow-designer">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="text-brand-primary mb-8 group-hover:scale-110 group-hover:text-brand-accent transition-all duration-500">
                {service.icon}
              </div>
              <h3 className="text-3xl font-bold mb-8 font-playfair group-hover:text-brand-primary transition-colors duration-500">{service.title}</h3>
              <p className="text-muted-foreground mb-10 flex-grow leading-relaxed text-lg font-space">{service.description}</p>
              <ul className="mb-10 space-y-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center group-hover:translate-x-3 transition-transform duration-500" style={{ transitionDelay: `${idx * 0.1}s` }}>
                    <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center mr-4 group-hover:bg-brand-primary/30 transition-colors duration-300">
                      <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span className="text-base font-medium font-space">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-20 animate-fade-in">
          <Button asChild size="lg" className="shadow-designer glow-effect px-12 py-6 text-xl rounded-2xl font-space font-bold">
            <Link to="/services">Explore All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
