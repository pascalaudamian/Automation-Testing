'use client';

import { useActionState } from 'react';
import { signup } from '@/lib/actions';


export default function SignupForm() {
  // Use useActionState with the imported signup function and initial state (undefined)
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    // Form element using the action from useActionState
    <form action={action} className="space-y-4"> {/* Added some basic spacing */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label> {/* Added basic styling */}
        <input
          id="name"
          name="name"
          placeholder="Name"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" // Added basic styling
        />
      </div>
      {/* Display name errors */}
      {state?.errors?.name && <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>} {/* Added basic styling */}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label> {/* Added basic styling */}
        <input
          id="email"
          name="email"
          type="email" // Added type="email" for better accessibility and validation
          placeholder="Email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" // Added basic styling
        />
      </div>
      {/* Display email errors */}
      {state?.errors?.email && <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>} {/* Added basic styling */}

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label> {/* Added basic styling */}
        <input
          id="password"
          name="password"
          type="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" // Added basic styling
        />
      </div>
      {/* Display password errors */}
      {state?.errors?.password && (
        <div className="text-red-500 text-sm mt-1"> {/* Added basic styling */}
          <p>Password must:</p>
          <ul className="list-disc list-inside"> {/* Added basic list styling */}
            {state.errors.password.map((error: string) => ( // Added type annotation for error
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        disabled={pending}
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed" // Added basic styling
      >
        Sign Up
      </button>

      {/* Optional: Display a general message if needed */}
      {/* {state?.message && !state.errors && <p className="text-green-500 text-sm mt-4">{state.message}</p>} */}
    </form>
  );
}
