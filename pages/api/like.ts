import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';
import axios from 'axios';

import { client } from '../../utils/client';
import { postDetailQuery } from '../../utils/queries';
import { BASE_URL } from '../../utils';

async function handleNewPost (postId: string, postTitle: string) {
  const document = {
    _type: 'post',
    caption: postTitle,
    video: postId,
  }

  await axios.post(`${BASE_URL}/api/post`, document);
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'PUT') {
    const { userId, postId, postTitle, like } = req.body;

    let videoQuery = await client.fetch(postDetailQuery(postId));
    if(videoQuery.length < 1){
      await handleNewPost(postId, postTitle);
      videoQuery = await client.fetch(postDetailQuery(postId));
    }

    const data = 
    like ? await client
      .patch(videoQuery[0]._id)
      .setIfMissing({ likes: [] })
      .insert('after', 'likes[-1]', [
        {
          _key: uuid(),
          _ref: userId
        }
      ])
      .commit()
    : await client
      .patch(videoQuery[0]._id)
      .unset([`likes[_ref=="${userId}"]`])
      .commit();

      if (!like && videoQuery[0].likes.length == 1 && !videoQuery[0].comments){
        await client.delete(videoQuery[0]._id)
      }
    
      res.status(200).json(data);
  }
}