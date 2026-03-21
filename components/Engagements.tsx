import React from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';
import { events } from '../data/events';

type View = 'home' | 'about' | 'projects' | 'contact' | 'insights';

interface EngagementsProps {
  setView: (view: View) => void;
}

const FALLBACK =
  'data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22800%22 height%3D%22500%22%3E%3Crect width%3D%22100%25%22 height%3D%22100%25%22 fill%3D%22%231F2B49%22 opacity%3D%220.08%22%2F%3E%3C%2Fsvg%3E';

export const Engagements: React.FC<EngagementsProps> = ({ setView }) => {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">

        {/* Section header */}
        <div className="mb-16 md:mb-20">
          <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-4">
            //In The Field
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-blue tracking-tight leading-tight max-w-xl">
              Where We Are<br />
              <span className="text-brand-gold">Right Now</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
              Our executives and specialists are continuously engaging across Africa and beyond — forging partnerships and advancing sustainable development.
            </p>
          </div>
        </div>

        {/* Event list */}
        <div className="flex flex-col divide-y divide-gray-100">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="group py-10 md:py-12 first:pt-0 last:pb-0"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

                {/* Text — always left */}
                <div className="flex flex-col gap-5 order-2 md:order-1">
                  {/* Meta row */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm
                        ${event.tag === 'Upcoming'
                          ? 'bg-brand-gold text-white'
                          : 'bg-brand-blue/5 text-brand-blue'}`}
                    >
                      {event.tag}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      <MapPin size={12} className="text-brand-gold" />
                      {event.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-400">
                      <Calendar size={12} className="text-brand-gold" />
                      {event.date}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-brand-blue leading-snug tracking-tight">
                    {event.title}
                  </h3>

                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  <button
                    onClick={() => setView('insights')}
                    className="flex items-center gap-2 text-xs font-semibold text-brand-gold hover:text-brand-blue transition-colors w-fit group/btn"
                  >
                    Read more
                    <ArrowRight
                      size={13}
                      className="transition-transform duration-300 group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>

                {/* Image — always right */}
                <div className="order-1 md:order-2 overflow-hidden rounded-sm aspect-[4/3] md:aspect-[16/10] bg-brand-blue/5">
                  <img
                    src={event.image}
                    alt={event.title}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = FALLBACK;
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
