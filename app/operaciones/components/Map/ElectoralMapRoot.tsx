'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useMapStore } from '../../hooks/useMapStore';
import { VoterClusters } from './Layers/VoterClusters';
import { HeatmapLayer } from './Layers/HeatmapLayer';
import { BoundariesLayer } from './Layers/BoundariesLayer';
import { MapUIControls } from './Controls/MapUIControls';

// Fix for default Leaflet markers in Next.js
import L from 'leaflet';

const fixLeafletIcons = () => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
};

export default function ElectoralMapRoot() {
    const { viewState } = useMapStore();

    // Local state for UI toggles (managed by MapUIControls inside the map context)
    const [showClusters, setShowClusters] = useState(true);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [showBounds, setShowBounds] = useState(false);

    useEffect(() => {
        fixLeafletIcons();
    }, []);

    return (
        <div className="w-full h-full absolute inset-0 bg-slate-100">
            <MapContainer
                center={[viewState.center.lat, viewState.center.lng]}
                zoom={viewState.zoom}
                style={{ width: '100%', height: '100%' }}
                zoomControl={false}
                className="z-0"
            >
                <ZoomControl position="bottomright" />

                {/* Base Layer */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Data Layers */}
                {showClusters && <VoterClusters />}
                {showHeatmap && <HeatmapLayer />}
                {showBounds && <BoundariesLayer />}

                {/* Dynamic Controls & Stats (Inside Map Context) */}
                <MapUIControls
                    showClusters={showClusters}
                    showHeatmap={showHeatmap}
                    showBounds={showBounds}
                    onToggleClusters={() => setShowClusters(!showClusters)}
                    onToggleHeatmap={() => setShowHeatmap(!showHeatmap)}
                    onToggleBounds={() => setShowBounds(!showBounds)}
                />
            </MapContainer>

            {/* CSS Overrides for Map Container z-index issues */}
            <style jsx global>{`
        .leaflet-container {
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        /* Fix marker cluster text color */
        .marker-cluster div {
             color: white;
             font-weight: bold;
        }
      `}</style>
        </div>
    );
}
