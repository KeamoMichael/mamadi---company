import React from 'react';
import { ChevronRight, Instagram, Linkedin } from 'lucide-react';
import { headOffice } from '../data/contact';

interface FooterProps {
  setView: (view: 'home' | 'about' | 'projects' | 'sectors' | 'contact' | 'insights' | 'vacancies' | 'application') => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  const currentYear = new Date().getFullYear();
  const headOfficeMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(headOffice.mapAddress)}`;

  const services = [
    { label: 'Transportation',              view: 'sectors' as const, section: 'transportation' },
    { label: 'Water and Environment',       view: 'sectors' as const, section: 'water-and-environment' },
    { label: 'Technology and Innovation',   view: 'sectors' as const, section: 'technology-and-innovation' },
    { label: 'Energy and Power',            view: 'sectors' as const, section: 'energy-and-power' },
    { label: 'Engineering and Management',  view: 'sectors' as const, section: 'engineering-and-management' },
  ];

  const company = [
    { label: 'About Us',   view: 'about' as const, href: '/about' },
    { label: 'Leadership', view: 'about' as const, href: '/about#leadership-&-governance' },
    { label: 'Careers',    view: 'vacancies' as const, href: '/careers' },
    { label: 'Insights',   view: 'insights' as const, href: '/insights' },
    { label: 'Contact Us', view: 'contact' as const, href: '/contact' },
  ];

  return (
    <footer className="bg-white text-brand-blue pt-20 pb-10 border-t border-gray-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <img
              src="/assets/Mamadi International - Official Logo.png"
              alt="Mamadi International"
              className="h-auto w-full max-w-[260px] object-contain object-left"
            />
            <p className="text-gray-500 text-sm leading-relaxed">
              We are a multi-disciplinary infrastructure development and consulting firm committed to excellence and sustainable community growth.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <SocialIcon
                icon={<SocialBrandIcon brand="x" />}
                href="https://x.com/MamadiInternati?s=20"
                label="Follow Mamadi International on X"
              />
              <SocialIcon
                icon={<SocialBrandIcon brand="facebook" />}
                href="https://www.facebook.com/profile.php?id=61592327621760"
                label="Follow Mamadi International on Facebook"
              />
              <SocialIcon
                icon={<Instagram size={18} />}
                href="https://www.instagram.com/mamadi.international?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                label="Follow Mamadi International on Instagram"
              />
              <SocialIcon
                icon={<Linkedin size={18} />}
                href="https://lnkd.in/p/dhRWE9gS"
                label="Follow Mamadi International on LinkedIn"
              />
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-brand-gold font-semibold text-lg mb-6">Our Expertise</h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.label}>
                  <a
                    href={`/sectors#${item.section}`}
                    onClick={(event) => {
                      event.preventDefault();
                      setView(item.view);
                      setTimeout(() => {
                        const element = document.getElementById(item.section);
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="text-gray-500 hover:text-brand-gold text-sm flex items-center gap-2 group transition-colors"
                  >
                    <ChevronRight size={14} className="text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                    {item.label}
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
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(event) => {
                      event.preventDefault();
                      setView(item.view);
                    }}
                    className="text-gray-500 hover:text-brand-gold text-sm flex items-center gap-2 group transition-colors"
                  >
                    <ChevronRight size={14} className="text-brand-gold/50 group-hover:text-brand-gold transition-colors" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <h4 className="text-white font-bold text-sm uppercase tracking-widest">Connect</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a
                href={headOfficeMapsUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Mamadi's Midrand head office in Google Maps"
                title="Open in Google Maps"
                className="flex cursor-pointer items-start gap-3 text-inherit no-underline hover:text-inherit"
              >
                <FooterContactIcon>
                  <MinimalFooterIcon variant="location" />
                </FooterContactIcon>
                <span>
                  {headOffice.addressLines.map((line, index) => (
                    <React.Fragment key={line}>
                      {line}{index < headOffice.addressLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </a>
              <a
                href="tel:+27115328659"
                aria-label="Call Mamadi on +27 11 532 8659"
                title="Call Mamadi"
                className="flex cursor-pointer items-center gap-3 text-inherit no-underline hover:text-inherit"
              >
                <FooterContactIcon>
                  <MinimalFooterIcon variant="phone" />
                </FooterContactIcon>
                <span>Tel | +27 11 532 8659</span>
              </a>
              <a
                href="tel:+275328400"
                aria-label="Call Mamadi's fax number on +27 532 8400"
                title="Contact Mamadi by fax"
                className="flex cursor-pointer items-center gap-3 text-inherit no-underline hover:text-inherit"
              >
                <FooterContactIcon>
                  <MinimalFooterIcon variant="fax" />
                </FooterContactIcon>
                <span>Fax | +27 532 8400</span>
              </a>
              <a
                href="mailto:info@mamadi.co.za"
                aria-label="Email Mamadi at info@mamadi.co.za"
                title="Email Mamadi"
                className="flex cursor-pointer items-center gap-3 text-inherit no-underline hover:text-inherit"
              >
                <FooterContactIcon>
                  <MinimalFooterIcon variant="mail" />
                </FooterContactIcon>
                <span>info@mamadi.co.za</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {currentYear} Mamadi International. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <span className="cursor-default">
              Privacy Notice
            </span>
            <span className="cursor-default">
              Website Terms
            </span>
            <span className="cursor-default">
              PAIA Access
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Component for Social Icons
const SocialIcon: React.FC<{ icon: React.ReactNode; href: string; label: string }> = ({ icon, href, label }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center text-white hover:bg-brand-blue/90 transition-all duration-300"
    >
      {icon}
    </a>
  );
};

type SocialBrand = 'x' | 'facebook';

const socialBrandPaths: Record<SocialBrand, string> = {
  x: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z',
  facebook: 'M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.438H7.078v-3.489h3.047V9.413c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.973h-1.513c-1.49 0-1.956.931-1.956 1.887v2.261h3.328l-.532 3.489h-2.796V24C19.612 23.094 24 18.1 24 12.073Z',
};

const SocialBrandIcon: React.FC<{ brand: SocialBrand }> = ({ brand }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d={socialBrandPaths[brand]} />
  </svg>
);

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
