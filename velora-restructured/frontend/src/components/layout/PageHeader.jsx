import React from 'react';

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">{title}</h1>
        {subtitle && (
          <p className="text-sm text-[#b9c7dd] mt-1 font-normal max-w-2xl">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default PageHeader;
