'use client';

import React from 'react';
import { useMapStore } from '../../hooks/useMapStore';

export default function FilterPanel() {
    const { filters, setFilters } = useMapStore();

    const handleStatusChange = (status: string) => {
        const current = filters.status;
        const next = current.includes(status)
            ? current.filter(s => s !== status)
            : [...current, status];
        setFilters({ status: next });
    };

    return (
        <div className="space-y-6">
            {/* Status Filter */}
            <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">
                    Estado del Votante
                </label>
                <div className="flex flex-wrap gap-2">
                    {['confirmed', 'pending', 'opposition', 'unknown'].map(status => (
                        <button
                            key={status}
                            onClick={() => handleStatusChange(status)}
                            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors border ${filters.status.includes(status)
                                    ? 'bg-blue-600 border-blue-500 text-white'
                                    : 'bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600'
                                }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Intention Range (Mock Slider) */}
            <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 block">
                    Intención de Voto
                </label>
                <div className="px-2">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        onChange={(e) => setFilters({ intentionRange: [parseInt(e.target.value), 100] })}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
