"use client";

import React, { useState, useEffect } from 'react';

interface AnnouncementBarProps {
  visible?: boolean;
  text?: string;
  bgColor?: string;
  url?: string;
}

export function AnnouncementBar({
  visible = false,
  text,
  bgColor = '#18181b', // zinc-900
  url,
}: AnnouncementBarProps) {
  const [isDismissed, setIsDismissed] = useState(true); // Default to true to prevent hydration mismatch

  useEffect(() => {
    // Only show if visible is true and it hasn't been dismissed in this session
    if (visible) {
      const dismissed = sessionStorage.getItem('announcement-dismissed');
      if (!dismissed) {
        setIsDismissed(false);
      }
    }
  }, [visible]);

  if (!visible || !text || isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('announcement-dismissed', 'true');
  };

  const Content = () => (
    <div className="flex items-center justify-center flex-1 text-sm font-medium text-white px-4 text-center">
      {text}
      {url && (
        <span className="ml-2 underline underline-offset-2 opacity-80 hover:opacity-100 transition-opacity">
          Learn more &rarr;
        </span>
      )}
    </div>
  );

  return (
    <div
      className="w-full relative z-50 transition-all duration-300 overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div className="container max-w-[1280px] mx-auto relative flex items-center min-h-[40px] py-2">
        {url ? (
          <a href={url} className="flex-1 flex items-center justify-center hover:opacity-90 transition-opacity">
            <Content />
          </a>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Content />
          </div>
        )}

        <button
          onClick={handleDismiss}
          className="absolute right-4 p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none"
          aria-label="Dismiss announcement"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
