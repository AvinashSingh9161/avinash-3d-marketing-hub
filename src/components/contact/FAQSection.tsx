
import React from "react";

const FAQSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about my services and collaboration process
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <div className="card-3d p-6">
              <h3 className="text-lg font-bold mb-2">What types of businesses do you work with?</h3>
              <p className="text-gray-600">
                I work with a variety of businesses across different industries, including education, e-commerce, technology, and professional services. My approach is adaptable to meet the unique needs of each client regardless of size or industry.
              </p>
            </div>
            
            <div className="card-3d p-6">
              <h3 className="text-lg font-bold mb-2">How long does it take to see results from digital marketing efforts?</h3>
              <p className="text-gray-600">
                Results timeline varies based on many factors including your current online presence, competition, and specific goals. Generally, paid advertising can yield results within weeks, while SEO and organic social media growth typically take 3-6 months to show significant improvement.
              </p>
            </div>
            
            <div className="card-3d p-6">
              <h3 className="text-lg font-bold mb-2">Do you offer one-time projects or only ongoing services?</h3>
              <p className="text-gray-600">
                I offer both one-time projects (like campaign setup or website SEO audit) and ongoing monthly services. Many clients start with a specific project and transition to ongoing support as they see the value and results of the work.
              </p>
            </div>
            
            <div className="card-3d p-6">
              <h3 className="text-lg font-bold mb-2">What's your approach to reporting and measuring success?</h3>
              <p className="text-gray-600">
                I believe in transparent, data-driven reporting. Clients receive regular reports with key metrics aligned to their business goals. I focus not just on vanity metrics but on meaningful KPIs that demonstrate real business impact, such as leads generated, conversion rates, and ROI.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
