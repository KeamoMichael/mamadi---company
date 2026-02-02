import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Search, Plus, Minus, RotateCcw } from 'lucide-react';

export const WorldMap: React.FC = () => {
  // Hubs positions for the 11292 x 5724 coordinate system
  // Adjusted based on geographic locations and high-res map layout
  // 'align' property determines if text is left or right of the dot
  const hubs = [
    { id: 'london', name: 'London', x: 5646, y: 1250, align: 'right' },
    { id: 'nairobi', name: 'Kenya', x: 6736, y: 2860, align: 'right' },
    { id: 'tanzania', name: 'Tanzania', x: 6736, y: 3080, align: 'right' },
    { id: 'zambia', name: 'Zambia', x: 6524, y: 3350, align: 'left' },
    { id: 'mozambique', name: 'Mozambique', x: 6950, y: 3550, align: 'right' },
    { id: 'mauritius', name: 'Mauritius', x: 7430, y: 3650, align: 'right' },
    { id: 'joburg', name: 'Johannesburg', x: 6524, y: 3780, align: 'left' },
    { id: 'durban', name: 'Durban', x: 6620, y: 3950, align: 'right' },
    { id: 'capetown', name: 'Cape Town', x: 6210, y: 4100, align: 'left' },
    { id: 'singapore', name: 'Singapore', x: 8873, y: 2880, align: 'right' },
  ];

  return (
    <div className="relative w-full h-full bg-[#FDFCF9] rounded-sm overflow-hidden border border-gray-100 group">
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={15}
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
              <div className="relative w-[11292px] h-[5724px] max-w-none">
                <svg
                  viewBox="0 0 11292 5724"
                  className="w-full h-full block"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* High Res Background Image */}
                  <image 
                    href="/About Us/MAP 10K RES_SITE.jpg" 
                    width="11292" 
                    height="5724" 
                    preserveAspectRatio="xMidYMid slice"
                  />

                  {/* Hub Markers & Labels */}
                  {hubs.map((hub) => (
                    <g key={hub.id} className="transition-opacity duration-300">
                      {/* Pulsing Outer Ring */}
                      <circle 
                        cx={hub.x} 
                        cy={hub.y} 
                        r="80" 
                        stroke="#C69243" 
                        strokeWidth="15" 
                        fill="none"
                        opacity="0.3"
                      >
                        <animate attributeName="r" from="60" to="160" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>

                      {/* Main Marker Circle */}
                      <circle 
                        cx={hub.x} 
                        cy={hub.y} 
                        r="65" 
                        fill="#C69243" 
                        className="drop-shadow-xl"
                      />
                      
                      {/* Text Label */}
                      <text
                        x={hub.align === 'right' ? hub.x + 120 : hub.x - 120}
                        y={hub.y + 45}
                        fill="#C69243"
                        textAnchor={hub.align === 'right' ? 'start' : 'end'}
                        className="text-[180px] font-bold drop-shadow-lg select-none"
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