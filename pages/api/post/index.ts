import { allPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: String
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'GET') {
    const query = allPostsQuery();

    const data = await client.fetch(query);

    res.status(200).json(data);
  } else if(req.method === 'POST') {
    const document  = req.body;
    console.log("Ok")
    client.create(document)
      .then(() => res.status(201).json('Video Created'));
  }
}