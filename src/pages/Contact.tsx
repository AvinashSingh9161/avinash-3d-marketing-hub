
import PageLayout from "@/components/layout/PageLayout";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import FAQSection from "@/components/contact/FAQSection";

const Contact = () => {
  return (
    <PageLayout>
      <ContactHeader />
      
      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>
      
      <FAQSection />
    </PageLayout>
  );
};

export default Contact;
