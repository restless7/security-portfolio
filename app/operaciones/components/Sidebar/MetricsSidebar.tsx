'use client';

import React from 'react';
import { useMapStore } from '../../hooks/useMapStore';
import { ChevronLeft, ChevronRight, BarChart3, Users, Map as MapIcon, AlertTriangle } from 'lucide-react';
import FilterPanel from './FilterPanel';

export default function MetricsSidebar() {
    const { isSidebarOpen, toggleSidebar } = useMapStore();

    if (!isSidebarOpen) {
        return (
            <button
                onClick={toggleSidebar}
                className="absolute top-4 left-4 z-20 p-2 bg-gray-800 rounded-md shadow-lg border border-gray-700 hover:bg-gray-700 transition-colors"
            >
                <ChevronRight className="w-5 h-5 text-white" />
            </button>
        );
    }

    return (
        <div className="h-full w-80 bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <MapIcon className="w-5 h-5 text-blue-500" />
                    Operaciones
                </h2>
                <button onClick={toggleSidebar} className="p-1 hover:bg-gray-800 rounded">
                    <ChevronLeft className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            {/* KPIs */}
            <div className="p-4 grid grid-cols-2 gap-3">
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Cobertura</div>
                    <div className="text-xl font-bold text-green-400">85%</div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Votantes</div>
                    <div className="text-xl font-bold text-blue-400">12.5k</div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Líderes</div>
                    <div className="text-xl font-bold text-purple-400">48</div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Alertas</div>
                    <div className="text-xl font-bold text-red-400">3</div>
                </div>
            </div>

            {/* Filters Placeholder */}
            <div className="flex-1 p-4 overflow-y-auto">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">Filtros</h3>
                <FilterPanel />
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800 text-xs text-gray-500 text-center">
                Actualizado: Hace 2 min
            </div>
        </div>
    );
}
