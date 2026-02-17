export interface GeoCoordinates {
    lat: number;
    lng: number;
}

export interface Voter {
    id: string;
    externalId?: string;
    namePseudo: string;
    age?: number;
    gender?: string;
    address?: string;
    neighborhood?: string;
    location: { lat: number; lng: number };
    tags: string[];
    intentionScore: number;
    lastContact?: string;
    phoneNumber?: string;
    email?: string;
    consentFlag: boolean;
    createdAt?: string;
    updatedAt?: string;
    // Compatibility fields (optional)
    name?: string;
    status?: string;
    intention?: number;
    coordinates?: GeoCoordinates;
}

export interface Leader {
    id: string;
    name: string;
    coordinates: GeoCoordinates;
    territory?: GeoJSON.Polygon; // GeoJSON Polygon
    assignedVoters: number;
    performance: number; // 0-100
}

export interface Interaction {
    id: string;
    type: 'visit' | 'call' | 'event';
    entityId: string; // Voter or Leader ID
    coordinates: GeoCoordinates;
    timestamp: string;
    notes?: string;
}

export interface MapFilters {
    status: string[];
    intentionRange: [number, number];
    leaderId?: string | null;
    segment?: string | null;
    dateRange?: [Date, Date] | null;
}

export interface MapState {
    center: GeoCoordinates;
    zoom: number;
    bounds?: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
}

// GeoJSON Types for Mapbox Source
export type VoterFeature = GeoJSON.Feature<GeoJSON.Point, Voter>;
export type LeaderFeature = GeoJSON.Feature<GeoJSON.Point, Leader>;
export type TerritoryFeature = GeoJSON.Feature<GeoJSON.Polygon, { leaderId: string }>;
