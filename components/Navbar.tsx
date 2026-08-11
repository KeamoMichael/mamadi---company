import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type View = 'home' | 'about' | 'projects' | 'sectors' | 'contact' | 'insights' | 'vacancies' | 'application';

interface NavbarProps {
  setView: (view: View) => void;
  currentView: View;
}

const logoTextSegments = [
  { name: 'Mamadi', src: '/assets/Mamadi text01.png', delay: 0 },
  { name: 'International', src: '/assets/Mamadi text02.png', delay: 90 },
];

const navHref = (itemName: string) => ({
  'Mamadi Sectors': '/sectors',
  'Our Projects': '/projects',
  Insights: '/insights',
  Careers: '/careers',
  'About Us': '/about',
}[itemName] || '/');

const sectionHref = (itemName: string, subItemName: string) => {
  const sectionIds: Record<string, Record<string, string>> = {
    'Mamadi Sectors': {
      Transportation: 'transportation',
      'Water and Environment': 'water-and-environment',
      'Technology and Innovation': 'technology-and-innovation',
      'Energy and Power': 'energy-and-power',
      'Engineering and Management': 'engineering-and-management',
    },
    'Our Projects': {
      'Water & Sanitation': 'water-&-sanitation',
      Energy: 'energy',
      Environmental: 'environmental',
      Sustainability: 'sustainability',
    },
    'About Us': {
      'Who We Are': 'who-we-are',
      'Leadership & Governance': 'leadership-&-governance',
      'Geographic Footprint': 'geographic-footprint',
      'Strategy & Values': 'strategy-&-values',
    },
  };
  const section = sectionIds[itemName]?.[subItemName];
  return section ? `${navHref(itemName)}#${section}` : navHref(itemName);
};

export const Navbar: React.FC<NavbarProps> = ({ setView, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const [desktopOpenDropdown, setDesktopOpenDropdown] = useState<string | null>(null);
  const [logoTextHidden, setLogoTextHidden] = useState(false);
  const desktopNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setLogoTextHidden(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target as Node)) {
        setDesktopOpenDropdown(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDesktopOpenDropdown(null);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const navItems = [
    {
      name: 'Mamadi Sectors',
      hasDropdown: true,
      items: [
        'Transportation',
        'Water and Environment',
        'Technology and Innovation',
        'Energy and Power',
        'Engineering and Management'
      ]
    },
    {
      name: 'Our Projects',
      hasDropdown: true,
      items: [
        'Water & Sanitation',
        'Energy',
        'Environmental',
        'Sustainability'
      ]
    },
    { name: 'Insights', hasDropdown: false },
    {
      name: 'Careers',
      hasDropdown: true,
      items: [
        'Vacancies'
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
    setDesktopOpenDropdown(null);

    if (itemName === 'Mamadi Sectors') {
      setView('sectors');
      if (subItemName) {
        setTimeout(() => {
          const sectorSectionIds: Record<string, string> = {
            Transportation: 'transportation',
            'Water and Environment': 'water-and-environment',
            'Technology and Innovation': 'technology-and-innovation',
            'Energy and Power': 'energy-and-power',
            'Engineering and Management': 'engineering-and-management',
          };
          const element = document.getElementById(sectorSectionIds[subItemName]);
          if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 150;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      }
      return;
    }
    
    if (itemName === 'Our Projects') {
      setView('projects');
      if (subItemName) {
        setTimeout(() => {
          const projectSectionIds: Record<string, string> = {
            'Water & Sanitation': 'water-&-sanitation',
            Energy: 'energy',
            Environmental: 'environmental',
            Sustainability: 'sustainability',
          };
          const element = document.getElementById(projectSectionIds[subItemName]);
          if (element) {
            const y = element.getBoundingClientRect().top + window.scrollY - 150;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 100);
      }
      return;
    }

    if (itemName === 'Insights') {
      setView('insights');
      return;
    }

    if (itemName === 'Careers') {
      setView('vacancies');
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
        id="site-navbar"
        className="fixed z-50 top-0 left-0 w-full bg-white py-4 border-b border-gray-100"
      >
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">
          <div className="relative flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              onClick={(event) => {
                event.preventDefault();
                setView('home');
              }}
              className="flex items-center gap-2 select-none cursor-pointer z-10"
              aria-label="Mamadi International"
            >
              <img
                src="/assets/cropped-mamadi_and_company_logo-1-e1712595837297.png"
                alt=""
                aria-hidden="true"
                className="h-5 md:h-6 w-auto object-contain"
              />
              <div className="hidden [@media(min-width:360px)]:flex h-3.5 items-center gap-0 overflow-hidden md:h-4">
                {logoTextSegments.map((segment) => (
                  <span key={segment.name} className="block h-full overflow-hidden">
                    <img
                      src={segment.src}
                      alt=""
                      aria-hidden="true"
                      className="h-full w-auto object-contain"
                      style={{
                        transform: isOpen || !logoTextHidden ? 'translateY(0)' : 'translateY(-120%)',
                        transition: `transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) ${segment.delay}ms`,
                      }}
                    />
                  </span>
                ))}
              </div>
            </a>

            {/* Desktop Nav Links — slides to true center after logo text animates out */}
            <div
              ref={desktopNavRef}
              className="hidden lg:flex absolute left-1/2 items-center gap-3 xl:gap-7 text-xs xl:text-sm font-semibold text-brand-blue whitespace-nowrap"
              style={{
                transform: logoTextHidden
                  ? 'translateX(-50%)'
                  : 'translateX(calc(-50% + 96px))',
                transition: logoTextHidden
                  ? 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.75s'
                  : 'transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.15s',
              }}
            >
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  <a
                    href={navHref(item.name)}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.hasDropdown) {
                        setDesktopOpenDropdown((open) => open === item.name ? null : item.name);
                      } else {
                        handleNavClick(item.name);
                      }
                    }}
                    aria-expanded={item.hasDropdown ? desktopOpenDropdown === item.name : undefined}
                    className={`flex items-center gap-1 transition-colors py-3 ${
                      (item.name === 'Our Projects' && currentView === 'projects') ||
                      (item.name === 'Mamadi Sectors' && currentView === 'sectors') ||
                      (item.name === 'About Us' && currentView === 'about') ||
                      (item.name === 'Insights' && currentView === 'insights') ||
                      (item.name === 'Careers' && (currentView === 'vacancies' || currentView === 'application'))
                        ? 'text-brand-gold'
                        : 'hover:text-brand-gold'
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className={`mt-0.5 transition-all duration-200 ${desktopOpenDropdown === item.name ? 'rotate-180 text-brand-gold' : 'text-brand-blue/60'}`}
                      />
                    )}
                  </a>

                  {/* Desktop Dropdown */}
                  {item.hasDropdown && item.items && (
                    <div
                      className={`absolute top-full left-0 w-56 pt-2 transition-all duration-200 ${desktopOpenDropdown === item.name ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'}`}
                    >
                      <div className="bg-white shadow-xl rounded-none border border-gray-100 overflow-hidden py-2">
                        {item.items.map((subItem) => (
                          <a
                            key={subItem}
                            href={sectionHref(item.name, subItem)}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick(item.name, subItem);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-brand-gold transition-colors border-l-2 border-transparent hover:border-brand-gold"
                          >
                            {item.name === 'Our Projects' && <ProjectMenuIcon category={subItem} />}
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
                href="/contact"
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
                type="button"
                className="lg:hidden flex h-10 w-10 items-center justify-center text-brand-blue"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsOpen((open) => !open)}
              >
                <span className="relative block h-6 w-6" aria-hidden="true">
                  {[0, 1, 2].map((line) => {
                    const closedY = line === 0 ? -5.5 : line === 2 ? 5.5 : 0;
                    const rotation = line === 0 ? 45 : line === 2 ? -45 : 0;

                    return (
                      <span
                        key={line}
                        className="absolute left-1/2 top-1/2 block h-0.5 w-6 rounded-full bg-current"
                        style={{
                          opacity: isOpen && line === 1 ? 0 : 1,
                          transform: isOpen
                            ? `translate(-50%, -50%) rotate(${rotation}deg) scaleX(${line === 1 ? 0 : 1})`
                            : `translate(-50%, calc(-50% + ${closedY}px)) rotate(0deg) scaleX(1)`,
                          transition: 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1), opacity 150ms ease',
                          transformOrigin: 'center',
                        }}
                      />
                    );
                  })}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        id="mobile-navigation"
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
              <div className="flex items-center justify-between">
                <a
                  href={navHref(item.name)}
                  className={`flex-1 cursor-pointer text-left ${item.hasDropdown && mobileOpenDropdown === item.name ? 'text-brand-gold' : ''}`}
                  onClick={(event) => {
                    event.preventDefault();
                    if (item.hasDropdown) {
                      toggleMobileDropdown(item.name);
                    } else {
                      handleNavClick(item.name);
                    }
                  }}
                >
                  {item.name}
                </a>
                {item.hasDropdown && (
                  <button
                    type="button"
                    aria-label={`${mobileOpenDropdown === item.name ? 'Close' : 'Open'} ${item.name} sections`}
                    aria-expanded={mobileOpenDropdown === item.name}
                    className="cursor-pointer p-2"
                    onClick={() => toggleMobileDropdown(item.name)}
                  >
                    {mobileOpenDropdown === item.name
                      ? <ChevronUp size={16} className="text-brand-gold" />
                      : <ChevronDown size={16} />}
                  </button>
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
                      href={sectionHref(item.name, subItem)}
                      className="flex items-center gap-3 text-sm text-gray-500 py-1"
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
                      {item.name === 'Our Projects' && <ProjectMenuIcon category={subItem} />}
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
              href="/contact"
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

const ProjectMenuIcon: React.FC<{ category: string }> = ({ category }) => {
  const common = {
    width: 17,
    height: 17,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.35,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'shrink-0 text-brand-gold',
    'aria-hidden': true,
  };

  if (category === 'Water & Sanitation') {
    return (
      <svg {...common}>
        <path d="M4 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
        <path d="M4 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      </svg>
    );
  }

  if (category === 'Energy') {
    return (
      <svg {...common}>
        <path d="M13 3 7 13h5l-1 8 6-11h-5l1-7Z" />
      </svg>
    );
  }

  if (category === 'Sustainability') {
    return (
      <svg {...common}>
        <path d="M7 7a7 7 0 0 1 11 2" />
        <path d="m18 5 .5 4-4-.5" />
        <path d="M17 17a7 7 0 0 1-11-2" />
        <path d="m6 19-.5-4 4 .5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M5 15c7 .2 11-4 14-10" />
      <path d="M5 15c1-6 6-9 14-10 0 9-5 14-14 10Z" />
    </svg>
  );
};
