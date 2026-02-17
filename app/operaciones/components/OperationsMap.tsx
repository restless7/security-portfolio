/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { type Voter } from '@/app/operaciones/lib/mockData';

// Dynamic import of the real map root to avoid SSR issues
const ElectoralMapRoot = dynamic(() => import('./Map/ElectoralMapRoot'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"
        />
        <p className="text-sm text-gray-600">Cargando mapa V2...</p>
      </div>
    </div>
  )
});

interface OperationsMapProps {
  onVoterSelect: (voter: Voter) => void;
  fullscreen?: boolean;
}

export function OperationsMap({ onVoterSelect, fullscreen = false }: OperationsMapProps) {
  return (
    <div className="relative w-full h-full bg-slate-200">
      {/* V2 Map Root with integrated controls */}
      <ElectoralMapRoot />

      {/* CSS for custom markers - we'll inject this via style tag */}
      <style jsx global>{`
        .custom-voter-marker {
          background: transparent !important;
          border: none !important;
        }
        
        .marker-cluster-custom {
          background: transparent !important;
          border: none !important;
        }
        
        .leaflet-popup-content {
          margin: 0 !important;
        }
        
        .leaflet-popup-content-wrapper {
          border-radius: 8px !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
      `}</style>
    </div>
  );
}