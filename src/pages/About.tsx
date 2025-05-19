
import PageLayout from "@/components/layout/PageLayout";

const About = () => {
  // Skills data
  const skills = [
    { name: "SEO", percentage: 90 },
    { name: "Social Media Management", percentage: 95 },
    { name: "Content Marketing", percentage: 85 },
    { name: "Paid Advertising", percentage: 80 },
    { name: "Analytics", percentage: 75 },
    { name: "Email Marketing", percentage: 70 },
    { name: "Graphic Design", percentage: 60 },
  ];
  
  // Experience data
  const experiences = [
    {
      position: "Digital Marketing Specialist",
      company: "VisionTech PVT LTD",
      period: "2023 - Present",
      description: "Leading digital marketing efforts including social media management, SEO optimization, and paid advertising campaigns. Developed and executed comprehensive marketing strategies resulting in increased brand awareness and lead generation."
    },
    {
      position: "Freelance Digital Marketer",
      company: "Self-employed",
      period: "2021 - 2023",
      description: "Provided digital marketing services to clients including Prime Academy, NextAchiever's IAS & Cadets Prime. Managed social media accounts, created content strategies, and implemented SEO best practices."
    }
  ];
  
  // Education data
  const education = [
    {
      degree: "Bachelor of Technology in Mechanical Engineering",
      institution: "SRMS College of Engineering & Technology",
      year: "2020",
      description: "Graduated with honors, developing strong analytical and problem-solving skills that I now apply to digital marketing analytics and strategy development."
    }
  ];

  return (
    <PageLayout>
      {/* Header */}
      <section className="py-20 bg-gradient-animation relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-poppins mb-4 text-white">About Me</h1>
            <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg text-white/90 max-w-3xl mx-auto">
              Get to know more about me, my experience, and my approach to digital marketing
            </p>
          </div>
        </div>
      </section>
      
      {/* Personal Info */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="relative mb-8">
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white shadow-3d mx-auto lg:mx-0">
                  <img 
                    src="/placeholder.svg" 
                    alt="Avinash Singh" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="card-3d p-6">
                <h3 className="text-xl font-bold mb-4">Personal Information</h3>
                <ul className="space-y-4">
                  <li className="flex flex-wrap">
                    <span className="font-semibold w-32">Name:</span>
                    <span className="text-gray-600">Avinash Singh</span>
                  </li>
                  <li className="flex flex-wrap">
                    <span className="font-semibold w-32">Location:</span>
                    <span className="text-gray-600">Bareilly, Uttar Pradesh, India</span>
                  </li>
                  <li className="flex flex-wrap">
                    <span className="font-semibold w-32">Email:</span>
                    <span className="text-gray-600">contact@avinashsingh.com</span>
                  </li>
                  <li className="flex flex-wrap">
                    <span className="font-semibold w-32">Experience:</span>
                    <span className="text-gray-600">2+ Years</span>
                  </li>
                  <li className="flex flex-wrap">
                    <span className="font-semibold w-32">Languages:</span>
                    <span className="text-gray-600">English, Hindi</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-bold font-poppins mb-6">Avinash Singh</h2>
              <h3 className="text-xl font-semibold text-brand-purple mb-4">Digital Marketing Specialist</h3>
              
              <p className="text-gray-600 mb-6">
                I'm a passionate digital marketing professional with 2 years of experience, specializing in helping brands establish a strong online presence and drive growth through data-driven strategies and creative campaigns.
              </p>
              
              <p className="text-gray-600 mb-6">
                With a background in Mechanical Engineering and specialized skills in digital marketing, I bring an analytical mindset combined with creative problem-solving to every project I take on.
              </p>
              
              <p className="text-gray-600 mb-6">
                My approach focuses on understanding business goals and target audiences to create tailored marketing solutions that deliver measurable results, whether it's increasing brand awareness, generating leads, or driving conversions.
              </p>
              
              <div className="flex flex-wrap gap-3 mt-8">
                <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">SEO</span>
                <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">Social Media</span>
                <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">Content Marketing</span>
                <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">PPC</span>
                <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">Analytics</span>
                <span className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm font-medium">Email Marketing</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">My Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-600">{skill.percentage}%</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-purple to-brand-blue rounded-full"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Work Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="card-3d p-8 relative">
                <div className="absolute top-8 left-0 w-1 h-[calc(100%-4rem)] bg-gradient-to-b from-brand-purple to-brand-blue"></div>
                <h3 className="text-xl font-bold mb-2">{exp.position}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="font-medium">{exp.company}</span>
                  <span className="mx-3">|</span>
                  <span>{exp.period}</span>
                </div>
                <p className="text-gray-600">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Education */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-brand-purple to-brand-blue mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-12">
            {education.map((edu, index) => (
              <div key={index} className="card-3d p-8">
                <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <span className="font-medium">{edu.institution}</span>
                  <span className="mx-3">|</span>
                  <span>{edu.year}</span>
                </div>
                <p className="text-gray-600">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
