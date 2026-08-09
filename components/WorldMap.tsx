import React from 'react';

export const WorldMap: React.FC = () => {
  return (
    <div className="w-full h-full">
      <img
        src="/assets/mamadi-global-locations_7680x4320_2026-08-07_21-13.webp"
        alt="Mamadi International Geographic Footprint"
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
};
