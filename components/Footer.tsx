import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    'Civil Engineering',
    'Project Management',
    'Environmental Services',
    'Town Planning',
    'Electrical Engineering'
  ];

  const company = [
    'About Us',
    'Leadership',
    'Careers',
    'Insights',
    'Contact Us'
  ];

  return (
    <footer className="bg-brand-blue text-white pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-3 w-fit rounded-sm">
                <img 
                src="/assets/mamadi_and_company_International_logo.png" 
                alt="Mamadi & Company" 
                className="h-8 md:h-10 w-auto object-contain"
                />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              We are a multi-disciplinary infrastructure development and consulting firm committed to excellence and sustainable community growth.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-brand-gold font-semibold text-lg mb-6">Our Expertise</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white text-sm flex items-center gap-2 group transition-colors">
                    <ChevronRight size={14} className="text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-brand-gold font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-white text-sm flex items-center gap-2 group transition-colors">
                     <ChevronRight size={14} className="text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-brand-gold font-semibold text-lg mb-6">Get in Touch</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-3 text-gray-300 text-sm group">
                <MapPin size={20} className="text-brand-gold shrink-0 mt-0.5 group-hover:text-white transition-colors" />
                <span className="leading-relaxed">
                  Head Office<br/>
                  Building 2, Country Club Estate<br/>
                  21 Woodlands Drive, Woodmead<br/>
                  Johannesburg, 2080
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm group">
                <Phone size={20} className="text-brand-gold shrink-0 group-hover:text-white transition-colors" />
                <span>+27 (0) 11 805 0000</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm group">
                <Mail size={20} className="text-brand-gold shrink-0 group-hover:text-white transition-colors" />
                <a href="mailto:info@mamadi.co.za" className="hover:text-white transition-colors">info@mamadi.co.za</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {currentYear} Mamadi & Company. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">PAIA Manual</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Component for Social Icons
const SocialIcon: React.FC<{ icon: React.ReactNode; href: string }> = ({ icon, href }) => {
  return (
    <a 
      href={href} 
      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
};