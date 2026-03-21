import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

interface FooterProps {
  setView: (view: 'home' | 'about' | 'projects' | 'contact' | 'insights') => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'Civil Engineering',       view: 'projects' as const },
    { label: 'Project Management',      view: 'projects' as const },
    { label: 'Environmental Services',  view: 'projects' as const },
    { label: 'Town Planning',           view: 'projects' as const },
    { label: 'Electrical Engineering',  view: 'projects' as const },
  ];

  const company = [
    { label: 'About Us',   view: 'about'   as const },
    { label: 'Leadership', view: 'about'   as const },
    { label: 'Careers',    view: 'contact' as const },
    { label: 'Insights',   view: 'insights' as const },
    { label: 'Contact Us', view: 'contact' as const },
  ];

  return (
    <footer className="bg-white text-brand-blue pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <div className="w-fit">
                <img 
                src="/assets/mamadi_and_company_International_logo.png" 
                alt="Mamadi & Company" 
                className="h-8 md:h-10 w-auto object-contain"
                />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
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
                <li key={item.label}>
                  <button onClick={() => setView(item.view)} className="text-gray-500 hover:text-brand-gold text-sm flex items-center gap-2 group transition-colors">
                    <ChevronRight size={14} className="text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-brand-gold font-semibold text-lg mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <button onClick={() => setView(item.view)} className="text-gray-500 hover:text-brand-gold text-sm flex items-center gap-2 group transition-colors">
                    <ChevronRight size={14} className="text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Connect</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-brand-gold" />
                <span>Johannesburg, South Africa</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-brand-gold" />
                <span>+27 (0) 11 000 0000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-brand-gold" />
                <span>info@mamadi.co.za</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {currentYear} Mamadi & Company. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-blue transition-colors">PAIA Manual</a>
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
      className="w-8 h-8 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  );
};