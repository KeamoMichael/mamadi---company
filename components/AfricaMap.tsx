import React from 'react';

export const AfricaMap: React.FC = () => {
  // Operational countries (highlighted in navy blue)
  const operationalCountries = [
    { name: 'South Africa', path: 'M 480 850 L 510 880 L 560 880 L 580 850 L 560 820 L 500 820 Z' }, // Simplified
    // ... I will use a more detailed path structure below
  ];

  return (
    <div className="w-full h-full relative bg-brand-beige/50 rounded-sm overflow-hidden flex items-center justify-center p-4 md:p-8">
      {/* Background World Map Texture */}
      <div className="absolute inset-0 opacity-[0.03] grayscale pointer-events-none">
        <img 
          src="https://www.transparenttextures.com/patterns/world-map.png" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      <svg
        viewBox="0 0 800 900"
        className="w-full h-full max-h-[600px] drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Africa Continent Base (Lighter Blue/Grey) */}
        <path
          d="M260,110 C280,80 350,60 420,70 C490,80 550,110 600,160 C650,210 680,280 670,350 C660,420 630,480 600,530 C570,580 550,650 540,720 C530,790 510,840 480,880 C450,860 420,830 380,810 C340,790 310,750 280,710 C250,670 220,620 200,560 C180,500 160,450 150,400 C140,350 150,300 170,250 C190,200 220,150 260,110 Z"
          fill="#E5E7EB"
          stroke="#D1D5DB"
          strokeWidth="1"
        />

        {/* Highlighted Countries (Navy Blue) - Simplified geometric approximations for separation */}
        {/* South Africa */}
        <path
          d="M450,780 L520,780 L540,820 L520,870 L480,880 L440,840 Z"
          fill="#1F2B49"
          className="hover:fill-brand-gold transition-colors cursor-pointer"
        >
          <title>South Africa (Headquarters)</title>
        </path>

        {/* Namibia & Botswana */}
        <path
          d="M400,700 L460,700 L460,780 L400,780 Z"
          fill="#1F2B49"
          className="hover:fill-brand-gold transition-colors cursor-pointer"
        >
          <title>Namibia & Botswana</title>
        </path>

        {/* Zimbabwe & Mozambique */}
        <path
          d="M460,700 L530,700 L550,750 L530,780 L460,780 Z"
          fill="#1F2B49"
          className="hover:fill-brand-gold transition-colors cursor-pointer"
        >
          <title>Zimbabwe & Mozambique</title>
        </path>

        {/* Zambia & DRC (Southern) */}
        <path
          d="M420,620 L500,620 L520,700 L420,700 Z"
          fill="#1F2B49"
          className="hover:fill-brand-gold transition-colors cursor-pointer"
        >
          <title>Zambia & DRC</title>
        </path>

        {/* East Africa (Kenya/Tanzania) */}
        <path
          d="M500,550 L580,530 L600,600 L550,650 L500,620 Z"
          fill="#1F2B49"
          className="hover:fill-brand-gold transition-colors cursor-pointer"
        >
          <title>East Africa Hub</title>
        </path>

        {/* West Africa (Nigeria/Ghana) */}
        <path
          d="M250,420 L350,420 L350,480 L280,530 L220,480 Z"
          fill="#1F2B49"
          className="hover:fill-brand-gold transition-colors cursor-pointer"
        >
          <title>West Africa Hub</title>
        </path>

        {/* Major Hub Markers (Gold) */}
        {[
          { x: 490, y: 840, label: 'Johannesburg' },
          { x: 550, y: 600, label: 'Nairobi' },
          { x: 300, y: 460, label: 'Lagos' },
          { x: 440, y: 740, label: 'Gaborone' },
        ].map((hub, i) => (
          <g key={i}>
            <circle cx={hub.x} cy={hub.y} r="6" fill="#C69243" className="animate-pulse">
               <title>{hub.label}</title>
            </circle>
            <circle cx={hub.x} cy={hub.y} r="12" stroke="#C69243" strokeWidth="1" opacity="0.3">
               <animate attributeName="r" from="6" to="20" dur="2s" repeatCount="indefinite" />
               <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(50, 750)" className="hidden md:block">
          <rect width="180" height="100" fill="white" fillOpacity="0.8" rx="4" />
          <circle cx="20" cy="30" r="6" fill="#1F2B49" />
          <text x="40" y="35" className="text-[14px] font-semibold" fill="#1F2B49">Operational Countries</text>
          <circle cx="20" cy="65" r="6" fill="#C69243" />
          <text x="40" y="70" className="text-[14px] font-semibold" fill="#1F2B49">Strategic Hubs</text>
        </g>
      </svg>

      {/* Mobile Tooltip/Info */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-3 rounded-sm border border-gray-100 md:hidden flex items-center justify-between">
         <span className="text-[10px] font-bold uppercase tracking-widest text-brand-blue">Interactive Footprint</span>
         <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-blue" />
            <div className="w-2 h-2 rounded-full bg-brand-gold" />
         </div>
      </div>
    </div>
  );
};