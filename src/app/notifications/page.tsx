'use client';

import React, { useState } from "react";
// Assuming App.css provides styling for .App, .button-group, .btn, .notification-container, .notification, .success, .error, .info
import "./App.css";

// Define the type for a notification object
interface Notification {
  id: number;
  msg: string;
  type: 'success' | 'error' | 'info'; // Define possible types
}

export default function NotificationsPage() {
  // Initialize notifications state with the defined Notification type
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // In-app Notification
  // Added type annotations for msg and type parameters
  const addInAppNotification = (msg: string, type: Notification['type']) => {
    const id = Date.now();
    const newNotification: Notification = { id, msg, type };
    setNotifications((prev) => [...prev, newNotification]);

    // Automatically remove the notification after 3 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  // Request browser permission
  const requestPermission = () => {
    if (!("Notification" in window)) {
      // Replaced alert with in-app notification
      addInAppNotification("This browser does not support desktop notification", "error");
    } else {
      Notification.requestPermission().then((permission) => {
        // Replaced alert with in-app notification showing permission status
        addInAppNotification(`Browser notification permission status: ${permission}`, "info");
      });
    }
  };

  // Show native browser notification
  const showBrowserNotification = () => {
    if (Notification.permission === "granted") {
      // Note: External image URLs for icons might have issues or require specific configurations.
      // Consider using local assets, data URLs, or emojis if possible.
      new Notification("🔔 Native Notification", {
        body: "This is a browser-level notification",
        icon: "https://cdn-icons-png.flaticon.com/512/1827/1827392.png",
      });
    } else {
      // Replaced alert with in-app notification
      addInAppNotification("Please allow browser notifications first.", "info");
    }
  };

  return (
    <div className="App">
      <h1>React Notification Test</h1>

      <div className="button-group">
        <button className="btn success" onClick={() => addInAppNotification("Success message!", "success")}>
          In-App Success
        </button>
        <button className="btn error" onClick={() => addInAppNotification("Error message!", "error")}>
          In-App Error
        </button>
        <button className="btn info" onClick={() => addInAppNotification("Info message!", "info")}>
          In-App Info
        </button>
      </div>

      <div className="button-group">
        <button className="btn info" onClick={requestPermission}>
          Request Browser Permission
        </button>
        <button className="btn success" onClick={showBrowserNotification}>
          Show Browser Notification
        </button>
      </div>

      {/* Basic styling for notification container for visibility in preview.
          You should rely on your App.css for full styling. */}
      <div className="notification-container" style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {notifications.map((note) => (
          // Basic inline styles for notifications for visibility in preview.
          // You should rely on your App.css for full styling.
          <div
            key={note.id}
            className={`notification ${note.type}`}
            style={{
              padding: '10px',
              borderRadius: '5px',
              color: 'white',
              backgroundColor: note.type === 'success' ? 'green' : note.type === 'error' ? 'red' : 'blue',
              minWidth: '200px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}
          >
            {note.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
