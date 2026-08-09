import React from 'react';
import { Section } from './Section';
import { FadeIn } from './FadeIn';
import { useNavbarHeight } from './useNavbarHeight';

type Category = 'Water & Sanitation' | 'Energy' | 'Environmental' | 'Sustainability';

export interface Project {
  title: string;
  location?: string;
  value?: string;
  category: Category;
}

export const projects: Project[] = [
  {
    title: 'Upgrade and Refurbishment of Olifantspoort and Ebenezer Water Schemes',
    location: 'South Africa',
    value: '$1.1 Billion USD',
    category: 'Water & Sanitation',
  },
  {
    title: 'Implementation of the New Ncandu Dam, Water Treatment Works and Associated Infrastructure',
    location: 'Amajuba District, KwaZulu-Natal, South Africa',
    value: '$188 Million USD',
    category: 'Water & Sanitation',
  },
  {
    title: 'Impedle WWTP, Richmond/Greater Indalene Sanitation Scheme and Khambathini WWTP Supply Scheme to the SEZ',
    location: 'South Africa',
    value: '$352 Million USD',
    category: 'Water & Sanitation',
  },
  {
    title: 'New Glass Plant Pre-Feasibility Study',
    location: 'Melbourne, Australia',
    value: '$176 Million USD',
    category: 'Water & Sanitation',
  },
  {
    title: 'Bankable Feasibility Study for a 136MWp Solar PV Project',
    location: 'Rustenburg, South Africa',
    value: '$176 Million USD',
    category: 'Energy',
  },
  {
    title: 'Bid Windows 5 and 6 of the Renewable Energy Independent Power Producer Procurement Programme',
    location: 'South Africa',
    value: '$2.9 Million USD',
    category: 'Energy',
  },
  {
    title: 'Transaction Advisory for Renewable Energy Interventions in Government Buildings',
    location: 'South Africa',
    value: '$2.5 Million USD',
    category: 'Energy',
  },
  {
    title: 'Development of the Shell Downstream South Africa Climate Change Report',
    location: 'South Africa',
    value: '$10,000 USD',
    category: 'Environmental',
  },
  {
    title: 'Feasibility Study for a Waste Buy-Back Centre Facility',
    value: '$21,000 USD',
    category: 'Environmental',
  },
  {
    title: 'Air Quality Impact Assessment for the Proposed Extension of the Shell Polokwane Fuel Depot',
    location: 'Polokwane, South Africa',
    value: '$50,000 USD',
    category: 'Environmental',
  },
  {
    title: 'Development of Environmental Management Plans for Bethlehem and Ermelo Depots',
    location: 'Bethlehem and Ermelo, South Africa',
    category: 'Environmental',
  },
  {
    title: "Quantifying the Impact of Sasol's Offsetting Interventions for Sasolburg and Secunda Operations",
    location: 'Sasolburg and Secunda, South Africa',
    category: 'Environmental',
  },
  {
    title: 'Development of a National Framework for Weather, Water and Climate Services for Zambia',
    location: 'Zambia',
    value: '$100,000 USD',
    category: 'Sustainability',
  },
  {
    title: 'Low-Carbon and Climate-Resilient Industrial Development — Phase II',
    location: 'Egypt, Kenya, Senegal and South Africa',
    value: '$15,000 USD',
    category: 'Sustainability',
  },
  {
    title: 'Guidelines for a National Framework for Weather, Water and Climate Services for WMO',
    location: 'International',
    value: '$20,000 USD',
    category: 'Sustainability',
  },
  {
    title: 'Mpumalanga Climate Change Response Strategy and Implementation Plan for the Agricultural Sector',
    location: 'Mpumalanga, South Africa',
    value: '$100,000 USD',
    category: 'Sustainability',
  },
];

export const getProjectSlug = (title: string) => title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

type ProjectIcon = 'water' | 'energy' | 'environment' | 'sustainability';

const categories: { id: string; label: Category; icon: ProjectIcon; description: string }[] = [
  { id: 'water-&-sanitation', label: 'Water & Sanitation', icon: 'water', description: 'Bulk water, treatment, sanitation and industrial feasibility projects.' },
  { id: 'energy', label: 'Energy', icon: 'energy', description: 'Renewable energy feasibility, procurement and transaction advisory projects.' },
  { id: 'environmental', label: 'Environmental', icon: 'environment', description: 'Climate reporting, waste feasibility, air quality and environmental management programmes.' },
  { id: 'sustainability', label: 'Sustainability', icon: 'sustainability', description: 'Climate services, low-carbon development and regional response strategies.' },
];

const categoryIconAnimations: Record<ProjectIcon, string> = {
  water: 'project-icon-water',
  energy: 'project-icon-energy',
  environment: 'project-icon-environment',
  sustainability: 'project-icon-sustainability',
};

export const ProjectsPage: React.FC = () => {
    const getProjectsByCategory = (catLabel: string) => projects.filter(p => p.category === catLabel);

    const [activeSection, setActiveSection] = React.useState(categories[0].id);
    const navRef = React.useRef<HTMLDivElement>(null);
    const navbarHeight = useNavbarHeight();

    React.useEffect(() => {
        const observers: IntersectionObserver[] = [];
        categories.forEach(({ id }) => {
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
        const isLast = activeSection === categories[categories.length - 1].id;
        // For the last item scroll to the absolute end so trailing padding is always visible.
        // For all others align the item's left edge to the natural 24px gutter.
        const scrollTo = isLast
            ? navRef.current.scrollWidth
            : Math.max(0, activeEl.offsetLeft - 24);
        navRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }, [activeSection]);

    return (
        <div className="pt-20 min-h-screen bg-white">
             {/* Hero Section (Matched to AboutUsPage) */}
            <section
                className="relative overflow-hidden bg-brand-blue bg-cover bg-center pt-24 pb-36 text-white md:pb-44"
                style={{ backgroundImage: "url('/assets/Hero Section Images/Our Projects-Hero Section03.webp')" }}
            >
                <div className="absolute inset-0 bg-brand-blue/70" />
                <div className="container relative mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-20">
                <div className="max-w-3xl">
                    <span className="text-white font-normal tracking-[0.04em] text-sm mb-4 block">Project Portfolio</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight text-white">
                    Engineering a sustainable future.
                    </h1>
                    <p className="text-gray-300 text-lg leading-relaxed">
                    From critical water infrastructure to social development and energy solutions,
                    our portfolio demonstrates the breadth of our technical expertise and our
                    commitment to excellence across Africa.
                    </p>
                </div>
                </div>
            </section>

            {/* Sticky Navigation */}
            <div
                ref={navRef}
                style={{ top: navbarHeight }}
                className="sticky bg-white border-b border-gray-100 z-30 overflow-x-auto scrollbar-none"
            >
                <div className="container mx-auto pl-6 md:px-12 lg:px-20 max-w-screen-2xl flex items-center gap-10 whitespace-nowrap">
                    {categories.map((cat, index) => (
                        <a
                            key={cat.id}
                            data-section={cat.id}
                            href={`#${cat.id}`}
                            className={`group flex items-center gap-3 pt-8 pb-6 text-sm font-semibold transition-colors relative ${
                                activeSection === cat.id ? 'text-brand-gold' : 'text-gray-500 hover:text-brand-blue'
                            } ${index === categories.length - 1 ? 'pr-4 md:pr-0' : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.getElementById(cat.id);
                                if (element) {
                                    const y = element.getBoundingClientRect().top + window.scrollY - 150;
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                            }}
                        >
                            <ProjectNavIcon
                                variant={cat.icon}
                                className={`transition-colors ${
                                    activeSection === cat.id ? 'text-brand-gold' : 'text-brand-gold/70 group-hover:text-brand-gold'
                                }`}
                            />
                            <span>{cat.label}</span>
                            <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold transform transition-transform origin-left duration-300 ${
                                activeSection === cat.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            }`}></span>
                        </a>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-gray-50/30">
                {categories.map((category) => {
                    const categoryProjects = getProjectsByCategory(category.label);
                    if (categoryProjects.length === 0) return null;

                    return (
                        <div id={category.id} key={category.id} className="border-b border-gray-100 last:border-0 scroll-mt-40">
                            <Section className="py-20 md:py-32" fullWidthContent>
                                <div className="grid gap-12 md:grid-cols-[minmax(220px,0.28fr)_minmax(0,0.72fr)] md:gap-10 lg:grid-cols-[minmax(260px,0.26fr)_minmax(0,0.74fr)] lg:gap-16">
                                    <FadeIn>
                                        <div className="pt-6 md:sticky md:top-40">
                                            <div className="flex items-start gap-4">
                                                <AnimatedProjectIcon
                                                    variant={category.icon}
                                                />
                                                <h2 className="text-3xl font-semibold leading-tight tracking-tight text-brand-blue lg:text-4xl">
                                                    {category.label}
                                                </h2>
                                            </div>
                                            <p className="mt-5 max-w-xs pl-12 text-sm leading-relaxed text-gray-500">
                                                {category.description}
                                            </p>
                                        </div>
                                    </FadeIn>

                                    <div className="flex flex-col">
                                        {categoryProjects.map((project, idx) => (
                                            <FadeIn key={idx} delay={idx * 100}>
                                                <article
                                                  id={getProjectSlug(project.title)}
                                                  className={`scroll-mt-40 grid gap-8 border-b border-gray-100 py-14 md:py-16 lg:grid-cols-[minmax(245px,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12 xl:gap-16 ${idx === 0 ? 'pt-6 md:pt-6' : ''}`}
                                                >
                                                    <div>
                                                        <span className="mb-3 block text-xs font-medium text-brand-gold">Project value</span>
                                                        {project.value ? (
                                                          <p className="text-3xl font-semibold leading-none tracking-tight text-brand-blue md:text-4xl xl:text-[2.65rem]">
                                                            {project.value}
                                                          </p>
                                                        ) : (
                                                          <p className="text-sm text-gray-400">Not stated in the reference</p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <span className="mb-3 block text-xs font-medium text-gray-400">Selected experience</span>
                                                        <h3 className="text-xl font-medium leading-snug text-brand-blue md:text-2xl">
                                                            <a
                                                              href={`/projects#${getProjectSlug(project.title)}`}
                                                              className="hover:text-brand-gold transition-colors"
                                                            >
                                                              {project.title}
                                                            </a>
                                                        </h3>
                                                        {project.location && (
                                                              <div className="mt-6 space-y-2">
                                                                <span className="block text-xs font-medium text-gray-400">Location</span>
                                                                <div className="flex items-center gap-2 text-sm font-medium leading-relaxed text-brand-blue">
                                                                    <ProjectLocationIcon />
                                                                    <span>{project.location}</span>
                                                                </div>
                                                              </div>
                                                        )}
                                                    </div>
                                                </article>
                                            </FadeIn>
                                        ))}
                                    </div>
                                </div>
                            </Section>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const iconBase = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.25,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
};

const AnimatedProjectIcon: React.FC<{ variant: ProjectIcon }> = ({ variant }) => {
    const iconRef = React.useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const element = iconRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.7 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <span ref={iconRef} className="flex h-10 w-10 shrink-0 items-center justify-center">
            <ProjectNavIcon
                variant={variant}
                className={`h-10 w-10 text-brand-gold ${isVisible ? categoryIconAnimations[variant] : 'project-icon-awaiting'}`}
            />
        </span>
    );
};

const ProjectNavIcon: React.FC<{ variant: ProjectIcon; className?: string }> = ({ variant, className }) => {
    if (variant === 'water') {
        return (
            <svg {...iconBase} className={className} aria-hidden="true">
                <path pathLength="1" d="M4 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
                <path pathLength="1" d="M4 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
            </svg>
        );
    }

    if (variant === 'sustainability') {
        return (
            <svg {...iconBase} className={className} aria-hidden="true">
                <path pathLength="1" d="M7 7a7 7 0 0 1 11 2" />
                <path pathLength="1" d="m18 5 .5 4-4-.5" />
                <path pathLength="1" d="M17 17a7 7 0 0 1-11-2" />
                <path pathLength="1" d="m6 19-.5-4 4 .5" />
            </svg>
        );
    }

    if (variant === 'energy') {
        return (
            <svg {...iconBase} className={className} aria-hidden="true">
                <path pathLength="1" d="M13 3 7 13h5l-1 8 6-11h-5l1-7Z" />
            </svg>
        );
    }

    return (
        <svg {...iconBase} className={className} aria-hidden="true">
            <path pathLength="1" d="M5 15c7 .2 11-4 14-10" />
            <path pathLength="1" d="M5 15c1-6 6-9 14-10 0 9-5 14-14 10Z" />
        </svg>
    );
};

const ProjectLocationIcon: React.FC = () => (
    <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-brand-gold/65"
        aria-hidden="true"
    >
        <path d="M12 21s6-6.1 6-11a6 6 0 0 0-12 0c0 4.9 6 11 6 11Z" />
        <circle cx="12" cy="10" r="1.8" />
    </svg>
);
