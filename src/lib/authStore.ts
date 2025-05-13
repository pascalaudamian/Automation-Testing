// src/lib/server/authStore.ts
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

type User = {
  email: string;
  password: string;
  resetToken?: string;
  resetTokenExpiry?: number;
};

const usersFilePath = path.resolve(process.cwd(), 'users.json');

// Helper function to read users
function readUsers(): User[] {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, '[]');
    return [];
  }
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
}

// Helper function to save users
function saveUsers(users: User[]) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Find user by email (case-insensitive)
function findUser(email: string): User | undefined {
  const users = readUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Generate reset token
export function requestReset(email: string): string {
  const users = readUsers();
  const user = findUser(email);

  if (!user) {
    throw new Error('If this email exists, a reset link has been sent');
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = Date.now() + 3600000; // 1 hour

  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  saveUsers(users);

  return token;
}

// Reset password with token
export async function resetPassword(token: string, newPassword: string): Promise<string> {
  const users = readUsers();
  console.log('Current users:', users); // Debug log
  
  const userIndex = users.findIndex(u => 
    u.resetToken === token && 
    u.resetTokenExpiry && 
    u.resetTokenExpiry > Date.now()
  );

  console.log('Found user index:', userIndex); // Debug log

  if (userIndex === -1) {
    console.error('Invalid token or expired token');
    throw new Error('Invalid or expired token');
  }

  // Hash the new password before saving (install bcrypt: npm install bcrypt)
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  const updatedUser = {
    ...users[userIndex],
    password: hashedPassword,
    resetToken: undefined,
    resetTokenExpiry: undefined
  };

  users[userIndex] = updatedUser;
  saveUsers(users);
  
  return updatedUser.email;
}