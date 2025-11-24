"use client";

import React from 'react';

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-950">
      <div className="w-16 h-16 border-4 border-t-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
