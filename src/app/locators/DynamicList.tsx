"use client"; // Mark this component as a client component

import { useState } from "react";
import { Button } from "@/components/ui/button";

function DynamicList() {
  const [items, setItems] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadItems = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setItems([
        "Dynamic Item 1",
        "Dynamic Item 2",
        "Dynamic Item 3",
        "Dynamic Item 4",
        "Dynamic Item 5"
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const clearItems = () => {
    setItems([]);
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <Button onClick={loadItems} disabled={isLoading} data-testid="load-items-button">
          {isLoading ? "Loading..." : "Load Items"}
        </Button>
        <Button onClick={clearItems} variant="outline" data-testid="clear-items-button">
          Clear
        </Button>
      </div>

      <div className="border rounded-md p-3 min-h-[100px]" data-testid="dynamic-list-container">
        {isLoading ? (
          <div className="flex justify-center items-center h-16" data-testid="loading-indicator">
            <div className="animate-spin h-6 w-6 border-2 border-zinc-600 border-t-transparent rounded-full" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-zinc-400 text-center">No items. Click "Load Items" to load data.</p>
        ) : (
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li key={index} className="p-2 bg-zinc-50 rounded" data-testid={`dynamic-item-${index + 1}`}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DynamicList;