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
      </div>
      <div className="relative w-[1000px] md-[900px] lg:w-[500px]">
        <div className="lg:mt-2 mt-10">
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