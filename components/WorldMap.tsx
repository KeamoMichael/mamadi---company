import React from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Search, Plus, Minus, RotateCcw } from 'lucide-react';

export const WorldMap: React.FC = () => {
  // Brand Colors
  const colors = {
    navy: '#1F2B49',
    gold: '#C69243',
    beige: '#F7F5F0',
    white: '#FFFFFF'
  };

  const hubs = [
    { id: 'london', name: 'London', x: 388, y: 304, country: 'UK' },
    { id: 'nairobi', name: 'Kenya', x: 554, y: 555, country: 'Kenya' },
    { id: 'tanzania', name: 'Tanzania', x: 570, y: 590, country: 'Tanzania' },
    { id: 'zambia', x: 495, y: 640, name: 'Zambia', country: 'Zambia' },
    { id: 'mozambique', x: 550, y: 670, name: 'Mozambique', country: 'Mozambique' },
    { id: 'mauritius', x: 670, y: 680, name: 'Mauritius', country: 'Mauritius' },
    { id: 'joburg', name: 'Johannesburg', x: 508, y: 740, country: 'South Africa' },
    { id: 'durban', name: 'Durban', x: 535, y: 775, country: 'South Africa' },
    { id: 'capetown', name: 'Cape Town', x: 450, y: 805, country: 'South Africa' },
    { id: 'singapore', name: 'Singapore', x: 805, y: 520, country: 'Singapore' },
  ];

  return (
    <div className="relative w-full h-full bg-white rounded-sm overflow-hidden border border-gray-100 group">
      {/* Zoom Controls Overlay */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <div className="bg-white/90 backdrop-blur-sm shadow-lg border border-gray-100 rounded-sm p-1 flex flex-col gap-1">
          <button className="p-2 hover:bg-gray-100 text-brand-blue transition-colors rounded-sm" title="Zoom In">
            <Plus size={16} />
          </button>
          <button className="p-2 hover:bg-gray-100 text-brand-blue transition-colors rounded-sm" title="Zoom Out">
            <Minus size={16} />
          </button>
          <button className="p-2 hover:bg-gray-100 text-brand-blue transition-colors rounded-sm" title="Reset View">
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Instruction Overlay */}
      <div className="absolute top-4 left-4 z-20">
         <div className="bg-brand-blue text-white px-3 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
            <Search size={12} className="text-brand-gold" />
            Pinch or scroll to explore footprint
         </div>
      </div>

      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Custom Control logic to bind buttons */}
            <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
              <div className="bg-white/95 backdrop-blur-sm shadow-xl border border-gray-100 rounded-sm p-1 flex flex-col gap-1">
                <button 
                    onClick={() => zoomIn()}
                    className="p-2 hover:bg-gray-100 text-brand-blue transition-colors rounded-sm"
                    title="Zoom In"
                >
                    <Plus size={18} />
                </button>
                <button 
                    onClick={() => zoomOut()}
                    className="p-2 hover:bg-gray-100 text-brand-blue transition-colors rounded-sm"
                    title="Zoom Out"
                >
                    <Minus size={18} />
                </button>
                <div className="h-px bg-gray-100 mx-1" />
                <button 
                    onClick={() => resetTransform()}
                    className="p-2 hover:bg-gray-100 text-brand-blue transition-colors rounded-sm"
                    title="Reset View"
                >
                    <RotateCcw size={18} />
                </button>
              </div>
            </div>

            <TransformComponent wrapperClass="!w-full !h-full cursor-grab active:cursor-grabbing bg-white">
              <div className="relative w-[1400px] h-[900px]">
                <svg
                  viewBox="0 0 1400 900"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Water is White (SVG Background) */}
                  
                  {/* Stylized Landmasses (Light Beige #F7F5F0) */}
                  <g fill="#F2EFE9" stroke="#E5E1D8" strokeWidth="0.5">
                    {/* North America */}
                    <path d="M50,150 C100,100 250,100 300,150 C350,200 300,300 250,350 L200,450 L150,400 Z" />
                    {/* South America */}
                    <path d="M220,460 C260,480 300,550 280,650 C260,750 200,800 180,820 L150,700 Z" />
                    {/* Eurasia Base */}
                    <path d="M350,100 C500,50 900,50 1100,150 C1200,250 1200,450 1100,550 C1000,600 800,550 700,400 Z" />
                    {/* Africa Base */}
                    <path d="M420,420 C500,400 680,450 660,600 C640,750 580,880 500,880 C410,880 380,750 380,600 C380,500 400,450 420,420 Z" />
                    {/* Australia */}
                    <path d="M1000,680 C1100,680 1200,750 1150,850 C1050,880 950,800 1000,680 Z" />
                  </g>

                  {/* Highlighted Countries (Deep Navy #1F2B49) */}
                  <g fill="#1F2B49">
                    {/* UK */}
                    <path d="M410,280 L435,280 L445,330 L430,355 L405,330 Z" />
                    
                    {/* East Africa Strip (Kenya/Tanzania) */}
                    <path d="M570,520 L620,520 L640,640 L590,680 L540,620 Z" />
                    
                    {/* Southern Africa (South Africa, Zambia, Zimbabwe, Mozambique) */}
                    <path d="M480,720 L600,720 L630,780 L600,880 L490,880 L440,800 Z" />
                    
                    {/* Singapore Area */}
                    <circle cx="915" cy="545" r="10" />
                    
                    {/* Mauritius Area */}
                    <circle cx="760" cy="735" r="8" />
                  </g>

                  {/* Hub Markers & Labels (Matching MAP.jpg style) */}
                  {hubs.map((hub) => {
                    // Re-calculate coordinates to match the new 1400x900 base
                    const scaleX = 1400 / 1200;
                    const scaleY = 1; 
                    const hx = hub.x * scaleX;
                    const hy = hub.y;

                    return (
                      <g key={hub.id}>
                        {/* Gold Circle Marker */}
                        <circle 
                          cx={hx} 
                          cy={hy} 
                          r="9" 
                          fill="#C69243" 
                        />
                        {/* Outer Ring for pulse effect */}
                        <circle 
                          cx={hx} 
                          cy={hy} 
                          r="15" 
                          stroke="#C69243" 
                          strokeWidth="1.5" 
                          fill="none"
                          opacity="0.3"
                        >
                          <animate attributeName="r" from="9" to="22" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.3" to="0" dur="2s" repeatCount="indefinite" />
                        </circle>
                        
                        {/* Text Label - Positioned like in MAP.jpg */}
                        <text
                          x={hx + 18}
                          y={hy + 6}
                          fill="#C69243"
                          className="text-[18px] font-medium"
                          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                        >
                          {hub.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
};