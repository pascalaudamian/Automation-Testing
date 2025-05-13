// lib/userStore.ts
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'users.json');

export function getUsers() {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function saveUsers(users: unknown[]) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
}
