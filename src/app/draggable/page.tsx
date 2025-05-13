"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { saveToBackend } from "@/lib/saveToBackend";

interface DraggableItem {
  id: string;
  content: string;
  color: string;
}

interface DropZone {
  id: string;
  title: string;
  items: DraggableItem[];
}

export default function DraggablePage() {
  const [activeTab, setActiveTab] = useState("simple");
  const [draggingItem, setDraggingItem] = useState<string | null>(null);
  const [dragHistory, setDragHistory] = useState<string[]>([]);

  // Simple drag items
  const [simpleItems, setSimpleItems] = useState<DraggableItem[]>([
    { id: "item-1", content: "Item 1", color: "bg-blue-100" },
    { id: "item-2", content: "Item 2", color: "bg-green-100" },
    { id: "item-3", content: "Item 3", color: "bg-yellow-100" },
    { id: "item-4", content: "Item 4", color: "bg-purple-100" },
    { id: "item-5", content: "Item 5", color: "bg-red-100" },
  ]);

  // Sortable list
  const [sortableList, setSortableList] = useState<string[]>([
    "Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"
  ]);

  // Kanban board
  const [dropZones, setDropZones] = useState<DropZone[]>([
    {
      id: "todo",
      title: "To Do",
      items: [
        { id: "task-1", content: "Research project requirements", color: "bg-blue-100" },
        { id: "task-2", content: "Design database schema", color: "bg-yellow-100" },
        { id: "task-3", content: "Create wireframes", color: "bg-green-100" },
      ]
    },
    {
      id: "in-progress",
      title: "In Progress",
      items: [
        { id: "task-4", content: "Setup development environment", color: "bg-purple-100" },
        { id: "task-5", content: "Implement user authentication", color: "bg-red-100" },
      ]
    },
    {
      id: "done",
      title: "Done",
      items: [
        { id: "task-6", content: "Project kickoff meeting", color: "bg-indigo-100" },
        { id: "task-7", content: "Gather initial requirements", color: "bg-orange-100" },
      ]
    }
  ]);
  
  // Drag start handler
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
    e.dataTransfer.setData("text/plain", itemId);
    setDraggingItem(itemId);
    addToHistory(`Started dragging ${itemId}`);
  };

  // Drag end handler
  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  // Simple drop handler
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const itemId = e.dataTransfer.getData("text/plain");
    const newItems = [...simpleItems];

    // Find the item and move it to the end
    const itemIndex = newItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      const [movedItem] = newItems.splice(itemIndex, 1);
      newItems.push(movedItem);
      setSimpleItems(newItems);
      addToHistory(`Dropped ${itemId} to container`);
    }
  };

  // Allow drop handler
  const handleAllowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Sortable list handlers
  const handleSortableDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number) => {
    e.preventDefault();

    const itemId = e.dataTransfer.getData("text/plain");
    if (!itemId.startsWith("sort-")) return;

    const sourceIndex = parseInt(itemId.replace("sort-", ""));
    if (sourceIndex === targetIndex) return;

    const newList = [...sortableList];
    const [movedItem] = newList.splice(sourceIndex, 1);
    newList.splice(targetIndex, 0, movedItem);

    setSortableList(newList);
    addToHistory(`Moved ${movedItem} from position ${sourceIndex} to ${targetIndex}`);
  };

  // Kanban board handlers
  const handleKanbanDrop = (e: React.DragEvent<HTMLDivElement>, targetZoneId: string) => {
    e.preventDefault();

    const itemId = e.dataTransfer.getData("text/plain");
    if (!itemId.startsWith("task-")) return;

    const newZones = [...dropZones];

    // Find the source zone and item
    let sourceZone: DropZone | undefined;
    let sourceItem: DraggableItem | undefined;
    let sourceZoneIndex = -1;
    let sourceItemIndex = -1;

    newZones.forEach((zone, zoneIndex) => {
      const itemIndex = zone.items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        sourceZone = zone;
        sourceItem = zone.items[itemIndex];
        sourceZoneIndex = zoneIndex;
        sourceItemIndex = itemIndex;
      }
    });

    if (!sourceZone || !sourceItem) return;

    // Find the target zone
    const targetZoneIndex = newZones.findIndex(zone => zone.id === targetZoneId);
    if (targetZoneIndex === -1) return;

    // Remove from source zone
    newZones[sourceZoneIndex].items.splice(sourceItemIndex, 1);

    // Add to target zone
    newZones[targetZoneIndex].items.push(sourceItem);

    setDropZones(newZones);
    addToHistory(`Moved ${sourceItem.content} from ${sourceZone.title} to ${newZones[targetZoneIndex].title}`);
  };

  // Add to history
  const addToHistory = (message: string) => {
    setDragHistory(prev => {
      const newHistory = [...prev, `${new Date().toLocaleTimeString()}: ${message}`];
      // Keep only the last 5 events
      if (newHistory.length > 5) {
        return newHistory.slice(newHistory.length - 5);
      }
      return newHistory;
    });
  };

  // Clear history
  const clearHistory = () => {
    setDragHistory([]);
  };

  // save to backend
  const handleSave = async () => {
    try {
      await saveToBackend({ simpleItems, sortableList, dropZones });
      addToHistory("Saved state to backend");
    } catch (err) {
      console.error("Error saving data:", err);
      addToHistory("Failed to save state to backend");
    }
  };

  // Reset all drag & drop elements
  const resetAll = () => {
    setSimpleItems([
      { id: "item-1", content: "Item 1", color: "bg-blue-100" },
      { id: "item-2", content: "Item 2", color: "bg-green-100" },
      { id: "item-3", content: "Item 3", color: "bg-yellow-100" },
      { id: "item-4", content: "Item 4", color: "bg-purple-100" },
      { id: "item-5", content: "Item 5", color: "bg-red-100" },
    ]);

    setSortableList([
      "Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"
    ]);

    setDropZones([
      {
        id: "todo",
        title: "To Do",
        items: [
          { id: "task-1", content: "Research project requirements", color: "bg-blue-100" },
          { id: "task-2", content: "Design database schema", color: "bg-yellow-100" },
          { id: "task-3", content: "Create wireframes", color: "bg-green-100" },
        ]
      },
      {
        id: "in-progress",
        title: "In Progress",
        items: [
          { id: "task-4", content: "Setup development environment", color: "bg-purple-100" },
          { id: "task-5", content: "Implement user authentication", color: "bg-red-100" },
        ]
      },
      {
        id: "done",
        title: "Done",
        items: [
          { id: "task-6", content: "Project kickoff meeting", color: "bg-indigo-100" },
          { id: "task-7", content: "Gather initial requirements", color: "bg-orange-100" },
        ]
      }
    ]);

    setDragHistory([]);
  };

  const renderSimpleTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Simple Dragging</CardTitle>
        <CardDescription>
          Drag items from the source container to the drop zone
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div
          className="border rounded-md p-4 min-h-[100px] flex flex-wrap gap-2"
          data-testid="source-container"
        >
          {simpleItems.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragEnd={handleDragEnd}
              className={`p-3 rounded shadow cursor-move ${item.color} ${
                draggingItem === item.id ? "opacity-50" : ""
              }`}
              data-testid={`draggable-${item.id}`}
            >
              {item.content}
            </div>
          ))}
        </div>

        <div
          className="border-2 border-dashed border-zinc-300 rounded-md p-4 min-h-[200px] flex flex-wrap gap-2"
          onDragOver={handleAllowDrop}
          onDrop={handleDrop}
          data-testid="drop-zone"
        >
          <p className={`text-zinc-400 ${simpleItems.length === 0 ? "" : "hidden"}`}>
            No items here. Drag items into this drop zone.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderSortableTab = () => (
    <Card>
      <CardHeader>
        <CardTitle>Sortable List</CardTitle>
        <CardDescription>
          Drag items up and down to reorder the list
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {sortableList.map((item, index) => (
            <div
              key={`sort-${index}`}
              draggable
              onDragStart={(e) => handleDragStart(e, `sort-${index}`)}
              onDragEnd={handleDragEnd}
              onDragOver={handleAllowDrop}
              onDrop={(e) => handleSortableDrop(e, index)}
              className={`p-3 bg-zinc-100 rounded shadow cursor-move ${
                draggingItem === `sort-${index}` ? "opacity-50" : ""
              }`}
              data-testid={`sortable-${index}`}
            >
              {item}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderKanbanTab = () => (
    <div className="grid grid-cols-3 gap-4">
      {dropZones.map((zone) => (
        <div key={zone.id} className="flex flex-col h-full">
          <h3 className="font-medium mb-2">{zone.title}</h3>
          <div
            className="border rounded-md p-2 flex-1 min-h-[300px] bg-zinc-50"
            onDragOver={handleAllowDrop}
            onDrop={(e) => handleKanbanDrop(e, zone.id)}
            data-testid={`drop-zone-${zone.id}`}
          >
            {zone.items.length === 0 && (
              <p className="text-zinc-400 text-sm p-3 text-center">
                No items
              </p>
            )}

            {zone.items.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDragEnd={handleDragEnd}
                className={`p-3 rounded shadow mb-2 cursor-move ${item.color} ${
                  draggingItem === item.id ? "opacity-50" : ""
                }`}
                data-testid={`kanban-${item.id}`}
              >
                {item.content}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8" data-testid="draggable-page">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" data-testid="page-title">Drag & Drop</h1>
        <p className="text-sm text-zinc-500" data-testid="page-description">
          Practice with draggable elements and drop zones.
        </p>
      </div>

      <div className="flex justify-between items-start">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simple" data-testid="simple-tab">Simple Dragging</TabsTrigger>
            <TabsTrigger value="sortable" data-testid="sortable-tab">Sortable List</TabsTrigger>
            <TabsTrigger value="kanban" data-testid="kanban-tab">Kanban Board</TabsTrigger>
          </TabsList>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <TabsContent value="simple">
                {renderSimpleTab()}
              </TabsContent>
              <TabsContent value="sortable">
                {renderSortableTab()}
              </TabsContent>
              <TabsContent value="kanban">
                {renderKanbanTab()}
              </TabsContent>
            </div>

            {/* Event Log */}
            <div>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Drag Event Log</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearHistory}
                    data-testid="clear-log"
                  >
                    Clear
                  </Button>
                </CardHeader>
                <CardContent>
                  <div
                    className="h-[400px] overflow-y-auto border rounded-md p-3 space-y-1 text-sm"
                    data-testid="event-log"
                  >
                    {dragHistory.length === 0 ? (
                      <p className="text-zinc-400 text-center p-4">No events yet</p>
                    ) : (
                      dragHistory.map((event, index) => (
                        <div
                          key={index}
                          className="p-2 border-b last:border-b-0"
                          data-testid={`log-entry-${index}`}
                        >
                          {event}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>

        <Button variant="outline" onClick={resetAll} className="ml-4" data-testid="reset-button">
          Reset All
        </Button>
        <Button onClick={handleSave} className="ml-4" data-testid="save-button">
          Save All
        </Button>
      </div>
    </div>
  );
}
