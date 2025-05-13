import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define an interface for the expected request body
interface ChangeCountryRequestBody {
  email: string;
  country: string;
}

// Define an interface for the structure of a user object
interface User {
  email: string;
  country: string;
 
}

const USERS_FILE = path.join(process.cwd(), 'data', 'users.json');

export async function POST(req: NextRequest) {
  try {
    // Explicitly type the expected request body
    const { email, country }: ChangeCountryRequestBody = await req.json();

    if (!email || !country) {
      return NextResponse.json({ error: 'Email and country are required.' }, { status: 400 });
    }

    // Load users - Cast the result to an array of our User interface
    const fileData = fs.readFileSync(USERS_FILE, 'utf-8');
    const users: User[] = JSON.parse(fileData);

    // Type the user in the findIndex callback
    const userIndex = users.findIndex((user: User) => user.email === email);
    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Update the user's country
    users[userIndex].country = country;

    // Save back to file
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Country updated successfully.' });
  } catch (err: unknown) { // Use 'unknown' for the caught error
    console.error('Error updating country:', err);
    // You might want to check if err is an instance of Error before accessing message
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Server error', details: errorMessage }, { status: 500 });
  }
}