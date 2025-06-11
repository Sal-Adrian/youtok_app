import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import useAuthStore from '../store/authStore';
import { client } from '../utils/client';

import { BASE_URL, SINGLE_URL } from '../utils';
import { postDetailQuery } from '../utils/queries';

const Upload = () => {
  const [badUrl, setBadUrl] = useState(false);
  const [url, setUrl] = useState('');
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: any }  = useAuthStore();
  const router = useRouter();

  const handlePost = async () => {
    setSavingPost(true);

    const idIndex = url.indexOf("watch?v=");
    const videoId = url.substring(idIndex+8,idIndex+19);
    
    const res = await fetch(`${SINGLE_URL}&id=${videoId}`).then(res => res.json());
    const videoData = res.items[0];

    if(res.items.length > 0){
      const videoQuery = await client.fetch(postDetailQuery(videoId));

      if(videoQuery.length > 0){
        const likes: any[] = videoQuery[0].likes;
        const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);

        if(filterLikes) {
          router.push('/'); 
          return;
        }
      }

      await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: videoData.id,
        postTitle: videoData.snippet.title,
        like: true
      });

      router.push('/');
    } else {
      setBadUrl(true);
      setSavingPost(false);
    }
  }

  const handleDiscard = async () => {
    setSavingPost(false);
    setUrl('');
  }

  return (
    <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
      <div className="bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
        <div>
          <p className="text-2xl font-bold">Upload Video</p>
          <p className="text-md text-gray-400 mt-1">Post a video to your account</p>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <label className="text-md font-medium">Youtube URL</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="rounded outline-none text-md border-2 border-gray-200 p-2"
          />
          {badUrl ? (
            <p className="text-red-500">Error with URL, please enter a new URL.</p>
          ) : (
            <p></p>
          )}
          <div className="flex gap-6 mt-10">
            <button 
              onClick={handleDiscard}
              type="button"
              className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none cursor-pointer"
            >
                Discard
            </button>
            <button 
              onClick={handlePost}
              type="button"
              className="bg-[#00B0F0] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none cursor-pointer"
            >
              {savingPost ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload;