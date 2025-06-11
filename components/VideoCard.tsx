import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { FaComments } from "react-icons/fa";
import axios from 'axios';
import { useRouter } from 'next/router';

import { Video, YTVideo } from '../types';
import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';
import LikeButton from './LikeButton';


interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [postData, setPostData] = useState(post);
  const { userProfile }: any = useAuthStore();

  const router = useRouter();

  const handleLike = async (like: boolean) => {
    if(userProfile) {
      const {data} = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: postData.video,
        postTitle: postData.caption,
        like
      });

      setPostData({ ...postData, likes: data.likes });
    }
  }

  const handleComment = async () => {
    const likes: any[] = postData.likes;
    const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);
    if(filterLikes?.length < 1){
      await handleLike(true);
    }
    
    router.push(`/detail/${postData.video}`);
  };

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">

      <iframe className="lg:w-[600px] lg:h-[338px] h-[169px] w-[300px] rounded-2xl bg-gray-100"
        src={`https://www.youtube.com/embed/${postData.video}`}>
      </iframe>

      <div className="flex items-center justify-between lg:w-[600px] w-[300px]">
        {userProfile && (
          <LikeButton 
            likes={postData.likes}
            handleLike={() => {handleLike(true)}}
            handleDislike={() => {handleLike(false)}}
          />
        )}
        <div className="text-lg md:text-2xl mt-2 p-2 md:p-4 flex-wrap">
          <FaComments className="cursor-pointer" onClick={handleComment}/>
        </div>
      </div>
    </div>
  )
}

export default VideoCard