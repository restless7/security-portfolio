'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import OperationsMap with SSR disabled
const OperationsMap = dynamic(() => import('../OperationsMap').then(mod => mod.OperationsMap), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full flex items-center justify-center bg-gray-900">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-cyan-400 border-t-transparent mx-auto mb-2"></div>
                <p className="text-gray-400 text-sm">Cargando mapa electoral...</p>
            </div>
        </div>
    ),
});

import { useMapStore } from '../../hooks/useMapStore';

export default function MapaElectoralView() {
    const { selectEntity } = useMapStore();

    return (
        <div className="h-full w-full">
            <OperationsMap
                onVoterSelect={selectEntity}
                fullscreen={true}
            />
        </div>
    );
}
