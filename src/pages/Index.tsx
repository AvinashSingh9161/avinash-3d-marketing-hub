
import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesSection from "@/components/home/ServicesSection";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import ContactCTA from "@/components/home/ContactCTA";

const Index = () => {
  return (
    <PageLayout>
      <HeroSection />
      <AboutPreview />
      <ServicesSection />
      <PortfolioPreview />
      <TestimonialCarousel />
      <ContactCTA />
    </PageLayout>
  );
};

export default Index;
