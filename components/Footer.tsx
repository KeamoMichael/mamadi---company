import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, ChevronRight } from 'lucide-react';

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
                src="/assets/Mamadi International - Official Logo.png" 
                alt="Mamadi International" 
                className="h-5 md:h-6 w-auto object-contain"
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
              <div className="flex items-start gap-3">
                <FooterContactIcon>
                  <MinimalFooterIcon variant="location" />
                </FooterContactIcon>
                <span>
                  22 Invicta Road<br />
                  Thandanani Office Park<br />
                  Midview, Carlswald<br />
                  1685
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FooterContactIcon>
                  <MinimalFooterIcon variant="phone" />
                </FooterContactIcon>
                <span>Tel | +27 11 532 8659</span>
              </div>
              <div className="flex items-center gap-3">
                <FooterContactIcon>
                  <MinimalFooterIcon variant="fax" />
                </FooterContactIcon>
                <span>Fax | +27 11 532 840</span>
              </div>
              <div className="flex items-center gap-3">
                <FooterContactIcon>
                  <MinimalFooterIcon variant="mail" />
                </FooterContactIcon>
                <span>info@mamadi.co.za</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {currentYear} Mamadi International. All rights reserved.</p>
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

const FooterContactIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="flex h-7 w-7 shrink-0 items-center justify-center text-brand-gold">
    {children}
  </span>
);

const MinimalFooterIcon: React.FC<{ variant: 'location' | 'phone' | 'fax' | 'mail' }> = ({ variant }) => {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.25,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  if (variant === 'location') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M12 21s6-6.1 6-11a6 6 0 0 0-12 0c0 4.9 6 11 6 11Z" />
        <circle cx="12" cy="10" r="1.8" />
      </svg>
    );
  }

  if (variant === 'phone') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M7.2 4.5 5.5 6.2c-.7.7-.8 1.7-.3 2.6a24 24 0 0 0 10 10c.9.5 1.9.4 2.6-.3l1.7-1.7-3.4-3.4-1.8 1.3c-2.1-1-4-2.9-5-5l1.3-1.8-3.4-3.4Z" />
      </svg>
    );
  }

  if (variant === 'fax') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M7 8V4h10v4" />
        <path d="M6 17H4v-7h16v7h-2" />
        <path d="M7 14h10v6H7z" />
        <path d="M9.5 16h5" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-hidden="true">
      <path d="M4.5 7.5h15v10h-15z" />
      <path d="m5 8 7 5 7-5" />
    </svg>
  );
};
