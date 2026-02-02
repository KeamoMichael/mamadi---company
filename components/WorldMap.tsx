import React from 'react';

export const WorldMap: React.FC = () => {
  return (
    <div className="w-full h-full">
      {/* Mobile Image - Square 1:1 aspect ratio container is handled by parent */}
      <img 
        src="/About%20Us/Countries_SITE%20(Mobile).jpg" 
        alt="Mamadi & Company Geographic Footprint Mobile"
        className="block md:hidden w-full h-full object-cover"
        onError={(e) => {
          console.error("Mobile map image failed to load");
          e.currentTarget.src = "https://placehold.co/600x600?text=Map+Coming+Soon";
        }}
      />
      
      {/* Desktop Image */}
      <img 
        src="/About%20Us/Countries_SITE.jpg" 
        alt="Mamadi & Company Geographic Footprint"
        className="hidden md:block w-full h-full object-cover"
        onError={(e) => {
          console.error("Desktop map image failed to load");
          e.currentTarget.src = "https://placehold.co/1200x600?text=Map+Coming+Soon";
        }}
      />
    </div>
  );
};