'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const countries = [
  'United States',
  'India',
  'China',
  'Indonesia',
  'Brazil',
  'Pakistan',
  'Nigeria',
  'Bangladesh',
  'Russia',
  'Mexico',
  'Germany',
  'United Kingdom',
  'France',
  'Italy',
  'Canada',
  'Australia',
  'South Korea',
  'Japan',
  'South Africa',
  'Romania',
];

// Common hobbies list
const hobbiesList = [
  'Reading',
  'Traveling',
  'Cooking',
  'Photography',
  'Sports',
  'Music',
  'Gardening',
  'Drawing/Painting',
  'Gaming',
  'Movies/TV Shows',
  'Cycling',
  'Running',
  'Swimming',
  'Writing',
  'Dancing',
];

export default function SignUp() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    hobbies: '',
    terms: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.country || !form.hobbies) {
      return setError('All fields are required.');
    }

    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match.');
    }

    if (!form.terms) {
      return setError('You must accept the terms and conditions.');
    }

    // Basic email validation
    const isValidEmail = /\S+@\S+\.\S+/.test(form.email);
    if (!isValidEmail) {
      return setError('Please enter a valid email address.');
    }

    // Basic password complexity check
    if (form.password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
          country: form.country,
          hobbies: form.hobbies,  // Include hobbies in the request
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');
      setSuccess('Account created successfully!');
      setTimeout(() => router.push('/authentication-flows/login'), 1500);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error occurred');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <p className="text-sm text-gray-500 mb-4"><span className="text-red-500">*</span> Required fields</p>

      <label className="block font-medium">Full Name <span className="text-red-500">*</span></label>
      <input name="name" value={form.name} onChange={handleChange}
        className="w-full border p-2 rounded mb-3" />

      <label className="block font-medium">Email <span className="text-red-500">*</span></label>
      <input type="email" name="email" value={form.email} onChange={handleChange}
        className="w-full border p-2 rounded mb-3" />

      <label className="block font-medium">Password <span className="text-red-500">*</span></label>
      <input type="password" name="password" value={form.password} onChange={handleChange}
        className="w-full border p-2 rounded mb-3" />

      <label className="block font-medium">Confirm Password <span className="text-red-500">*</span></label>
      <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
        className="w-full border p-2 rounded mb-3" />

      <label className="block font-medium">Country <span className="text-red-500">*</span></label>
      <select name="country" value={form.country} onChange={handleChange}
        className="w-full border p-2 rounded mb-3">
        <option value="">Select Country</option>
        {countries.map(c => <option key={c}>{c}</option>)}
      </select>

      <label className="block font-medium">Select Hobbies <span className="text-red-500">*</span></label>
      <select name="hobbies" value={form.hobbies} onChange={handleChange}
        className="w-full border p-2 rounded mb-3">
        <option value="">Select Hobby</option>
        {hobbiesList.map(hobby => (
          <option key={hobby} value={hobby}>{hobby}</option>
        ))}
      </select>

      <label className="flex items-center text-sm mb-4">
        <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} className="mr-2" />
        I accept the terms and conditions <span className="text-red-500 ml-1">*</span>
      </label>

      <button onClick={handleSubmit}
        className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
        Sign Up
      </button>

      {error && <p className="text-red-600 mt-4">{error}</p>}
      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
}
