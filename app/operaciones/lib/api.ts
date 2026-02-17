import { VoterFeature, LeaderFeature, Interaction, MapFilters } from './types';

// Environment variable for API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface FetchVotersParams {
    bbox?: [number, number, number, number];
    filters?: MapFilters;
}

export const fetchVoters = async ({ bbox, filters }: FetchVotersParams): Promise<VoterFeature[]> => {
    const params = new URLSearchParams();

    if (bbox) {
        params.append('bbox', bbox.join(','));
    }

    if (filters) {
        if (filters.status.length > 0) {
            params.append('status', filters.status.join(','));
        }
        if (filters.intentionRange) {
            params.append('intention_min', filters.intentionRange[0].toString());
            params.append('intention_max', filters.intentionRange[1].toString());
        }
        if (filters.leaderId) {
            params.append('leader_id', filters.leaderId);
        }
    }

    const response = await fetch(`${API_BASE_URL}/operations/geo/voters?${params.toString()}`, {
        headers: {
            'Content-Type': 'application/json',
            // Add Auth headers here if needed
            // 'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch voters');
    }

    const data = await response.json();
    return data.features || []; // Assuming API returns FeatureCollection
};

export const fetchLeaders = async (): Promise<LeaderFeature[]> => {
    const response = await fetch(`${API_BASE_URL}/operations/geo/leaders`);

    if (!response.ok) {
        throw new Error('Failed to fetch leaders');
    }

    const data = await response.json();
    return data.features || [];
};

export const fetchHeatmapData = async (bbox?: [number, number, number, number]): Promise<any> => {
    const params = new URLSearchParams();
    if (bbox) {
        params.append('bbox', bbox.join(','));
    }

    const response = await fetch(`${API_BASE_URL}/operations/geo/heatmap?${params.toString()}`);

    if (!response.ok) {
        throw new Error('Failed to fetch heatmap data');
    }

    return response.json();
};
