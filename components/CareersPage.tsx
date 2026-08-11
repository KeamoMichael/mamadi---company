import React, { useMemo, useState } from 'react';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, MapPin } from 'lucide-react';

type CareersPageProps = {
  onApply: (roleTitle: string) => void;
};

type Region = 'Europe' | 'Africa' | 'Asia';

type Opening = {
  title: string;
  division: string;
  location: string;
  region: Region;
  reportsTo: string;
  summary: string;
};

export const openings: Opening[] = [
  {
    title: 'Chief Executive Officer',
    division: 'Mamadi Finland',
    location: 'Finland',
    region: 'Europe',
    reportsTo: 'Executive Chairman: Global',
    summary: 'Lead Mamadi’s Finnish operations and advance the company’s market presence, partnerships and delivery capability in the region.',
  },
  {
    title: 'Regional Director: North Africa',
    division: 'Regional Leadership',
    location: 'Morocco',
    region: 'Africa',
    reportsTo: 'Operations Director: Africa',
    summary: 'Provide regional leadership for Mamadi’s North Africa platform and strengthen strategic relationships and project delivery from Morocco.',
  },
  {
    title: 'Technology & Innovation Specialist',
    division: 'Technology and Innovation',
    location: 'Singapore',
    region: 'Asia',
    reportsTo: 'Operations Director: Africa',
    summary: 'Support Mamadi’s technology and innovation agenda through specialist insight, international collaboration and practical digital solutions.',
  },
  {
    title: 'Procurement Specialist',
    division: 'International Operations',
    location: 'Africa operations · Location to be confirmed',
    region: 'Africa',
    reportsTo: 'Operations Director: Africa',
    summary: 'Strengthen procurement planning, supplier coordination and commercially sound sourcing across Mamadi’s project and operational requirements.',
  },
];

export const CareersPage: React.FC<CareersPageProps> = ({ onApply }) => {
  const [activeRegion, setActiveRegion] = useState<'All' | Region>('All');

  const filteredOpenings = useMemo(
    () => activeRegion === 'All' ? openings : openings.filter((role) => role.region === activeRegion),
    [activeRegion],
  );

  return (
    <main className="pt-20">
      <section
        className="relative overflow-hidden bg-brand-blue bg-cover bg-center pt-24 pb-36 text-white md:pb-44"
        style={{ backgroundImage: "url('/assets/Hero Section Images/Vacancies-Hero Section.webp')" }}
      >
        <div className="absolute inset-0 bg-brand-blue/70" />
        <div className="container relative mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <span className="mb-4 block text-sm font-normal tracking-[0.04em] text-white">Careers</span>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
              Vacancies
            </h1>
            <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-gray-300 md:text-lg">
              Join the people extending Mamadi’s engineering, leadership and innovation capability across our global operations.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-20">
          <div className="grid gap-10 border-b border-gray-100 pb-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-end lg:gap-20">
            <div>
              <span className="text-sm font-normal tracking-[0.04em] text-brand-gold">Open Opportunities</span>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-brand-blue md:text-5xl">
                Build the next chapter with Mamadi.
              </h2>
            </div>
            <div className="max-w-2xl lg:justify-self-end">
              <p className="text-sm leading-7 text-gray-500">
                These positions reflect the vacant roles in Mamadi International’s current organisational structure. Applications are reviewed on a rolling basis until the positions are filled.
              </p>
              <div className="mt-7 flex items-center gap-3 text-sm text-brand-blue">
                <BriefcaseBusiness size={17} className="text-brand-gold" />
                <span>{openings.length} open positions across {new Set(openings.map((role) => role.region)).size} regions</span>
              </div>
            </div>
          </div>

          <div className="flex gap-7 overflow-x-auto border-b border-gray-100 py-7 scrollbar-none">
            {(['All', 'Africa', 'Europe', 'Asia'] as const).map((region) => (
              <button
                key={region}
                type="button"
                onClick={() => setActiveRegion(region)}
                className={`whitespace-nowrap border-b pb-2 text-sm transition-colors ${
                  activeRegion === region
                    ? 'border-brand-gold text-brand-blue'
                    : 'border-transparent text-gray-400 hover:text-brand-blue'
                }`}
              >
                {region === 'All' ? 'All Openings' : region}
              </button>
            ))}
          </div>

          <div className="divide-y divide-gray-100">
            {filteredOpenings.map((role, index) => (
              <article key={role.title} className="grid gap-7 py-10 md:py-12 lg:grid-cols-[72px_1fr_0.72fr_auto] lg:items-start lg:gap-10">
                <span className="text-sm text-brand-gold">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-xs font-medium text-brand-gold">{role.division}</p>
                  <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-brand-blue md:text-3xl">{role.title}</h3>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500">{role.summary}</p>
                </div>
                <div className="space-y-4 text-sm text-gray-500">
                  <p className="flex items-start gap-3">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-brand-gold" />
                    <span>{role.location}</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <BriefcaseBusiness size={16} className="mt-0.5 shrink-0 text-brand-gold" />
                    <span>Reports to {role.reportsTo}</span>
                  </p>
                  <p className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-gold" />
                    <span>Open vacancy · Rolling applications</span>
                  </p>
                </div>
                <a
                  href={`/careers/apply?position=${encodeURIComponent(role.title)}`}
                  onClick={(event) => {
                    event.preventDefault();
                    onApply(role.title);
                  }}
                  className="group inline-flex w-fit items-center gap-2 bg-brand-blue px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-gold"
                >
                  Apply Now
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
};
