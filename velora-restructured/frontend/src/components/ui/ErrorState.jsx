import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from './Button';

export function ErrorState({
  title = 'Database Synchronization Failed',
  message = 'Unable to establish connection with the backend MySQL service.',
  onRetry
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-[#281318]/60 border border-red-500/30 rounded-2xl">
      <div className="p-3.5 rounded-full bg-red-500/15 text-red-400 mb-3 border border-red-500/30">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h4 className="text-base font-semibold text-white mb-1">{title}</h4>
      <p className="text-xs text-red-200/80 max-w-md mb-5">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="secondary" size="sm" icon={RefreshCw}>
          Retry Connection
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
