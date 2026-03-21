import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

type View = 'home' | 'about' | 'projects' | 'contact' | 'insights';

interface NavbarProps {
  setView: (view: View) => void;
  currentView: View;
}

export const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const [logoTextHidden, setLogoTextHidden] = useState(false);
  const logoShouldHide = logoTextHidden && !isOpen;

  useEffect(() => {
    const onScroll = () => setLogoTextHidden(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    { name: 'Insights', hasDropdown: false },
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
    
    if (itemName === 'Our Projects') {
      setView('projects');
      return;
    }

    if (itemName === 'Insights') {
      setView('insights');
      return;
    }

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
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => setView('home')}
              className="flex items-center gap-2.5 select-none cursor-pointer z-10"
            >
              {/* Icon mark — always visible */}
              <img
                src="/assets/cropped-mamadi_and_company_logo-1-e1712595837297.png"
                alt="Mamadi & Company"
                className="h-7 md:h-9 w-auto object-contain"
              />
              {/* Text — word-by-word masked slide-up with staggered delay */}
              <div className="flex items-baseline gap-[0.3em]">
                {[
                  { text: 'Mamadi',  color: '#1F2B49', delay: 0   },
                  { text: '&',       color: '#C69243', delay: 110 },
                  { text: 'Company', color: '#1F2B49', delay: 220 },
                ].map(({ text, color, delay }) => (
                  <div key={text} className="overflow-hidden leading-none">
                    <span
                      className="block text-sm md:text-base"
                      style={{
                        color,
                        fontFamily: "'Figtree', sans-serif",
                        fontWeight: 500,
                        transform: logoShouldHide ? 'translateY(-120%)' : 'translateY(0)',
                        transition: `transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms`,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Nav Links — slides to true center after logo text animates out */}
            <div
              className="hidden lg:flex absolute left-1/2 items-center gap-6 xl:gap-8 text-sm font-semibold text-brand-blue whitespace-nowrap"
              style={{
                transform: logoTextHidden
                  ? 'translateX(-50%)'
                  : 'translateX(calc(-50% + 50px))',
                transition: logoTextHidden
                  ? 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1) 1.1s'
                  : 'transform 0.5s cubic-bezier(0.7, 0, 0.84, 0) 0s',
              }}
            >
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        if (!item.hasDropdown) handleNavClick(item.name);
                    }}
                    className={`flex items-center gap-1 transition-colors py-3 ${
                      (item.name === 'Our Projects' && currentView === 'projects') ||
                      (item.name === 'About Us' && currentView === 'about') ||
                      (item.name === 'Insights' && currentView === 'insights')
                        ? 'text-brand-gold font-bold'
                        : 'hover:text-brand-gold'
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown size={14} className="mt-0.5 text-brand-blue/60 group-hover:text-brand-gold transition-colors group-hover:rotate-180 duration-200" />
                    )}
                  </a>

                  {/* Desktop Dropdown */}
                  {item.hasDropdown && item.items && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 w-56">
                      <div className="bg-white shadow-xl rounded-none border border-gray-100 overflow-hidden py-2">
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
            </div>

            {/* Right side: Contact Us (desktop) + Mobile Menu Button */}
            <div className="flex items-center gap-4 z-10">
              <a
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    setView('contact');
                }}
                className={`hidden lg:block px-5 py-2 border transition-all duration-300 rounded-sm font-semibold text-sm ${
                    currentView === 'contact'
                    ? 'bg-brand-blue text-white border-brand-blue'
                    : 'border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white'
                }`}
              >
                Contact Us
              </a>
              <button
                className="lg:hidden text-brand-blue p-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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
          {navItems.map((item, index) => (
            <div
              key={item.name}
              className="border-b border-gray-100 pb-4"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
                transition: isOpen
                  ? `opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1) ${120 + index * 60}ms, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1) ${120 + index * 60}ms`
                  : `opacity 0.22s ease ${(navItems.length - 1 - index) * 35}ms, transform 0.22s ease ${(navItems.length - 1 - index) * 35}ms`,
              }}
            >
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
                  className={`mt-2 ml-2 space-y-2 overflow-hidden transition-all duration-300 ${mobileOpenDropdown === item.name ? 'max-h-96' : 'max-h-0'}`}
                >
                  {item.items.map((subItem, subIndex) => {
                    const isThisOpen = mobileOpenDropdown === item.name;
                    return (
                    <a
                      key={subItem}
                      href="#"
                      className="block text-sm text-gray-500 py-1"
                      style={{
                        opacity: isThisOpen ? 1 : 0,
                        transform: isThisOpen ? 'translateX(0)' : 'translateX(-14px)',
                        transition: isThisOpen
                          ? `opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1) ${80 + subIndex * 55}ms, transform 0.35s cubic-bezier(0.25, 1, 0.5, 1) ${80 + subIndex * 55}ms`
                          : 'opacity 0.15s ease 0ms, transform 0.15s ease 0ms',
                      }}
                      onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.name, subItem);
                      }}
                    >
                      {subItem}
                    </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
          <div
            className="pt-6"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(14px)',
              transition: isOpen
                ? `opacity 0.5s cubic-bezier(0.25, 1, 0.5, 1) ${120 + navItems.length * 60}ms, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1) ${120 + navItems.length * 60}ms`
                : `opacity 0.22s ease 0ms, transform 0.22s ease 0ms`,
            }}
          >
            <a
              href="#"
              className="w-full block text-center px-5 py-3 border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-all duration-300 rounded-sm font-semibold text-sm"
              onClick={(e) => {
                  e.preventDefault();
                  setView('contact');
                  setIsOpen(false);
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
};