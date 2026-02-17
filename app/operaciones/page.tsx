'use client';

import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import PanelPrincipal from './components/Dashboard/PanelPrincipal';
import MapaElectoralView from './components/MapaElectoral/MapaElectoralView';
import GestionVotantesView from './components/GestionVotantes/GestionVotantesView';
import AnalisisView from './components/Analisis/AnalisisView';
import QueryProvider from './components/UI/QueryProvider';

type ViewType = 'dashboard' | 'map' | 'voters' | 'analytics';

export default function OperacionesPage() {
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <PanelPrincipal />;
      case 'map':
        return <MapaElectoralView />;
      case 'voters':
        return <GestionVotantesView />;
      case 'analytics':
        return <AnalisisView />;
      default:
        return <PanelPrincipal />;
    }
  };

  return (
    <QueryProvider>
      <div className="flex h-screen w-full overflow-hidden bg-gray-900 text-white">
        {/* Sidebar Navigation */}
        <Sidebar
          isCollapsed={isCollapsed}
          activeView={activeView}
          onViewChange={setActiveView}
        />

        {/* Main Content Area */}
        <div
          className="flex-1 h-full overflow-hidden transition-all duration-300"
          style={{ marginLeft: isCollapsed ? '64px' : '288px' }}
        >
          {renderView()}
        </div>

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="fixed left-0 top-20 z-40 bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-r-lg transition-all duration-300 border border-l-0 border-slate-700/50"
          style={{ marginLeft: isCollapsed ? '64px' : '288px' }}
        >
          <svg
            className={`h-4 w-4 transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </QueryProvider>
  );
}