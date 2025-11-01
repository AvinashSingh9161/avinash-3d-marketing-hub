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
        "sameAs": [
          "https://avinashsingh.info"
        ]
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
        "@id": "https://avinashsingh.info/#website",
        "url": "https://avinashsingh.info",
        "name": "Avinash Singh - Digital Marketing Specialist",
        "description": "Professional digital marketing services by Avinash Singh - SEO, Social Media, PPC & Content Marketing expert",
        "publisher": {
          "@id": "https://avinashsingh.info/#person"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://avinashsingh.info/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

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
