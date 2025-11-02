
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ContactCTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-animation -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6 text-white">
            Ready to Elevate Your Digital Marketing?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Let's collaborate to create data-driven marketing strategies that will help your business grow. 
            Contact me today to discuss how I can help you achieve your digital marketing goals.
          </p>
          <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-white/90 hover:text-purple-800">
            <Link to="/contact">
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
