import React from 'react';

export function Card({
  children,
  className = '',
  interactive = false,
  glass = false,
  padding = 'p-6',
  ...props
}) {
  const baseClass = glass
    ? 'glass-card'
    : interactive
    ? 'bg-velora-card-interactive'
    : 'bg-velora-card';

  return (
    <div className={`${baseClass} ${padding} ${className}`} {...props}>
      {children}
    </div>
  );
}

export default Card;
