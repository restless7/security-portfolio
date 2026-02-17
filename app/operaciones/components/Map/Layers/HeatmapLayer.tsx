'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useMapStore } from '../../../hooks/useMapStore';
import { mockVoters } from '@/app/operaciones/lib/mockData';

export function HeatmapLayer() {
    const map = useMap();
    const { filters } = useMapStore();

    useEffect(() => {
        let heatLayer: any = null;

        const initHeatmap = async () => {
            // Dynamic import of leaflet.heat
            // Note: leaflet.heat attaches itself to L.heatLayer
            // @ts-ignore
            await import('leaflet.heat');

            // Prepare data points: [lat, lng, intensity]
            // Intensity is based on Intention Score (higher score = more intense heat)
            // We normalize score 0-100 to 0-1 for intensity
            const points = mockVoters.map(v => [
                v.location.lat,
                v.location.lng,
                v.intentionScore / 100 // Intensity 0.0 to 1.0
            ]);

            // Create heat layer
            // @ts-expect-error - leaflet.heat types not fully integrated
            heatLayer = L.heatLayer(points, {
                radius: 25,
                blur: 15,
                maxZoom: 17,
                max: 1.0,
                gradient: {
                    0.4: 'blue',
                    0.6: 'cyan',
                    0.7: 'lime',
                    0.8: 'yellow',
                    1.0: 'red'
                }
            }).addTo(map);
        };

        initHeatmap();

        // Cleanup
        return () => {
            if (heatLayer) {
                map.removeLayer(heatLayer);
            }
        };
    }, [map]); // Re-init if filter logic changes (future improvement)

    return null;
}
