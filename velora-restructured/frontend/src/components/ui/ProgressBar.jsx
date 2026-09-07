import React from 'react';

export function ProgressBar({
  value = 0,
  max = 100,
  label = '',
  showPercentage = true,
  color = 'cyan', // 'cyan' | 'blue' | 'emerald' | 'amber' | 'red'
  height = 'h-2.5',
  className = ''
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colorGradients = {
    cyan: 'bg-gradient-to-r from-[#238cff] to-[#46d5ff] shadow-[0_0_12px_rgba(70,213,255,0.4)]',
    blue: 'bg-gradient-to-r from-blue-600 to-[#238cff] shadow-[0_0_12px_rgba(35,140,255,0.4)]',
    emerald: 'bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]',
    amber: 'bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]',
    red: 'bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_12px_rgba(239,68,68,0.4)]',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-medium">
          {label && <span className="text-[#b9c7dd]">{label}</span>}
          {showPercentage && <span className="text-white font-semibold">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-[#0d1827] rounded-full overflow-hidden border border-white/5 ${height}`}>
        <div
          className={`h-full transition-all duration-1000 ease-out rounded-full ${colorGradients[color] || colorGradients.cyan}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
