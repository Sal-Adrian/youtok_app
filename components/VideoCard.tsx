import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
// import Image from 'next/image';
import Link from 'next/link';
// import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
// import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { FaComments } from "react-icons/fa";
// import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import { Video, YTVideo } from '../types';
import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';
import LikeButton from './LikeButton';

interface IProps {
  post: YTVideo;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  // OLD VIDEO CARD
  // const [isHover, setIsHover] = useState(false);
  // const [playing, setPlaying] = useState(false);
  // const [isVideoMuted, setIsVideoMuted] = useState(false);
  // const videoRef = useRef<HTMLVideoElement>(null);
  
  // const onVideoPress = () => {
  //   if(playing) {
  //     videoRef.current?.pause();
  //     setPlaying(false);
  //   } else {
  //     videoRef.current?.play();
  //     setPlaying(true)
  //   }
  // }

  // useEffect(() => {
  //   if(videoRef?.current) {
  //     videoRef.current.muted = isVideoMuted;
  //   }
  // }, [isVideoMuted]);

  const [postData, setPostData] = useState(post);
  const { userProfile }: any = useAuthStore();

  const handleLike = async (like: boolean) => {
    if(userProfile) {
      const {data} = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: postData.etag,
        postTitle: postData.snippet.title,
        like
      });

      setPostData({ ...postData, likes: data.likes });
    }
  }

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">

      <iframe className="lg:w-[600px] lg:h-[338px] h-[169px] w-[300px] rounded-2xl bg-gray-100"
        src={`https://www.youtube.com/embed/${postData.etag}`}>
      </iframe>

      <div className="flex items-center justify-between lg:w-[600px] w-[300px]">
        {userProfile && (
          <LikeButton 
            likes={postData.likes}
            handleLike={() => {handleLike(true)}}
            handleDislike={() => {handleLike(false)}}
          />
        )}
        <div className="text-lg md:text-2xl mt-2 p-2 md:p-4 flex-wrap cursor-pointer">
          <Link href={`/detail/${postData.etag}`}>
            <FaComments />
          </Link>
        </div>
      </div>
      {/* OLD VIDEO CARD */}
      {/* Posted By Username & Pic */}
      {/* <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image 
                  width={62} 
                  height={62} 
                  className="rounded-full" 
                  src={post.postedBy.image} 
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName} {` `}
                  <GoVerified className="text-blue-400 text-md"/>
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">{post.postedBy.userName}</p>
              </div>
            </Link>
          </div>
        </div>
      </div> */}
      {/* Video Player */}
      {/* <div className="lg:ml-20 flex gap-4 relative mb-5">
        <div 
          onMouseEnter={() => setIsHover(true)} 
          onMouseLeave={() => setIsHover(false)} 
        className="rounded-3xl">
          <Link href={`/detail/${post._id}`}>
            <video
              loop
              ref={videoRef}
              className="lg:w-[600px] lg:h-[338px] h-[169px] w-[300px] rounded-2xl cursor-pointer bg-gray-100"
            src={post.video.asset.url}>
            </video>
          </Link>
          {isHover && (
            <div className="absolute cursor-pointer flex justify-between lg:w-[600px] w-[300px]">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl"/>
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl"/>
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => {setIsVideoMuted(false)}}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl"/>
                </button>
              ) : (
                <button onClick={() => {setIsVideoMuted(true)}}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl"/>
                </button>
              )}
            </div>
          )}
        </div>
      </div> */}
    </div>
  )
}

export default VideoCard