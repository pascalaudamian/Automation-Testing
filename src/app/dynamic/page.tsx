"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function DynamicContentPage() {
  const [visibleElements, setVisibleElements] = useState<string[]>([]);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [randomElements, setRandomElements] = useState<number[]>([]);
  const [autoRefreshActive, setAutoRefreshActive] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [count, setCount] = useState(0);

  // Toggle element visibility
  const toggleElement = (id: string) => {
    setVisibleElements((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle loading state
  const toggleLoading = (id: string) => {
    setLoadingStates((prev) => {
      const newState = { ...prev, [id]: !prev[id] };

      // Auto reset loading after 3 seconds
      if (newState[id]) {
        setTimeout(() => {
          setLoadingStates((current) => ({ ...current, [id]: false }));
        }, 3000);
      }

      return newState;
    });
  };

  // Add random elements
  const addRandomElement = () => {
    const newItem = Math.floor(Math.random() * 1000);
    setRandomElements((prev) => [...prev, newItem]);
  };

  // Remove random elements
  const removeRandomElement = () => {
    setRandomElements((prev) => {
      if (prev.length === 0) return prev;
      return prev.slice(0, -1);
    });
  };

  // Auto add elements every 2 seconds
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoRefreshActive) {
      interval = setInterval(() => {
        addRandomElement();

        // Limit to 10 elements
        setRandomElements((prev) => prev.slice(-10));
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefreshActive]);

  // Progress bar effect
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 5;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Increment counter
  const incrementCounter = () => {
    setCount((prev) => prev + 1);
  };

  // Reset counter
  const resetCounter = () => {
    setCount(0);
  };

  return (
    <div className="space-y-8" data-testid="dynamic-content-page">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" data-testid="page-title">Dynamic Content</h1>
        <p className="text-sm text-zinc-500" data-testid="page-description">
          Practice with elements that appear and disappear, loading states, and auto-refreshing content.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Toggle Visibility Card */}
        <Card>
          <CardHeader>
            <CardTitle>Toggle Visibility</CardTitle>
            <CardDescription>
              Test your ability to handle elements that appear and disappear
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => toggleElement("element1")}
                data-testid="toggle-button-1"
              >
                {visibleElements.includes("element1") ? "Hide" : "Show"} Element 1
              </Button>
              <Button
                onClick={() => toggleElement("element2")}
                data-testid="toggle-button-2"
              >
                {visibleElements.includes("element2") ? "Hide" : "Show"} Element 2
              </Button>
              <Button
                onClick={() => toggleElement("element3")}
                data-testid="toggle-button-3"
              >
                {visibleElements.includes("element3") ? "Hide" : "Show"} Element 3
              </Button>
              <Button
                onClick={() => toggleElement("element4")}
                data-testid="toggle-button-4"
              >
                {visibleElements.includes("element4") ? "Hide" : "Show"} Element 4
              </Button>
            </div>

            <div className="p-4 border rounded-md">
              <h3 className="text-sm font-medium mb-2">Visible Elements:</h3>
              <div className="space-y-2">
                {visibleElements.length === 0 ? (
                  <p className="text-sm text-zinc-500" data-testid="no-visible-elements">
                    No elements are currently visible. Click the buttons above to show elements.
                  </p>
                ) : (
                  visibleElements.map((id) => (
                    <div
                      key={id}
                      className="p-2 bg-zinc-100 rounded"
                      data-testid={`visible-${id}`}
                    >
                      This is dynamic element {id.replace("element", "")}
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading States Card */}
        <Card>
          <CardHeader>
            <CardTitle>Loading States</CardTitle>
            <CardDescription>
              Test handling loading indicators and state transitions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => toggleLoading("loader1")}
                disabled={loadingStates["loader1"]}
                data-testid="loading-button-1"
              >
                {loadingStates["loader1"] ? "Loading..." : "Load Content 1"}
              </Button>
              <Button
                onClick={() => toggleLoading("loader2")}
                disabled={loadingStates["loader2"]}
                data-testid="loading-button-2"
              >
                {loadingStates["loader2"] ? "Loading..." : "Load Content 2"}
              </Button>
            </div>

            <div className="p-4 border rounded-md">
              {loadingStates["loader1"] ? (
                <div className="py-6 flex items-center justify-center" data-testid="loading-indicator-1">
                  <div className="animate-spin h-6 w-6 border-2 border-zinc-600 border-t-transparent rounded-full"></div>
                  <span className="ml-2">Loading content 1...</span>
                </div>
              ) : (
                <div data-testid="content-1" className={loadingStates["loader1"] === undefined ? "hidden" : ""}>
                  {loadingStates["loader1"] === undefined ? null : (
                    <p>Content 1 loaded successfully!</p>
                  )}
                </div>
              )}

              {loadingStates["loader2"] ? (
                <div className="py-6 flex items-center justify-center" data-testid="loading-indicator-2">
                  <Progress value={progressValue} className="w-full" data-testid="progress-bar" />
                  <span className="ml-2 text-sm">{progressValue}%</span>
                </div>
              ) : (
                <div data-testid="content-2" className={loadingStates["loader2"] === undefined ? "hidden" : ""}>
                  {loadingStates["loader2"] === undefined ? null : (
                    <p>Content 2 loaded successfully!</p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Auto-Refreshing Content Card */}
        <Card>
          <CardHeader>
            <CardTitle>Auto-Refreshing Content</CardTitle>
            <CardDescription>
              Elements that automatically change or refresh over time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setAutoRefreshActive(!autoRefreshActive)}
                  variant={autoRefreshActive ? "destructive" : "default"}
                  data-testid="auto-refresh-toggle"
                >
                  {autoRefreshActive ? "Stop Auto Refresh" : "Start Auto Refresh"}
                </Button>
                <Button
                  onClick={addRandomElement}
                  variant="outline"
                  data-testid="add-element"
                >
                  Add Element
                </Button>
                <Button
                  onClick={removeRandomElement}
                  variant="outline"
                  data-testid="remove-element"
                >
                  Remove Element
                </Button>
              </div>

              <div className="p-3 border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Dynamic Elements:</h3>
                  <p className="text-xs text-zinc-500" data-testid="element-count">
                    {randomElements.length} element{randomElements.length !== 1 && "s"}
                  </p>
                </div>

                <div className="h-48 overflow-y-auto border rounded-md p-2">
                  {randomElements.length === 0 ? (
                    <p className="text-sm text-zinc-500 p-4 text-center" data-testid="no-random-elements">
                      No elements yet. Click "Add Element" or start auto-refresh.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {randomElements.map((num, index) => (
                        <div
                          key={`${num}-${index}`}
                          className="p-2 bg-zinc-100 rounded flex justify-between"
                          data-testid={`random-element-${index}`}
                        >
                          <span>Random element #{num}</span>
                          <span className="text-xs text-zinc-500">
                            {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Counter Card */}
        <Card>
          <CardHeader>
            <CardTitle>Stateful Counter</CardTitle>
            <CardDescription>
              Test interactions with stateful components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="counter">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="counter" data-testid="counter-tab">Counter</TabsTrigger>
                <TabsTrigger value="log" data-testid="log-tab">Event Log</TabsTrigger>
              </TabsList>

              <TabsContent value="counter" className="py-4">
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="text-4xl font-bold h-20 w-20 rounded-full bg-zinc-100 flex items-center justify-center"
                    data-testid="counter-value"
                  >
                    {count}
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={incrementCounter} data-testid="increment-button">
                      Increment
                    </Button>
                    <Button onClick={resetCounter} variant="outline" data-testid="reset-button">
                      Reset
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="log" className="py-4">
                <div className="border rounded-md p-3 space-y-2 h-40 overflow-y-auto">
                  <p data-testid="log-entry">Counter initialized to 0</p>
                  {Array.from({ length: count }).map((_, i) => (
                    <p key={i} data-testid={`log-entry-${i + 1}`}>
                      Counter incremented to {i + 1}
                    </p>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
