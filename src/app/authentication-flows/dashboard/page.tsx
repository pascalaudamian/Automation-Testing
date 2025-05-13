// src/app/authentication-flows/dashboard/page.tsx
import React, { Suspense } from 'react';
// Import the Client Component we just created
import DashboardClientPage from './dashboard-client-page'; // Adjust the import path if necessary

// This is a Server Component page.
// It renders the static parts of the page and the Suspense boundary.
export default function DashboardPage() {
  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">User Dashboard</h1>

      {/*
        Wrap the Client Component that uses useSearchParams in Suspense.
        This tells Next.js to defer rendering of DashboardClientPage until the
        client side is ready and has access to browser APIs like the URL.
        The fallback prop displays content while the client component loads.
      */}
      <Suspense fallback={
        <div className="w-full flex justify-center items-center min-h-[300px]">
          <p>Loading dashboard content...</p>
        </div>
      }>
        {/* Render the Client Component */}
        <DashboardClientPage />
      </Suspense>

      {/*
        You can add other static or Server Component parts of your dashboard here
        if they don't depend on client-side hooks or browser APIs.
      */}
    </main>
  );
}
