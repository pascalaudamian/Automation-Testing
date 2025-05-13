// src/app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file: File | null = formData.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ error: "No file received" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = `${Date.now()}_${file.name}`;

  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  await writeFile(path.join(uploadDir, filename), buffer);

  return NextResponse.json({ filename });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json({ error: "No filename provided" }, { status: 400 });
  }

  const filePath = path.join(uploadDir, filename);

  try {
    await unlink(filePath);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
