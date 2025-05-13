import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

interface User {
  email: string;
  password: string;
  name: string;
  country: string;
  hobbies: string;
  mfaCode: string;
}

async function getUsers(): Promise<User[]> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
  const jsonData = await fs.readFile(filePath, 'utf-8');
  // Assuming users.json contains an array of objects matching the User interface
  return JSON.parse(jsonData) as User[];
}

export async function POST(req: Request) {
  // You might also want to define an interface for the request body here
  // interface MfaRequestBody { email: string; code: string; }
  // const { email, code }: MfaRequestBody = await req.json();
  const { email, code } = await req.json(); // Assuming email and code are strings based on usage

  try {
    const users = await getUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 });
    }

    if (user.mfaCode !== code) {
      return NextResponse.json({ error: 'Invalid MFA code' }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) { // Changed 'any' to 'unknown'
    console.error('Error verifying MFA:', error); // More specific log message
    // Safely access the error message if it's an Error instance
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: 'Server error', details: errorMessage }, { status: 500 });
  }
}