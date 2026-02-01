import React, { useState } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

interface NavbarProps {
  setView: (view: 'home' | 'about') => void;
  currentView: 'home' | 'about';
}

export const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);

  const navItems = [
    {
      name: 'Mamadi Divisions',
      hasDropdown: true,
      items: [
        'Civil Engineering',
        'Project Management',
        'Environmental Services',
        'Town Planning',
        'Electrical Engineering'
      ]
    },
    { name: 'Our Projects', hasDropdown: false },
    {
      name: 'Public Participation',
      hasDropdown: true,
      items: [
        'Stakeholder Engagement',
        'Social Facilitation',
        'Community Surveys',
        'Conflict Resolution'
      ]
    },
    {
      name: 'Insights',
      hasDropdown: true,
      items: [
        'Latest News',
        'Industry Articles',
        'Sustainability Reports',
        'Press Releases'
      ]
    },
    {
      name: 'Careers',
      hasDropdown: true,
      items: [
        'Working at Mamadi',
        'Vacancies',
        'Graduate Program',
        'Bursaries'
      ]
    },
    {
      name: 'About Us',
      hasDropdown: true,
      items: [
        'Who We Are',
        'Leadership & Governance',
        'Geographic Footprint',
        'Strategy & Values'
      ]
    },
  ];

  const toggleMobileDropdown = (name: string) => {
    setMobileOpenDropdown(prev => prev === name ? null : name);
  };

  const handleNavClick = (itemName: string, subItemName?: string) => {
    setIsOpen(false);
    
    if (itemName === 'About Us' || (subItemName && itemName === 'About Us')) {
      setView('about');
      if (subItemName) {
        // Small timeout to allow state change before scrolling
        setTimeout(() => {
          const id = subItemName.toLowerCase().replace(/\s+/g, '-');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      setView('home');
    }
  };

  return (
    <>
      <nav
        className="fixed z-50 top-0 left-0 w-full bg-white py-4 border-b border-gray-100"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => setView('home')}
              className="flex items-center select-none group cursor-pointer h-7 md:h-9"
            >
              <img
                src="/assets/mamadi_and_company_International_logo.png"
                alt="Mamadi & Company Logo"
                className="h-full w-auto object-contain"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-brand-blue">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        if (!item.hasDropdown) handleNavClick(item.name);
                    }}
                    className="flex items-center gap-1 hover:text-brand-gold transition-colors py-3"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown size={14} className="mt-0.5 text-brand-blue/60 group-hover:text-brand-gold transition-colors group-hover:rotate-180 duration-200" />
                    )}
                  </a>

                  {/* Desktop Dropdown */}
                  {item.hasDropdown && item.items && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 w-56">
                      <div className="bg-white shadow-xl rounded-lg border border-gray-100 overflow-hidden py-2">
                        {item.items.map((subItem) => (
                          <a
                            key={subItem}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.name, subItem);
                            }}
                            className="block px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition-colors border-l-2 border-transparent hover:border-brand-gold"
                          >
                            {subItem}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <a href="#" className="ml-2 px-5 py-2 border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 rounded-sm font-semibold text-sm">
                Contact Us
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-brand-blue p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`
          fixed inset-0 bg-white z-40 transition-transform duration-300 lg:hidden overflow-y-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full'} 
          pt-28 px-6 pb-12
        `}
      >
        <div className="flex flex-col space-y-4 text-lg font-medium text-brand-blue">
          {navItems.map((item) => (
            <div key={item.name} className="border-b border-gray-100 pb-4">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => {
                    if (item.hasDropdown) {
                        toggleMobileDropdown(item.name);
                    } else {
                        handleNavClick(item.name);
                    }
                }}
              >
                <span className={item.hasDropdown && mobileOpenDropdown === item.name ? 'text-brand-gold' : ''}>
                  {item.name}
                </span>
                {item.hasDropdown && (
                  mobileOpenDropdown === item.name
                    ? <ChevronUp size={16} className="text-brand-gold" />
                    : <ChevronDown size={16} />
                )}
              </div>

              {/* Mobile Submenu */}
              {item.hasDropdown && item.items && (
                <div
                  className={`mt-2 ml-2 space-y-2 overflow-hidden transition-all duration-300 ${mobileOpenDropdown === item.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {item.items.map((subItem) => (
                    <a
                      key={subItem}
                      href="#"
                      className="block text-sm text-gray-500 py-1"
                      onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.name, subItem);
                      }}
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-6">
            <a 
              href="#" 
              className="w-full block text-center px-5 py-3 border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 rounded-sm font-semibold text-sm"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};