import React from 'react';
import Card from './Card';

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendType = 'up', // 'up' | 'down' | 'neutral'
  subtitle,
  iconColor = 'text-[#46d5ff]',
  iconBg = 'bg-[#238cff]/15 border-[#238cff]/30',
  className = ''
}) {
  return (
    <Card className={`relative overflow-hidden transition-all duration-300 hover:border-[#238cff]/40 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#b9c7dd] uppercase tracking-wider">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">{value}</h3>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl border ${iconBg} ${iconColor} shrink-0`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs font-medium">
          <span
            className={
              trendType === 'up'
                ? 'text-emerald-400'
                : trendType === 'down'
                ? 'text-red-400'
                : 'text-slate-400'
            }
          >
            {trend}
          </span>
          <span className="text-slate-500">vs last period</span>
        </div>
      )}
    </Card>
  );
}

export default StatCard;
