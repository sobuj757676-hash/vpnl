import React from 'react';
import { cn } from '@/lib/utils'; // Assuming this utility exists

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, hoverEffect = true, className, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white/70 dark:bg-black/70 backdrop-blur-lg border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.1)] rounded-2xl p-6 transition-all duration-300 ease-out",
        hoverEffect && "hover:-translate-y-2 hover:shadow-[0_8px_40px_rgba(0,0,0,0.15)] hover:border-[var(--primary)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
