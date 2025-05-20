// import { useState } from 'react';
// import axios from 'axios';

import { Video, YTVideo } from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import { YOUTUBE_URL } from '../utils';
import { client } from '../utils/client';
import { postDetailQuery } from '../utils/queries';


interface IProps {
  videos: Video[]
}

const Home = ({ videos }: IProps) => {
  // const [isLoading, setIsLoading] = useState(true);
  
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={'No Videos'} />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  // const { data } = await axios.get('http://localhost:3000/api/post');

  const data: Video[] = [];
  const res = await fetch(`${YOUTUBE_URL}`).then(res => res.json());
  await Promise.all(res.items.map(async (video: YTVideo) => {
    const videoQuery = await client.fetch(postDetailQuery(video.id.videoId));

    if(videoQuery.length > 0){
      data.push(videoQuery[0]);
    } else {
      const newVideo: Video = {
        _id: video.id.videoId,
        caption: video.snippet.title,
        video: video.id.videoId,
        comments: [],
        likes: []
      }
      data.push(newVideo);
    }
  }));
  
  data.push({
    _id: 'NPtGkmkq1P0',
    caption: 'Hold Your Horses',
    video: 'NPtGkmkq1P0',
    comments: [],
    likes: []
  });

  return {
    props: {
      videos: data
    }
  }
}