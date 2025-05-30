import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// import { FaCloudUploadAlt } from 'react-icons/fa';
// import { MdDelete } from 'react-icons/md';
import axios from 'axios';
// import { SanityAssetDocument } from '@sanity/client';

import useAuthStore from '../store/authStore';
import { client } from '../utils/client';

import { BASE_URL, SINGLE_URL } from '../utils';
import { postDetailQuery } from '../utils/queries';

const Upload = () => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
  // const [wrongFileType, setWrongFileType] = useState(false);
  const [badUrl, setBadUrl] = useState(false);
  // const [caption, setCaption] = useState('');
  const [url, setUrl] = useState('');
  const [savingPost, setSavingPost] = useState(false);

  const { userProfile }: { userProfile: any }  = useAuthStore();
  const router = useRouter();

  // const uploadVideo = async (e: any) => {
  //   const selectedFile = e.target.files[0];
  //   const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

  //   if(fileTypes.includes(selectedFile.type)) {
  //     client.assets.upload('file', selectedFile, {
  //       contentType: selectedFile.type,
  //       filename: selectedFile.name
  //     })
  //     .then((data) => {
  //       setVideoAsset(data);
  //       setIsLoading(false);
  //     })
  //   } else {
  //     setIsLoading(false);
  //     setWrongFileType(true);
  //   }
  // }

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
    // setVideoAsset(undefined);
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
    // <div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 lg:pt-20 bg-[#F8F8F8] justify-center">
    //   <div className="bg-white rounded-lg xl:h-[80vh] w-[60%] flex gap-6 flex-wrap justify-between items-center p-14 pt-6">
    //     <div>
    //       <div>
    //         <p className="text-2xl font-bold">Upload Video</p>
    //         <p className="text-md text-gray-400 mt-1">Post a video to your account</p>
    //       </div>
    //       <div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 lg:w-[650px] lg:h-[388px] h-[219px] w-[350px]">
    //         {isLoading ? (
    //           <p>Uploading...</p>
    //         ) : (
    //           <div>
    //             {videoAsset ? (
    //               <div>
    //                 <video 
    //                   src={videoAsset.url}
    //                   loop
    //                   controls
    //                   className="lg:w-[600px] lg:h-[338px] h-[169px] w-[300px] rounded-xl mt-16 bg-black"
    //                 ></video>
    //               </div>
    //             ) : (
    //               <label className="cursor-pointer">
    //                 <div className=" flex flex-col items-center justify-center h-full">
    //                   <div className=" flex flex-col items-center justify-center">
    //                     <p className="font-bold text-xl">
    //                       <FaCloudUploadAlt className="text-gray-300 text-6xl"/>
    //                     </p>
    //                     <p className="text-xl font-semibold">
    //                       Upload Video
    //                     </p>
    //                   </div>
    //                   <p className="text-gray-400 text-center mt-10 text-sm leading-10">
    //                     MP4 or WebM or ogg <br /> 
    //                     720x1280 or higher <br />
    //                     Up to 10 minutes <br />
    //                     Less than 2GB
    //                   </p>
    //                   <p className="bg-[#00B0F0] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
    //                     Select File
    //                   </p>
    //                 </div>
    //                 <input 
    //                   type="file"
    //                   name="upload-video"
    //                   onChange={uploadVideo}
    //                   className="w-0 h-0"
    //                   />
    //               </label>
    //             )}
    //           </div>
    //         )}
    //         {wrongFileType && (
    //           <p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">Please select a video file</p>
    //         )}
    //       </div>
    //     </div>
    //     <div className="flex flex-col gap-3 pb-10">
    //       <label className="text-md font-medium">Captions</label>
    //       <input
    //         type="text"
    //         value={caption}
    //         onChange={(e) => setCaption(e.target.value)}
    //         className="rounded outline-none text-md border-2 border-gray-200 p-2"
    //       />
    //       <div className="flex gap-6 mt-10">
    //         <button 
    //           onClick={handleDiscard}
    //           type="button"
    //           className="border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none cursor-pointer"
    //         >
    //             Discard
    //         </button>
    //         <button 
    //           onClick={handlePost}
    //           type="button"
    //           className="bg-[#00B0F0] text-white text-md font-medium p-2 rounded w-28 lg:w-44 outline-none cursor-pointer"
    //         >
    //           {savingPost ? "Posting..." : "Post"}
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Upload;