// src/app/api/auth/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface User {
  name: string;
  country: string;
  email: string;
  hobbies: string;
  password?: string; // Assuming password might be in the JSON
  // Add other properties if they exist in your users.json, like 'id', 'status', 'role', 'mfaCode'
  // id?: string | number;
  // status?: "active" | "inactive" | "pending";
  // role?: string;
  // mfaCode?: string;
  // lastLogin?: string;
}

// Define an interface for the expected POST request body
interface UpdateUserRequestBody {
    email: string;
    // 'updates' can be an object with partial User properties
    updates: Partial<Omit<User, 'email'>>; // Omit email from partial updates
}

export async function GET(request: NextRequest) { // Use NextRequest for easier access to searchParams
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'Email query parameter is required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');

  try {
    const jsonData = await fs.readFile(filePath, 'utf-8');
    // Cast the parsed JSON to an array of our User interface
    const users: User[] = JSON.parse(jsonData) as User[];
    const user = users.find(u => u.email === email);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Safely remove password before sending to client
    // Use a type assertion if you are sure about the properties
     const { password, ...userDataToSend } = user; // 'user' is of type User, so this is safe

    return NextResponse.json(userDataToSend);
  } catch (error: unknown) { // Changed 'any' to 'unknown'
     console.error('API GET Error:', error); // Specify GET error

     // Safely check error properties
     if (error instanceof Error) {
       if ('code' in error && error.code === 'ENOENT') { // Check if 'code' property exists
           return NextResponse.json({ message: 'User data file not found on server.' }, { status: 500 });
       }
      return NextResponse.json({ message: 'Error fetching user data from server', error: error.message }, { status: 500 });
     }

     return NextResponse.json({ message: 'An unexpected error occurred on server' }, { status: 500 }); // Generic error for non-Error types
  }
}

export async function POST(request: NextRequest) { // Use NextRequest
    // Explicitly type the expected request body
    const { email, updates }: UpdateUserRequestBody = await request.json();

    if (!email || !updates) {
        return NextResponse.json({ error: 'Email and updates are required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');

    try {
        let users: User[];
        try {
            const jsonData = await fs.readFile(filePath, 'utf-8');
            // Cast the parsed JSON to an array of our User interface
            users = JSON.parse(jsonData) as User[];
        } catch (readError: unknown) { // Changed 'any' to 'unknown'
            // If file doesn't exist or is empty, start with an empty array
            // Safely check error properties
            if (readError instanceof Error && 'code' in readError && readError.code === 'ENOENT') { // Check if it's an Error and has 'code'
                users = [];
            } else {
                // Re-throw other read errors after logging
                console.error('API POST Read Error:', readError); // Specify POST read error
                throw readError;
            }
        }

        const userIndex = users.findIndex(u => u.email === email);

        if (userIndex === -1) {
            return NextResponse.json({ error: 'User not found for update' }, { status: 404 });
        }

        // Update user data - Spreading a partial User type is safe
        users[userIndex] = { ...users[userIndex], ...updates };

        await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');

        // Return the updated user (without password if it exists)
        const { password, ...updatedUserData } = users[userIndex];
        return NextResponse.json({ user: updatedUserData });

    } catch (error: unknown) { // Changed 'any' to 'unknown'
        console.error('API POST Error:', error); // Specify POST error
        // Safely access the error message
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({ error: 'Failed to update user data', details: errorMessage }, { status: 500 });
    }
}