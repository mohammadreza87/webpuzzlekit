'use client';

/**
 * Floating Flowchart Button
 *
 * A floating action button that opens the flowchart overlay.
 * Appears on all screens in the bottom-right corner.
 */

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the overlay for better initial load performance
const FlowchartOverlay = dynamic(() => import('./FlowchartOverlay').then((mod) => mod.FlowchartOverlay), {
  ssr: false,
  loading: () => null,
});

export function FlowchartButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-36 right-4 z-[100] w-12 h-12 rounded-full bg-brand-primary text-white shadow-lg flex items-center justify-center hover:bg-brand-hover transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="Open Flowchart"
        title="Open Flowchart & Simulation"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Flowchart icon */}
          <rect x="3" y="3" width="6" height="6" rx="1" />
          <rect x="15" y="3" width="6" height="6" rx="1" />
          <rect x="9" y="15" width="6" height="6" rx="1" />
          <path d="M6 9v3a1 1 0 001 1h4" />
          <path d="M18 9v3a1 1 0 01-1 1h-4" />
          <path d="M12 13v2" />
        </svg>
      </button>

      {/* Full-screen Overlay */}
      {isOpen && <FlowchartOverlay onClose={handleClose} />}
    </>
  );
}
