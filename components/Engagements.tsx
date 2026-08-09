import React from 'react';
import { ArrowRight } from 'lucide-react';

type View = 'home' | 'about' | 'projects' | 'contact' | 'insights';

interface EngagementsProps {
  setView: (view: View) => void;
}

export const Engagements: React.FC<EngagementsProps> = ({ setView }) => {
  return (
    <section className="border-t border-gray-100 bg-white py-24 md:py-32">
      <div className="container mx-auto max-w-screen-2xl px-6 md:px-12 lg:px-20">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end md:gap-16 lg:gap-24">
          <div>
            <span className="mb-5 block text-sm font-normal tracking-[0.04em] text-brand-gold">
              Where We Are
            </span>
            <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-brand-blue md:text-4xl lg:text-5xl">
              See how Mamadi is growing across the world.
            </h2>
          </div>

          <div className="max-w-xl md:justify-self-end">
            <p className="mb-8 text-sm leading-relaxed text-gray-500 md:text-base">
              Explore our latest international launches, strategic partnerships and technology-led engineering initiatives across the markets where we operate.
            </p>
            <a
              href="/insights"
              onClick={(event) => {
                event.preventDefault();
                setView('insights');
              }}
              className="group inline-flex items-center gap-3 bg-brand-blue px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-brand-gold"
            >
              Explore Mamadi Insights
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
