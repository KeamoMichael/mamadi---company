import React, { useRef } from 'react';
import { Section } from './Section';
import { TeamMember } from '../types';

const leadership: TeamMember[] = [
  {
    name: "Mabu Mamadi",
    role: "Chairman | Mamadi International",
    image: "/assets/Director Images/Mabu.webp"
  },
  {
    name: "Dr Tendai Sawunyama",
    role: "Operations Director | Africa",
    image: "/assets/Director Images/Dr Tendai.webp"
  },
  {
    name: "Avnish Gupta",
    role: "CEO | Mamadi India",
    image: "/assets/Director Images/Avish Gupta.webp"
  },
  {
    name: "Ike Rampedi",
    role: "CEO | Mamadi SA",
    image: "/assets/Director Images/Ike.webp"
  },
  {
    name: "Victor Kongo",
    role: "Regional Director | East Africa (Kenya)",
    image: "/assets/Director Images/Victor.webp"
  },
  {
    name: "Seokhoon Ko",
    role: "Finance and Infrastructure Planning: Specialist (UK)",
    image: "/assets/Director Images/Seokhoon Ko.webp"
  },
  {
    name: "Valentine Chadyiwa",
    role: "EPC Director",
    image: "/assets/Director Images/Valentine.webp"
  },
  {
    name: "Silver Mucavele",
    role: "CEO | Mamadi Mozambique",
    image: "/assets/Director Images/Silver Mucavele.webp"
  },
  {
    name: "Manfield Mandigora",
    role: "CEO | Mamadi USA",
    image: "/assets/Director Images/Manfield Mandigora.webp"
  },
  {
    name: "Sandra Govere",
    role: "CEO | BluePoint Finance",
    image: "/assets/Director Images/Sandra.webp"
  },
  {
    name: "Kgaugelo Mokwena",
    role: "Executive Personal Assistant to Chairman",
    image: "/assets/Director Images/Kgaugelo Mokwena.webp"
  },
  {
    name: "Thokozani Magwaza",
    role: "Regional Director | Central and West Africa (Ghana)",
    image: "/assets/Director Images/Thokozani Magwaza.webp"
  },
  {
    name: "Adv. Emmanuel Tem",
    role: "Senior Consultant",
    image: "/assets/Director Images/Adv. Emmanuel Tem.webp"
  },
  {
    name: "Osborne Muvingi",
    role: "Senior Investment Officer | Africa",
    image: "/assets/Director Images/Osborne Muvingi.webp"
  },
  {
    name: "Zvikomborero Hoko",
    role: "Excellence Director | Africa (Zimbabwe)",
    image: "/assets/Director Images/Zvikomborero Hoko.webp"
  }
];

export const KeyPeople: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Check initial scroll position on mount
  React.useEffect(() => {
    handleScroll();
  }, []);

  const getItemWidth = () => {
    if (!scrollRef.current) return 304;
    const firstChild = scrollRef.current.firstElementChild as HTMLElement;
    return firstChild ? firstChild.offsetWidth + 24 : 304; // card + gap-6
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const index = Math.round(scrollLeft / getItemWidth());
      setActiveIndex(index);
      setShowLeftArrow(scrollLeft > 20);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -getItemWidth(), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: getItemWidth(), behavior: 'smooth' });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: index * getItemWidth(), behavior: 'smooth' });
    }
  };

  return (
    <Section label="Mamadi Leadership">
      <div className="flex flex-col gap-12 relative group">
        {/* Intro Text */}
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
          Mamadi’s leadership combines technical knowledge, strategic insight,
          and people-centred values to guide the organisation toward consistent
          performance and lasting impact.
        </p>

        {/* Team Horizontal Scroll Container */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              {/* Left Arrow Button - Hidden on Mobile */}
              {showLeftArrow && (
                <button
                  onClick={scrollLeft}
                  className="hidden md:flex shrink-0 z-20 transition-transform hover:scale-110 active:scale-95 p-2"
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
                className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory flex-1 transition-all duration-300 px-[10vw] md:px-0"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {leadership.map((person, index) => (
                  <div
                    key={index}
                    className="flex flex-col flex-shrink-0 w-[80vw] md:w-[280px] snap-center md:snap-start"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6 font-sans">
                      <img
                        src={person.image}
                        alt={person.name}
                        loading={index < 3 ? 'eager' : 'lazy'}
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <h3 className="text-xl font-semibold text-brand-blue tracking-tight">{person.name}</h3>
                      {person.role && (
                        <p className="text-xs text-brand-gold font-medium">{person.role}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Arrow Button - Hidden on Mobile */}
              <button
                onClick={scrollRight}
                className="hidden md:flex shrink-0 z-20 transition-transform hover:scale-110 active:scale-95 p-2"
                aria-label="Scroll right"
              >
                <img
                  src="/assets/next-right arrow.png"
                  alt=""
                  className="w-6 h-6 object-contain"
                />
              </button>
            </div>

            {/* Mobile Pagination Dots */}
            <div className="flex md:hidden justify-center gap-2 pt-2">
              {leadership.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeIndex === index ? 'bg-brand-gold w-4' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to person ${index + 1}`}
                />
              ))}
            </div>
          </div>
      </div>
    </Section>
  );
};
