import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';

import { postDetailQuery } from '../../utils/queries';
import { Video } from '../../types';
import useAuthStore from '../../store/authStore';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

import { BASE_URL } from '../../utils';

interface IProps {
  postDetails: Video,
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState('');
  const [isPostingComment, setIsPostingComment] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const { userProfile }: any = useAuthStore();

  if(!post) return null;

  const onVideoClick = () => {
    if(playing) {
      videoRef.current?.pause();
      setPlaying(false);
    } else {
      videoRef.current?.play();
      setPlaying(true)
    }
  }

  useEffect(() => {
    if(post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const handleLike = async (like: boolean) => {
    if(userProfile) {
      const {data} = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post.video,
        postTitle: post.caption,
        like
      });

      setPost({ ...post, likes: data.likes });
    }
  }

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if(userProfile && comment) {
      setIsPostingComment(true);

      const likes: any[] = post.likes;
      const filterLikes = likes?.filter((item) => item._ref === userProfile?._id);
      if(filterLikes?.length < 1){
        await handleLike(true);
      }

      const res = await axios.put(`${BASE_URL}/api/post/${post.video}`, {
        userId: userProfile._id,
        comment,
      });

      setPost({ ...post, comments: res.data.comments });
      setComment('');
      setIsPostingComment(false);
    }
  }

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
            <iframe className="lg:w-[800px] lg:h-[452px] h-[169px] w-[300px]"
              src={`https://www.youtube.com/embed/${postDetails.video}`}>
            </iframe>
        {/* <div className="relative">
          <div className="lg:w-[800px] lg:h-[452px] h-[169px] w-[300px]">
            <video 
              ref={videoRef}
              loop
              onClick={onVideoClick}
              src={post.video.asset.url}
              className="h-full cursor-pointer"
            >
            </video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button>
                <BsFillPlayFill onClick={onVideoClick} className="text-white text-6xl lg:text-8xl"/>
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => {setIsVideoMuted(false)}}>
              <HiVolumeOff className="text-white text-2xl lg:text-4xl"/>
            </button>
          ) : (
            <button onClick={() => {setIsVideoMuted(true)}}>
              <HiVolumeUp className="text-white text-2xl lg:text-4xl"/>
            </button>
          )}
        </div> */}
      </div>
      <div className="relative w-[1000px] md-[900px] lg:w-[500px]">
        <div className="lg:mt-2 mt-10">
          {/* <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
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
                <div className="mt-3 flex flex-col gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName} {` `}
                    <GoVerified className="text-blue-400 text-md"/>
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">{post.postedBy.userName}</p>
                </div>
              </Link>
            </div>
          </div> */}
          <p className="px-10 text-lg text-gray-600 mt-10">{post.caption}</p>
          <div className="p-3 px-10">
            {userProfile && (
              <LikeButton 
                likes={post.likes}
                handleLike={() => {handleLike(true)}}
                handleDislike={() => {handleLike(false)}}
              />
            )}
          </div>
          <Comments 
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({
  params: { id }
}: {
  params: { id: string }
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: data }
  }
}

export default Detail;