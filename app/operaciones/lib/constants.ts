export const MAP_STYLE_DARK = 'mapbox://styles/mapbox/dark-v11';
export const MAP_STYLE_LIGHT = 'mapbox://styles/mapbox/light-v11';

export const DEFAULT_CENTER = {
    lat: 7.1193, // Bucaramanga
    lng: -73.1227
};

export const DEFAULT_ZOOM = 12;

export const LAYER_IDS = {
    VOTERS: 'layer-voters',
    VOTERS_CLUSTERS: 'layer-voters-clusters',
    VOTERS_HEATMAP: 'layer-voters-heatmap',
    LEADERS: 'layer-leaders',
    TERRITORIES: 'layer-territories',
    INTERACTIONS: 'layer-interactions'
};

export const SOURCE_IDS = {
    VOTERS: 'source-voters',
    LEADERS: 'source-leaders',
    INTERACTIONS: 'source-interactions'
};

export const STATUS_COLORS = {
    confirmed: '#22c55e', // green-500
    pending: '#eab308',   // yellow-500
    opposition: '#ef4444', // red-500
    unknown: '#94a3b8'     // slate-400
};
