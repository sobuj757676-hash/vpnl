import React from 'react';
import { cn } from '@/lib/utils';
import * as PhosphorIcons from 'lucide-react'; // Using lucide-react as specified in package.json

export interface FeatureIconProps extends React.HTMLAttributes<HTMLDivElement> {
  iconName?: string;
  customSvgUrl?: string;
  size?: number;
  className?: string;
}

export const FeatureIcon: React.FC<FeatureIconProps> = ({
  iconName = 'Shield',
  customSvgUrl,
  size = 40,
  className,
  ...props
}) => {
  if (customSvgUrl) {
    return (
      <div
        className={cn("w-[40px] h-[40px] text-[var(--primary)] transition-transform duration-300 hover:scale-110", className)}
        {...props}
      >
        <img src={customSvgUrl} alt="Feature Icon" width={size} height={size} style={{ width: size, height: size }} />
      </div>
    );
  }

  // Map to Lucide icons instead
  const IconComponent = (PhosphorIcons as any)[iconName] || PhosphorIcons.Shield;

  return (
    <div
      className={cn("text-[var(--primary)] transition-transform duration-300 hover:scale-110", className)}
      {...props}
    >
      <IconComponent size={size} strokeWidth={1.5} className="group-hover:animate-pulse" />
    </div>
  );
};
