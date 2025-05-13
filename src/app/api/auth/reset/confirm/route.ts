// src/app/api/auth/reset/confirm/route.ts
import { NextResponse } from 'next/server';
// Import resetTokens directly from the store file, not from the request route
import { resetTokens } from '@/lib/resetTokenStore';
import { updatePassword } from '@/lib/server/authStore'; // Assuming this path is correct for your password update logic
import { z } from 'zod'; // Assuming you will use Zod for validation here too

// Define a schema for the confirmation request body
const confirmResetSchema = z.object({
  token: z.string().min(1, { message: 'Token is required.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character.' }),
});


// Handle POST requests to /api/auth/reset/confirm
export async function POST(req: Request) {
  // Parse the request body
  const body = await req.json();

  // Validate the request body using the schema
  const validationResult = confirmResetSchema.safeParse(body);

  // If validation fails, return a 400 error with validation messages
  if (!validationResult.success) {
    return NextResponse.json({
      error: 'Invalid request data',
      details: validationResult.error.flatten().fieldErrors,
    }, { status: 400 });
  }

  const { token, password } = validationResult.data;

  // Check if the token exists in the resetTokens map
  const email = resetTokens.get(token);

  if (!email) {
    // If the token is not found or has expired (due to lack of cleanup), return an error
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
  }

  // TODO: Add a check here to ensure the token hasn't been used already
  // In a real application, you would likely want to invalidate the token
  // immediately after it's used to prevent replay attacks.

  // Update the user's password (assuming updatePassword handles hashing and storage)
  try {
    // Assuming updatePassword takes email and the new plain password
    await updatePassword(email, password);

    // Remove the token from the map after successful password reset
    resetTokens.delete(token);

    console.log(`Password successfully reset for ${email}. Token ${token} removed.`);

    // Return a success response
    return NextResponse.json({ message: 'Password reset successful' });

  } catch (error) {
    console.error('Error updating password:', error);
    // Return a 500 Internal Server Error if password update fails
    return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
  }
}