import React from 'react';

interface SectionProps {
  label?: string;
  labelSubtitle?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  fullWidthContent?: boolean; // If true, content ignores the grid and takes full width (for header/hero)
}

export const Section: React.FC<SectionProps> = ({ 
  label, 
  labelSubtitle, 
  children, 
  className = "", 
  dark = false,
  fullWidthContent = false
}) => {
  return (
    <section className={`py-16 md:py-24 ${dark ? 'bg-brand-blue text-white' : 'bg-white text-brand-blue'} ${className}`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">
        <div className="flex flex-col md:flex-row gap-12 md:gap-8">
          
          {/* Left Column - Label */}
          <div className="md:w-1/4 flex flex-col gap-4 shrink-0">
            {label && (
              <div className="flex items-start gap-2">
                <span className={`text-sm font-medium tracking-wide ${dark ? 'text-brand-gold' : 'text-brand-gold'}`}>
                  {label}
                </span>
              </div>
            )}
            {labelSubtitle && (
              <p className={`text-sm max-w-[160px] leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-500'}`}>
                {labelSubtitle}
              </p>
            )}
          </div>

          {/* Right Column - Content */}
          <div className={`flex-grow ${fullWidthContent ? 'w-full' : 'md:w-3/4'}`}>
            {children}
          </div>

        </div>
      </div>
    </section>
  );
};