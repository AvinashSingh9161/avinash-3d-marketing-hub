import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/layout/PageLayout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            x: index % 2 === 0 ? -80 : 80,
            rotateY: index % 2 === 0 ? -15 : 15
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1,
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
  const services = [
    {
      title: "Social Media Management",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z"/>
          <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z"/>
        </svg>
      ),
      description: "Comprehensive social media management services to build and enhance your brand presence across various platforms.",
      details: [
        "Strategic content planning tailored to your brand voice and audience preferences",
        "Creative post design using tools like Canva and Adobe Illustrator",
        "Targeted hashtag research to maximize content visibility",
        "Active community engagement and reputation management",
        "Regular performance analysis and strategy refinement",
        "Platform-specific optimization for Facebook, Instagram, LinkedIn, and Twitter"
      ]
    },
    {
      title: "Paid Advertising",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
        </svg>
      ),
      description: "Data-driven paid advertising campaigns on multiple platforms to maximize your ROI and reach your target audience.",
      details: [
        "Strategic campaign setup aligned with your business objectives",
        "Precise audience targeting based on demographics, interests, and behaviors",
        "Compelling ad copywriting and creative design that drives conversions",
        "Budget allocation and optimization for maximum return on investment",
        "A/B testing to refine ad performance and campaign effectiveness",
        "Comprehensive performance reporting and ROI analysis"
      ]
    },
    {
      title: "SEO Services",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
          <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
        </svg>
      ),
      description: "Comprehensive SEO strategies to improve your website's search engine rankings and drive organic traffic.",
      details: [
        "Thorough website audits to identify technical issues and opportunities",
        "On-page optimization for improved search engine visibility",
        "In-depth keyword research using tools like Ahrefs and Google Search Console",
        "Strategic content creation and optimization for targeted keywords",
        "Backlink building strategies to enhance domain authority",
        "Regular performance monitoring and strategy adjustment"
      ]
    },
    {
      title: "Content Marketing",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z"/>
        </svg>
      ),
      description: "Engaging content creation and distribution strategies that build brand authority and engage your target audience.",
      details: [
        "Strategic content planning aligned with your business objectives",
        "Creating valuable, relevant content for your target audience",
        "Blog writing, email newsletters, and social media content",
        "Visual content creation including infographics and videos",
        "Content optimization for search engines and social sharing",
        "Content performance analysis and strategy refinement"
      ]
    },
    {
      title: "Analytics & Reporting",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 14v1H0V0h1v14h15zM5 13H3V8h2v5zm4 0H7V3h2v10zm4 0h-2V6h2v7z"/>
        </svg>
      ),
      description: "Comprehensive data analysis and reporting to track performance and optimize your marketing strategies.",
      details: [
        "Setting up tracking and measurement tools for accurate data collection",
        "Regular performance reports with actionable insights",
        "Analysis of key performance indicators (KPIs) relevant to your goals",
        "Competitive analysis and benchmarking",
        "Identifying trends and opportunities for improvement",
        "Data-driven recommendations for strategy refinement"
      ]
    },
    {
      title: "Email Marketing",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
          <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
        </svg>
      ),
      description: "Effective email marketing campaigns to nurture leads, build relationships, and drive conversions.",
      details: [
        "Strategic email campaign planning and implementation",
        "Engaging email content creation and design",
        "Audience segmentation for targeted messaging",
        "A/B testing to optimize open rates and click-through rates",
        "Automated email sequences for lead nurturing",
        "Performance analysis and campaign optimization"
      ]
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": service.title,
        "description": service.description
      }
    }))
  };

  return (
    <PageLayout>
      <Helmet>
        <title>Digital Marketing Services | Avinash Singh | SEO, Social Media & PPC</title>
        <meta name="description" content="Professional digital marketing services by Avinash Singh: Social Media Management, SEO, PPC Advertising, Content Marketing, Analytics & Email Marketing for business growth." />
        <meta name="keywords" content="digital marketing services, SEO services, social media management, PPC advertising, content marketing, email marketing, Avinash Singh, digital marketing India" />
        <link rel="canonical" href="https://avinashsingh.com/services" />
        
        <meta property="og:title" content="Digital Marketing Services by Avinash Singh" />
        <meta property="og:description" content="Comprehensive digital marketing solutions including SEO, Social Media, PPC & Content Marketing" />
        <meta property="og:url" content="https://avinashsingh.com/services" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      {/* Header */}
      <section className="py-20 bg-gradient-animation relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4 text-white">My Services</h1>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Comprehensive digital marketing solutions to help your business grow online
            </p>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold font-poppins mb-6">How I Can Help You</h2>
            <p className="text-gray-600">
              I offer a range of digital marketing services designed to help businesses establish their online presence, 
              attract their target audience, and convert visitors into customers. Each service is customized to meet your 
              specific business needs and objectives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                ref={(el) => (cardsRef.current[index] = el)}
                className="card-3d p-8 flex flex-col h-full"
              >
                <div className="text-brand-purple mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mt-auto">
                  {service.details.slice(0, 3).map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-brand-blue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-600 text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Detailed Service Descriptions */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-poppins mb-4">Service Details</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto mb-6"></div>
            </div>
            
            <div className="space-y-16">
              {services.map((service, index) => (
                <div key={index} className="card-3d p-8">
                  <div className="flex items-start mb-6">
                    <div className="text-brand-purple mr-6">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="pl-0 md:pl-16">
                    <h4 className="text-lg font-semibold mb-4">What's Included:</h4>
                    <ul className="space-y-3">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-brand-blue mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-animation -z-10" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6 text-white">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Let's work together to create a customized digital marketing strategy that will help you achieve your business goals.
            </p>
            <div className="flex justify-center">
              <a 
                href="/contact"
                className="bg-white text-brand-purple hover:bg-white/90 font-medium px-6 py-3 rounded-md transition-colors shadow-lg"
              >
                Request a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
