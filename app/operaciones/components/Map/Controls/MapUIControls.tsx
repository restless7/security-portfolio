'use client';

import React, { useState, useEffect } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import { Layers, Target, BarChart2 } from 'lucide-react';
import { mockVoters, Voter } from '@/app/operaciones/lib/mockData';

interface MapUIControlsProps {
    showClusters: boolean;
    showHeatmap: boolean;
    showBounds: boolean;
    onToggleClusters: () => void;
    onToggleHeatmap: () => void;
    onToggleBounds: () => void;
}

export function MapUIControls({
    showClusters,
    showHeatmap,
    showBounds,
    onToggleClusters,
    onToggleHeatmap,
    onToggleBounds
}: MapUIControlsProps) {
    const map = useMap();
    const [visibleVoters, setVisibleVoters] = useState<Voter[]>(mockVoters);
    const [bounds, setBounds] = useState(map.getBounds());

    // Listen to map movements
    useMapEvents({
        moveend: () => {
            setBounds(map.getBounds());
        }
    });

    // Calculate visible voters when bounds change
    useEffect(() => {
        const newVisibleVoters = mockVoters.filter(v =>
            bounds.contains([v.location.lat, v.location.lng])
        );
        setVisibleVoters(newVisibleVoters);
    }, [bounds]);

    // KPIs based on visible voters
    const totalVisible = visibleVoters.length;
    const highIntention = visibleVoters.filter(v => v.intentionScore >= 70).length;
    const mediumIntention = visibleVoters.filter(v => v.intentionScore >= 40 && v.intentionScore < 70).length;
    const lowIntention = visibleVoters.filter(v => v.intentionScore < 40).length;

    return (
        <>
            {/* Layer Controls - Top Right */}
            <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-3 space-y-2 pointer-events-auto">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center mb-2">
                    <Layers className="h-4 w-4 mr-2" />
                    Capas
                </h4>

                <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={showClusters} onChange={onToggleClusters} className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Clusters</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={showHeatmap} onChange={onToggleHeatmap} className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Mapa de Calor</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" checked={showBounds} onChange={onToggleBounds} className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">Límites</span>
                </label>
            </div>

            {/* Dynamic Statistics - Bottom Left */}
            <div className="absolute bottom-8 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200 p-4 pointer-events-auto w-64 transition-all duration-300">
                <h4 className="text-sm font-bold text-gray-900 flex items-center mb-3 border-b pb-2">
                    <BarChart2 className="h-4 w-4 mr-2 text-blue-600" />
                    Estadísticas en Vista
                </h4>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                        <span>Votantes Visibles:</span>
                        <span className="font-bold text-gray-900">{totalVisible.toLocaleString()}</span>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-green-700 font-medium">Alta Intención</span>
                            <span>{Math.round((highIntention / (totalVisible || 1)) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(highIntention / (totalVisible || 1)) * 100}%` }}></div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-yellow-700 font-medium">Media</span>
                            <span>{Math.round((mediumIntention / (totalVisible || 1)) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-yellow-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(mediumIntention / (totalVisible || 1)) * 100}%` }}></div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                            <span className="text-red-700 font-medium">Baja</span>
                            <span>{Math.round((lowIntention / (totalVisible || 1)) * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-red-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${(lowIntention / (totalVisible || 1)) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
