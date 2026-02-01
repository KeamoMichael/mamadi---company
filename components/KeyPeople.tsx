import React, { useRef } from 'react';
import { Section } from './Section';
import { TeamMember } from '../types';

const leadership: TeamMember[] = [
  {
    name: "Mr Mabu Enos Mamadi",
    role: "Chairman of the Board",
    image: "/assets/Board Images_Updated/Mr Mamadi - Updated.jpg"
  },
  {
    name: "Mr Jacob Maroga",
    role: "Board Member",
    image: "/assets/Board Images_Updated/Mr Maroga.jpg"
  },
  {
    name: "Ms Danai Magugumela",
    role: "Board Member",
    image: "/assets/Board Images_Updated/Ms Magugumela - Updated.jpg"
  },
  {
    name: "Mr Ike Rampedi",
    role: "CEO, Board Member",
    image: "/assets/Board Images_Updated/Mr Rampedi - Updated.jpg"
  },
  {
    name: "Mr Langton Ndlovu",
    role: "Board Advisor | Finance & Tax",
    image: "/assets/Board Images_Updated/Mr Ndlovu(02).jpg"
  },
  {
    name: "Ms Teboho Mofokeng",
    role: "Board Advisor | Engineering & Technology",
    image: "/assets/Board Images_Updated/Ms Mofokeng - Updated.jpg"
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
          <div className="flex items-center gap-3">
            {/* Left Arrow Button */}
            {showLeftArrow && (
              <button
                onClick={scrollLeft}
                className="shrink-0 z-20 transition-transform hover:scale-110 active:scale-95 p-2"
                aria-label="Scroll left"
              >
                <img
                  src="/assets/next-right arrow.png"
                  alt=""
                  className="w-6 h-6 object-contain rotate-180"
                />
              </button>
            )}

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x flex-1 transition-all duration-300"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
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

            {/* Right Arrow Button */}
            <button
              onClick={scrollRight}
              className="shrink-0 z-20 transition-transform hover:scale-110 active:scale-95 p-2"
              aria-label="Scroll right"
            >
              <img
                src="/assets/next-right arrow.png"
                alt=""
                className="w-6 h-6 object-contain"
              />
            </button>
          </div>
      </div>
    </Section>
  );
};