import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Return a simple JSON response
  res.status(200).json({ 
    success: true, 
    message: 'API is working',
    method: req.method,
    query: req.query,
    body: req.body || null
  });
}