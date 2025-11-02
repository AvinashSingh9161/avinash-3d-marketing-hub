import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/layout/PageLayout";
import educationCampaignImage from "@/assets/education-social-campaign.jpg";
import seoProjectImage from "@/assets/ias-seo-project.jpg";
import ppcCampaignImage from "@/assets/elearning-ppc-campaign.jpg";
import blogStrategyImage from "@/assets/blog-content-strategy.jpg";
import instagramGrowthImage from "@/assets/instagram-growth-campaign.jpg";
import localSeoImage from "@/assets/local-seo-project.jpg";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Project categories
  const categories = [
    { id: "all", name: "All" },
    { id: "social-media", name: "Social Media" },
    { id: "seo", name: "SEO" },
    { id: "paid-ads", name: "Paid Ads" },
    { id: "content", name: "Content Marketing" }
  ];

  // Project data
  const projects = [
    {
      id: 1,
      title: "Education Platform Social Campaign",
      category: "social-media",
      image: educationCampaignImage,
      description: "Comprehensive social media strategy for Prime Academy that increased engagement by 45% and follower growth by 30% over three months.",
      tags: ["Facebook", "Instagram", "Content Strategy"],
      services: ["Social Media Management", "Content Creation", "Community Engagement"]
    },
    {
      id: 2,
      title: "IAS Coaching Website SEO",
      category: "seo",
      image: seoProjectImage,
      description: "SEO optimization for NextAchiever's IAS coaching website resulting in 60% increase in organic traffic and improved search rankings for key terms.",
      tags: ["Technical SEO", "Keyword Optimization", "Content Strategy"],
      services: ["SEO Audit", "On-Page Optimization", "Link Building"]
    },
    {
      id: 3,
      title: "E-learning PPC Campaign",
      category: "paid-ads",
      image: ppcCampaignImage,
      description: "Google Ads campaign for Cadets Prime that achieved 4.5x return on ad spend and decreased cost per conversion by 28%.",
      tags: ["Google Ads", "Targeting", "Conversion Optimization"],
      services: ["PPC Management", "Ad Copywriting", "Campaign Optimization"]
    },
    {
      id: 4,
      title: "Blog Content Strategy",
      category: "content",
      image: blogStrategyImage,
      description: "Created and implemented a comprehensive blog content strategy that increased website traffic by 40% and improved lead generation.",
      tags: ["Content Planning", "SEO Writing", "Lead Generation"],
      services: ["Content Marketing", "SEO Writing", "Editorial Planning"]
    },
    {
      id: 5,
      title: "Instagram Growth Campaign",
      category: "social-media",
      image: instagramGrowthImage,
      description: "Managed an Instagram growth campaign that increased followers by 120% and engagement rate by 65% over four months.",
      tags: ["Instagram", "Visual Content", "Community Building"],
      services: ["Instagram Management", "Visual Design", "Influencer Outreach"]
    },
    {
      id: 6,
      title: "Local Business SEO Project",
      category: "seo",
      image: localSeoImage,
      description: "Local SEO optimization for a retail business that improved Google Maps visibility and increased foot traffic by 35%.",
      tags: ["Local SEO", "Google Business Profile", "Citation Building"],
      services: ["Local SEO", "GMB Optimization", "Review Management"]
    }
  ];

  // Services offered
  const services = [
    {
      title: "SEO Optimization",
      description: "Comprehensive SEO strategies to improve rankings and drive organic traffic",
      icon: "🔍"
    },
    {
      title: "Social Media Management",
      description: "Strategic social media management across all major platforms",
      icon: "📱"
    },
    {
      title: "PPC Advertising",
      description: "Data-driven paid advertising campaigns for maximum ROI",
      icon: "💰"
    },
    {
      title: "Content Marketing",
      description: "Engaging content that builds brand authority and drives conversions",
      icon: "✍️"
    },
    {
      title: "Analytics & Reporting",
      description: "Comprehensive data analysis and performance tracking",
      icon: "📊"
    },
    {
      title: "Email Marketing",
      description: "Targeted email campaigns that nurture leads and drive sales",
      icon: "✉️"
    }
  ];

  // Filter projects based on active category
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Digital Marketing Projects by Avinash Singh",
    "description": "Showcase of completed digital marketing projects including SEO, social media, PPC, and content marketing campaigns",
    "url": "https://avinashsingh.info/projects"
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Projects & Services | Avinash Singh | Digital Marketing Portfolio</title>
        <meta name="description" content="Explore my digital marketing projects and services including SEO, social media campaigns, PPC advertising, and content marketing with proven results." />
        <meta name="keywords" content="digital marketing projects, SEO case studies, social media campaigns, PPC projects, content marketing portfolio, Avinash Singh work" />
        <link rel="canonical" href="https://avinashsingh.info/projects" />
        
        <meta property="og:title" content="Projects & Services | Avinash Singh" />
        <meta property="og:description" content="Explore my digital marketing projects and services with proven results" />
        <meta property="og:url" content="https://avinashsingh.info/projects" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Header */}
      <section className="py-20 bg-gradient-animation relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4 text-white">My Projects & Services</h1>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Showcasing my completed projects and the services I provide to help businesses grow online
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Services I Provide</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive digital marketing solutions tailored to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card-3d p-8 text-center hover:shadow-3d-hover transition-all duration-300">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Completed Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real results from real projects across various industries and platforms
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center mb-12 gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-brand-purple text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div key={project.id} className="card-3d overflow-hidden group cursor-pointer">
                <div className="relative overflow-hidden" style={{ paddingBottom: '70%' }}>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span key={index} className="text-xs font-medium bg-white/20 text-white px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Services Provided:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, index) => (
                        <span key={index} className="text-xs font-medium bg-brand-purple/10 text-brand-purple px-2 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Client Feedback</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Here's what my clients have to say about working with me
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-3d p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-bold text-gray-600">PA</span>
                </div>
                <div>
                  <h4 className="font-bold">Priyanka Agarwal</h4>
                  <p className="text-sm text-gray-600">Prime Academy</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Avinash transformed our social media presence completely. His content strategy helped us connect with our target audience more effectively, resulting in higher engagement and conversion rates."
              </p>
              <div className="flex text-brand-orange gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="card-3d p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-bold text-gray-600">RK</span>
                </div>
                <div>
                  <h4 className="font-bold">Rahul Kumar</h4>
                  <p className="text-sm text-gray-600">NextAchiever's IAS</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The SEO improvements Avinash implemented have completely changed our online visibility. Our website now ranks on the first page for multiple high-value keywords, driving quality traffic and student applications."
              </p>
              <div className="flex text-brand-orange gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="card-3d p-8">
              <div className="flex items-center mb-6">
                <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                  <span className="font-bold text-gray-600">SS</span>
                </div>
                <div>
                  <h4 className="font-bold">Sandeep Sharma</h4>
                  <p className="text-sm text-gray-600">Cadets Prime</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Working with Avinash on our Google Ads campaign was an excellent decision. His targeting strategy and ongoing optimization helped us achieve amazing ROI and connect with the right audience at the right time."
              </p>
              <div className="flex text-brand-orange gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-animation -z-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6 text-white">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Let's work together to create a digital marketing strategy that delivers real results for your business.
            </p>
            <div className="flex justify-center">
              <a 
                href="/contact"
                className="bg-white text-brand-purple hover:bg-white/90 font-medium px-8 py-4 rounded-md transition-colors shadow-lg text-lg"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Projects;
