import React from 'react';
import { PackageSearch } from 'lucide-react';
import Button from './Button';

export function EmptyState({
  title = 'No Records Found',
  description = 'There is currently no data matching your criteria.',
  icon: Icon = PackageSearch,
  actionLabel,
  onAction
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#182331] border border-white/10 rounded-2xl">
      <div className="p-4 rounded-full bg-[#238cff]/10 text-[#46d5ff] mb-4 border border-[#238cff]/20">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-lg font-semibold text-white mb-1">{title}</h4>
      <p className="text-sm text-[#b9c7dd] max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="sm">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
