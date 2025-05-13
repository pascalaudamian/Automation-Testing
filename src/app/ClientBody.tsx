"use client";

import { useEffect } from "react";
import { SiteLayout } from "@/components/site-layout";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <div className="antialiased">
      <SiteLayout>{children}</SiteLayout>
    </div>
  );
}
