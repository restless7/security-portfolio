'use client';

import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { useMapStore } from '../../../hooks/useMapStore';
import { mockVoters, Voter } from '@/app/operaciones/lib/mockData';

// Custom cluster icon logic based on average vote intention
const createClusterCustomIcon = function (cluster: any) {
    const markers = cluster.getAllChildMarkers();
    const avgIntention = markers.reduce((sum: number, marker: any) =>
        sum + (marker.options.voter?.intentionScore || 0), 0) / markers.length;

    const color = avgIntention >= 70 ? '#22c55e' :
        avgIntention >= 40 ? '#eab308' : '#ef4444';

    const count = cluster.getChildCount();

    return L.divIcon({
        html: `
      <div style="
        width: 40px; 
        height: 40px; 
        background-color: ${color}; 
        border: 3px solid white; 
        border-radius: 50%; 
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: sans-serif;
      ">
        <span style="font-size: 14px; font-weight: bold; line-height: 1;">${count}</span>
        <span style="font-size: 9px; font-weight: 600;">${Math.round(avgIntention)}%</span>
      </div>
    `,
        className: 'marker-cluster-custom',
        iconSize: L.point(40, 40, true),
    });
};

// Custom individual marker icon
const createVoterIcon = (intentionScore: number) => {
    const color = intentionScore >= 70 ? '#22c55e' :
        intentionScore >= 40 ? '#eab308' : '#ef4444';

    return L.divIcon({
        className: 'custom-voter-marker',
        html: `
        <div style="
          width: 14px; 
          height: 14px; 
          background-color: ${color}; 
          border: 2px solid white; 
          border-radius: 50%; 
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
    });
};

export function VoterClusters() {
    const { filters, selectEntity } = useMapStore();

    // Filter logic (basic implementation)
    const filteredVoters = mockVoters.filter(v => {
        // Add more filters here based on store
        if (filters.intentionRange) {
            if (v.intentionScore < filters.intentionRange[0] || v.intentionScore > filters.intentionRange[1]) {
                return false;
            }
        }
        return true;
    });

    return (
        <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}
            maxClusterRadius={60}
            spiderfyOnMaxZoom={true}
        >
            {filteredVoters.map((voter) => (
                <Marker
                    key={voter.id}
                    position={[voter.location.lat, voter.location.lng]}
                    icon={createVoterIcon(voter.intentionScore)}
                    // Store voter data in options for cluster calculation
                    // @ts-expect-error - Leaflet options extension
                    voter={voter}
                    eventHandlers={{
                        click: () => selectEntity(voter),
                    }}
                >
                    <Popup>
                        <div className="p-1 min-w-[200px]">
                            <h3 className="font-bold text-gray-900 text-sm mb-1">{voter.namePseudo}</h3>
                            <div className="text-xs text-gray-600 space-y-1">
                                <p>📍 {voter.neighborhood}</p>
                                <p>📊 Intención: <span className="font-semibold">{voter.intentionScore}%</span></p>
                                <p>🕒 {voter.lastContact ? new Date(voter.lastContact).toLocaleDateString() : 'N/A'}</p>
                            </div>
                            <button
                                onClick={() => selectEntity(voter)}
                                className="mt-2 w-full py-1 bg-slate-800 text-white text-xs rounded hover:bg-slate-700 transition-colors"
                            >
                                Ver Detalles
                            </button>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MarkerClusterGroup>
    );
}
