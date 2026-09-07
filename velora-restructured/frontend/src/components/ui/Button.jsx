import React from 'react';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-white/5 rounded-full px-4 py-2 transition-colors',
    outline: 'border border-[#238cff]/50 text-[#46d5ff] hover:bg-[#238cff]/10 rounded-full transition-all'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${variantClasses[variant] || variantClasses.primary} ${sizeClasses[size] || sizeClasses.md} ${
        disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>{children}</span>
    </button>
  );
}

export default Button;
