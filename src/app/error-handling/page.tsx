"use client";

import React, { useState, useEffect, ErrorInfo, ReactNode } from "react"; // Import necessary types and hooks

// Define types for ErrorBoundary props and state
interface ErrorBoundaryProps {
  children: ReactNode; // The children components the boundary wraps
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null; // Use React's ErrorInfo type
}

// Class component implementing the Error Boundary pattern
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> { // Apply types here
  constructor(props: ErrorBoundaryProps) { // Type the constructor props
    super(props);
    // Initialize state
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // Static method to update state when an error is caught
  static getDerivedStateFromError(error: Error): ErrorBoundaryState { // Type the error argument and return type
    // Update state so the next render will show the fallback UI.
    // We only set hasError and the error object here. errorInfo is set in componentDidCatch.
    return { hasError: true, error, errorInfo: null };
  }

  // Lifecycle method to catch error information
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void { // Type the arguments and return type
    // You can also log the error to an error reporting service
    console.error("Caught by ErrorBoundary:", error, errorInfo);
    // Set the errorInfo in the state to display details in the fallback UI
    this.setState({ errorInfo });
  }

  // Render method
  render() {
    // If an error has occurred, render the fallback UI
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="p-4 max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-red-600">Something went wrong.</h1>
          <p className="mt-2 text-red-500">
            {this.state.error?.message || "An unknown error occurred."}
          </p>
          {this.state.errorInfo && (
            <details className="mt-4">
              <summary className="text-sm cursor-pointer text-blue-500 underline">
                Error Details
              </summary>
               {/* Display component stack trace if available */}
              <pre className="text-xs text-gray-700 bg-gray-100 p-2 rounded overflow-auto whitespace-pre-wrap break-all">
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    // If no error, render the children components
    return this.props.children;
  }
}

// Functional component demonstrating various error handling scenarios
const ErrorHandlingExample = () => {
  // State variables to store different types of errors caught locally
  const [fileError, setFileError] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [assertionError, setAssertionError] = useState<string | null>(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [timeoutError, setTimeoutError] = useState<string | null>(null);

  // Simulating file fetch that fails (caught locally)
  const simulateFileFetch = () => {
    setFileError(null); // Clear previous error
    try {
      // Simulate file not found by throwing an error
      throw new Error("File not found: data.json");
    } catch (error: unknown) { // Type the caught error as unknown initially
      if (error instanceof Error) { // Narrow the type to Error
        setFileError(`File simulation failed: ${error.message}`);
      } else {
         setFileError('An unexpected error occurred during file fetch simulation.');
      }
    }
  };

  // Handle invalid user input (caught locally)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputError(null); // Clear previous error
    // Check if value is not empty AND (is not a number OR number is out of range)
    if (value.trim() !== '' && (isNaN(Number(value)) || Number(value) < 1 || Number(value) > 10)) {
      setInputError("Invalid input: enter a number between 1 and 10.");
    }
     // Optional: Clear error if input becomes empty after being invalid
    if (value.trim() === '' && inputError !== null) {
         setInputError(null);
    }
  };

  // Simulate assertion failure (caught locally)
  const simulateAssertion = () => {
    setAssertionError(null); // Clear previous error
    try {
      const condition = false;
      // console.assert doesn't stop execution in browsers by default.
      // We explicitly throw to demonstrate catching this type of logical error.
      if (!condition) {
          throw new Error("Logical assertion failed: condition must be true");
      }
      console.log("Assertion passed (this won't log in this simulation)");
    } catch (error: unknown) { // Type the caught error
      if (error instanceof Error) { // Narrow the type to Error
        setAssertionError(error.message);
      } else {
        setAssertionError('An unexpected error occurred during assertion simulation.');
      }
    }
  };

  // Simulate a network error (caught locally)
  const simulateNetworkError = async () => {
    setNetworkError(null); // Clear previous error
    try {
      // Attempt to fetch from a non-existent endpoint
      const response = await fetch("/api/nonexistent-endpoint");
      if (!response.ok) {
        // Handle HTTP errors (like 404, 500 status codes)
        const errorBody = await response.text(); // Try to get error details from the response body
        // Throw a new error with more context, including status and part of the response body
        throw new Error(`HTTP error! status: ${response.status} ${response.statusText} - ${errorBody.substring(0, 150)}...`);
      }
      const data = await response.json();
      console.log("Network request succeeded (unexpected in simulation):", data);
    } catch (error: unknown) { // Type the caught error
      if (error instanceof Error) { // Narrow the type to Error
        // This catches network issues (e.g., CORS, no internet) or the error thrown above for HTTP status
        setNetworkError(`Network request failed: ${error.message}`);
      } else {
        setNetworkError('An unknown network error occurred');
      }
    }
  };

  // Simulate a timeout error using AbortController (caught locally)
  const simulateTimeoutError = () => {
    setTimeoutError(null); // Clear previous error
    const controller = new AbortController(); // Create a new abort controller
    const { signal } = controller; // Get the signal

    // Set a timeout that will abort the fetch after a short duration
    const timeoutDuration = 100; // ms - Adjust as needed for testing
    const timeoutId = setTimeout(() => {
      // Abort the fetch request and provide an error reason
      controller.abort(new Error(`Request timed out after ${timeoutDuration}ms`));
    }, timeoutDuration);

    // Try fetching a URL that is designed to delay the response
    // Using deelay.me to create a predictable delay (e.g., 500ms delay)
    const fetchPromise = fetch(`https://deelay.me/500/https://www.google.com`, {
      signal, // Pass the signal to link the fetch to the abort controller
      // The non-standard 'timeout' option is removed
    });

    fetchPromise
      .then((response) => {
        // Clear the timeout if the fetch completes successfully before the timeout
        clearTimeout(timeoutId);
        if (!response.ok) {
           // Handle HTTP errors if the fetch completes but with a bad status
           throw new Error(`HTTP error after timeout attempt! status: ${response.status}`);
        }
        // Assuming a successful response, process it (e.g., parse JSON)
        return response.text(); // Changed to text() as google.com returns HTML
      })
      .then((data) => {
         console.log("Timeout simulation fetch succeeded (unexpected):", data.substring(0, 50) + '...'); // Log partial data
      })
      .catch((error: unknown) => {
        // Clear the timeout regardless of the error type
        clearTimeout(timeoutId);
        if (error instanceof Error) { // Narrow the type to Error
          // Check if the error is an AbortError, which indicates the request was cancelled
          if (error.name === 'AbortError') {
              // Check if the abort reason matches our specific timeout message
              if (error.message.startsWith('Request timed out')) {
                 setTimeoutError(error.message); // Set the specific timeout message
              } else {
                 setTimeoutError(`Request aborted: ${error.message}`); // Other abort reasons
              }
          } else {
             // Catch other fetch errors (e.g., network issues before timeout)
             setTimeoutError(`Workspace error during timeout simulation: ${error.message}`);
          }
        } else {
          setTimeoutError('An unknown error occurred during timeout simulation');
        }
      });
  };


  return (
    // Wrap the content that might throw rendering errors with ErrorBoundary
    <ErrorBoundary>
      <div className="p-4 max-w-lg mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Error Handling Examples</h1>
        <p className="text-gray-600">
          Examples below demonstrate catching and displaying errors locally within components.
          An Error Boundary above this content will catch unhandled errors during rendering or lifecycle methods.
        </p>

        {/* File Not Found Simulation */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">File Load Error (Simulated)</h2>
          <button
            onClick={simulateFileFetch}
            className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Simulate File Load Error
          </button>
          {fileError && <p className="text-red-600 mt-2">{fileError}</p>}
        </div>

        {/* Invalid Input Simulation */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Invalid Input Error (Simulated)</h2>
          <input
            type="text"
            placeholder="Enter number 1-10"
            onChange={handleInputChange}
            className="mt-2 px-2 py-1 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {inputError && <p className="text-red-600 mt-2">{inputError}</p>}
        </div>

        {/* Assertion Failure Simulation */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Logical Error (Simulated Assertion)</h2>
          <button
            onClick={simulateAssertion}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Simulate Logical Error
          </button>
          {assertionError && <p className="text-red-600 mt-2">{assertionError}</p>}
        </div>

        {/* Network Error Simulation */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Network Error (Simulated 404/Fetch Fail)</h2>
          <button
            onClick={simulateNetworkError}
            className="mt-2 px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
          >
            Simulate Network Error
          </button>
          {networkError && (
            <p className="text-red-600 mt-2">
              {networkError}
            </p>
          )}
        </div>

        {/* Timeout Error Simulation */}
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-semibold">Timeout Error (Simulated Fetch Timeout)</h2>
          <button
            onClick={simulateTimeoutError}
            className="mt-2 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Simulate Timeout Error
          </button>
          {timeoutError && (
            <p className="text-red-600 mt-2">
              {timeoutError}
            </p>
          )}
        </div>

        {/* Example: An error thrown directly during render will be caught by ErrorBoundary */}
        {/* Uncomment the button below to see the ErrorBoundary fallback UI in action */}
        {/* <div className="p-4 border rounded shadow">
             <h2 className="text-xl font-semibold">Error Boundary Test</h2>
             <button onClick={() => { throw new Error("This error is intentionally thrown to test the ErrorBoundary"); }}
                     className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                 Trigger ErrorBoundary
             </button>
           </div>
        */}

      </div>
    </ErrorBoundary>
  );
};

export default ErrorHandlingExample;