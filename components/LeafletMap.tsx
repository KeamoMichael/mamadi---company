import React, { useEffect, useRef } from 'react';

interface LeafletMapProps {
    address: string;
    lat: number;
    lng: number;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({ address, lat, lng }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // Check if Leaflet CSS is loaded
        const cssId = 'leaflet-css';
        if (!document.getElementById(cssId)) {
            const link = document.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);
        }

        // Check if Leaflet JS is loaded
        const scriptId = 'leaflet-js';
        const loadMap = () => {
            const L = (window as any).L;
            if (!L || !mapRef.current) return;

            if (mapInstance.current) {
                mapInstance.current.setView([lat, lng], 16);
                return;
            }

            // Initialize map
            const map = L.map(mapRef.current, {
                center: [lat, lng],
                zoom: 16,
                zoomControl: true,
                attributionControl: false
            });
            mapInstance.current = map;

            // Load clean, high-detail cartodb positron tiles
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 20
            }).addTo(map);

            // Add custom styled marker pin
            const goldIcon = L.divIcon({
                className: 'custom-gold-marker',
                html: `
                    <div style="
                        position: relative;
                        width: 30px;
                        height: 30px;
                        background-color: #c69243;
                        border: 2px solid #1f2b49;
                        border-radius: 50% 50% 50% 0;
                        transform: rotate(-45deg);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.15);
                    ">
                        <div style="
                            width: 10px;
                            height: 10px;
                            background-color: #1f2b49;
                            border-radius: 50%;
                            transform: rotate(45deg);
                        "></div>
                    </div>
                `,
                iconSize: [30, 30],
                iconAnchor: [15, 30]
            });

            L.marker([lat, lng], { icon: goldIcon }).addTo(map)
                .bindPopup(`<b>${address}</b>`)
                .openPopup();
        };

        let script = document.getElementById(scriptId) as HTMLScriptElement;
        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.async = true;
            script.onload = () => {
                loadMap();
            };
            document.head.appendChild(script);
        } else {
            if ((window as any).L) {
                loadMap();
            } else {
                const interval = setInterval(() => {
                    if ((window as any).L) {
                        loadMap();
                        clearInterval(interval);
                    }
                }, 100);
                return () => clearInterval(interval);
            }
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [lat, lng, address]);

    return (
        <div className="w-full h-full relative overflow-hidden">
            <style>{`
                /* Apply our custom SVG filter to Leaflet tile layer to render in gold and blue */
                .leaflet-tile-container {
                    filter: url(#mamadi-leaflet-duotone) contrast(1.08);
                }

                .leaflet-container {
                    background: #ffffff;
                }

                .leaflet-control-zoom a {
                    background: #ffffff;
                    color: #1f2b49;
                    border-color: rgba(31, 43, 73, 0.12);
                }

                .leaflet-control-zoom a:hover {
                    background: #1f2b49;
                    color: #c69243;
                }

                /* Leaflet UI styling */
                .leaflet-popup-content-wrapper {
                    background: #1f2b49;
                    color: #ffffff;
                    border-radius: 4px;
                    font-family: 'Figtree', sans-serif;
                    font-size: 13px;
                    border: 1px solid #c69243;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                }
                .leaflet-popup-tip {
                    background: #1f2b49;
                    border: 1px solid #c69243;
                }
                .leaflet-popup-close-button {
                    color: #c69243 !important;
                }
            `}</style>

            <div ref={mapRef} className="w-full h-full z-10" />

            {/* SVG Duotone Filter for Leaflet Map Tiles */}
            <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
                <defs>
                    <filter id="mamadi-leaflet-duotone">
                        {/* Convert to grayscale using standard luminance coefficients */}
                        <feColorMatrix
                            type="matrix"
                            values="0.2126 0.7152 0.0722 0 0
                                    0.2126 0.7152 0.0722 0 0
                                    0.2126 0.7152 0.0722 0 0
                                    0      0      0      1 0"
                            result="gray"
                        />
                        {/* Keep the map canvas white while tinting darker road and infrastructure detail navy and gold. */}
                        <feComponentTransfer in="gray">
                            <feFuncR type="table" tableValues="0.1216 0.1216 0.1216 0.7765 0.9686 1" />
                            <feFuncG type="table" tableValues="0.1686 0.1686 0.1686 0.5725 0.9529 1" />
                            <feFuncB type="table" tableValues="0.2863 0.2863 0.2863 0.2627 0.9216 1" />
                        </feComponentTransfer>
                    </filter>
                </defs>
            </svg>
        </div>
    );
};
