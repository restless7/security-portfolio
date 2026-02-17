'use client';

import React from 'react';

// QueryProvider temporarily stubbed for Next.js 15 compatibility
// @tanstack/react-query will be re-added once compatible with React 19
export default function QueryProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
