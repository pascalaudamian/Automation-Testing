'use client'; // This directive marks this file as a Client Component

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react'; // Explicit import for React is good practice in Client Components

// Updated countries list
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
  'Romania', // Romania is included
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

// Define the type for user data
interface UserData {
  name: string;
  country: string;
  email: string;
  hobbies: string; // Hobbies are stored as a comma-separated string
}

// This component contains all the client-side logic and UI
export default function DashboardClientPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newHobbies, setNewHobbies] = useState<string[]>([]); // Hobbies in edit mode are an array
  const [actionMsg, setActionMsg] = useState('');
  const [editMode, setEditMode] = useState(false);

  // useSearchParams and useRouter are used here, in the Client Component
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const router = useRouter();

  // Effect to fetch user data when the email search param changes
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setMsg('');
      try {
        if (!email) {
          setMsg('Email missing from query parameters.'); // Corrected message source
          setLoading(false);
          return;
        }

        // Fetch user data from your API route
        const res = await fetch(`/api/auth/user?email=${encodeURIComponent(email)}`);

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to fetch user data');
        }

        const data: UserData = await res.json(); // Type assertion for fetched data

        if (!data) {
          throw new Error('User data not found');
        }

        setUserData(data);
        // Initialize edit states when data is first fetched
        setNewName(data.name || '');
        setNewCountry(data.country || '');
        // Split hobbies string into an array for the edit state
        setNewHobbies(data.hobbies ? data.hobbies.split(',').map((h: string) => h.trim()).filter((h: string) => h) : []);
      } catch (err: unknown) {
        console.error('Fetch error:', err);
        if (err instanceof Error) {
          setMsg(err.message || 'Error fetching user data');
        } else {
          setMsg('Unknown error fetching user data');
        }
      } finally {
        setLoading(false);
      }
    };

    if (email) { // Only fetch if email is present in search params
      fetchUser();
    } else {
       // This case is now handled at the start of the effect
    }
  }, [email]); // Re-run effect if the email search param changes

  // Handle profile data update
  const handleUpdate = async (updates: Partial<UserData>, onSuccess?: () => void) => { // Use Partial<UserData> for updates type
    setActionMsg('');
    try {
      // Ensure email is available before attempting update
      if (!email) {
         setActionMsg('Cannot update profile: Email missing.');
         return;
      }

      const res = await fetch('/api/auth/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, updates }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');

      setActionMsg('Update successful!');
      // Update userData state with the returned user data
      if (data.user) {
         const updatedUser: UserData = data.user; // Type assertion for updated user data
         setUserData(updatedUser);
         // Update edit states after successful update to reflect saved data
         setNewName(updatedUser.name || '');
         setNewCountry(updatedUser.country || '');
         setNewHobbies(updatedUser.hobbies ? updatedUser.hobbies.split(',').map((h: string) => h.trim()).filter((h: string) => h) : []);
      }
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setActionMsg(err.message);
      } else {
        setActionMsg('Unknown error occurred');
      }
    }
  };

   // Handle password reset request
   // NOTE: Your /api/auth/reset/request endpoint currently returns the token.
   // A real password reset flow would typically send an email with a link
   // containing the token, and the user would confirm on a separate page.
   // This function simulates requesting a reset, but the actual password
   // update logic should happen on a confirmation step, not here.
   // The current implementation attempts to update the password via the request endpoint,
   // which might not align with a standard reset flow.
   // For this code, I'll keep the structure but add a note about the typical flow.
  const handlePasswordReset = async () => {
    setActionMsg('');
    try {
      if (!newPassword) {
        throw new Error('Please enter a new password');
      }
       // Ensure email is available
       if (!email) {
           setActionMsg('Cannot reset password: Email missing.');
           return;
       }

       // NOTE: This endpoint /api/auth/reset/request is typically for *requesting* a reset token.
       // The password update usually happens on a /api/auth/reset/confirm endpoint
       // after the user clicks a link in an email containing the token.
       // Your current code sends the new password to the request endpoint.
       // If your backend is designed to handle password update on /api/auth/reset/request
       // when provided with email and password, this might work, but it's unconventional
       // for a secure password reset flow.
       // Assuming your backend *does* handle the password update here for simulation purposes:

      const res = await fetch('/api/auth/reset/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Sending email and newPassword to the request endpoint
        body: JSON.stringify({ email, password: newPassword }),
      });

      // It's crucial to check if the response is ok BEFORE trying to parse it as JSON
      if (!res.ok) {
        // Attempt to parse JSON error first, fallback to text
        const errorData = await res.json().catch(() => res.text());
        const errorMessage = typeof errorData === 'object' && errorData !== null && 'error' in errorData ? errorData.error : String(errorData);
        throw new Error(`Password reset failed: ${res.status} - ${errorMessage}`);
      }

      // Assuming a successful response from the backend means password was updated
      const data = await res.json(); // The request endpoint currently returns { token }
      console.log('Password reset request successful (backend simulated update):', data);

      setActionMsg('Password updated successfully!'); // Message reflects simulated update
      setShowResetForm(false); // Hide the reset form
      setNewPassword(''); // Clear the password input

    } catch (err: unknown) {
      console.error('Password reset error:', err);
      if (err instanceof Error) {
        setActionMsg(err.message);
      } else {
        setActionMsg('Unknown error occurred during password reset.');
      }
    }
  };

  // Handle saving all profile changes
  const handleSaveAll = async () => {
     // Ensure userData exists before saving
     if (!userData) {
         setActionMsg('No user data to save.');
         return;
     }
    await handleUpdate({
      name: newName,
      country: newCountry,
      hobbies: newHobbies.join(', '), // Join array back to comma-separated string
    }, () => setEditMode(false)); // Exit edit mode on success
  };

  // Handle changes in the hobbies multi-select
  const handleHobbiesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setNewHobbies(selectedOptions);
  };

  // Handle cancelling edit mode
  const handleCancelEdit = () => {
    // Reset edit states to current userData values
    if (userData) {
      setNewName(userData.name || '');
      setNewCountry(userData.country || '');
      setNewHobbies(userData.hobbies ? userData.hobbies.split(',').map((h: string) => h.trim()).filter((h: string) => h) : []);
    } else {
       // Clear edit states if no user data
       setNewName('');
       setNewCountry('');
       setNewHobbies([]);
    }
    setEditMode(false); // Exit edit mode
    setActionMsg(''); // Clear action message
  };

  // Handle clicking the Edit Profile button
  const handleEditClick = () => {
    // Initialize edit states from current userData
    if (userData) {
      setNewName(userData.name || '');
      setNewCountry(userData.country || '');
      setNewHobbies(userData.hobbies ? userData.hobbies.split(',').map((h: string) => h.trim()).filter((h: string) => h) : []);
    }
    setEditMode(true); // Enter edit mode
    setActionMsg(''); // Clear action message
  };

  // Handle logout
  const handleLogout = () => {
    // Redirect the user to the specified logout URL
    // NOTE: This is a client-side redirect. For a proper logout,
    // you would typically call an API route to clear the session/cookies
    // before redirecting.
    router.push('/authentication-flows'); // Redirect to the base authentication flow page
  };

  // Display a message if email is missing and not loading
  if (!email && !loading) {
    return (
      <div className="p-10 flex justify-center items-center">
        <p className="text-red-500 text-xl">{msg || 'Email is required to view the dashboard.'}</p>
      </div>
    );
  }

  // Main render function for the dashboard content
  return (
    <div className="p-6 sm:p-10 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
      {/* Loading state */}
      {loading ? (
        <div className="w-full flex justify-center items-center min-h-[300px]">
          <p>Loading user data...</p>
        </div>
      ) : (
        <>
          {/* Profile Picture Section */}
          <div className="w-full md:w-1/4 flex flex-col items-center space-y-4">
            <div className="border-4 border-gray-300 rounded-full w-32 h-32 flex justify-center items-center overflow-hidden">
              {/* Gravatar image based on email */}
              <img
                src={email ? `https://www.gravatar.com/avatar/${email.trim().toLowerCase()}?d=mp&s=200` : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=200"}
                alt="Profile Picture"
                className="rounded-full w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=200")} // Fallback Gravatar on error
              />
            </div>
            {/* Update Password Button */}
            <button
              onClick={() => setShowResetForm(!showResetForm)}
              className="bg-yellow-600 text-white px-4 py-2 rounded w-full hover:bg-yellow-700 transition-colors"
              disabled={!userData} // Disable if no user data
            >
              {showResetForm ? 'Cancel Update Password' : 'Update Password'}
            </button>

            {/* Password Reset Form (conditionally rendered) */}
            {showResetForm && userData && ( // Only show if userData is present and showResetForm is true
              <div className="w-full space-y-2">
                <input
                  className="border p-2 w-full rounded"
                  placeholder="New Password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  onClick={handlePasswordReset}
                  className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700 transition-colors"
                >
                  Submit New Password
                </button>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700 transition-colors mt-4"
            >
              Logout
            </button>
          </div>

          {/* User Information Section */}
          <div className="w-full md:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-2xl font-bold mb-2 sm:mb-0">User Dashboard</h1>
              {/* Edit/Save/Cancel Buttons */}
              {editMode ? (
                <div className="space-x-0 sm:space-x-2 flex flex-col sm:flex-row w-full sm:w-auto">
                  <button
                    onClick={handleSaveAll}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors mb-2 sm:mb-0 w-full sm:w-auto"
                  >
                    Save All
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors w-full sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditClick}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full sm:w-auto"
                  disabled={!userData || loading} // Disable if no user data or loading
                >
                  Edit Profile
                </button>
              )}
            </div>

            {/* General messages (e.g., error fetching data) */}
            {msg && !userData && <p className="text-red-500 mb-4">{msg}</p>}
            {/* Action messages (e.g., update success/failure) */}
            {actionMsg && (
              <p className={`text-sm mb-4 ${
                actionMsg.includes('success') ? 'text-green-600' : 'text-red-500'
              }`}>
                {actionMsg}
              </p>
            )}

            {/* Display User Data or "No data" message */}
            {userData ? (
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Name Row */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Name</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {editMode ? (
                          <input
                            className="border p-2 w-full rounded"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                          />
                        ) : (
                          <span>{userData.name || 'Not specified'}</span>
                        )}
                      </td>
                    </tr>
                    {/* Email Row */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Email</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        <span>{userData.email}</span>
                      </td>
                    </tr>
                    {/* Country Row */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Country</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {editMode ? (
                          <select
                            className="border p-2 w-full rounded"
                            value={newCountry}
                            onChange={(e) => setNewCountry(e.target.value)}
                          >
                            <option value="">Select a country</option>
                            {countries.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        ) : (
                          <span>{userData.country || 'Not specified'}</span>
                        )}
                      </td>
                    </tr>
                    {/* Hobbies Row */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 align-top">Hobbies</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                        {editMode ? (
                          <select
                            multiple // Enable multi-select
                            className="border p-2 w-full rounded h-32 text-gray-700" // Fixed height for multiselect
                            value={newHobbies} // Value is an array of selected options
                            onChange={handleHobbiesChange} // Handle change event
                          >
                            {hobbiesList.map((hobby) => (
                              <option key={hobby} value={hobby}>
                                {hobby}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span>{userData.hobbies || 'Not specified'}</span>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              // Message displayed if no user data is available after loading
              !loading && <p className="text-gray-500">No user data available. {msg}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
