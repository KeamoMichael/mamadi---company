import React from 'react';
import { useNavbarHeight } from './useNavbarHeight';

type SectorIcon = 'transport' | 'water' | 'technology' | 'energy' | 'engineering';

type Sector = {
  id: string;
  name: string;
  label: string;
  icon: SectorIcon;
  image: string;
  imagePosition?: string;
  intro: string;
  services: string[];
  note?: string;
};

const sectors: Sector[] = [
  {
    id: 'transportation',
    name: 'Transportation',
    label: 'Transport Business',
    icon: 'transport',
    image: '/Mamadi%20Sectors/pexels-mamadi-sector-picks/cover-modern-bridge-pexels-13185335.webp',
    imagePosition: 'center 54%',
    intro: 'Planning and delivering transport infrastructure that supports safe, efficient movement and long-term economic growth.',
    services: [
      'Strategy and planning',
      'Road and railway engineering infrastructure',
      'Design, build and operate solutions',
      'Transport compliance and safety',
    ],
  },
  {
    id: 'water-and-environment',
    name: 'Water and Environment',
    label: 'Water, Environment & Sustainability Business',
    icon: 'water',
    image: '/Mamadi%20Sectors/pexels-mamadi-sector-picks/pexels-kelly-16562858.webp',
    imagePosition: 'center 48%',
    intro: 'Integrated water, environmental and climate services for resilient infrastructure, responsible industry and sustainable communities.',
    services: [
      'Water and sewer infrastructure',
      'Engineering feasibility studies',
      'Design, build and operate solutions',
      'Large-industry infrastructure',
      'Waste management',
      'Regulatory compliance',
      'Large-industry environmental impact assessments',
      'Environmental monitoring and management',
      'Climate-change strategies',
      'Mitigation and adaptation plans',
      'GHG modelling and carbon-footprint services',
    ],
  },
  {
    id: 'technology-and-innovation',
    name: 'Technology and Innovation',
    label: 'Technology & Innovation Business',
    icon: 'technology',
    image: '/Mamadi%20Sectors/pexels-mamadi-sector-picks/pexels-alejandro-de-roa-649065356-30226728.webp',
    imagePosition: 'center 42%',
    intro: 'Technology-led solutions that strengthen infrastructure management, connect information and support more intelligent decision-making.',
    services: [
      'Integrated technology solutions',
      'Information technology and infrastructure management',
      'Artificial intelligence applications',
      'Cloud-storage solutions',
    ],
  },
  {
    id: 'energy-and-power',
    name: 'Energy and Power',
    label: 'Energy Business',
    icon: 'energy',
    image: '/Mamadi%20Sectors/pexels-mamadi-sector-picks/pexels-quang-nguyen-vinh-222549-35105442.webp',
    imagePosition: 'center 48%',
    intro: 'Supporting energy generation, transition and efficiency through integrated engineering, advisory and investment-driven infrastructure solutions.',
    services: [
      'Energy-transition plans across oil, solar and gas',
      'Independent power producer solutions',
      'Design, build and operate delivery models',
      'Energy-efficiency plans',
      'Energy master plans',
      'Bespoke asset and project-finance solutions',
    ],
    note: 'Our financing specialists can structure CAPEX-conscious solutions around a client’s operational and accounting requirements.',
  },
  {
    id: 'engineering-and-management',
    name: 'Engineering and Management',
    label: 'Infrastructure & Capital Projects',
    icon: 'engineering',
    image: '/Mamadi%20Sectors/pexels-mamadi-sector-picks/pexels-igorejov-17658153.webp',
    imagePosition: 'center 48%',
    intro: 'End-to-end professional services for infrastructure and capital projects across public and private-sector environments.',
    services: [
      'Strategic and infrastructure planning',
      'Engineering feasibility and advisory services',
      'Integrated engineering design',
      'Project and programme management',
      'Operational-efficiency improvement',
      'Compliance, safety and delivery assurance',
      'Asset and project-finance advisory',
      'Design, build and operate solutions',
    ],
    note: 'Targeted industries include public infrastructure, mining, energy, manufacturing, and oil and gas.',
  },
];

export const SectorsPage: React.FC = () => {
  const navbarHeight = useNavbarHeight();
  const navRef = React.useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = React.useState(sectors[0].id);

  React.useEffect(() => {
    const observers = sectors.map((sector) => {
      const element = document.getElementById(sector.id);
      if (!element) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(sector.id);
        },
        { rootMargin: '-35% 0px -50% 0px', threshold: 0 }
      );
      observer.observe(element);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  React.useEffect(() => {
    const activeLink = navRef.current?.querySelector(`[data-sector="${activeSection}"]`) as HTMLElement | null;
    if (!activeLink || !navRef.current) return;
    navRef.current.scrollTo({ left: Math.max(0, activeLink.offsetLeft - 24), behavior: 'smooth' });
  }, [activeSection]);

  const scrollToSector = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.scrollY - navbarHeight - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <main className="pt-20 bg-white">
      <div
        ref={navRef}
        style={{ top: navbarHeight }}
        className="sticky z-30 overflow-x-auto border-b border-gray-100 bg-white scrollbar-none"
      >
        <div className="container mx-auto flex max-w-screen-2xl items-center gap-9 whitespace-nowrap pl-6 md:px-12 lg:px-20">
          {sectors.map((sector, index) => (
            <button
              key={sector.id}
              data-sector={sector.id}
              onClick={() => scrollToSector(sector.id)}
              className={`group relative flex items-center gap-2.5 pt-8 pb-6 text-sm font-medium transition-colors ${
                activeSection === sector.id ? 'text-brand-gold' : 'text-gray-500 hover:text-brand-blue'
              } ${index === sectors.length - 1 ? 'pr-5 md:pr-0' : ''}`}
            >
              <SectorIconGraphic variant={sector.icon} className="h-[18px] w-[18px]" />
              {sector.name}
              <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-gold transition-transform duration-300 ${
                activeSection === sector.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </button>
          ))}
        </div>
      </div>

      {sectors.map((sector, index) => (
        <section id={sector.id} key={sector.id} className="scroll-mt-36">
          <div
            className="relative overflow-hidden bg-brand-blue bg-cover bg-center pt-24 pb-36 text-white md:pb-44"
            style={{ backgroundImage: `url('${sector.image}')`, backgroundPosition: sector.imagePosition }}
          >
            <div className="absolute inset-0 bg-brand-blue/70" />

            <div className="container relative mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-20">
              <div className="max-w-4xl">
                <span className="mb-6 block text-sm font-normal tracking-[0.04em] text-white">
                  0{index + 1} / {sector.id === 'water-and-environment' ? (
                    <>
                      Water, Environment &amp; Sustainability<br className="md:hidden" /> Business
                    </>
                  ) : sector.label}
                </span>
                <SectorIconGraphic variant={sector.icon} className="mb-6 h-10 w-10 text-brand-gold" />
                <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                  {sector.name}
                </h1>
                <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 md:text-lg">
                  {sector.intro}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white">
            <div className="container mx-auto grid max-w-screen-2xl gap-12 px-6 py-16 md:grid-cols-[0.32fr_0.68fr] md:px-12 md:py-24 lg:px-20">
              <div>
                <span className="text-sm text-brand-gold">Service offering</span>
                {sector.note && <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-500">{sector.note}</p>}
              </div>
              <div className="grid border-t border-gray-100 sm:grid-cols-2">
                {sector.services.map((service, serviceIndex) => (
                  <div
                    key={service}
                    className={`flex min-h-28 items-baseline gap-5 border-b border-gray-100 py-7 sm:px-7 ${
                      serviceIndex % 2 === 0 ? 'sm:border-r sm:pl-0' : 'sm:pr-0'
                    }`}
                  >
                    <span className="text-xs font-medium text-brand-gold">{String(serviceIndex + 1).padStart(2, '0')}</span>
                    <p className="text-base font-medium leading-relaxed text-brand-blue">{service}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

const SectorIconGraphic: React.FC<{ variant: SectorIcon; className?: string }> = ({ variant, className }) => {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.25,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': true,
  };

  if (variant === 'transport') {
    return (
      <span
        aria-hidden="true"
        className={`inline-block shrink-0 bg-current ${className ?? ''}`}
        style={{
          WebkitMaskImage: "url('/Mamadi%20Sectors/train.png')",
          maskImage: "url('/Mamadi%20Sectors/train.png')",
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />
    );
  }
  if (variant === 'water') {
    return <svg {...common}><path d="M12 3s5 5.2 5 10a5 5 0 0 1-10 0c0-4.8 5-10 5-10Z" /><path d="M4 20c2-1.6 4-1.6 6 0s4 1.6 6 0 4-1.6 6 0" /></svg>;
  }
  if (variant === 'technology') {
    return <svg {...common}><rect x="6" y="6" width="12" height="12" /><path d="M9 9h6v6H9zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" /></svg>;
  }
  if (variant === 'energy') {
    return <svg {...common}><path d="M13 3 7 13h5l-1 8 6-11h-5l1-7Z" /></svg>;
  }
  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className ?? ''}`}
      style={{
        WebkitMaskImage: "url('/Mamadi%20Sectors/engineering.png')",
        maskImage: "url('/Mamadi%20Sectors/engineering.png')",
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  );
};
