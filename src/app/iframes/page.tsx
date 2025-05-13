"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function IframesPage() {
  const [selectedTab, setSelectedTab] = useState("simple");
  const [iframeUrl, setIframeUrl] = useState("https://example.com");
  const [iframeKey, setIframeKey] = useState(0); // Used to force iframe refresh

  // Handle URL change and iframe refresh
  const refreshIframe = () => {
    setIframeKey((prev) => prev + 1);
  };

  // Modernized CSS for the interactive iframe content
  const interactiveIframeSrcDoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Interactive Form</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <style>
        body {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          padding: 20px;
          background-color: #f8fafc; /* Slate 50 */
          color: #1e293b; /* Slate 800 */
        }
        form {
          max-width: 500px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .form-group {
          margin-bottom: 16px;
        }
        label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #334155; /* Slate 700 */
        }
        input, select, textarea {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #cbd5e1; /* Slate 300 */
          border-radius: 4px;
          box-sizing: border-box; /* Ensure padding doesn't affect width */
          font-size: 1rem;
          color: #334155; /* Slate 700 */
        }
        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: #3b82f6; /* Blue 500 */
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
        button {
          background-color: #0f172a; /* Slate 900 */
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.2s ease-in-out;
        }
        button:hover {
          background-color: #1e293b; /* Slate 800 */
        }
        .result {
          margin-top: 20px;
          padding: 16px;
          border: 1px solid #cbd5e1; /* Slate 300 */
          border-radius: 4px;
          background-color: #e2e8f0; /* Slate 200 */
          color: #1e293b; /* Slate 800 */
          display: none;
          word-break: break-all; /* Prevent overflow */
        }
        .result h3 {
            margin-top: 0;
            margin-bottom: 8px;
            color: #0f172a; /* Slate 900 */
        }
      </style>
      <script>
        function handleSubmit(event) {
          event.preventDefault();
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const age = document.getElementById('age').value;
          const country = document.getElementById('country').value;

          const resultDiv = document.getElementById('result');
          resultDiv.style.display = 'block';
          resultDiv.innerHTML = '<h3>Form Data:</h3>' +
            '<p><strong>Name:</strong> ' + name + '</p>' +
            '<p><strong>Email:</strong> ' + email + '</p>' +
            '<p><strong>Age:</strong> ' + age + '</p>' +
            '<p><strong>Country:</strong> ' + country + '</p>';
        }
      </script>
    </head>
    <body>
      <h2>User Registration Form</h2>
      <form id="registrationForm" onsubmit="handleSubmit(event)">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div class="form-group">
          <label for="age">Age</label>
          <input type="number" id="age" name="age" min="18" max="100" />
        </div>
        <div class="form-group">
          <label for="country">Country</label>
          <select id="country" name="country">
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="au">Australia</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <div id="result" class="result"></div>
    </body>
    </html>
  `;

  // Modernized CSS for the nested iframe content
  const nestedIframeSrcDoc = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Nested iFrames</title>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <style>
        body {
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          padding: 20px;
          background-color: #f1f5f9; /* Slate 100 */
          color: #1e293b; /* Slate 800 */
        }
        .container {
          border: 2px solid #0f172a; /* Slate 900 */
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 8px;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .container.level-2 {
            border-color: #3b82f6; /* Blue 500 */
            background-color: #eff6ff; /* Blue 50 */
        }
         .container.level-3 {
            border-color: #ec4899; /* Pink 500 */
            background-color: #fdf2f8; /* Pink 50 */
        }
        h2, h3, h4 {
            margin-top: 0;
            margin-bottom: 12px;
            color: #0f172a; /* Slate 900 */
        }
        .container.level-2 h3 {
             color: #2563eb; /* Blue 600 */
        }
        .container.level-3 h4 {
             color: #db2777; /* Pink 600 */
        }

        iframe {
          border: 1px solid #cbd5e1; /* Slate 300 */
          margin-top: 15px;
          width: 100%;
          border-radius: 4px;
        }
        .level {
          font-weight: 700;
          margin-right: 5px;
        }
        .container.level-1 .level { color: #0f172a; /* Slate 900 */ }
        .container.level-2 .level { color: #2563eb; /* Blue 600 */ }
        .container.level-3 .level { color: #db2777; /* Pink 600 */ }

        button {
          background-color: #0f172a; /* Slate 900 */
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 10px;
          margin-right: 8px;
          transition: background-color 0.2s ease-in-out;
        }
         .container.level-2 button {
            background-color: #2563eb; /* Blue 600 */
         }
         .container.level-3 button {
            background-color: #db2777; /* Pink 600 */
         }
        button:hover {
          background-color: #1e293b; /* Slate 800 */
        }
         .container.level-2 button:hover {
            background-color: #3b82f6; /* Blue 500 */
         }
         .container.level-3 button:hover {
            background-color: #ec4899; /* Pink 500 */
         }

        p {
            margin-bottom: 10px;
        }
        #messageDisplay {
            font-style: italic;
            color: #475569; /* Slate 600 */
        }
      </style>
      <script>
        function sendMessage() {
          // Get the frame
          const level2Frame = document.getElementById('level2Frame');
          // Post a message to it
          if (level2Frame && level2Frame.contentWindow) {
             level2Frame.contentWindow.postMessage('Hello from Level 1!', '*');
          } else {
             console.error('Level 2 iframe not found or not loaded');
          }
        }

        // Listen for messages
        window.addEventListener('message', function(event) {
          // Basic origin check (can be more specific)
          // if (event.origin !== 'YOUR_EXPECTED_ORIGIN') return;

          const messageDisplay = document.getElementById('messageDisplay');
          if (messageDisplay) {
             messageDisplay.textContent = event.data;
          }
        });
      </script>
    </head>
    <body>
      <div class="container level-1">
        <h2>iFrame Level 1</h2>
        <p><span class="level">Level 1</span> - This is the first level iframe</p>
        <button onclick="sendMessage()">Send Message to Level 2</button>
        <p>Received message: <span id="messageDisplay">None yet</span></p>

        <iframe id="level2Frame" srcdoc="${encodeURIComponent(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Nested iFrame Level 2</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <style>
              body {
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                padding: 20px;
                background-color: #eff6ff; /* Blue 50 */
                color: #1e293b; /* Slate 800 */
              }
              .container {
                border: 2px solid #2563eb; /* Blue 600 */
                padding: 20px;
                margin-bottom: 20px;
                border-radius: 8px;
                background-color: #ffffff;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
              }
              .container.level-3 {
                 border-color: #ec4899; /* Pink 500 */
                 background-color: #fdf2f8; /* Pink 50 */
              }
              h3, h4 {
                margin-top: 0;
                margin-bottom: 12px;
                 color: #2563eb; /* Blue 600 */
              }
              .container.level-3 h4 {
                 color: #db2777; /* Pink 600 */
              }
              iframe {
                border: 1px solid #cbd5e1; /* Slate 300 */
                margin-top: 15px;
                width: 100%;
                border-radius: 4px;
              }
              .level {
                font-weight: 700;
                margin-right: 5px;
                 color: #2563eb; /* Blue 600 */
              }
              .container.level-3 .level {
                 color: #db2777; /* Pink 600 */
              }
              button {
                background-color: #2563eb; /* Blue 600 */
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 10px;
                margin-right: 8px;
                transition: background-color 0.2s ease-in-out;
              }
              .container.level-3 button {
                background-color: #db2777; /* Pink 600 */
              }
              button:hover {
                background-color: #3b82f6; /* Blue 500 */
              }
              .container.level-3 button:hover {
                 background-color: #ec4899; /* Pink 500 */
              }
              p {
                margin-bottom: 10px;
              }
              #messageDisplay {
                font-style: italic;
                color: #475569; /* Slate 600 */
              }
            </style>
            <script>
              function sendToParent() {
                // Send message to Level 1 (parent of Level 2)
                window.parent.postMessage('Hello from Level 2!', '*');
              }

              function sendToLevel3() {
                const level3Frame = document.getElementById('level3Frame');
                 if (level3Frame && level3Frame.contentWindow) {
                   level3Frame.contentWindow.postMessage('Message from Level 2 to Level 3', '*');
                 } else {
                   console.error('Level 3 iframe not found or not loaded');
                 }
              }

              // Listen for messages
              window.addEventListener('message', function(event) {
                 // Basic origin check (can be more specific)
                 // if (event.origin !== 'YOUR_EXPECTED_ORIGIN') return;

                const messageDisplay = document.getElementById('messageDisplay');
                 if (messageDisplay) {
                   messageDisplay.textContent = event.data;
                 }

                // Also forward to level 3 if the message is from parent (Level 1)
                // This is a simple forwarding logic, you might need more complex logic
                // based on the message content or origin in a real app.
                 if (event.data.startsWith('Hello from Level 1!')) {
                    try {
                       const level3Frame = document.getElementById('level3Frame');
                       if (level3Frame && level3Frame.contentWindow) {
                          level3Frame.contentWindow.postMessage('Forwarded from Level 2: ' + event.data, '*');
                       }
                    } catch(e) {
                       console.error('Error forwarding message to Level 3', e);
                    }
                 }
              });
            </script>
          </head>
          <body>
            <div class='container level-2'>
              <h3>iFrame Level 2</h3>
              <p><span class='level'>Level 2</span> - This is the second level iframe</p>
              <button onclick='sendToParent()'>Send to Level 1</button>
              <button onclick='sendToLevel3()'>Send to Level 3</button>
              <p>Received message: <span id='messageDisplay'>None yet</span></p>

              <iframe id='level3Frame' srcdoc='${encodeURIComponent(`
                <!DOCTYPE html>
                <html>
                <head>
                  <title>Nested iFrame Level 3</title>
                   <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                  <style>
                    body {
                      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
                      padding: 20px;
                      background-color: #fdf2f8; /* Pink 50 */
                      color: #1e293b; /* Slate 800 */
                    }
                    .container {
                      border: 2px solid #db2777; /* Pink 600 */
                      padding: 20px;
                      border-radius: 8px;
                      background-color: #ffffff;
                       box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    }
                    h4 {
                        margin-top: 0;
                        margin-bottom: 12px;
                       color: #db2777; /* Pink 600 */
                    }
                    .level {
                      font-weight: 700;
                      margin-right: 5px;
                       color: #db2777; /* Pink 600 */
                    }
                    button {
                      background-color: #db2777; /* Pink 600 */
                      color: white;
                      border: none;
                      padding: 8px 16px;
                      border-radius: 4px;
                      cursor: pointer;
                      margin-top: 10px;
                      transition: background-color 0.2s ease-in-out;
                    }
                    button:hover {
                       background-color: #ec4899; /* Pink 500 */
                    }
                    p {
                       margin-bottom: 10px;
                    }
                    #messageDisplay {
                       font-style: italic;
                       color: #475569; /* Slate 600 */
                    }
                  </style>
                  <script>
                    function sendToLevel2() {
                      // Send message to Level 2 (parent of Level 3)
                      window.parent.postMessage("Hello from Level 3!", "*");
                    }

                    // Listen for messages
                    window.addEventListener("message", function(event) {
                       // Basic origin check (can be more specific)
                       // if (event.origin !== 'YOUR_EXPECTED_ORIGIN') return;

                       const messageDisplay = document.getElementById("messageDisplay");
                       if (messageDisplay) {
                         messageDisplay.textContent = event.data;
                       }
                    });
                  </script>
                </head>
                <body>
                  <div class="container level-3">
                    <h4>iFrame Level 3</h4>
                    <p><span class="level">Level 3</span> - This is the third level iframe</p>
                    <button onclick="sendToLevel2()">Send to Level 2</button>
                    <p>Received message: <span id="messageDisplay">None yet</span></p>
                  </div>
                </body>
                </html>
              `)}" height="200" title="Level 3 Frame"></iframe>
            </div>
          </body>
          </html>
        `)}" height="400" title="Level 2 Frame"></iframe>
      </div>
    </body>
    </html>
  `;


  return (
    <div className="container mx-auto py-8 px-4 space-y-8" data-testid="iframes-page">
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="page-title">iFrame Simulation</h1>
        <p className="text-base text-gray-600" data-testid="page-description">
          Explore different iframe use cases and cross-frame communication.
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-2">
          <TabsTrigger value="simple" data-testid="simple-iframe-tab">Simple iFrame</TabsTrigger>
          <TabsTrigger value="interactive" data-testid="interactive-iframe-tab">Interactive iFrame</TabsTrigger>
          <TabsTrigger value="nested" data-testid="nested-iframe-tab">Nested iFrames</TabsTrigger>
        </TabsList>

        {/* Simple iFrame */}
        <TabsContent value="simple" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Simple iFrame</CardTitle>
              <CardDescription>
                Embed an external website using its URL.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={iframeUrl}
                  onChange={(e) => setIframeUrl(e.target.value)}
                  placeholder="Enter a URL (e.g., https://www.example.com)"
                  data-testid="iframe-url-input"
                  className="flex-grow"
                />
                <Button onClick={refreshIframe} data-testid="refresh-iframe">
                  Load URL
                </Button>
              </div>
              <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <iframe
                  key={iframeKey}
                  src={iframeUrl}
                  className="w-full h-[400px] bg-white"
                  title="External Content"
                  data-testid="simple-iframe"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals" // Added sandbox for security
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interactive iFrame with form */}
        <TabsContent value="interactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive iFrame</CardTitle>
              <CardDescription>
                An iframe containing a styled form for interaction.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <iframe
                  srcDoc={interactiveIframeSrcDoc}
                  className="w-full h-[650px] bg-white" // Adjusted height slightly
                  title="Interactive Form"
                  data-testid="interactive-iframe"
                  sandbox="allow-same-origin allow-scripts allow-forms" // Sandbox for interactive form
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Nested iFrames */}
        <TabsContent value="nested" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nested iFrames</CardTitle>
              <CardDescription>
                Demonstration of multiple nested iframes and messaging.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border border-gray-300 rounded-lg overflow-hidden shadow-md">
                <iframe
                  srcDoc={nestedIframeSrcDoc}
                  className="w-full h-[700px] bg-white" // Adjusted height
                  title="Nested iFrames"
                  data-testid="nested-iframe"
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals" // Sandbox for nested iframes
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
