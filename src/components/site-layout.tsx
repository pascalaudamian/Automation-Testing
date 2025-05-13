"use client";

import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";

interface SiteLayoutProps {
  children: React.ReactNode;
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    // Changed bg-gray-100 to bg-gray-200 for a darker background
    <div className="min-h-screen bg-gray-200"> {/* <<< CHANGED to bg-gray-200 */}
      {/*
        Sidebar - This div is now primarily a container for the Navigation.
      */}
      <div className="flex flex-col">
         {/*
           The fixed Navigation component now provides its own width,
           border, background (bg-white), padding, and handles scrolling.
           It sits on top of the gray background.
         */}
         <Navigation />
      </div>


      {/* Main content */}
      {/*
        Added pl-64 (padding-left: 16rem) to the main content wrapper
        to offset the fixed 64-width navigation sidebar.
      */}
      <div className="flex-1 p-6 pl-64">
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}