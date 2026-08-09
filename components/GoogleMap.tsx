import React, { useEffect, useRef, useState } from 'react';

interface GoogleMapProps {
    address: string;
    lat: number;
    lng: number;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ address, lat, lng }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!apiKey) {
            return;
        }

        const scriptId = 'google-maps-script';
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        const initializeMap = () => {
            if (!mapRef.current) return;

            const google = (window as any).google;
            if (!google || !google.maps) return;

            const mapOptions = {
                center: { lat, lng },
                zoom: 16,
                // Custom JSON styles for Mamadi Gold and Blue
                styles: [
                  {
                    "elementType": "geometry",
                    "stylers": [{ "color": "#f7f5f0" }]
                  },
                  {
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#1f2b49" }]
                  },
                  {
                    "elementType": "labels.text.stroke",
                    "stylers": [{ "color": "#f7f5f0" }]
                  },
                  {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      { "color": "#c69243" },
                      { "weight": 1 }
                    ]
                  },
                  {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#bdbdbd" }]
                  },
                  {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#f7f5f0" }]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#f1eee6" }]
                  },
                  {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#1f2b49" }]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [{ "color": "#e9e4d9" }]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#1f2b49" }]
                  },
                  {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#ffffff" }]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                      { "color": "#c69243" },
                      { "lightness": 30 }
                    ]
                  },
                  {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#1f2b49" }]
                  },
                  {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#ffffff" }]
                  },
                  {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#ffffff" }]
                  },
                  {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#e5e7eb" }]
                  },
                  {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{ "color": "#1f2b49" }]
                  },
                  {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [{ "color": "#ffffff" }]
                  }
                ],
                disableDefaultUI: false,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true
            };

            const map = new google.maps.Map(mapRef.current, mapOptions);

            // Add custom Marker matching Mamadi Gold
            new google.maps.Marker({
                position: { lat, lng },
                map,
                title: address,
                icon: {
                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    fillColor: '#c69243',
                    fillOpacity: 1,
                    strokeColor: '#1f2b49',
                    strokeWeight: 2,
                    scale: 8
                }
            });
        };

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
            script.async = true;
            script.defer = true;
            script.onload = () => {
                initializeMap();
            };
            script.onerror = () => {
                setError('Failed to load Google Maps script. Check your API key or network connection.');
            };
            document.head.appendChild(script);
        } else {
            if ((window as any).google?.maps) {
                initializeMap();
            } else {
                const checkInterval = setInterval(() => {
                    if ((window as any).google?.maps) {
                        initializeMap();
                        clearInterval(checkInterval);
                    }
                }, 100);
                return () => clearInterval(checkInterval);
            }
        }
    }, [apiKey, lat, lng, address]);

    if (!apiKey || error) {
        const query = encodeURIComponent(address);

        return (
            <iframe
                title={`Google map showing ${address}`}
                src={`https://www.google.com/maps?q=${query}&z=16&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
            />
        );
    }

    return <div ref={mapRef} className="w-full h-full" />;
};
