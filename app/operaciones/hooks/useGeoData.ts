import { useMapStore } from './useMapStore';
import { useDebounce } from './useDebounce';
import { LAYER_IDS } from '../lib/constants';

// GeoData hook temporarily stubbed for Next.js 15 compatibility
// @tanstack/react-query removed to resolve React version conflicts
export function useGeoData() {
    const { filters, activeLayers } = useMapStore();

    // Using debounced filters to maintain hook interface
    const _debouncedFilters = useDebounce(filters, 500);

    // Return empty data - map functionality is disabled
    return {
        voters: [],
        leaders: [],
        heatmap: [],
        isLoading: false
    };
}
