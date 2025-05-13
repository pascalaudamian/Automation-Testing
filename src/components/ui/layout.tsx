import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils" // If you have a utility for combining class names

interface LayoutGridProps {
  children: ReactNode;
  className?: string;
}

export const LayoutGrid: React.FC<LayoutGridProps> = ({ children, className }) => {
  return (
    <div className={cn("grid", className)}>
      {children}
    </div>
  );
};

interface LayoutPanelProps {
  children: ReactNode;
  className?: string;
}

export const LayoutPanel: React.FC<LayoutPanelProps> = ({ children, className }) => {
  return (
    <div className={cn("panel", className)}>
      {children}
    </div>
  );
};
