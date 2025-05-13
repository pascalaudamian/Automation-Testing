"use client"; // Mark this component as a client component

import { useEffect, useRef } from "react";
// Make sure to import Button if it's used inside this component
import { Button } from "@/components/ui/button";

function ShadowDOMContent() {
  const shadowHostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shadowHostRef.current && !shadowHostRef.current.shadowRoot) {
      // Attach a shadow root to the host element
      const shadowRoot = shadowHostRef.current.attachShadow({ mode: 'open' });

      // Create and append content to the shadow DOM
      const shadowContent = document.createElement('div');
      shadowContent.innerHTML = `
        <style>
          /* Styles inside shadow DOM are scoped */
          .shadow-element {
            padding: 1rem;
            margin-top: 0.5rem;
            border: 1px solid #a78bfa; /* purple-300 */
            border-radius: 0.375rem; /* rounded-md */
            background-color: #ede9fe; /* purple-100 */
            color: #5b21b6; /* violet-700 */
          }
          .shadow-button {
            margin-top: 0.5rem;
            padding: 0.25rem 0.75rem;
            background-color: #6d28d9; /* violet-600 */
            color: white;
            border: none;
            border-radius: 0.375rem; /* rounded-md */
            cursor: pointer;
          }
           .shadow-button:hover {
            background-color: #7c3aed; /* violet-500 */
           }
          .shadow-text {
            font-weight: bold;
          }
        </style>
        <div class="shadow-element">
          <p class="shadow-text">Content inside the Shadow DOM</p>
          <button class="shadow-button" id="shadow-button-id">Click me (Shadow DOM)</button>
        </div>
      `;
      shadowRoot.appendChild(shadowContent);

      // Add an event listener to the button inside the shadow DOM
      const shadowButton = shadowRoot.getElementById('shadow-button-id');
      if (shadowButton) {
        shadowButton.addEventListener('click', () => {
          alert('Button inside Shadow DOM clicked!');
        });
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const tryAccessShadowDOM = () => {
    // This will likely fail because the element is in the shadow DOM
    const shadowButton = document.getElementById('shadow-button-id');
    if (shadowButton) {
      alert('Successfully accessed element by ID from Light DOM! (This should not happen in a real shadow DOM)');
    } else {
      alert('Could NOT access element by ID from Light DOM (as expected in Shadow DOM)');
    }
  };

  return (
    <div className="space-y-4">
      <div className="alert p-4 bg-green-50 border border-green-100 rounded-md mb-4">
        <p>
          This section demonstrates the concept of Shadow DOM. The content within the purple border is rendered inside a Shadow Root attached to the host element.
          Elements inside the Shadow DOM are encapsulated and not directly accessible from the main (Light) DOM using standard selectors like `document.getElementById`.
        </p>
      </div>

      <div className="border p-4 rounded-md bg-zinc-50">
        <h3 className="text-md font-medium mb-2">Shadow Host Element</h3>
        {/* This is the element that will host the shadow DOM */}
        <div ref={shadowHostRef} className="border p-4 rounded-md bg-white">
          {/* Initial content in the Light DOM of the host (will be hidden when shadow DOM is attached) */}
          <p>This content is in the Light DOM of the host before shadow DOM is attached.</p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-md font-medium mb-2">Accessing Shadow DOM from Light DOM</h3>
        <p className="text-sm text-zinc-600">
          Try to access the button inside the Shadow DOM from the Light DOM using standard JavaScript:
        </p>
        <Button onClick={tryAccessShadowDOM} data-testid="try-access-shadow-button">
          Try Accessing Shadow Button (Light DOM)
        </Button>
        <div className="mt-2 p-3 bg-yellow-50 rounded-md text-sm">
            <strong>Expected Outcome:</strong> The "Try Accessing" button in the Light DOM should NOT be able to find the "Shadow Button" using standard `getElementById` because it resides in a different DOM tree.
        </div>
      </div>

       <div className="space-y-2">
        <h3 className="text-md font-medium mb-2">Interaction within Shadow DOM</h3>
         <p className="text-sm text-zinc-600">
          Click the "Click me (Shadow DOM)" button inside the purple box. Its event listener works because it's attached within the Shadow DOM context.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-md font-medium mb-2">Selecting Shadow DOM Elements with Automation Tools</h3>
        <p className="text-sm text-zinc-600">
          Automation tools often require special syntax to pierce the Shadow DOM boundary.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-zinc-600">
          <li><strong>Playwright:</strong> Use the `locator()` method on the Shadow Host and then standard selectors or the `pierce/` prefix: e.g., `page.locator('#shadow-host').locator('#shadow-button-id')` or `page.locator('pierce/#shadow-button-id')`.</li>
          <li><strong>Cypress:</strong> Use the `.shadow()` command to enter the shadow DOM: e.g., `cy.get('#shadow-host').shadow().find('#shadow-button-id')`.</li>
          <li><strong>Selenium 4+:</strong> Use `findElement(By.css("#shadow-host")).getShadowRoot().findElement(By.css("#shadow-button-id"))`.</li>
        </ul>
      </div>

    </div>
  );
}

export default ShadowDOMContent;