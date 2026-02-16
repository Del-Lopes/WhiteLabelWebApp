
import React from 'react';
import { BRAND_CONFIG } from '../lib/branding';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'mobile';
}

export const Logo: React.FC<LogoProps> = ({ className, variant = 'default' }) => {
  if (variant === 'mobile') {
    return (
      <img 
        src={BRAND_CONFIG.logo.icon} 
        alt={`${BRAND_CONFIG.name} Icon`} 
        className={className} 
      />
    );
  }

  return (
    <img 
      src={BRAND_CONFIG.logo.full} 
      alt={`${BRAND_CONFIG.name} Logo`} 
      className={className} 
    />
  );
};