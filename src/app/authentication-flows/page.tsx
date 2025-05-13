export default function Home() {
  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Authentication Flow Simulation</h1>
      <p className="text-lg mb-8 text-center text-gray-700">
        Welcome to the Authentication Flow Simulation! Please select one of the options below to simulate the various authentication actions.
      </p>

      <div className="flex flex-col items-center space-y-6">
        {/* Sign Up Button */}
        <a
          href="/authentication-flows/signup"
          className="inline-block w-full max-w-sm px-8 py-3 text-lg font-semibold text-center text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
        >
          Sign Up
        </a>

        {/* Login Button (using a secondary style) */}
        <a
          href="/authentication-flows/login"
          className="inline-block w-full max-w-sm px-8 py-3 text-lg font-semibold text-center text-indigo-700 bg-transparent border border-indigo-700 rounded-md shadow-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200"
        >
          Login
        </a>
      </div>
    </main>
  );
}