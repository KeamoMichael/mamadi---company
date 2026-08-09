import React from 'react';
import { Section } from './Section';
import { WorldMap } from './WorldMap';
import { useNavbarHeight } from './useNavbarHeight';

const groupChairman = { name: 'Mr Mabu Mamadi', role: 'Executive Chairman', area: 'Global' };

const executiveLeadership = [
  { name: 'Mr Manifield Mandigora', role: 'Chief Executive Officer', area: 'Mamadi USA' },
  { name: 'Mr Avnish Gupta', role: 'Chief Executive Officer', area: 'Mamadi India' },
  { name: 'Mr Ike Rampedi', role: 'Chief Executive Officer', area: 'Mamadi & Company South Africa' },
  { name: 'Mr Valentine Chadyiwa', role: 'EPC Director', area: 'Group delivery' },
];

const operationsDirector = { name: 'Dr Tendai Sawunyama', role: 'Operations Director', area: 'Africa' };

const africaOperations = [
  { name: 'Mrs Kgaugelo Mokwena', role: 'Executive Personal Assistant', area: 'Africa operations' },
  { name: 'Silver Mucavele', role: 'Director', area: 'Mozambique' },
  { name: 'Thokozani Magwaza', role: 'Regional Director', area: 'Central & West Africa · Ghana' },
  { name: 'Dr Victor Kongo', role: 'Regional Director', area: 'East Africa · Kenya' },
  { name: 'Mr Zvikomborero Hoko', role: 'Excellence Director', area: 'Southern Africa · Zimbabwe' },
];

const specialistFunctions = [
  { name: 'Adv Emmanuel Tem', role: 'Legal & Taxation Specialist', area: 'Group services' },
  { name: 'Mr Seokhoon Ko', role: 'Financing & Infrastructure Planning Specialist', area: 'United Kingdom' },
  { name: 'Gustave Mizero', role: 'Projects Engineer', area: 'Engineering delivery' },
  { name: 'Ms Lucia Mogale', role: 'Senior Project Administrator', area: 'Project support' },
  { name: 'Mr Osborne Muvingi', role: 'Senior Investment Officer', area: 'Investment' },
];

type AboutUsPageProps = {
  setView: (view: 'projects') => void;
};

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ setView }) => {
  const [activeSection, setActiveSection] = React.useState('who-we-are');
  const navRef = React.useRef<HTMLDivElement>(null);
  const navbarHeight = useNavbarHeight();

  const sectionItems = [
    { name: 'Who We Are',              id: 'who-we-are' },
    { name: 'Leadership & Governance', id: 'leadership-&-governance' },
    { name: 'Geographic Footprint',    id: 'geographic-footprint' },
    { name: 'Strategy & Values',       id: 'strategy-&-values' },
  ];

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-140px 0px -50% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  // Slide the sticky nav so the active link is fully in view
  React.useEffect(() => {
    if (!navRef.current) return;
    const activeEl = navRef.current.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
    if (!activeEl) return;
    const isLast = activeSection === sectionItems[sectionItems.length - 1].id;
    // For the last item scroll to the absolute end so trailing padding is always visible.
    // For all others align the item's left edge to the natural 24px gutter.
    const scrollTo = isLast
      ? navRef.current.scrollWidth
      : Math.max(0, activeEl.offsetLeft - 24);
    navRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
  }, [activeSection]);

  return (
    <div className="pt-20">
      {/* About Hero */}
      <section
        className="relative overflow-hidden bg-brand-blue bg-cover bg-center pt-24 pb-36 text-white md:pb-44"
        style={{ backgroundImage: "url('/assets/Hero Section Images/About Us-Hero Section.jpg')" }}
      >
        <div className="absolute inset-0 bg-brand-blue/70" />
        <div className="container relative mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-20">
          <div className="max-w-3xl">
            <span className="text-white font-normal tracking-[0.04em] text-sm mb-4 block">About Mamadi International</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight text-white">
              Leading with technical excellence and community impact.
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Established as a multidisciplinary firm, Mamadi International has grown into a
              trusted partner for infrastructure development across Africa, combining
              international standards with deep local insights.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation for About Section (Internal) */}
      <div
        ref={navRef}
        style={{ top: navbarHeight }}
        className="sticky bg-white border-b border-gray-100 z-30 overflow-x-auto scrollbar-none"
      >
        <div className="container mx-auto pl-6 md:px-12 lg:px-20 max-w-screen-2xl flex gap-10 whitespace-nowrap">
            {sectionItems.map((item, index) => (
                <a
                    key={item.id}
                    data-section={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(item.id);
                        if (element) {
                            const y = element.getBoundingClientRect().top + window.scrollY - 150;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                        }
                    }}
                    className={`group py-6 text-sm font-semibold transition-colors relative ${
                        activeSection === item.id ? 'text-brand-gold' : 'text-gray-500 hover:text-brand-blue'
                    } ${index === sectionItems.length - 1 ? 'pr-4 md:pr-0' : ''}`}
                >
                    <span>{item.name}</span>
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold transform transition-transform origin-left duration-300 ${
                        activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                </a>
            ))}
        </div>
      </div>

      {/* Who We Are Section */}
      <div id="who-we-are">
        <Section label="Who We Are">
            <div className="flex flex-col gap-8">
                <p className="text-lg text-brand-blue font-medium leading-relaxed max-w-3xl">
                    Mamadi International is an established, multidisciplinary engineering and consulting firm 
                    dedicated to delivering technical excellence and sustainable infrastructure solutions.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    We provide a comprehensive suite of professional services, acting as a strategic partner 
                    to both public and private sectors. Our approach integrates global best practices with 
                    deep local insights, ensuring every project yields long-term socio-economic value and 
                    measurable community impact.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
                    {[
                        {
                            title: 'Technical Excellence',
                            desc: 'Rigorous engineering standards and innovative problem-solving.'
                        },
                        {
                            title: 'Strategic Partnership',
                            desc: 'Collaborating with stakeholders to achieve shared developmental goals.'
                        },
                        {
                            title: 'Community Impact',
                            desc: 'Leaving a lasting positive legacy in the environments we touch.'
                        }
                    ].map((item, index) => (
                        <div
                            key={item.title}
                            className={`relative py-2 md:px-8 ${index === 0 ? 'md:pl-0' : ''} ${index === 2 ? 'md:pr-0' : ''}`}
                        >
                            {index > 0 && (
                                <span className="hidden md:block absolute left-0 top-1/2 h-16 w-px -translate-y-1/2 bg-brand-gold/45"></span>
                            )}
                            <h4 className="font-semibold text-brand-blue mb-2">{item.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed max-w-xs">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
      </div>

      {/* Leadership & Governance Section */}
      <div id="leadership-&-governance">
        <Section label="Leadership & Governance">
          <div className="flex flex-col gap-12 md:gap-16">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-brand-blue md:text-4xl">
                Leadership across the Mamadi Group.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-gray-500 lg:justify-self-end">
                Our organisational structure brings together group executives, regional directors,
                operational leadership, and specialist expertise across Africa and international markets.
              </p>
            </div>

            <div className="border-t border-brand-gold/45">
              <div className="grid gap-8 py-10 md:grid-cols-[0.8fr_1.2fr] md:items-end md:py-14">
                <div>
                  <span className="text-sm text-brand-gold">Group leadership</span>
                  <p className="mt-3 text-sm text-gray-400">{groupChairman.role} · {groupChairman.area}</p>
                </div>
                <h3 className="text-3xl font-semibold tracking-tight text-brand-blue md:text-5xl">
                  {groupChairman.name}
                </h3>
              </div>

              <div className="border-t border-gray-100 py-10 md:py-12">
                <h3 className="mb-9 text-sm font-medium text-brand-gold">Executive leadership</h3>
                <div className="grid gap-y-9 sm:grid-cols-2 md:divide-x md:divide-brand-gold/25 xl:grid-cols-4">
                  {executiveLeadership.map((leader, index) => (
                    <article
                      key={leader.name}
                      className={`md:px-7 ${index === 0 ? 'md:pl-0' : ''} ${index === executiveLeadership.length - 1 ? 'md:pr-0' : ''}`}
                    >
                      <p className="text-xs leading-relaxed text-gray-400">{leader.area}</p>
                      <h4 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-brand-blue">{leader.name}</h4>
                      <p className="mt-2 text-xs font-medium text-brand-gold">{leader.role}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="grid gap-8 border-y border-gray-100 py-10 md:grid-cols-[0.8fr_1.2fr] md:items-center md:py-12">
                <div>
                  <span className="text-sm text-brand-gold">Africa operations</span>
                  <p className="mt-3 text-xs text-gray-400">Continental oversight and delivery</p>
                </div>
                <div className="border-l-2 border-brand-gold pl-6 md:pl-8">
                  <h3 className="text-2xl font-semibold tracking-tight text-brand-blue">{operationsDirector.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{operationsDirector.role} · {operationsDirector.area}</p>
                </div>
              </div>

              <div className="grid gap-14 pt-12 lg:grid-cols-2 lg:gap-20">
                <div>
                  <h3 className="border-b border-brand-gold/35 pb-4 text-sm font-medium text-brand-gold">
                    Regional & operational leadership
                  </h3>
                  <div className="divide-y divide-gray-100">
                    {africaOperations.map((leader) => (
                      <article key={leader.name} className="grid gap-2 py-6 sm:grid-cols-[1fr_1.2fr] sm:gap-6">
                        <div>
                          <h4 className="text-base font-semibold tracking-tight text-brand-blue">{leader.name}</h4>
                          <p className="mt-1 text-xs text-gray-400">{leader.area}</p>
                        </div>
                        <p className="text-xs font-medium leading-relaxed text-gray-500 sm:text-right">{leader.role}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="border-b border-brand-gold/35 pb-4 text-sm font-medium text-brand-gold">
                    Specialist functions
                  </h3>
                  <div className="divide-y divide-gray-100">
                    {specialistFunctions.map((leader) => (
                      <article key={leader.name} className="grid gap-2 py-6 sm:grid-cols-[1fr_1.2fr] sm:gap-6">
                        <div>
                          <h4 className="text-base font-semibold tracking-tight text-brand-blue">{leader.name}</h4>
                          <p className="mt-1 text-xs text-gray-400">{leader.area}</p>
                        </div>
                        <p className="text-xs font-medium leading-relaxed text-gray-500 sm:text-right">{leader.role}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Geographic Footprint Section */}
      <div id="geographic-footprint">
        <Section label="Geographic Footprint">
            <div className="flex flex-col gap-16">
                <div className="flex flex-col gap-12">
                    <div className="flex flex-col gap-6 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-brand-blue">
                            Mamadi Global Presence
                        </h2>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Headquartered in South Africa, Mamadi International maintains a strategic
                            regional presence with a growing footprint across the African continent.
                            Our ability to mobilize technical expertise across diverse territories
                            allows us to address complex infrastructure challenges in varying
                            regulatory and environmental contexts.
                        </p>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            We are committed to regional integration and delivering excellence
                            wherever our clients require sophisticated engineering and consulting solutions.
                        </p>
                    </div>
                </div>

                {/* Map Area */}
                <div className="w-full aspect-square md:aspect-[16/9] rounded-sm overflow-hidden border border-gray-100 shadow-sm">
                    <img
                      src="/assets/mamadi-global-locations_A4.png"
                      alt="Mamadi International global locations"
                      className="h-full w-full object-cover object-center md:hidden"
                      loading="lazy"
                    />
                    <div className="hidden h-full w-full md:block">
                      <WorldMap />
                    </div>
                </div>
            </div>
        </Section>
      </div>

      {/* Strategy & Values Section */}
      <div id="strategy-&-values">
        <Section label="Strategy & Values">
            <div className="flex flex-col gap-12">
                <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                    Our strategic direction is built on a foundation of innovation, sustainability, 
                    and technical integrity. We are driven by a growth mindset that seeks to 
                    redefine consulting engineering through digital transformation and community-centric design.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-y-0 md:divide-x md:divide-brand-gold/25">
                    {[
                        { title: 'Integrity', icon: 'integrity' as const, desc: 'Upholding the highest ethical standards in every engagement.' },
                        { title: 'Excellence', icon: 'excellence' as const, desc: 'Striving for technical precision and superior project delivery.' },
                        { title: 'Reliability', icon: 'reliability' as const, desc: 'Being a consistent and trusted partner for our clients.' }
                    ].map((value, index) => (
                        <div
                            key={value.title}
                            className={`flex flex-col gap-5 md:px-8 ${index === 0 ? 'md:pl-0' : ''} ${index === 2 ? 'md:pr-0' : ''}`}
                        >
                            <ValueIcon variant={value.icon} />
                            <div>
                                <h4 className="text-lg font-semibold text-brand-blue mb-3">{value.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{value.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-10 border border-brand-blue/10 bg-brand-beige/30 flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="max-w-xl">
                        <h4 className="text-lg font-bold text-brand-blue mb-2">Our Vision for the Future</h4>
                        <p className="text-sm text-gray-600">
                            To be the leading African consulting firm, recognized for transforming 
                            lives through innovative and sustainable infrastructure solutions.
                        </p>
                    </div>
                    <a
                      href="/projects"
                      onClick={(event) => {
                        event.preventDefault();
                        setView('projects');
                      }}
                      className="px-8 py-3 bg-brand-blue text-white hover:bg-brand-blue/90 transition-all text-sm font-semibold"
                    >
                        View Our Projects
                    </a>
                </div>
            </div>
        </Section>
      </div>
    </div>
  );
};

type ValueIconVariant = 'integrity' | 'excellence' | 'reliability';

const ValueIcon: React.FC<{ variant: ValueIconVariant }> = ({ variant }) => {
    const common = {
        width: 28,
        height: 28,
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.15,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
        className: 'text-brand-gold',
        'aria-hidden': true,
    };

    if (variant === 'integrity') {
        return (
            <svg {...common}>
                <path d="M12 3 5.5 5.8v5.6c0 4.1 2.7 7.6 6.5 9.1 3.8-1.5 6.5-5 6.5-9.1V5.8L12 3Z" />
                <path d="m8.8 12.2 2.1 2.1 4.4-4.7" />
            </svg>
        );
    }

    if (variant === 'excellence') {
        return (
            <svg {...common}>
                <path d="M12 4.5 14 9l4.8.4-3.6 3.1 1.1 4.7L12 14.7l-4.3 2.5 1.1-4.7-3.6-3.1L10 9l2-4.5Z" />
                <path d="M12 9.2v3.1" />
            </svg>
        );
    }

    return (
        <svg {...common}>
            <path d="M5 12.5a7 7 0 0 1 11.9-5" />
            <path d="M19 11.5a7 7 0 0 1-11.9 5" />
            <path d="M17 4.5v3.3h-3.3" />
            <path d="M7 19.5v-3.3h3.3" />
        </svg>
    );
};
