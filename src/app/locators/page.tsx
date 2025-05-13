"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

// Import the helper components from their new files
import ShadowDOMContent from "./ShadowDOMContent"; // Adjust path if using a subdirectory
import DynamicList from "./DynamicList"; // Adjust path
import TextChanger from "./TextChanger"; // Adjust path
import AttributeChanger from "./AttributeChanger"; // Adjust path
import ClassChanger from "./ClassChanger"; // Adjust path


export default function LocatorsPage() {
  const [activeTab, setActiveTab] = useState("basic");
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  return (
    <div className="space-y-8" data-testid="locators-page">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" data-testid="page-title">Locator Practice</h1>
        <p className="text-sm text-zinc-500" data-testid="page-description">
          Practice with various element selection strategies and attributes.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic" data-testid="basic-tab">Basic</TabsTrigger>
          <TabsTrigger value="attributes" data-testid="attributes-tab">Attributes</TabsTrigger>
          <TabsTrigger value="relative" data-testid="relative-tab">Relative</TabsTrigger>
          <TabsTrigger value="dynamic" data-testid="dynamic-tab">Dynamic</TabsTrigger>
          <TabsTrigger value="shadow" data-testid="shadow-tab">Shadow DOM</TabsTrigger>
        </TabsList>

        {/* Basic Locators */}
        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Locators</CardTitle>
              <CardDescription>
                Practice with basic element selection by ID, class, tag name, and name
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">ID Selectors</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    id="button-1"
                    className="px-3 py-2 rounded bg-blue-100"
                    onClick={() => setClickedItem("button-1")}
                  >
                    Button with ID
                  </button>
                  <div
                    id="div-1"
                    className="px-3 py-2 rounded bg-green-100"
                    onClick={() => setClickedItem("div-1")}
                  >
                    Div with ID
                  </div>
                  <span
                    id="span-1"
                    className="px-3 py-2 rounded bg-yellow-100 inline-block"
                    onClick={() => setClickedItem("span-1")}
                  >
                    Span with ID
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Class Selectors</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    className="custom-button px-3 py-2 rounded bg-blue-100"
                    onClick={() => setClickedItem("custom-button")}
                  >
                    Button with Class
                  </button>
                  <button
                    className="primary-button px-3 py-2 rounded bg-purple-100"
                    onClick={() => setClickedItem("primary-button")}
                  >
                    Primary Button
                  </button>
                  <button
                    className="secondary-button px-3 py-2 rounded bg-zinc-100"
                    onClick={() => setClickedItem("secondary-button")}
                  >
                    Secondary Button
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Tag Name Selectors</h3>
                <div className="space-y-2">
                  <p
                    className="paragraph-1 bg-zinc-50 p-2 rounded"
                    onClick={() => setClickedItem("paragraph-1")}
                  >
                    This is a paragraph element
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <img
                      src="https://placeholder.pics/svg/200x40/FF6456-E8FF5B"
                      alt="Placeholder image 1"
                      className="image-1 rounded"
                      onClick={() => setClickedItem("image-1")}
                    />
                    <img
                      src="https://placeholder.pics/svg/200x40/FF6456-E8FF5B"
                      alt="Placeholder image 2"
                      className="image-2 rounded"
                      onClick={() => setClickedItem("image-2")}
                    />
                    <img
                      src="https://placeholder.pics/svg/200x40/FF6456-E8FF5B"
                      alt="Placeholder image 3"
                      className="image-3 rounded"
                      onClick={() => setClickedItem("image-3")}
                    />
                  </div>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li onClick={() => setClickedItem("list-item-1")}>List item 1</li>
                    <li onClick={() => setClickedItem("list-item-2")}>List item 2</li>
                    <li onClick={() => setClickedItem("list-item-3")}>List item 3</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Name Attribute Selectors</h3>
                <div className="grid gap-4">
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      name="username"
                      placeholder="Username"
                      onClick={() => setClickedItem("input-username")}
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onClick={() => setClickedItem("input-password")}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      id="male"
                      onClick={() => setClickedItem("radio-male")}
                    />
                    <label htmlFor="male">Male</label>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      id="female"
                      onClick={() => setClickedItem("radio-female")}
                    />
                    <label htmlFor="female">Female</label>
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      id="other"
                      onClick={() => setClickedItem("radio-other")}
                    />
                    <label htmlFor="other">Other</label>
                  </div>
                </div>
              </div>

              {clickedItem && (
                <div className="mt-6 p-3 bg-blue-50 rounded-md">
                  <p>You clicked: <strong>{clickedItem}</strong></p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attribute Locators */}
        <TabsContent value="attributes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attribute Locators</CardTitle>
              <CardDescription>
                Practice with element selection by different attributes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Data Attributes</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    data-testid="test-button-1"
                    className="px-3 py-2 rounded bg-blue-100"
                    onClick={() => setClickedItem("test-button-1")}
                  >
                    Button with data-testid
                  </button>
                  <div
                    data-test="test-div"
                    className="px-3 py-2 rounded bg-green-100"
                    onClick={() => setClickedItem("test-div")}
                  >
                    Div with data-test
                  </div>
                  <span
                    data-cy="cypress-element"
                    className="px-3 py-2 rounded bg-yellow-100 inline-block"
                    onClick={() => setClickedItem("cypress-element")}
                  >
                    Span with data-cy
                  </span>
                  <button
                    data-automation="auto-button"
                    className="px-3 py-2 rounded bg-purple-100"
                    onClick={() => setClickedItem("auto-button")}
                  >
                    Button with data-automation
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Aria Attributes</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    aria-label="Close dialog"
                    className="px-3 py-2 rounded bg-blue-100"
                    onClick={() => setClickedItem("close-dialog")}
                  >
                    ✕
                  </button>
                  <div
                    aria-hidden="true"
                    className="px-3 py-2 rounded bg-green-100"
                    onClick={() => setClickedItem("hidden-element")}
                  >
                    Hidden from screen readers
                  </div>
                  <div
                    role="alert"
                    className="px-3 py-2 rounded bg-red-100"
                    onClick={() => setClickedItem("alert-element")}
                  >
                    Alert element
                  </div>
                  <button
                    role="button"
                    aria-pressed="false"
                    className="px-3 py-2 rounded bg-zinc-100"
                    onClick={() => setClickedItem("toggle-button")}
                  >
                    Toggle Button
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Custom Attributes</h3>
                <div className="flex flex-wrap gap-3">
                  <button
                    custom-attr="button-1"
                    className="px-3 py-2 rounded bg-blue-100"
                    onClick={() => setClickedItem("custom-attr-button")}
                  >
                    Button with custom attribute
                  </button>
                  <div
                    data-status="active"
                    className="px-3 py-2 rounded bg-green-100"
                    onClick={() => setClickedItem("status-active")}
                  >
                    Active status
                  </div>
                  <span
                    data-type="warning"
                    className="px-3 py-2 rounded bg-yellow-100 inline-block"
                    onClick={() => setClickedItem("warning-type")}
                  >
                    Warning message
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Partial Attribute Matches</h3>
                <div className="grid gap-2">
                  <div
                    title="This is a tooltip text"
                    className="p-2 bg-zinc-50 rounded"
                    onClick={() => setClickedItem("tooltip-element")}
                  >
                    Element with tooltip
                  </div>
                  <div
                    data-user-id="user-12345"
                    className="p-2 bg-zinc-50 rounded"
                    onClick={() => setClickedItem("user-element")}
                  >
                    User related element
                  </div>
                  <div
                    data-target="modal-settings"
                    className="p-2 bg-zinc-50 rounded"
                    onClick={() => setClickedItem("modal-trigger")}
                  >
                    Modal trigger
                  </div>
                </div>
              </div>

              {clickedItem && (
                <div className="mt-6 p-3 bg-blue-50 rounded-md">
                  <p>You clicked: <strong>{clickedItem}</strong></p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relative Locators */}
        <TabsContent value="relative" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relative Locators</CardTitle>
              <CardDescription>
                Practice with element selection by their relative position
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Parent-Child Relationships</h3>
                <div className="border p-4 rounded-md bg-zinc-50">
                  <div
                    id="parent-1"
                    className="border p-3 rounded-md bg-white"
                    onClick={() => setClickedItem("parent-1")}
                  >
                    <p>Parent element</p>
                    <div
                      className="mt-2 border p-2 rounded-md bg-blue-50"
                      onClick={() => setClickedItem("child-1")}
                    >
                      Child element 1
                    </div>
                    <div
                      className="mt-2 border p-2 rounded-md bg-green-50"
                      onClick={() => setClickedItem("child-2")}
                    >
                      Child element 2
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Sibling Relationships</h3>
                <div className="border p-4 rounded-md bg-zinc-50">
                  <div className="mt-2 border p-2 rounded-md bg-blue-50" onClick={() => setClickedItem("sibling-1")}>
                    First sibling
                  </div>
                  <div className="mt-2 border p-2 rounded-md bg-green-50" onClick={() => setClickedItem("sibling-2")}>
                    Second sibling
                  </div>
                  <div className="mt-2 border p-2 rounded-md bg-yellow-50" onClick={() => setClickedItem("sibling-3")}>
                    Third sibling
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Adjacent Elements</h3>
                <div className="border p-4 rounded-md bg-zinc-50 grid grid-cols-3 gap-2">
                  <div className="border p-2 rounded-md bg-zinc-100 text-center" onClick={() => setClickedItem("cell-1-1")}>
                    Row 1, Col 1
                  </div>
                  <div className="border p-2 rounded-md bg-zinc-100 text-center" onClick={() => setClickedItem("cell-1-2")}>
                    Row 1, Col 2
                  </div>
                  <div className="border p-2 rounded-md bg-zinc-100 text-center" onClick={() => setClickedItem("cell-1-3")}>
                    Row 1, Col 3
                  </div>
                  <div className="border p-2 rounded-md bg-zinc-200 text-center" onClick={() => setClickedItem("cell-2-1")}>
                    Row 2, Col 1
                  </div>
                  <div className="border p-2 rounded-md bg-zinc-200 text-center" onClick={() => setClickedItem("cell-2-2")}>
                    Row 2, Col 2
                  </div>
                  <div className="border p-2 rounded-md bg-zinc-200 text-center" onClick={() => setClickedItem("cell-2-3")}>
                    Row 2, Col 3
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Nested Structures</h3>
                <div className="border p-4 rounded-md bg-zinc-50">
                  <div className="border p-3 rounded-md bg-white" onClick={() => setClickedItem("level-1")}>
                    Level 1
                    <div className="mt-2 border p-3 rounded-md bg-blue-50" onClick={() => setClickedItem("level-2")}>
                      Level 2
                      <div className="mt-2 border p-3 rounded-md bg-green-50" onClick={() => setClickedItem("level-3")}>
                        Level 3
                        <div className="mt-2 border p-3 rounded-md bg-yellow-50" onClick={() => setClickedItem("level-4")}>
                          Level 4
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {clickedItem && (
                <div className="mt-6 p-3 bg-blue-50 rounded-md">
                  <p>You clicked: <strong>{clickedItem}</strong></p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dynamic Content */}
        <TabsContent value="dynamic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dynamic Content Locators</CardTitle>
              <CardDescription>
                Practice with dynamically loaded content and changing elements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Dynamic Lists</h3>
                <DynamicList />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Text Content Change</h3>
                <TextChanger />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Attribute Changes</h3>
                <AttributeChanger />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Class Changes</h3>
                <ClassChanger />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shadow DOM */}
        <TabsContent value="shadow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shadow DOM Locators</CardTitle>
              <CardDescription>
                Practice with Shadow DOM elements for advanced selection challenges
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Render the ShadowDOMContent component here */}
              <ShadowDOMContent />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
       {/* The clicked item display can be outside the tabs if you want it persistent */}
       {/* {clickedItem && (
        <div className="mt-6 p-3 bg-blue-50 rounded-md">
          <p>You clicked: <strong>{clickedItem}</strong></p>
        </div>
      )} */}
    </div>
  );
}

// REMOVE the helper component definitions from here
// They should now be in their own files with "use client" at the top
/*
function DynamicList() { ... }
function TextChanger() { ... }
function AttributeChanger() { ... }
function ClassChanger() { ... }
function ShadowDOMContent() { ... } // REMOVE this one too
*/