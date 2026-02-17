# Mapa Electoral Component - Implementation Status

## Completed Components
- **Architecture**: Defined in `ARCHITECTURE.md` (conceptually) and implemented in file structure.
- **Types**: `types.ts` defined.
- **Store**: `useMapStore` implemented with Zustand.
- **Base Map**: `BaseMap.tsx` implemented with Mapbox GL JS.
- **Layers**: `MapLayers.tsx` handles Voters (Circles) and Heatmaps.
- **Popups**: `EntityPopup.tsx` handles selection details.
- **Sidebar**: `MetricsSidebar.tsx` with `FilterPanel.tsx`.
- **API**: `api.ts` with mock data.

## Pending / Next Steps
1.  **Real API Integration**: Replace mock data in `api.ts` with actual `fetch` calls to the backend.
2.  **Authentication**: Ensure API calls are authenticated (middleware/headers).
3.  **Performance Tuning**:
    - Verify clustering performance with >10k points.
    - Implement `useDebounce` for map move events if fetching from server.
4.  **UI Polish**:
    - Add loading states (Spinner).
    - Refine popup styling.
    - Add "Leader" layer visualization (e.g., Polygons for territory).

## Usage
The component is accessible at `/operaciones` (once the route is set up in the main app layout or linked).
