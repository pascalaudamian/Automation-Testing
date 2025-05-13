// src/app/api/auth/reset/request/route.ts
import { NextResponse } from 'next/server';
import { resetTokens } from '@/lib/resetTokenStore';

// Handle POST requests to /api/auth/reset/request
export async function POST(req: Request) {
  // Parse the request body to get the email
  const { email } = await req.json();

  // Check if email is provided in the request body
  if (!email) {
    // Return a 400 Bad Request response if email is missing
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }
  // Generate a simple 6-digit numeric reset token
  const token = Math.floor(100000 + Math.random() * 900000).toString();

  // Store the generated token associated with the email in the imported map
  resetTokens.set(token, email);

  // Log the generated token and associated email (for debugging/monitoring)
  console.log(`Generated reset token ${token} for ${email}. Stored in resetTokens map.`);

  return NextResponse.json({ token });
}
