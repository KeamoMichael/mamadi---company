import React from 'react';

export const HeroImage: React.FC = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px] bg-gray-200 overflow-hidden relative">
      {/* Using a civil engineering / infrastructure video */}
      <video
        src="/assets/9323976-hd_1280_720_24fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover brightness-90 contrast-110"
      />
      <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply"></div>
    </div>
  );
};