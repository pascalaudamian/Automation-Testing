'use server'; // This directive marks the file as a Server Action file

import { z } from 'zod'; // Using Zod for schema validation (install if you haven't: npm install zod)
import { redirect } from 'next/navigation'; // To redirect after successful signup

// Define a schema for the signup form data using Zod
const signupSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character.' }),
});

// Define the expected return type for the server action state
interface SignupFormState {
  errors?: {
    name?: string;
    email?: string;
    password?: string[]; // Password errors are expected as an array
  };
  message?: string; // Optional success or general error message
}

// Server Action function for handling signup
// It receives the previous state and the FormData object from the form
export async function signup(prevState: SignupFormState | undefined, formData: FormData): Promise<SignupFormState> {
  // Validate the form data against the schema
  const validatedFields = signupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If validation fails, return the errors
  if (!validatedFields.success) {
    // Format the Zod errors to match the expected state structure
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      errors: {
        name: fieldErrors.name?.[0], // Take the first error message for name and email
        email: fieldErrors.email?.[0],
        password: fieldErrors.password, // Keep all password error messages
      },
      message: 'Validation failed.',
    };
  }

  // If validation is successful, process the signup
  const { name, email, password } = validatedFields.data;

  // TODO: Implement your actual signup logic here.
  // This would typically involve:
  // 1. Hashing the password.
  // 2. Storing the user in your database.
  // 3. Handling potential errors (e.g., email already exists).
  // 4. Creating a user session or token.

  console.log('Attempting to sign up user:', { name, email, password: '***' });

  // --- Placeholder Signup Logic ---
  // Simulate a delay or a successful signup
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  // Simulate a successful signup for now
  console.log('Signup successful (simulated).');

  // Redirect the user to a success page or dashboard after successful signup
  // Replace '/dashboard' with your desired redirect path
  redirect('/dashboard');


  // --- Example of returning a success message (if not redirecting) ---
  // return { message: 'Signup successful!' };

  // --- Example of returning a general error message ---
  // return { message: 'An unexpected error occurred during signup.' };
}
