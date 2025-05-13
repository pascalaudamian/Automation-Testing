// src/pages/api/auth/user.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

interface User {
  name: string;
  country: string;
  email: string;
  hobbies: string;
  password?: string;
}

type Data = User | { message: string; error?: string } | { error: string, details?: string } | { user: User };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');

  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ message: 'Email query parameter is required' });
    }

    try {
      const jsonData = await fs.readFile(filePath, 'utf-8');
      const users: User[] = JSON.parse(jsonData);
      const user = users.find(u => u.email === email);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const { password, ...userDataToSend } = user;
      return res.status(200).json(userDataToSend);
    } catch (error: unknown) {
      console.error('API GET Error:', error);
      if (error instanceof Error && (error as { code?: string }).code === 'ENOENT') {
          return res.status(500).json({ message: 'User data file not found on server.' });
      }
      if (error instanceof Error) {
          return res.status(500).json({ message: 'Error fetching user data from server', error: error.message });
      }
      return res.status(500).json({ message: 'An unknown error occurred' });
    }
  } else if (req.method === 'POST') {
      const { email, updates } = req.body;

      if (!email || !updates) {
          return res.status(400).json({ error: 'Email and updates are required' });
      }

      try {
          let users: User[];
          try {
              const jsonData = await fs.readFile(filePath, 'utf-8');
              users = JSON.parse(jsonData);
          } catch (readError: unknown) {
              if (readError instanceof Error && (readError as { code?: string }).code === 'ENOENT') {
                  users = []; // Start with empty array if file doesn't exist
              } else {
                  throw readError;
              }
          }


          const userIndex = users.findIndex(u => u.email === email);

          if (userIndex === -1) {
              return res.status(404).json({ error: 'User not found for update' });
          }

          users[userIndex] = { ...users[userIndex], ...updates };

          await fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8');

          const { password, ...updatedUserData } = users[userIndex];
          return res.status(200).json({ user: updatedUserData });

      } catch (error: unknown) {
          console.error('API POST Error:', error);
          if (error instanceof Error) {
              return res.status(500).json({ error: 'Failed to update user data', details: error.message });
          }
          return res.status(500).json({ error: 'Failed to update user data', details: 'Unknown error occurred' });
      }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}