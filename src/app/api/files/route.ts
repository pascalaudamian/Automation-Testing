// src/app/api/files/route.ts
import { NextResponse } from 'next/server';
import { readdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// Define the upload directory path, similar to your /api/upload endpoint
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

export async function GET() {
  // Check if the upload directory exists
  if (!existsSync(uploadDir)) {
    // If the directory doesn't exist, return an empty array
    // You could also return an error, but returning empty seems more graceful
    return NextResponse.json([], { status: 200 });
  }

  try {
    // Read the contents of the directory
    const filenames = await readdir(uploadDir);

    // Return the list of filenames as a JSON response
    return NextResponse.json(filenames, { status: 200 });

  } catch (error) {
    console.error("Error reading upload directory:", error);
    // Return an error response if reading the directory fails
    return NextResponse.json({ error: 'Failed to retrieve files' }, { status: 500 });
  }
}

// You can also define other HTTP methods if needed, e.g., DELETE for individual files,
// but the frontend delete logic currently uses the /api/upload DELETE endpoint.