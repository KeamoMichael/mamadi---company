import React from 'react';

export const HeroImage: React.FC = () => {
  return (
    <div className="w-full h-[300px] md:h-[400px] bg-gray-200 overflow-hidden relative">
      <video
        className="w-full h-full object-cover brightness-90 contrast-110"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/assets/hf_20260214_081729_8360f762-d0b8-4561-9ce9-4f60000eb638.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-brand-blue/10 mix-blend-multiply"></div>
    </div>
  );
};
