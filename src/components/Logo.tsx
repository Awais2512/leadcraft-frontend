import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`bg-primary rounded-lg flex items-center justify-center ${sizeClasses[size]} leadcraft-shadow`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-3/5 h-3/5 text-primary-foreground"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m2 17 10 5 10-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m2 12 10 5 10-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showText && (
        <span className={`font-semibold text-foreground ${textSizeClasses[size]}`}>
          LeadCraft
        </span>
      )}
    </div>
  );
}