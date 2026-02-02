import React from 'react';

export const WorldMap: React.FC = () => {
  return (
    <div className="w-full h-full">
      {/* Mobile Image */}
      <img 
        src="/About%20Us/Countries_SITE%20(Mobile).jpg" 
        alt="Mamadi & Company Geographic Footprint Mobile"
        className="block md:hidden w-full h-full object-cover"
      />
      
      {/* Desktop Image */}
      <img 
        src="/About%20Us/Countries_SITE.jpg" 
        alt="Mamadi & Company Geographic Footprint"
        className="hidden md:block w-full h-full object-cover"
      />
    </div>
  );
};