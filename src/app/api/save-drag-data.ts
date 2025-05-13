// pages/api/save-drag-data.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('Received drag data:', req.body);

    // Aici poți salva în DB sau fișier
    res.status(200).json({ message: 'Data saved successfully' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
