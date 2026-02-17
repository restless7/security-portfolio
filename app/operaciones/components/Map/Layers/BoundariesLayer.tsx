'use client';

import { GeoJSON } from 'react-leaflet';

// Mock GeoJSON for 3 Bogotá Localities (Simplified polygons)
const boundariesData: any = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": { "name": "Chapinero", "color": "#3b82f6" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-74.066, 4.656], [-74.053, 4.664], [-74.041, 4.654], [-74.030, 4.643],
                    [-74.045, 4.630], [-74.066, 4.640], [-74.066, 4.656]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Uusaquén", "color": "#10b981" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-74.042, 4.700], [-74.020, 4.720], [-74.015, 4.710], [-74.030, 4.685],
                    [-74.045, 4.690], [-74.042, 4.700]
                ]]
            }
        },
        {
            "type": "Feature",
            "properties": { "name": "Kennedy", "color": "#f59e0b" },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[
                    [-74.150, 4.630], [-74.130, 4.640], [-74.120, 4.610], [-74.150, 4.600],
                    [-74.170, 4.620], [-74.150, 4.630]
                ]]
            }
        }
    ]
};

export function BoundariesLayer() {
    const onEachFeature = (feature: any, layer: any) => {
        if (feature.properties && feature.properties.name) {
            layer.bindTooltip(feature.properties.name, {
                permanent: true,
                direction: "center",
                className: "bg-white/80 border-0 shadow-sm text-xs font-bold px-2 py-1 rounded"
            });
        }

        layer.on({
            mouseover: (e: any) => {
                const layer = e.target;
                layer.setStyle({
                    weight: 3,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.3
                });
            },
            mouseout: (e: any) => {
                const layer = e.target;
                // Reset style (simplified)
                layer.setStyle({
                    weight: 2,
                    color: feature.properties.color || '#3388ff',
                    fillOpacity: 0.1
                });
            }
        });
    };

    const style = (feature: any) => {
        return {
            fillColor: feature.properties.color || '#3388ff',
            weight: 2,
            opacity: 1,
            color: feature.properties.color || '#3388ff',
            dashArray: '3',
            fillOpacity: 0.1
        };
    };

    return (
        <GeoJSON
            data={boundariesData}
            style={style}
            onEachFeature={onEachFeature}
        />
    );
}
