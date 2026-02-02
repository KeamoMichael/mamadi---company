import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Search, Plus, Minus, RotateCcw } from 'lucide-react';

export const WorldMap: React.FC = () => {
  // Hubs positions for the 5646 x 2862 coordinate system (Countries_SITE.jpg)
  // Scaled down by 50% from the 11k version
  const hubs = [
    { id: 'london', name: 'London', x: 2823, y: 625, align: 'right' },
    { id: 'nairobi', name: 'Kenya', x: 3368, y: 1430, align: 'right' },
    { id: 'tanzania', name: 'Tanzania', x: 3368, y: 1540, align: 'right' },
    { id: 'zambia', name: 'Zambia', x: 3262, y: 1675, align: 'left' },
    { id: 'mozambique', name: 'Mozambique', x: 3475, y: 1775, align: 'right' },
    { id: 'mauritius', name: 'Mauritius', x: 3715, y: 1825, align: 'right' },
    { id: 'joburg', name: 'Johannesburg', x: 3262, y: 1890, align: 'left' },
    { id: 'durban', name: 'Durban', x: 3310, y: 1975, align: 'right' },
    { id: 'capetown', name: 'Cape Town', x: 3105, y: 2050, align: 'left' },
    { id: 'singapore', name: 'Singapore', x: 4436, y: 1440, align: 'right' },
  ];

  return (
    <div className="relative w-full h-full bg-[#FDFCF9] rounded-sm overflow-hidden border border-gray-100 group">
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={12}
        centerOnInit={true}
        limitToBounds={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Control Buttons */}
            <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
              <div className="bg-white/95 backdrop-blur-sm shadow-xl border border-gray-100 rounded-sm p-1 flex flex-col gap-1">
                <button 
                    onClick={() => zoomIn()}
                    className="p-2 hover:bg-gray-50 text-brand-blue transition-colors rounded-sm"
                    title="Zoom In"
                >
                    <Plus size={18} />
                </button>
                <button 
                    onClick={() => zoomOut()}
                    className="p-2 hover:bg-gray-50 text-brand-blue transition-colors rounded-sm"
                    title="Zoom Out"
                >
                    <Minus size={18} />
                </button>
                <div className="h-px bg-gray-100 mx-1" />
                <button 
                    onClick={() => resetTransform()}
                    className="p-2 hover:bg-gray-50 text-brand-blue transition-colors rounded-sm"
                    title="Reset View"
                >
                    <RotateCcw size={18} />
                </button>
              </div>
            </div>

            {/* Instruction Overlay */}
            <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className="bg-brand-blue text-white px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                    <Search size={12} className="text-brand-gold" />
                    Pinch or scroll to explore footprint
                </div>
            </div>

            <TransformComponent wrapperClass="!w-full !h-full cursor-grab active:cursor-grabbing">
              <div className="relative w-[5646px] h-[2862px] max-w-none">
                <svg
                  viewBox="0 0 5646 2862"
                  className="w-full h-full block"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* High Res Background Image */}
                  <image 
                    href="/About%20Us/Countries_SITE.jpg" 
                    width="5646" 
                    height="2862" 
                    preserveAspectRatio="xMidYMid slice"
                  />

                  {/* Hub Markers & Labels */}
                  {hubs.map((hub) => (
                    <g key={hub.id} className="transition-opacity duration-300">
                      {/* Pulsing Outer Ring */}
                      <circle 
                        cx={hub.x} 
                        cy={hub.y} 
                        r="40" 
                        stroke="#C69243" 
                        strokeWidth="8" 
                        fill="none"
                        opacity="0.3"
                      >
                        <animate attributeName="r" from="30" to="80" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>

                      {/* Main Marker Circle */}
                      <circle 
                        cx={hub.x} 
                        cy={hub.y} 
                        r="32" 
                        fill="#C69243" 
                        className="drop-shadow-xl"
                      />
                      
                      {/* Text Label */}
                      <text
                        x={hub.align === 'right' ? hub.x + 60 : hub.x - 60}
                        y={hub.y + 22}
                        fill="#C69243"
                        textAnchor={hub.align === 'right' ? 'start' : 'end'}
                        className="text-[90px] font-bold drop-shadow-lg select-none"
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                      >
                        {hub.name}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};