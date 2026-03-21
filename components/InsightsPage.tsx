import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { events } from '../data/events';

const FALLBACK =
  'data:image/svg+xml,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 width%3D%22800%22 height%3D%22500%22%3E%3Crect width%3D%22100%25%22 height%3D%22100%25%22 fill%3D%22%231F2B49%22 opacity%3D%220.08%22%2F%3E%3C%2Fsvg%3E';

export const InsightsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">

      {/* Page header */}
      <div className="bg-brand-blue pt-36 pb-20 px-6 md:px-12 lg:px-20">
        <div className="container mx-auto max-w-screen-2xl">
          <p className="text-brand-gold text-xs font-semibold tracking-widest uppercase mb-5">
            //In The Field
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-tight max-w-3xl">
            Latest Engagements<br />
            <span className="text-brand-gold">&amp; Events</span>
          </h1>
          <p className="mt-6 text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
            Mamadi & Company leadership and specialist teams are active across Africa and internationally — building partnerships, presenting research, and advancing sustainable infrastructure development.
          </p>
        </div>
      </div>

      {/* Events */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl py-20 md:py-28">
        <div className="flex flex-col gap-20 md:gap-28">
          {events.map((event, index) => (
            <article
              key={event.id}
              id={`event-${event.id}`}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-start"
            >
              {/* Image */}
              <div
                className={`overflow-hidden rounded-sm aspect-[16/10] bg-brand-blue/5 ${
                  index % 2 === 0 ? 'md:order-1' : 'md:order-2'
                }`}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = FALLBACK;
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div
                className={`flex flex-col gap-6 ${
                  index % 2 === 0 ? 'md:order-2' : 'md:order-1'
                }`}
              >
                {/* Meta */}
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

                <h2 className="text-2xl md:text-3xl font-semibold text-brand-blue leading-snug tracking-tight">
                  {event.title}
                </h2>

                {/* Gold divider */}
                <div className="w-10 h-0.5 bg-brand-gold" />

                <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
};
