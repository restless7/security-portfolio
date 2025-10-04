/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Layers, 
  Filter, 
  Users, 
  Target,
  Settings,
  Maximize2,
  RotateCcw
} from 'lucide-react';
import clsx from 'clsx';
import { mockVoters, type Voter } from '@/app/operaciones/lib/mockData';

interface OperationsMapProps {
  onVoterSelect: (voter: Voter) => void;
  fullscreen?: boolean;
}

// Map control component for layer toggles
function MapControls({ 
  showClusters, 
  showHeatmap, 
  showBounds, 
  onToggleClusters, 
  onToggleHeatmap, 
  onToggleBounds 
}: {
  showClusters: boolean;
  showHeatmap: boolean;
  showBounds: boolean;
  onToggleClusters: () => void;
  onToggleHeatmap: () => void;
  onToggleBounds: () => void;
}) {
  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-3 space-y-2">
      <h4 className="text-sm font-semibold text-gray-900 flex items-center mb-2">
        <Layers className="h-4 w-4 mr-2" />
        Capas del Mapa
      </h4>
      
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={showClusters}
          onChange={onToggleClusters}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">Clusters de Votantes</span>
      </label>
      
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={showHeatmap}
          onChange={onToggleHeatmap}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">Mapa de Calor</span>
      </label>
      
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={showBounds}
          onChange={onToggleBounds}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm text-gray-700">Límites</span>
      </label>
    </div>
  );
}

// Statistics panel component
function MapStats({ voters }: { voters: Voter[] }) {
  const highIntention = voters.filter(v => v.intentionScore >= 70).length;
  const mediumIntention = voters.filter(v => v.intentionScore >= 40 && v.intentionScore < 70).length;
  const lowIntention = voters.filter(v => v.intentionScore < 40).length;

  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-4">
      <h4 className="text-sm font-semibold text-gray-900 flex items-center mb-3">
        <Target className="h-4 w-4 mr-2" />
        Distribución por Intención
      </h4>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Alta (70%+)</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{highIntention}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Media (40-69%)</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{mediumIntention}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Baja (&lt;40%)</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{lowIntention}</span>
        </div>
      </div>
    </div>
  );
}

export function OperationsMap({ onVoterSelect, fullscreen = false }: OperationsMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showClusters, setShowClusters] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showBounds, setShowBounds] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const initMap = async () => {
      try {
        // Dynamic imports for client-side only
        const L = (await import('leaflet')).default;
        
        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        // Initialize map
        if (!mapRef.current) return;
        const map = L.map(mapRef.current).setView([4.7110, -74.0721], 11);
        mapInstanceRef.current = map;

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Custom marker icons based on intention score
        const createCustomIcon = (intentionScore: number) => {
          const color = intentionScore >= 70 ? '#22c55e' : 
                       intentionScore >= 40 ? '#eab308' : '#ef4444';
          
          return L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                width: 20px; 
                height: 20px; 
                background-color: ${color}; 
                border: 2px solid white; 
                border-radius: 50%; 
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 10px;
                font-weight: bold;
              ">
                ${Math.round(intentionScore)}
              </div>
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
        };

        // Add voter markers
        const addMarkers = async () => {
          const MarkerClusterGroup = (await import('leaflet.markercluster')).default;
          const markerClusterGroup = new (MarkerClusterGroup as any)({
            showCoverageOnHover: false,
            zoomToBoundsOnClick: true,
            maxClusterRadius: 50,
            iconCreateFunction: (cluster: any) => {
              const count = cluster.getChildCount();
              const markers = cluster.getAllChildMarkers();
              const avgIntention = markers.reduce((sum: number, marker: any) => 
                sum + marker.options.voter.intentionScore, 0) / markers.length;
              
              const color = avgIntention >= 70 ? '#22c55e' : 
                           avgIntention >= 40 ? '#eab308' : '#ef4444';
              
              return L.divIcon({
                html: `
                  <div style="
                    width: 40px; 
                    height: 40px; 
                    background-color: ${color}; 
                    border: 3px solid white; 
                    border-radius: 50%; 
                    box-shadow: 0 3px 6px rgba(0,0,0,0.3);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                  ">
                    <div style="font-size: 12px;">${count}</div>
                    <div style="font-size: 8px;">${Math.round(avgIntention)}%</div>
                  </div>
                `,
                className: 'marker-cluster-custom',
                iconSize: [40, 40]
              });
            }
          });

          mockVoters.forEach(voter => {
            const marker = L.marker([voter.location.lat, voter.location.lng], {
              icon: createCustomIcon(voter.intentionScore),
              voter: voter
            } as any);

            marker.bindPopup(`
              <div class="p-2">
                <h3 class="font-semibold text-gray-900">${voter.namePseudo}</h3>
                <p class="text-sm text-gray-600">${voter.neighborhood}</p>
                <p class="text-sm"><strong>Intención:</strong> ${voter.intentionScore}%</p>
                <p class="text-xs text-gray-500">Última interacción: ${
                  voter.lastContact ? new Date(voter.lastContact).toLocaleDateString('es-CO') : 'Nunca'
                }</p>
                <button 
                  onclick="window.selectVoter('${voter.id}')"
                  class="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                >
                  Ver Perfil
                </button>
              </div>
            `);

            marker.on('click', () => {
              onVoterSelect(voter);
            });

            markerClusterGroup.addLayer(marker);
            markersRef.current.push(marker);
          });

          map.addLayer(markerClusterGroup);
        };

        await addMarkers();
        setIsLoading(false);

        // Global function for popup button
        (window as any).selectVoter = (voterId: string) => {
          const voter = mockVoters.find(v => v.id === voterId);
          if (voter) onVoterSelect(voter);
        };

      } catch (error) {
        console.error('Error initializing map:', error);
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, [onVoterSelect]);

  // Handle layer toggles
  const handleToggleClusters = () => {
    setShowClusters(!showClusters);
    // Implementation for toggling clusters would go here
  };

  const handleToggleHeatmap = () => {
    setShowHeatmap(!showHeatmap);
    // Implementation for toggling heatmap would go here
  };

  const handleToggleBounds = () => {
    setShowBounds(!showBounds);
    // Implementation for toggling bounds would go here
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-sm text-gray-600">Cargando mapa electoral...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ minHeight: fullscreen ? '400px' : '300px' }}
      />

      {/* Map Controls */}
      <MapControls
        showClusters={showClusters}
        showHeatmap={showHeatmap}
        showBounds={showBounds}
        onToggleClusters={handleToggleClusters}
        onToggleHeatmap={handleToggleHeatmap}
        onToggleBounds={handleToggleBounds}
      />

      {/* Map Statistics */}
      <MapStats voters={mockVoters} />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-[2000]">
          <div className="flex flex-col items-center space-y-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
            />
            <p className="text-sm text-gray-600">Inicializando mapa...</p>
          </div>
        </div>
      )}

      {/* CSS for custom markers - we'll inject this via style tag */}
      <style jsx>{`
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .marker-cluster-custom {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-popup-content {
          margin: 0 !important;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 8px !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
}