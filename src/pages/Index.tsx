import { Helmet } from "react-helmet-async";
import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import ContactCTA from "@/components/home/ContactCTA";

const Index = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://avinashsingh.com/#person",
        "name": "Avinash Singh",
        "url": "https://avinashsingh.com",
        "image": "https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg",
        "jobTitle": "Digital Marketing Specialist",
        "description": "Expert Digital Marketing Specialist with 2+ years of experience in SEO, Social Media Management, PPC, and Content Marketing",
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
        "sameAs": [
          "https://avinashsingh.com"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://avinashsingh.com/#service",
        "name": "Avinash Singh Digital Marketing Services",
        "url": "https://avinashsingh.com",
        "description": "Professional digital marketing services including SEO, social media management, PPC advertising, and content marketing to help businesses grow online",
        "provider": {
          "@id": "https://avinashsingh.com/#person"
        },
        "areaServed": {
          "@type": "Place",
          "name": "India"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Digital Marketing Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "SEO Services",
                "description": "Search Engine Optimization to improve website rankings and organic traffic"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Social Media Management",
                "description": "Strategic social media management across all major platforms"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "PPC Advertising",
                "description": "Pay-per-click advertising campaigns for maximum ROI"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://avinashsingh.com/#website",
        "url": "https://avinashsingh.com",
        "name": "Avinash Singh - Digital Marketing Specialist",
        "description": "Professional digital marketing services by Avinash Singh - SEO, Social Media, PPC & Content Marketing expert",
        "publisher": {
          "@id": "https://avinashsingh.com/#person"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://avinashsingh.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Avinash Singh | Digital Marketing Specialist | SEO Expert India</title>
        <meta name="description" content="Avinash Singh - Professional Digital Marketing Specialist with 2+ years experience in SEO, Social Media Management, PPC & Content Marketing. Helping businesses grow online in India." />
        <meta name="keywords" content="Avinash Singh, digital marketing specialist, SEO expert, social media marketing, PPC advertising, content marketing, digital marketing India, Avinash Singh digital marketer" />
        <link rel="canonical" href="https://avinashsingh.com/" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://avinashsingh.com/" />
        <meta property="og:title" content="Avinash Singh | Digital Marketing Specialist | SEO Expert" />
        <meta property="og:description" content="Professional Digital Marketing services by Avinash Singh. Expert in SEO, Social Media, PPC & Content Marketing. Transform your online presence." />
        <meta property="og:image" content="https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://avinashsingh.com/" />
        <meta name="twitter:title" content="Avinash Singh | Digital Marketing Specialist" />
        <meta name="twitter:description" content="Expert Digital Marketing services - SEO, Social Media, PPC & Content Marketing" />
        <meta name="twitter:image" content="https://i.postimg.cc/FzVmC0rk/Whats-App-Image-2025-05-07-at-17-14-34-420a56a6.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <PageLayout>
        <HeroSection />
        <AboutPreview />
        <ServicesSection />
        <PortfolioPreview />
        <ContactCTA />
      </PageLayout>
    </>
  );
};

export default Index;
