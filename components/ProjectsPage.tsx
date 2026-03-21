import React from 'react';
import { Section } from './Section';
import { FadeIn } from './FadeIn';
import { MapPin, Building2, Zap, Droplets, School, Leaf } from 'lucide-react';

// Data Structure
type Category = 'Water & Sanitation' | 'Social Infrastructure' | 'Energy & Power' | 'Environmental Services';

interface Project {
  title: string;
  client: string;
  location: string;
  services: string[];
  category: Category;
  description: string;
}

const projects: Project[] = [
  {
    title: "Gauteng Schools Rehabilitation Programme",
    client: "Independent Development Trust (IDT)",
    location: "Gauteng, South Africa",
    category: "Social Infrastructure",
    services: ["Project Management", "Construction Supervision", "Quality Assurance"],
    description: "A comprehensive rehabilitation initiative to upgrade educational facilities, ensuring safe and conducive learning environments across the province."
  },
  {
    title: "Upgrading of Water & Sanitation Infrastructure",
    client: "City of Ekurhuleni",
    location: "Ekurhuleni, South Africa",
    category: "Water & Sanitation",
    services: ["Civil Engineering", "Hydraulic Modeling", "Contract Administration"],
    description: "Large-scale municipal infrastructure upgrade aimed at improving water reliability and sanitation standards for growing urban communities."
  },
  {
    title: "Construction of Strategic Reservoirs & Pipelines",
    client: "Rand Water",
    location: "Zwartkopjes, South Africa",
    category: "Water & Sanitation",
    services: ["Structural Engineering", "Project Controls", "Site Engineering"],
    description: "Critical bulk water infrastructure development to secure long-term water supply resilience for the region."
  },
  {
    title: "Environmental Impact Assessment for Transmission Lines",
    client: "Eskom Holdings SOC Ltd",
    location: "Various Locations, SA",
    category: "Environmental Services",
    services: ["EIA Studies", "Public Participation", "Environmental Management Plans"],
    description: "Conducting rigorous environmental assessments to facilitate the expansion of the national power grid while preserving ecological integrity."
  },
  {
    title: "Electrification of Rural Households",
    client: "Department of Energy",
    location: "Limpopo & Mpumalanga",
    category: "Energy & Power",
    services: ["Electrical Engineering", "Network Planning", "Community Liaison"],
    description: "A high-impact electrification program connecting remote rural households to the national grid, fostering economic development and social equity."
  }
];

const categories: { id: string; label: Category; icon: any }[] = [
  { id: 'water-&-sanitation', label: 'Water & Sanitation', icon: Droplets },
  { id: 'social-infrastructure', label: 'Social Infrastructure', icon: School },
  { id: 'energy-&-power', label: 'Energy & Power', icon: Zap },
  { id: 'environmental-services', label: 'Environmental Services', icon: Leaf },
];

export const ProjectsPage: React.FC = () => {
    const getProjectsByCategory = (catLabel: string) => projects.filter(p => p.category === catLabel);

    const [activeSection, setActiveSection] = React.useState(categories[0].id);
    const navRef = React.useRef<HTMLDivElement>(null);

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
            <section className="bg-brand-blue py-24 text-white">
                <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">
                <div className="max-w-3xl">
                    <span className="text-brand-gold font-medium tracking-wider text-sm mb-4 block uppercase">// Project Portfolio</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-8 leading-tight">
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
            <div ref={navRef} className="sticky top-[72px] bg-white/95 backdrop-blur-sm border-b border-gray-100 z-30 overflow-x-auto scrollbar-none">
                <div className="container mx-auto pl-6 md:px-12 lg:px-20 max-w-screen-2xl flex items-center gap-10 whitespace-nowrap">
                    {categories.map((cat, index) => (
                        <a
                            key={cat.id}
                            data-section={cat.id}
                            href={`#${cat.id}`}
                            className={`group flex items-center gap-3 py-6 text-sm font-semibold transition-colors relative ${
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
                            <cat.icon size={18} className={`transition-colors ${
                                activeSection === cat.id ? 'text-brand-gold' : 'text-brand-gold/70 group-hover:text-brand-gold'
                            }`} />
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
                            <Section className="py-20 md:py-32">
                                <div className="flex flex-col gap-16">
                                    {/* Category Header */}
                                    <FadeIn>
                                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-4 border-brand-gold pl-6">
                                            <div>
                                                <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-2">{category.label}</h2>
                                                <p className="text-gray-500 max-w-xl">
                                                    Delivering specialized engineering solutions that address complex challenges in the {category.label.toLowerCase()} sector.
                                                </p>
                                            </div>
                                            <div className="hidden md:block text-brand-blue/10">
                                                <category.icon size={64} strokeWidth={1} />
                                            </div>
                                        </div>
                                    </FadeIn>

                                    {/* Projects List for this Category */}
                                    <div className="flex flex-col gap-24">
                                        {categoryProjects.map((project, idx) => (
                                            <FadeIn key={idx} delay={idx * 100}>
                                                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 pb-16 border-b border-gray-100 last:border-0 last:pb-0">
                                                    
                                                    {/* Project Title & Desc */}
                                                    <div className="lg:w-5/12 flex flex-col gap-6">
                                                        <div className="space-y-4">
                                                            <h3 className="text-2xl md:text-3xl font-semibold text-brand-blue leading-tight">
                                                                {project.title}
                                                            </h3>
                                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">
                                                                <Building2 size={12} />
                                                                <span>Client: {project.client}</span>
                                                            </div>
                                                        </div>
                                                        <p className="text-base text-gray-500 leading-relaxed">
                                                            {project.description}
                                                        </p>
                                                    </div>

                                                    {/* Details */}
                                                    <div className="lg:w-7/12 flex flex-col justify-end">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                            <div className="space-y-4">
                                                                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] block">Primary Location</span>
                                                                <div className="flex items-center gap-2 text-brand-blue font-medium">
                                                                    <MapPin size={18} className="text-brand-gold/60" />
                                                                    <span>{project.location}</span>
                                                                </div>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <span className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] block">Scope of Services</span>
                                                                <ul className="flex flex-wrap gap-x-6 gap-y-3">
                                                                    {project.services.map((s, i) => (
                                                                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                                                                            {s}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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