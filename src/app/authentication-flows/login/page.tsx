'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setMsg(''); // Clear previous messages
    setIsLoading(true); // Set loading state

    // Basic validation for email and password
    if (!email || !password) {
      setIsLoading(false); // Stop loading if validation fails
      return setMsg('Please enter both email and password.');
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      // Check if the response is okay
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      // Successful login: store email, handle MFA, and redirect
      sessionStorage.setItem('email', email);
      alert(`MFA Code is: ${data.mfaCode}`); // MFA code should be returned from the backend
      router.push('/authentication-flows/mfa');
    } catch (err: unknown) {
      setIsLoading(false); // Stop loading if there's an error
      if (err instanceof Error) {
        setMsg(err.message);
      } else {
        setMsg('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        className="border p-2 mb-2 block w-full"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mb-2 block w-full"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={isLoading} // Disable the button while loading
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      <p className="mt-4 text-red-500">{msg}</p>
    </div>
  );
}
