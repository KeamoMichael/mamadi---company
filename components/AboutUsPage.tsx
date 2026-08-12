import React from 'react';
import { Gauge, HandHeart, Lightbulb, ShieldCheck, UsersRound } from 'lucide-react';
import { Section } from './Section';
import { WorldMap } from './WorldMap';
import { useNavbarHeight } from './useNavbarHeight';

const groupChairman = {
  name: 'Mr Mabu Mamadi',
  role: 'Executive Chairman',
  area: 'Global',
  image: '/assets/Director Images/Mabu.webp',
};

const operationsDirector = {
  name: 'Dr Tendai Sawunyama',
  role: 'Operations Director',
  area: 'Africa',
  image: '/assets/Director Images/Dr Tendai.webp',
};

const continentalLeadership = [
  { name: 'Mr Valentine Chadyiwa', role: 'EPC Director', area: 'International delivery', image: '/assets/Director Images/Valentine.webp' },
  { name: 'Mrs Kgaugelo Mokwena', role: 'Executive Personal Assistant', area: 'Africa operations', image: '/assets/Director Images/Kgaugelo Mokwena.webp' },
];

const countryLeadership = [
  { country: 'South Africa', flagImage: '/assets/flaticon-country-flags/south-africa.png', flagEmoji: '', entity: 'Mamadi South Africa', descriptor: 'Mamadi & Company South Africa', leaders: [
    { name: 'Mr Ike Rampedi', role: 'Chief Executive Officer', image: '/assets/Director Images/Ike.webp' },
  ] },
  { country: 'United States', flagImage: '/assets/flaticon-country-flags/usa.png', flagEmoji: '', entity: 'Mamadi USA', descriptor: '', leaders: [
    { name: 'Mr Manfield Mandigora', role: 'Chief Executive Officer', image: '/assets/Director Images/Manfield Mandigora.webp' },
  ] },
  { country: 'India', flagImage: '/assets/flaticon-country-flags/india.png', flagEmoji: '', entity: 'Mamadi India', descriptor: '', leaders: [
    { name: 'Mr Avnish Gupta', role: 'Chief Executive Officer', image: '/assets/Director Images/Avish Gupta.webp' },
  ] },
  { country: 'United Kingdom', flagImage: '/assets/flaticon-country-flags/united-kingdom.jpg', flagEmoji: '', entity: 'Mamadi UK', descriptor: 'United Kingdom office', leaders: [
    { name: 'Mr Seokhoon Ko', role: 'Financing & Infrastructure Planning Specialist', image: '/assets/Director Images/Seokhoon Ko.webp' },
  ] },
  { country: 'Mozambique', flagImage: '/assets/flaticon-country-flags/mozambique.png', flagEmoji: '', entity: 'Mamadi Mozambique', descriptor: 'Mozambique operations', leaders: [
    { name: 'Silver Mucavele', role: 'Director', image: '/assets/Director Images/Silver Mucavele.webp' },
  ] },
  { country: 'Ghana', flagImage: '/assets/flaticon-country-flags/ghana-rectangular.png', flagEmoji: '', paddedFlag: true, entity: 'Mamadi Ghana', descriptor: 'Central & West Africa', leaders: [
    { name: 'Thokozani Magwaza', role: 'Regional Director', image: '/assets/Director Images/Thokozani Magwaza.webp' },
  ] },
  { country: 'Kenya', flagImage: '/assets/flaticon-country-flags/kenya.png', flagEmoji: '', entity: 'Mamadi Kenya', descriptor: 'East Africa', leaders: [
    { name: 'Dr Victor Kongo', role: 'Regional Director', image: '/assets/Director Images/Victor.webp' },
  ] },
  { country: 'Zimbabwe', flagImage: '/assets/flaticon-country-flags/zimbabwe-rectangular.png', flagEmoji: '', paddedFlag: true, entity: 'Mamadi Zimbabwe', descriptor: 'Southern Africa', leaders: [
    { name: 'Eng. Zvikomborero Hoko', role: 'Operations Excellence Director', image: '/assets/Director Images/Zvikomborero Hoko.webp' },
  ] },
];

const specialistFunctions = [
  { name: 'Adv Emmanuel Tem', role: 'Legal & Taxation Specialist', area: 'International services', image: '/assets/Director Images/Adv. Emmanuel Tem.webp' },
  { name: 'Gustave Mizero', role: 'Projects Engineer', area: 'Engineering delivery' },
  { name: 'Ms Lucia Mogale', role: 'Senior Project Administrator', area: 'Project support' },
  { name: 'Mr Osborne Muvingi', role: 'Senior Investment Officer', area: 'Investment', image: '/assets/Director Images/Osborne Muvingi.webp' },
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
        style={{ backgroundImage: "url('/assets/Hero Section Images/About Us-Hero Section.webp')" }}
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
                Leadership across Mamadi International.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-gray-500 lg:justify-self-end">
                Our organisational structure brings together international executives, regional directors,
                operational leadership, and specialist expertise across Africa and international markets.
              </p>
            </div>

            <div className="border-t border-brand-gold/45">
              <article className="grid gap-7 py-10 md:grid-cols-[160px_1fr] md:items-end md:gap-10 md:py-14">
                <LeadershipPortrait
                  image={groupChairman.image}
                  name={groupChairman.name}
                  className="w-full max-w-[160px]"
                />
                <div>
                  <span className="text-sm text-brand-gold">International leadership</span>
                  <p className="mt-3 text-sm text-gray-400">{groupChairman.role} · {groupChairman.area}</p>
                  <h3 className="mt-5 text-3xl font-semibold tracking-tight text-brand-blue md:text-5xl">
                    {groupChairman.name}
                  </h3>
                </div>
              </article>

              <article className="grid gap-7 border-t border-gray-100 py-10 md:grid-cols-[160px_1fr] md:items-center md:gap-10 md:py-12">
                <LeadershipPortrait
                  image={operationsDirector.image}
                  name={operationsDirector.name}
                  className="w-full max-w-[160px]"
                />
                <div className="border-l-2 border-brand-gold pl-6 md:pl-8">
                  <span className="text-sm font-medium text-brand-gold">Africa operations</span>
                  <p className="mt-3 text-xs text-gray-400">Continental oversight and delivery</p>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight text-brand-blue md:text-3xl">
                    {operationsDirector.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{operationsDirector.role} · {operationsDirector.area}</p>
                </div>
              </article>

              <div className="border-t border-gray-100 py-10 md:py-12">
                <div className="mb-9 max-w-2xl">
                  <h3 className="text-sm font-medium text-brand-gold">International & continental leadership</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400">
                    Roles that support Mamadi International and its operations across multiple countries.
                  </p>
                </div>
                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
                  {continentalLeadership.map((leader) => (
                    <article key={leader.name}>
                      <LeadershipPortrait image={leader.image} name={leader.name} className="w-full" />
                      <p className="mt-5 text-xs leading-relaxed text-gray-400">{leader.area}</p>
                      <h4 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-brand-blue">{leader.name}</h4>
                      <p className="mt-2 text-xs font-medium text-brand-gold">{leader.role}</p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 py-10 md:py-12">
                <div className="mb-9 max-w-2xl">
                  <h3 className="text-sm font-medium text-brand-gold">Country & regional leadership</h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-400">
                    Each leader below is shown under the country or regional entity they represent.
                  </p>
                </div>
                <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
                  {countryLeadership.map((group) => (
                    <section key={group.country}>
                      {group.leaders.map((leader) => (
                        <article key={leader.name}>
                          <LeadershipPortrait image={leader.image} name={leader.name} className="w-full" />
                          <div className="mt-5 flex h-5 items-center gap-3">
                            {group.flagImage ? (
                              <span className="block h-5 w-8 shrink-0 overflow-hidden">
                                <img
                                  src={group.flagImage}
                                  alt={`Flag of ${group.country}`}
                                  className={group.paddedFlag
                                    ? 'h-8 w-8 max-w-none -translate-y-1.5 object-contain'
                                    : 'h-5 w-8 object-cover object-left'}
                                  loading="lazy"
                                  decoding="async"
                                />
                              </span>
                            ) : (
                              <span role="img" aria-label={`Flag of ${group.country}`} className="text-xl leading-none">
                                {group.flagEmoji}
                              </span>
                            )}
                            <p className="text-xs font-medium leading-relaxed text-gray-400">{group.entity}</p>
                          </div>
                          <h4 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-brand-blue">{leader.name}</h4>
                          <p className="mt-2 text-xs font-medium text-brand-gold">{leader.role}</p>
                          {group.descriptor && (
                            <p className="mt-2 text-xs leading-relaxed text-gray-400">{group.descriptor}</p>
                          )}
                        </article>
                      ))}
                    </section>
                  ))}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-12">
                <h3 className="border-b border-brand-gold/35 pb-4 text-sm font-medium text-brand-gold">
                  International specialist functions
                </h3>
                <div className="mt-9 grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
                  {specialistFunctions.filter((leader) => leader.image).map((leader) => (
                    <article key={leader.name}>
                      <LeadershipPortrait image={leader.image} name={leader.name} className="w-full" />
                      <h4 className="mt-5 text-lg font-semibold leading-snug tracking-tight text-brand-blue">{leader.name}</h4>
                      <p className="mt-2 text-xs font-medium text-brand-gold">{leader.role}</p>
                      <p className="mt-2 text-xs leading-relaxed text-gray-400">{leader.area}</p>
                    </article>
                  ))}
                </div>
                <div className="mt-12 grid gap-x-12 sm:grid-cols-2">
                  {specialistFunctions.filter((leader) => !leader.image).map((leader) => (
                    <article key={leader.name} className="border-t border-brand-gold/45 py-6">
                      <span className="text-xs font-medium tracking-wide text-gray-400">Specialist Function</span>
                      <h4 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-brand-blue">{leader.name}</h4>
                      <p className="mt-2 text-xs font-medium text-brand-gold">{leader.role}</p>
                      <p className="mt-2 text-xs leading-relaxed text-gray-400">{leader.area}</p>
                    </article>
                  ))}
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
                            Headquartered in Dubai, Mamadi International maintains a strategic
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
                      src="/assets/mamadi-global-locations_A4.webp"
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
            <div className="flex flex-col gap-14 md:gap-16">
                <div className="grid gap-8 md:grid-cols-2">
                    <article className="flex flex-col">
                        <div className="flex flex-1 flex-col items-start border border-brand-blue bg-brand-blue p-7 md:p-8">
                            <span className="text-sm font-normal tracking-[0.04em] text-brand-gold">01 / Vision</span>
                            <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-white md:text-xl">
                                Global leader in providing innovative integrated solutions for sustainable infrastructure development
                            </p>
                        </div>
                    </article>
                    <article className="flex flex-col">
                        <div className="flex flex-1 flex-col items-start bg-brand-beige/40 p-7 md:p-8">
                            <span className="text-sm font-normal tracking-[0.04em] text-brand-blue">02 / Mission</span>
                            <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-brand-blue md:text-xl">
                                Transforming lives through delivering world-class infrastructure solutions
                            </p>
                        </div>
                    </article>
                </div>

                <div className="border-t border-gray-200 pt-14 md:pt-16">
                    <div className="flex items-end justify-between gap-6">
                        <div>
                            <span className="text-sm font-normal tracking-[0.04em] text-brand-gold">03 / Values</span>
                            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-brand-blue">How we operate.</h3>
                        </div>
                        <span className="hidden text-xs text-gray-400 md:block">Five principles. One standard.</span>
                    </div>
                    <div className="mt-9 grid gap-y-8 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-0">
                        {[
                            { title: 'Innovative Excellence', icon: Lightbulb },
                            { title: 'Integrity', icon: ShieldCheck },
                            { title: 'Agility', icon: Gauge },
                            { title: 'Collaboration', icon: UsersRound },
                            { title: 'Responsibility', icon: HandHeart },
                        ].map((value, index) => {
                            const Icon = value.icon;
                            return (
                            <article
                                key={value.title}
                                className={`flex flex-col items-start gap-3 lg:px-8 ${index > 0 ? 'lg:border-l lg:border-gray-200' : 'lg:pl-0'} ${index === 4 ? 'lg:pr-0' : ''}`}
                            >
                                <Icon aria-hidden="true" size={27} strokeWidth={1.35} className="text-brand-gold" />
                                <h4 className="text-lg font-semibold leading-snug tracking-tight text-brand-blue">{value.title}</h4>
                            </article>
                            );
                        })}
                    </div>
                </div>

                <div className="grid gap-8 border-t border-gray-200 pt-14 md:pt-16 lg:grid-cols-[0.32fr_0.68fr] lg:gap-14">
                        <div>
                            <span className="text-sm font-normal tracking-[0.04em] text-brand-gold">04 / Value Proposition</span>
                        </div>
                        <div>
                            <p className="max-w-4xl text-xl font-medium leading-relaxed text-brand-blue md:text-2xl">
                                Mamadi International is Africa’s integrated infrastructure partner – rooted locally, connected globally. We deliver complex infrastructure as one accountable platform, with the speed, integrity and reliability our clients can build on.
                            </p>
                            <p className="mt-7 text-sm font-semibold tracking-wide text-brand-gold">Innovative infrastructure. Sustainable impact.</p>
                        </div>
                </div>
            </div>
        </Section>
      </div>
    </div>
  );
};

const LeadershipPortrait: React.FC<{ image?: string; name: string; className?: string }> = ({ image, name, className = '' }) => {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        loading="lazy"
        decoding="async"
        className={`aspect-[3/4] bg-gray-100 object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex aspect-[3/4] items-center justify-center bg-brand-blue ${className}`}
      aria-label={`${name} portrait pending`}
    >
      <img
        src="/assets/cropped-mamadi_and_company_logo-1-e1712595837297.png"
        alt=""
        aria-hidden="true"
        className="h-auto w-[46%]"
        style={{ filter: 'brightness(1.4) saturate(1.08)' }}
      />
    </div>
  );
};
