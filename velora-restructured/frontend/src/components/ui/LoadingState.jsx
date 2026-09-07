import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingState({ message = 'Synchronizing warehouse operations...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#182331]/50 border border-white/5 rounded-2xl">
      <div className="p-4 rounded-full bg-[#238cff]/10 text-[#46d5ff] mb-4 animate-spin">
        <Loader2 className="w-8 h-8" />
      </div>
      <p className="text-sm font-medium text-[#b9c7dd] animate-pulse">{message}</p>
    </div>
  );
}

export default LoadingState;
