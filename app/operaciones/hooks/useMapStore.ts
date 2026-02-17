import { create } from 'zustand';
import { MapFilters, Voter, Leader, GeoCoordinates } from '../lib/types';

interface MapStore {
    // State
    activeLayers: string[];
    filters: MapFilters;
    selectedEntity: Voter | Leader | null;
    isSidebarOpen: boolean;
    viewState: {
        center: GeoCoordinates;
        zoom: number;
    };

    // Actions
    toggleLayer: (layerId: string) => void;
    setFilters: (filters: Partial<MapFilters>) => void;
    selectEntity: (entity: Voter | Leader | null) => void;
    toggleSidebar: () => void;
    setViewState: (viewState: { center: GeoCoordinates; zoom: number }) => void;
}

export const useMapStore = create<MapStore>((set) => ({
    // Initial State
    activeLayers: ['layer-voters', 'layer-leaders'], // Default visible layers
    filters: {
        status: [],
        intentionRange: [0, 100],
    },
    selectedEntity: null,
    isSidebarOpen: true,
    viewState: {
        center: { lat: 7.1193, lng: -73.1227 }, // Bucaramanga
        zoom: 12
    },

    // Actions
    toggleLayer: (layerId: string) => set((state) => {
        const isActive = state.activeLayers.includes(layerId);
        return {
            activeLayers: isActive
                ? state.activeLayers.filter((id: string) => id !== layerId)
                : [...state.activeLayers, layerId]
        };
    }),

    setFilters: (newFilters: Partial<MapFilters>) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
    })),

    selectEntity: (entity: Voter | Leader | null) => set({ selectedEntity: entity }),

    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

    setViewState: (viewState: { center: GeoCoordinates; zoom: number }) => set({ viewState })
}));
