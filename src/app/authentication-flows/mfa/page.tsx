'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MfaPage() {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (!storedEmail) {
      setMsg('Session expired. Please login again.');
    } else {
      setEmail(storedEmail);
    }
  }, []);

  const handleVerify = async () => {
    if (!email || !code) {
      return setMsg('Missing email or MFA code.');
    }

    try {
      const res = await fetch('/api/auth/mfa', {
        method: 'POST',
        body: JSON.stringify({ email, code }),
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid code.');

      router.push(`/authentication-flows/dashboard?email=${email}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMsg(err.message);
      } else {
        setMsg('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Verify MFA</h1>
      <input
        type="text"
        className="w-full border p-2 mb-4"
        placeholder="Enter MFA Code"
        onChange={e => setCode(e.target.value)}
      />
      <button
        onClick={handleVerify}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Verify
      </button>
      {msg && <p className="mt-4 text-red-500">{msg}</p>}
    </div>
  );
}
