"use client";
import React, { useState, useEffect, useRef } from "react";

// Sample data
const items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
const itemsPerPage = 10;

const PaginationTypes = () => {
  // State for Basic Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // State for Load More
  const [loadMoreCount, setLoadMoreCount] = useState(1);

  // State for Infinite Scroll
  const [infiniteItems, setInfiniteItems] = useState(items.slice(0, itemsPerPage));
  const loaderRef = useRef(null); // Initialize useRef with null

  // State for Tab Selection
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'loadMore', 'infinite'

  // Reset states when changing tabs (optional, but can prevent unexpected behavior)
  useEffect(() => {
    // Reset states when activeTab changes
    setCurrentPage(1);
    setLoadMoreCount(1);
    setInfiniteItems(items.slice(0, itemsPerPage));
    // Note: Infinite scroll observer is handled within its own effect based on activeTab
  }, [activeTab]);


  // Basic Pagination Handlers
  // Explicitly type the 'page' parameter as number
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Load More Handler
  const handleLoadMore = () => {
    setLoadMoreCount((prev) => prev + 1);
  };

  // Infinite Scroll Handler
  useEffect(() => {
    // Only set up the observer if the 'infinite' tab is active
    if (activeTab !== 'infinite') {
      // Disconnect observer if it exists when leaving the tab
       if (loaderRef.current) {
          // It's good practice to check if the observer is observing before unobserving
          // although disconnect handles this gracefully. A simple check is fine.
          // No need for explicit unobserve before disconnect in this case.
       }
       return; // Don't observe if not on infinite scroll tab
    }

    // Ensure loaderRef.current exists before creating observer
    if (!loaderRef.current) {
        console.warn("Loader ref not found for infinite scroll.");
        return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the loader is visible AND there are more items to load
        if (entries[0].isIntersecting && infiniteItems.length < items.length) {
          setInfiniteItems((prev) => {
            const nextItems = items.slice(0, prev.length + itemsPerPage + (prev.length > 0 ? 0 : itemsPerPage)); // Ensure we add itemsPerPage each time
            return nextItems;
          });
        }
      },
      { threshold: 1.0 } // Trigger when 100% of the loader is visible
    );

    // Start observing the loader element
    observer.observe(loaderRef.current);


    // Cleanup function to disconnect the observer when the component unmounts
    // or when activeTab changes away from 'infinite'
    return () => {
      if (observer) { // Ensure observer was created
         observer.disconnect();
      }
    };
  }, [activeTab, infiniteItems.length]); // Re-run effect if activeTab or the number of infiniteItems changes

  // Derived state for displaying items based on active tab
  const pagedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const loadMoreItems = items.slice(0, loadMoreCount * itemsPerPage);
  // infiniteItems state is already managed by the effect

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Multiple Pagination Types</h1>

      {/* Tab Selection - Centered */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${activeTab === 'basic' ? 'bg-blue-500 text-white focus:ring-blue-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          onClick={() => setActiveTab('basic')}
        >
          Classic Pagination
        </button>
        <button
          className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${activeTab === 'loadMore' ? 'bg-green-500 text-white focus:ring-green-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          onClick={() => setActiveTab('loadMore')}
        >
          Load More Button
        </button>
        <button
          className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50 ${activeTab === 'infinite' ? 'bg-purple-500 text-white focus:ring-purple-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          onClick={() => setActiveTab('infinite')}
        >
          Infinite Scroll
        </button>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'basic' && (
        <section>
          <h2 className="text-xl font-semibold mb-4">1. Basic Pagination</h2>
          <ul className="mb-4 space-y-1">
            {pagedItems.map((item) => (
              <li key={item} className="bg-blue-100 p-2 rounded shadow-sm">{item}</li>
            ))}
          </ul>
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              Prev
            </button>
            {/* Render a limited set of page numbers for better UI with many pages */}
            {totalPages > 0 && Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page =>
                 page === 1 || // Always show first page
                 page === totalPages || // Always show last page
                 (page >= currentPage - 2 && page <= currentPage + 2) || // Show pages around the current page
                 (currentPage <= 3 && page <= 5) || // Show first few pages if current is near the start
                 (currentPage >= totalPages - 2 && page >= totalPages - 4) // Show last few pages if current is near the end
               )
              .sort((a, b) => a - b) // Ensure pages are sorted
              .map((page, index, arr) => {
                // Add ellipses if there are gaps in the page numbers displayed
                const previousPage = arr[index - 1];
                if (previousPage && page > previousPage + 1) {
                  return <span key={`ellipsis-${page - 1}`} className="px-1 py-1">...</span>;
                }
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded transition-colors ${
                      currentPage === page ? "bg-blue-700 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                );
              })
            }

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          </div>
        </section>
      )}

      {activeTab === 'loadMore' && (
        <section>
          <h2 className="text-xl font-semibold mb-4">2. Load More</h2>
          <ul className="mb-4 space-y-1">
            {loadMoreItems.map((item) => (
              <li key={item} className="bg-green-100 p-2 rounded shadow-sm">{item}</li>
            ))}
          </ul>
          {loadMoreItems.length < items.length && (
            <div className="text-center mt-4">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Load More ({loadMoreItems.length}/{items.length})
              </button>
            </div>
          )}
           {loadMoreItems.length >= items.length && (
            <div className="text-center mt-4 text-gray-600">
              All items loaded.
            </div>
          )}
        </section>
      )}

      {activeTab === 'infinite' && (
        <section>
          <h2 className="text-xl font-semibold mb-4">3. Infinite Scroll</h2>
          <ul className="space-y-1">
            {infiniteItems.map((item) => (
              <li key={item} className="bg-purple-100 p-2 rounded shadow-sm">{item}</li>
            ))}
          </ul>
           {infiniteItems.length < items.length ? (
            <div ref={loaderRef} className="text-center mt-4 text-sm text-gray-600">
              Loading more...
            </div>
          ) : (
             <div className="text-center mt-4 text-sm text-gray-600">
              All items loaded.
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default PaginationTypes;
