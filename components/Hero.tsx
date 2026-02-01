import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="w-full bg-white pt-32 pb-16 md:pt-48 md:pb-24">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight mb-8 leading-tight text-brand-blue">
          Engineering the Future of <br className="hidden md:block" />
          <span className="text-brand-gold">Infrastructure</span> in Africa
        </h1>

        <p className="text-base md:text-xl text-gray-500 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          Mamadi & Company is a multidisciplinary consulting firm delivering world-class 
          engineering, environmental, and project management solutions. We bridge the gap 
          between technical excellence and sustainable community development.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="w-44 py-3.5 bg-brand-gold hover:bg-brand-blue text-white font-semibold tracking-wide transition-all duration-300 rounded-sm text-sm">
            Our Expertise
          </button>
          <button className="w-44 py-3.5 border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white font-semibold tracking-wide transition-all duration-300 rounded-sm text-sm">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};