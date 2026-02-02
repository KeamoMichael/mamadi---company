import React from 'react';

export const HeroImage: React.FC = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px] bg-gray-200 overflow-hidden relative">
      {/* Using a civil engineering / bridge infrastructure image */}
      <img
        src="/assets/pexels-kindelmedia-9800092.jpg"
        alt="Mamadi & Company Infrastructure"
        className="w-full h-full object-cover brightness-90 contrast-110"
      />
      <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply"></div>
    </div>
  );
};