"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from 'react';
import { cn } from "@/lib/utils"; // Assuming cn correctly merges class names

// Optional: You might want to add icons here for a more modern look.
// For simplicity in this example, we'll use text characters for arrows.
// If you have a library like 'react-icons', you could import something like:
// import { ChevronDown, ChevronUp } from 'react-icons/hi';

const routes = [
  { href: "/", label: "Home" },
];
const coreModules = [
  { href: "/forms", label: "Form Elements" },
  { href: "/tables", label: "Tables" },
  { href: "/dynamic", label: "Dynamic Content" },
  { href: "/dialogs", label: "Dialogs & Popups" },
  { href: "/ajax", label: "AJAX Requests" },
  { href: "/draggable", label: "Drag & Drop" },
  { href: "/iframes", label: "iFrames" },
  { href: "/locators", label: "Locator Practice" },
];

const advancedModules = [
  { href: "/authentication-flows", label: "Authentication Flows" },
  { href: "/file-uploads", label: "File Uploads" },
  { href: "/pagination", label: "Pagination" },
  { href: "/notifications", label: "Notifications" },
  { href: "/error-handling", label: "Error Handling" },
  { href: "/performance-feedback", label: "Performance Feedback" },
  { href: "/responsive-layouts", label: "Responsive Layouts" },
  { href: "/date-time-pickers", label: "Date & Time Pickers" },
  { href: "/canvas-svg", label: "Canvas & SVG Elements" },
  { href: "/hover-events", label: "Hover Events" },
  { href: "/state-persistence", label: "State Persistence" },
];

export function Navigation() {
  const pathname = usePathname();
  const [showCoreModules, setShowCoreModules] = useState(false);
  const [showAdvancedModules, setShowAdvancedModules] = useState(false);

  const renderLinks = (modules: { href: string; label: string }[]) =>
    modules.map((route) => (
      <Link
        key={route.href}
        href={route.href}
        className={cn(
          // Base styles for all links
          "py-2 pr-3 text-sm rounded-md transition-colors",
          "text-zinc-600 hover:bg-zinc-200", // Default text and hover colors

          // Active state styles (override base styles)
          pathname === route.href
            ? "bg-zinc-100 text-zinc-900 font-medium border-l-4 border-blue-500 pl-2" // Added left border and adjusted padding
            : "pl-3" // Default left padding when not active (matches border width + active padding)
        )}
        data-testid={`nav-${route.label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {route.label}
      </Link>
    ));

  return (
    // Navigation Container: Fixed position, width, background, border, padding, scrolling, and subtle rounding
    <nav className="flex flex-col w-48 md:w-64 fixed inset-y-0 left-0 bg-white border-r border-zinc-200 p-4 overflow-y-auto shadow-xl"> {/* Added shadow-xl */}
      {/* Site Title/Header - Added from SiteLayout for better integration */}
       <div className="p-2 mb-6 border-b border-zinc-200 pb-4"> {/* Added bottom border and more padding */}
         <h2 className="font-bold text-xl text-zinc-800" data-testid="site-title"> {/* Changed text color */}
           Automation Testing
         </h2>
         <p className="text-xs text-zinc-500">Practice Site</p> {/* Shortened description */}
       </div>


      {/* Main navigation links and toggles container */}
      <div className="flex flex-col space-y-1"> {/* Adjusted spacing slightly */}

        {/* Home Link - Styled consistently with other links */}
        <Link
          href="/"
          className={cn(
            // Base styles
            "py-2 pr-3 text-sm rounded-md transition-colors",
             "text-zinc-600 hover:bg-zinc-200", // Default text and hover colors

            // Active state styles
            pathname === "/"
              ? "bg-zinc-100 text-zinc-900 font-medium border-l-4 border-blue-500 pl-2" // Added left border and adjusted padding
              : "pl-3" // Default left padding
          )}
          data-testid="nav-home"
        >
          Home
        </Link>

        {/* Core Modules Toggle Button - Styled to look like an expandable header */}
        <button
          onClick={() => setShowCoreModules(!showCoreModules)}
          className={cn(
            "flex items-center justify-between px-3 py-2 text-xs uppercase tracking-wide rounded-md w-full transition-colors cursor-pointer", // Added flex for icon spacing
            "text-zinc-700 font-semibold hover:bg-zinc-200", // Styled more like a header
             showCoreModules ? 'bg-zinc-100 text-zinc-800' : '' // Slight background/text change when open
          )}
          aria-expanded={showCoreModules}
          aria-controls="core-modules-list" // Link button to content (optional, requires adding id to the div)
        >
          Core Modules
          {/* Arrow/Icon indicator */}
           <span className="text-zinc-500 text-sm"> {/* Styled the arrow */}
             {showCoreModules ? '▲' : '▼'} {/* Or use an icon component here */}
           </span>
        </button>
        {/* Conditionally render Core Modules links */}
        {showCoreModules && (
          <div id="core-modules-list" className="flex flex-col space-y-1 pl-4 border-l border-zinc-300 ml-1"> {/* Added border and ml */}
            {renderLinks(coreModules)}
          </div>
        )}

        {/* Advanced Modules Toggle Button - Styled consistently */}
        <button
          onClick={() => setShowAdvancedModules(!showAdvancedModules)}
          className={cn(
            "flex items-center justify-between mt-2 px-3 py-2 text-xs uppercase tracking-wide rounded-md w-full transition-colors cursor-pointer", // Added mt-2 for space after core modules
            "text-zinc-700 font-semibold hover:bg-zinc-200",
             showAdvancedModules ? 'bg-zinc-100 text-zinc-800' : ''
          )}
          aria-expanded={showAdvancedModules}
           aria-controls="advanced-modules-list"
        >
          Advanced Modules
           <span className="text-zinc-500 text-sm">
             {showAdvancedModules ? '▲' : '▼'} {/* Or use an icon component here */}
           </span>
        </button>
        {/* Conditionally render Advanced Modules links */}
        {showAdvancedModules && (
           <div id="advanced-modules-list" className="flex flex-col space-y-1 pl-4 border-l border-zinc-300 ml-1"> {/* Added border and ml */}
            {renderLinks(advancedModules)}
           </div>
        )}
      </div>
    </nav>
  );
}