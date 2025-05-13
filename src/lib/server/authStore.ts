// src/lib/server/authStore.ts
import fs from 'fs';
import path from 'path';

// Define the path to the users data file
const usersFilePath = path.resolve(process.cwd(), 'users.json');

// Helper function to read the users file
function readUsersFile() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users file:', err);
    return [];
  }
}

// Helper function to write the updated users list to the file
function writeUsersFile(users: unknown) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing users file:', err);
  }
}

// Update the password for a specific user
export function updatePassword(email: string, newPassword: string) {
  const users = readUsersFile();
  const user = users.find((user: { email: string }) => user.email === email);

  if (!user) throw new Error('User not found');

  user.password = newPassword;

  // Save the updated users list to the file
  writeUsersFile(users);
}
