// import { useState } from 'react';
// import Image from 'next/image';
// import { GoVerified } from 'react-icons/go';
// import axios from 'axios';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import { IUser, Video, YTVideo } from '../../types';
import { BASE_URL, YOUTUBE_URL } from '../../utils';
import { client } from '../../utils/client';
import { postDetailQuery } from '../../utils/queries';
// import useAuthStore from '../../store/authStore';

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

// const Search = ({ videos }: { videos: YTVideo[] }) => {
//   console.log(videos)
//   const [isAccounts, setIsAccounts] = useState(false);

//   const router = useRouter();
//   const { searchTerm }: any = router.query;
//   const { allUsers }: { allUsers: IUser[] } = useAuthStore();
//   const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
//   const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
//   const searchedAccounts = allUsers?.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div className="w-full">
//       <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-what w-full">
//         <p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} 
//         onClick={() => setIsAccounts(true)}>Accounts</p>
//         <p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} 
//         onClick={() => setIsAccounts(false)}>Videos</p>
//       </div>
//       {isAccounts ? (
//         <div className="md:mt-16">
//           {searchedAccounts.length > 0 ? (
//             searchedAccounts.map((user: IUser, idx: number) => (
//               <Link href={`/profile/${user._id}`} key={idx}>
//                 <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
//                   <div>
//                     <Image
//                       src={user.image}
//                       width={50}
//                       height={50}
//                       className="rounded-full"
//                       alt="user profile"
//                     />
//                   </div>
//                   <div className="hidden xl:block">
//                     <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
//                       {user.userName.replaceAll(' ','')}
//                       <GoVerified className="text-blue-400" />
//                     </p>
//                     <p className="capitalize text-gray-400 text-xs">
//                       {user.userName}
//                     </p>
//                   </div>
//                 </div>
//               </Link>
//             ))
//           ) : <NoResults text={`No video results for ${searchTerm}`} />}
//         </div>
//         ) : <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
//           {videos.length ? (
//             videos.map((video: YTVideo, idx: number) => (
//               <VideoCard post={video} key={idx}/>
//             ))
//           ) : <NoResults text={`No video results for ${searchTerm}`} />}
//         </div>
//       }
//     </div>
//   )
// }


// export const getServerSideProps = async ({ 
//   params: { searchTerm }
// } : { 
//   params: { searchTerm: string } 
// }) => {
//   const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

//   return {
//     props: { videos: res.data }
//   }
// }

// export default Search