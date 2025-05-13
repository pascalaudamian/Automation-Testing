import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

interface User {
  email: string;
  password: string;
  name: string;
  country: string;
  mfaCode: string;
}

const USERS_PATH = path.join(process.cwd(), 'src', 'data', 'users.json');

async function readUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(USERS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  const users = await readUsers();
  const user = users.find(u => u.email === email);

  if (!user || user.password !== password) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ mfaCode: user.mfaCode });
}
