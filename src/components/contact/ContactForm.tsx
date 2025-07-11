
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader } from "lucide-react";
import emailjs from 'emailjs-com';

import { RateLimit, sanitize, securityLog } from "@/lib/security";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Enhanced security validation schema using Zod
const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name contains invalid characters" }),
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .max(254, { message: "Email address too long" }),
  subject: z.string()
    .max(100, { message: "Subject cannot exceed 100 characters" })
    .optional(),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(2000, { message: "Message cannot exceed 2000 characters" }),
});

// Security configuration
const EMAILJS_CONFIG = {
  publicKey: "XN33EQ1OGfmxBQvG1",
  serviceId: "service_vt6nce2",
  templateId: "template_as969ew"
} as const;

// Initialize rate limiter
const contactFormRateLimit = new RateLimit(3, 60000); // 3 submissions per minute

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get client identifier for rate limiting (fallback for IP)
  const getClientId = useCallback((): string => {
    return 'contact-form-' + (navigator.userAgent + window.location.href).slice(0, 20);
  }, []);

  // Initialize react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const clientId = getClientId();
    
    // Enhanced security checks
    if (!contactFormRateLimit.check(clientId)) {
      const remainingTime = Math.ceil(contactFormRateLimit.getRemainingTime(clientId) / 1000);
      securityLog.rateLimitExceeded(clientId);
      toast({
        title: "Rate limit exceeded",
        description: `Please wait ${remainingTime} seconds before submitting another message.`,
        variant: "destructive"
      });
      return;
    }

    // Additional input validation
    if (!sanitize.name(data.name)) {
      securityLog.suspiciousInput(data.name, 'Invalid name format');
      toast({
        title: "Invalid input",
        description: "Please enter a valid name.",
        variant: "destructive"
      });
      return;
    }

    if (!sanitize.email(data.email)) {
      securityLog.suspiciousInput(data.email, 'Invalid email format');
      toast({
        title: "Invalid input",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate configuration exists
      if (!EMAILJS_CONFIG.publicKey || !EMAILJS_CONFIG.serviceId || !EMAILJS_CONFIG.templateId) {
        throw new Error('EmailJS configuration is incomplete');
      }

      // Initialize EmailJS with secure configuration
      emailjs.init(EMAILJS_CONFIG.publicKey);
      
      // Sanitize and escape data for security (multiple layers)
      const sanitizedData = {
        from_name: sanitize.html(sanitize.removeScripts(data.name.trim())),
        from_email: sanitize.html(data.email.trim().toLowerCase()),
        subject: sanitize.html(sanitize.removeScripts((data.subject || "Contact Form Submission").trim())),
        message: sanitize.html(sanitize.removeScripts(data.message.trim())),
      };
      
      // Send the email using EmailJS with sanitized data
      const response = await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        sanitizedData
      );
      
      console.log("Email sent successfully:", response);
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon."
      });
      
      // Reset form after successful submission
      form.reset();
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="What's this regarding?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell me about your project or inquiry..." 
                      rows={6} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-brand-purple to-brand-blue hover:opacity-90 w-full md:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : "Send Message"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactForm;
