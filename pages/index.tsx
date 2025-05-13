
import axios from 'axios';

import { Video, YTVideo } from '../types';
import VideoCard from '../components/VideoCard';
import NoResults from '../components/NoResults';
import { YOUTUBE_URL } from '../utils';

interface IProps {
  videos: Video[]
}

const Home = () => {
  const ytVideos: YTVideo[] = [];
  (async () => {
    const res = await fetch(`${YOUTUBE_URL}`).then(res => res.json());
    // console.log(res.items);
    res.items.map((vid: YTVideo) => {ytVideos.push(vid)})
  })();
  console.log(ytVideos)

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {ytVideos.map((vid: YTVideo) => <p>{vid.etag}</p>)}
      {ytVideos.length ? (
        ytVideos.map((vid: YTVideo) => (
          <NoResults text={'No Videos'} />
          // <VideoCard post={vid} key={vid.id.videoId} />
        ))
      ) : (
        <NoResults text={'No Videos'} />
      )} 
      {/* {videos.length ? (
        videos.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={'No Videos'} />
      )} */}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/post');

  return {
    props: {
      videos: data
    }
  }
}