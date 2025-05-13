"use client";
// App.jsx - Updated for modern look and new features
import React, { useState, useEffect, createContext, useContext, KeyboardEvent, ChangeEvent } from "react"; // Import KeyboardEvent and ChangeEvent
import Cookies from "js-cookie";
// Import openDB and IDBPDatabase type from idb
// We will use IDBPDatabase directly with a generic type
import { openDB, IDBPDatabase } from "idb";

// Define the type for the note objects stored in IndexedDB
interface Note {
  id?: number; // id is auto-incremented, so it might be undefined when adding
  content: string;
  date: string; // ISO string format
}

// Removed the custom MyDB interface as it was causing conflicts.
// We will rely on idb's IDBPDatabase type with generics.


// Context for user preferences (Optional - kept from original, uncomment if needed)
// const PreferencesContext = createContext();

const App = () => {
  // State for theme (Local Storage)
  const [theme, setTheme] = useState("light");

  // Load theme from Local Storage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // Optional: Set default theme in local storage if not found
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // Apply theme class to html element for better styling control (Tailwind dark mode)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Remove existing theme classes
      document.documentElement.classList.remove("light", "dark");
      // Add the current theme class
      document.documentElement.classList.add(theme);
      // Apply general background/text for the body based on theme
      document.body.classList.remove("bg-white", "bg-gray-900", "text-black", "text-white", "bg-gray-800", "text-gray-200", "bg-gray-100", "text-gray-900");
       if (theme === 'dark') {
         document.body.classList.add("bg-gray-800", "text-gray-200");
      } else {
         document.body.classList.add("bg-gray-100", "text-gray-900");
      }
    }
  }, [theme]);


  // State for login status (Cookies)
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!Cookies.get("token"));

  // State for session storage note
  // Initialize with empty string, then load from sessionStorage in useEffect
  const [sessionData, setSessionData] = useState("");

  // Load session data from sessionStorage on mount
  useEffect(() => {
      if (typeof window !== 'undefined') {
          const storedSessionData = sessionStorage.getItem("sessionNote") || "";
          setSessionData(storedSessionData);
      }
  }, []);


  // State for IndexedDB notes - Explicitly type as an array of Note objects
  const [indexedData, setIndexedData] = useState<Note[]>([]);
  // Explicitly define the type for the 'db' state using IDBPDatabase with the Note type
  const [db, setDb] = useState<IDBPDatabase<Note> | null>(null);
  const [indexedDBLoading, setIndexedDBLoading] = useState(true); // Loading state for IndexedDB

  // IndexedDB setup and initial data load
  useEffect(() => {
    const initDB = async () => {
      try {
        // Open or create the database, specifying the type of data it will store (<Note>)
        const db = await openDB<Note>("AppDB", 1, {
          upgrade(db) {
            // Create object store if it doesn't exist
            if (!db.objectStoreNames.contains("notes")) {
              db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
            }
          },
        });
        setDb(db);
        // Load initial data from the object store
        // idb's getAll method on a typed database returns the correct array type
        const allNotes = await db.getAll("notes");
        setIndexedData(allNotes); // This now expects Note[]
      } catch (error) {
        console.error("Failed to open IndexedDB:", error);
        // Handle error - perhaps display a message to the user
      } finally {
        setIndexedDBLoading(false); // Set loading to false after attempt
      }
    };
    initDB();
  }, []); // Empty dependency array means this runs once on mount

  // --- Handlers for State Persistence Methods ---

  // Toggle Theme (Local Storage)
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
    setTheme(newTheme);
  };

  // Login (Cookies)
  const login = () => {
    // Set a cookie with a token, expires in 1 day. Added secure and sameSite for better practice.
    // 'secure' requires HTTPS. 'sameSite' helps mitigate CSRF attacks.
    Cookies.set("token", "demo123", { expires: 1, secure: true, sameSite: 'Strict' });
    setIsLoggedIn(true);
  };

  // Logout (Cookies)
  const logout = () => {
    // Remove the authentication cookie
    Cookies.remove("token");
    setIsLoggedIn(false);
  };

  // Save to Session Storage
  const saveToSession = () => {
    // Save the current textarea content to session storage
    if (sessionData.trim() !== "") { // Prevent saving empty notes
        sessionStorage.setItem("sessionNote", sessionData);
        console.log("Saved to Session Storage:", sessionData);
    } else {
        // If the textarea is empty, remove the item from session storage
        sessionStorage.removeItem("sessionNote");
        console.log("Session Storage note cleared.");
    }
  };

  // Clear Session Storage Note - NEW FUNCTION
  const clearSessionNote = () => {
      // Remove the session note from session storage
      sessionStorage.removeItem("sessionNote");
      // Clear the component's state as well to update the UI
      setSessionData("");
      console.log("Session Storage note cleared via button.");
  };

  // Add to IndexedDB
  const addToIndexedDB = async (text: string) => { // Explicitly type text parameter
    if (!db) {
      console.error("IndexedDB not initialized.");
      return;
    }
    if (text.trim() === "") { // Prevent adding empty notes
        console.warn("Cannot add empty note to IndexedDB.");
        return;
    }
    try {
      // Add a new note object to the 'notes' object store
      // idb handles the typing correctly when adding to a typed database
      await db.add("notes", { content: text.trim(), date: new Date().toISOString() });
      // Re-fetch all notes to update state and trigger re-render
      const updatedNotes = await db.getAll("notes");
      setIndexedData(updatedNotes); // This now expects Note[]
    } catch (error) {
      console.error("Failed to add note to IndexedDB:", error);
    }
  };

  // Delete from IndexedDB - NEW FUNCTION
  const deleteIndexedDBNote = async (id: number) => { // Explicitly type id parameter
      if (!db) {
          console.error("IndexedDB not initialized.");
          return;
      }
      try {
          // Delete the note with the specified ID from the 'notes' object store
          await db.delete("notes", id);
          // Re-fetch all notes to update state and trigger re-render
          const updatedNotes = await db.getAll("notes");
          setIndexedData(updatedNotes); // This now expects Note[]
          console.log(`Deleted note with id: ${id}`);
      } catch (error) {
          console.error(`Failed to delete note with id ${id} from IndexedDB:`, error);
      }
  };


  // --- Render UI ---
  return (
    // <PreferencesContext.Provider value={{ theme, toggleTheme }}> {/* Use Provider if context is needed elsewhere */}
      // Main container with padding, auto margins for centering, and theme transition
      <div className={`container mx-auto p-6 min-h-screen transition-colors duration-300`}>
        {/* Page Title */}
        <h1 className="text-3xl font-extrabold mb-8 text-center">
          🧪 State Persistence Demo
        </h1>

        {/* Theme Toggle Section (Local Storage) */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-gray-600">
            ✨ Theme (Local Storage)
          </h2>
          <button
            onClick={toggleTheme}
            className="px-6 py-2 rounded-md text-white transition-colors duration-300
                       bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                       dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600"
          >
            Toggle Theme ({theme.charAt(0).toUpperCase() + theme.slice(1)}) {/* Display current theme */}
          </button>
        </section>

        {/* Authentication Section (Cookies) */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-gray-600">
            🔑 Authentication (Cookies)
          </h2>
          <div>
            {isLoggedIn ? (
              // Display when logged in
              <div className="flex items-center space-x-4">
                <p className="text-green-600 dark:text-green-400 font-medium">✅ Logged In (via Cookie)</p>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md text-white transition-colors duration-300
                             bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                             dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              // Display when logged out
              <button
                onClick={login}
                className="px-4 py-2 rounded-md text-white transition-colors duration-300
                           bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50
                           dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-600"
              >
                Login
              </button>
            )}
          </div>
        </section>

        {/* Session Storage Section */}
        <section className="mb-8 p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-gray-600">
            📝 Session Note (Session Storage)
          </h2>
          <textarea
            value={sessionData}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setSessionData(e.target.value)} // Explicitly type event
            placeholder="Enter a note that lasts for the current session..."
            rows={4} // Changed to number literal
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md my-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 resize-y"
          />
          <div className="flex space-x-4"> {/* Flex container for buttons */}
            <button
              onClick={saveToSession}
              className="px-4 py-2 rounded-md text-white transition-colors duration-300 flex-grow {/* Allows button to take available space */}
                         bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
                         dark:bg-purple-700 dark:hover:bg-purple-800 dark:focus:ring-purple-600"
            >
              Save to Session
            </button>
             {/* Clear Session Note Button - NEW */}
             <button
              onClick={clearSessionNote}
              className="px-4 py-2 rounded-md text-white transition-colors duration-300
                         bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
                         dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-red-600"
             >
              Clear Note
             </button>
          </div>
        </section>

        {/* IndexedDB Section */}
        <section className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-gray-200 dark:border-gray-600">
            📦 Notes (IndexedDB)
          </h2>

          {/* Add Note Form component */}
          <AddNoteForm onSave={addToIndexedDB} dbInitialized={!indexedDBLoading && !!db} /> {/* Pass dbInitialized status */}

          {/* Display notes or loading/empty state */}
          {indexedDBLoading ? (
              <p className="text-center text-gray-500 dark:text-gray-400">Loading notes...</p>
          ) : indexedData.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">No notes saved yet.</p>
          ) : (
            <ul className="mt-4 space-y-3"> {/* Added spacing between list items */}
              {indexedData.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-md shadow-sm"
                >
                  <div className="flex-grow mr-4"> {/* Allows note content to take space */}
                     <p className="text-gray-800 dark:text-gray-200">{item.content}</p>
                     <small className="text-gray-500 dark:text-gray-400 text-xs">
                         Saved: {new Date(item.date).toLocaleString()} {/* Nicer date format */}
                     </small>
                  </div>
                  {/* Delete Button for IndexedDB Notes - NEW */}
                  <button
                    onClick={() => deleteIndexedDBNote(item.id!)} // Use non-null assertion as id is guaranteed after retrieval
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 transition-colors duration-200"
                    aria-label={`Delete note: "${item.content}"`} // Accessibility label
                  >
                     {/* Simple SVG for trash icon */}
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                     </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    // </PreferencesContext.Provider>
  );
};

// Define the props interface for AddNoteForm
interface AddNoteFormProps {
    onSave: (text: string) => void; // onSave is a function that takes a string and returns void
    dbInitialized: boolean; // dbInitialized is a boolean
}

// Add Note Form component (updated)
const AddNoteForm: React.FC<AddNoteFormProps> = ({ onSave, dbInitialized }) => { // Use React.FC and the props interface
  const [note, setNote] = useState("");
  // Disable button if DB is not initialized or input is empty
  const isButtonDisabled = !dbInitialized || note.trim() === "";

  // Handler for saving the note
  const handleSave = () => {
    if (note.trim() !== "") {
      onSave(note);
      setNote(""); // Clear input after saving
    }
  };

  // Allows adding with Enter key press
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => { // Explicitly type event
    if (event.key === 'Enter' && !isButtonDisabled) {
      handleSave();
      event.preventDefault(); // Prevent default form submission behavior
    }
  };

  return (
    <div className="flex space-x-3 mb-4"> {/* Use flexbox for layout */}
      <input
        type="text" // Specify type for better semantics
        value={note}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNote(e.target.value)} // Explicitly type event
        onKeyPress={handleKeyPress} // Add keypress listener
        className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400"
        placeholder={dbInitialized ? "Enter a new note for IndexedDB" : "Initializing database..."}
        disabled={!dbInitialized} // Disable input while DB is initializing
      />
      <button
        onClick={handleSave}
        className={`px-6 py-3 rounded-md text-white transition-colors duration-300 ${
            isButtonDisabled
                ? "bg-gray-400 dark:bg-gray-500 cursor-not-allowed" // Disabled state styles
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:focus:ring-indigo-600" // Enabled state styles
        }`}
        disabled={isButtonDisabled}
      >
        Add
      </button>
    </div>
  );
};


export default App;
