'use client';

import React from 'react';

// Map functionality temporarily disabled for Next.js 15 compatibility
// The react-map-gl library is not yet compatible with React 19
export default function BaseMap() {
    return (
        <div className="relative w-full h-full flex items-center justify-center bg-gray-900">
            <div className="text-center p-8">
                <h2 className="text-xl font-bold text-yellow-400 mb-2">Map Coming Soon</h2>
                <p className="text-gray-400">Map functionality is being updated for Next.js 15 compatibility.</p>
            </div>
        </div>
    );
}
