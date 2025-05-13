import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
//import { v4 as uuidv4 } from 'uuid';

interface User {
  email: string;
  password: string;
  name: string;
  country: string;
  hobbies: string,
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

async function writeUsers(users: User[]) {
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
}

export async function POST(req: Request) {
  const { email, password, name, country, hobbies } = await req.json();

  if (!email || !password || !name || !country || !hobbies) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const users = await readUsers();

  const exists = users.some(user => user.email === email);
  if (exists) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
  }

  const newUser: User = {
    email,
    password, // ❗In production, hash this!
    name,
    country,
    hobbies,
    mfaCode: Math.floor(100000 + Math.random() * 900000).toString(), // 6-digit code
  };

  users.push(newUser);
  await writeUsers(users);

  return NextResponse.json({ success: true });
}
