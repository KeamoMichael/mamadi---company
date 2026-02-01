import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="pt-32 pb-16 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-screen-2xl">
        <div className="flex flex-col md:flex-row gap-12 md:gap-8">
          {/* Label */}
          <div className="md:w-1/4 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-brand-blue uppercase">
              <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
              Engineering & Consulting
            </div>
          </div>

          {/* Content */}
          <div className="md:w-3/4 flex flex-col gap-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-brand-blue">
              Engineering the Future of <br className="hidden lg:block" />
              Infrastructure Development <br className="hidden lg:block" />
              in Africa
            </h1>
            
            <p className="text-sm md:text-base text-gray-500 max-w-2xl leading-relaxed">
              Mamadi & Company is a multidisciplinary consulting firm delivering world-class 
              engineering, environmental, and project management solutions. We bridge the gap 
              between technical excellence and sustainable community development.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};