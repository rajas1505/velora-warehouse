import React from 'react';

export function Badge({ children, variant = 'info', size = 'md', className = '' }) {
  const variantStyles = {
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    danger: 'bg-red-500/15 text-red-400 border-red-500/30',
    info: 'bg-blue-500/15 text-[#46d5ff] border-blue-500/30',
    neutral: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border tracking-wide whitespace-nowrap ${
        variantStyles[variant] || variantStyles.info
      } ${sizeStyles[size] || sizeStyles.md} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {children}
    </span>
  );
}

export default Badge;
