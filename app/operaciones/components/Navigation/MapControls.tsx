'use client';

import React from 'react';
import { useMapStore } from '../../hooks/useMapStore';
import FilterPanel from '../Sidebar/FilterPanel';

export default function MapControls() {
    return (
        <div className="p-4 space-y-4">
            {/* KPIs */}
            <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                    Métricas
                </h3>
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                        <div className="text-xs text-slate-400 mb-1">Cobertura</div>
                        <div className="text-xl font-bold text-green-400">85%</div>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                        <div className="text-xs text-slate-400 mb-1">Votantes</div>
                        <div className="text-xl font-bold text-blue-400">12.5k</div>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                        <div className="text-xs text-slate-400 mb-1">Líderes</div>
                        <div className="text-xl font-bold text-purple-400">48</div>
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700/50">
                        <div className="text-xs text-slate-400 mb-1">Alertas</div>
                        <div className="text-xl font-bold text-red-400">3</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                    Filtros
                </h3>
                <FilterPanel />
            </div>

            {/* Last Update */}
            <div className="pt-4 border-t border-slate-700/50 text-xs text-slate-500 text-center">
                Actualizado: Hace 2 min
            </div>
        </div>
    );
}
