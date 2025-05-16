// import { useState } from 'react';
// import axios from 'axios';

import { Video, YTVideo } from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import { YOUTUBE_URL } from '../utils';


interface IProps {
  videos: YTVideo[]
}

const Home = ({ videos }: IProps) => {
  // const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: YTVideo) => (
          <VideoCard post={video} key={video.id.videoId} />
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

  const data: YTVideo[] = [];
  // const res = await fetch(`${YOUTUBE_URL}`).then(res => res.json());
  // res.items.map((vid: YTVideo) => {data.push(vid); console.log(vid)});
  
  data.push({
    etag: 'string',
    id: {
      kind: 'string;',
      videoId: 'NPtGkmkq1P0',
    },
    kind: 'string;',
    snippet: {
      channelId: 'string;',
      channelTitle: 'UTS',
      description: 'string;',
      liveBroadcastContent: 'string;',
      publishTime: 'string;',
      publishedAt: 'string;',
      thumbnails: {
        default: {
          height: 100,
          url: 'string;',
          width: 100,
        },
        high: {
          height: 100,
          url: 'string;',
          width: 100,
        },
        medium: {
          height: 100,
          url: 'string;',
          width: 100,
        },
      },
      title: 'Hold Your Horses',
    },
    likes: []
  });

  return {
    props: {
      videos: data
    }
  }
}