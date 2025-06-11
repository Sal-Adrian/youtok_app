import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video, YTVideo } from '../../types';
import { BASE_URL, YOUTUBE_URL } from '../../utils';
import { client } from '../../utils/client';
import { postDetailQuery } from '../../utils/queries';

const Search = ({ videos }: { videos: Video[] }) => {
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
}

export default Search

export const getServerSideProps = async ({ 
  params: { searchTerm }
} : { 
  params: { searchTerm: string } 
}) => {
  const data: Video[] = [];
  const res = await fetch(`${YOUTUBE_URL}&q=${searchTerm}`).then(res => res.json());

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

  return {
    props: {
      videos: data
    }
  }
}