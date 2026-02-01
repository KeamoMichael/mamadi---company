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
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 10);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

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
          {/* Fading Edge Overlays */}
          {showLeftArrow && (
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          )}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Left Arrow Button */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 transition-all hover:scale-110 active:scale-95 overflow-hidden"
            >
              <img
                src="/assets/next (3).png"
                alt="Back"
                className="w-full h-full object-cover rotate-180 scale-125"
                style={{ filter: "invert(12%) sepia(35%) saturate(2466%) hue-rotate(205deg) brightness(95%) contrast(92%)" }}
              />
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x px-12"
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
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-100 transition-all hover:scale-110 active:scale-95 overflow-hidden"
          >
            <img
              src="/assets/next (3).png"
              alt="Next"
              className="w-full h-full object-cover scale-125"
              style={{ filter: "invert(12%) sepia(35%) saturate(2466%) hue-rotate(205deg) brightness(95%) contrast(92%)" }}
            />
          </button>
        </div>
      </div>
    </Section>
  );
};