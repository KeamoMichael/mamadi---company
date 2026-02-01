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

  // Check initial scroll position on mount
  React.useEffect(() => {
    handleScroll();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      // Threshold of 20px to avoid accidental trigger
      setShowLeftArrow(scrollRef.current.scrollLeft > 20);
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
          {/* Left Arrow Button */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 transition-all hover:scale-110 active:scale-95"
              aria-label="Scroll left"
            >
              <img
                src="/assets/next-right arrow.png"
                alt=""
                className="w-6 h-6 object-contain rotate-180"
              />
            </button>
          )}

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 transition-all hover:scale-110 active:scale-95"
            aria-label="Scroll right"
          >
            <img
              src="/assets/next-right arrow.png"
              alt=""
              className="w-6 h-6 object-contain"
            />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x px-12 transition-all duration-300"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitMaskImage: showLeftArrow
                ? 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                : 'linear-gradient(to right, black 85%, transparent)',
              maskImage: showLeftArrow
                ? 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                : 'linear-gradient(to right, black 85%, transparent)'
            }}
          >
            {leadership.map((person, index) => (
              <div
                key={index}
                className="flex flex-col flex-shrink-0 w-[280px] snap-start"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6 font-sans">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-brand-blue tracking-tight">{person.name}</h3>
                  <p className="text-xs text-brand-gold font-medium">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};