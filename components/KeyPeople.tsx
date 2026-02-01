import React, { useRef } from 'react';
import { Section } from './Section';
import { TeamMember } from '../types';

const leadership: TeamMember[] = [
  {
    name: "Mr Mabu Enos Mamadi",
    role: "Chairman of the Board",
    image: "/assets/Board Images/Mr Mamadi.jpg"
  },
  {
    name: "Mr Jacob Maroga",
    role: "Board Member",
    image: "/assets/Board Images/Mr Maroga.jpg"
  },
  {
    name: "Ms Danai Magugumela",
    role: "Board Member",
    image: "/assets/Board Images/Ms Magugumela.jpg"
  },
  {
    name: "Mr Ike Rampedi",
    role: "CEO, Board Member",
    image: "/assets/Board Images/Ike Rampedi.jpg"
  },
  {
    name: "Mr Ndlovu",
    role: "Board Member",
    image: "/assets/Board Images/Mr Ndlovu.jpg"
  },
  {
    name: "Ms Mofokeng",
    role: "Board Member",
    image: "/assets/Board Images/Ms Mofokeng.jpg"
  }
];

export const KeyPeople: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <Section label="// Mamadi Leadership">
      <div className="flex flex-col gap-12 relative group">
        {/* Intro Text */}
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
          Our team comprises seasoned professionals with extensive experience in the
          industry. We bring a wealth of knowledge and a proven track record in
          strategic consulting. Meet our dedicated team members who
          are committed to delivering exceptional results.
        </p>

        {/* Team Horizontal Scroll Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {leadership.map((person, index) => (
              <div
                key={index}
                className="flex flex-col flex-shrink-0 w-[280px] snap-start"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-bold text-brand-blue tracking-tight">{person.name}</h3>
                  <p className="text-xs text-brand-gold font-medium uppercase tracking-wider">{person.role}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow Ticker Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 transition-all hover:scale-110 active:scale-95"
          >
            <img
              src="/assets/next (3).png"
              alt="Next"
              className="w-5 h-5 object-contain"
              style={{ filter: "invert(12%) sepia(35%) saturate(2466%) hue-rotate(205deg) brightness(95%) contrast(92%)" }}
            />
          </button>
        </div>
      </div>
    </Section>
  );
};