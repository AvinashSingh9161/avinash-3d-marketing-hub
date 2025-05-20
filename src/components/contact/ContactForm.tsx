
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import emailjs from 'emailjs-com';
import { Loader } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Initialize EmailJS with your public key
      emailjs.init("XN33EQ1OGfmxBQvG1");
      
      // Send the email using EmailJS
      const response = await emailjs.send(
        "service_vt6nce2", // EmailJS service ID
        "template_as969ew", // EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || "Contact Form Submission",
          message: formData.message,
        }
      );
      
      console.log("Email sent successfully:", response);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon."
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:w-2/3">
      <div className="card-3d p-8">
        <h2 className="text-2xl font-bold font-poppins mb-6">Send Me a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter your full name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Enter your email" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="What's this regarding?" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <Textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={6} placeholder="Tell me about your project or inquiry..." />
          </div>
          <Button type="submit" disabled={isSubmitting} className="bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 w-full md:w-auto">
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
