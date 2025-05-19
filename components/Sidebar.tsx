import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { FaUser } from "react-icons/fa";
import { ImCancelCircle } from 'react-icons/im';
import Discover from './Discover';
import Footer from './Footer';
import SuggestedAccounts from './SuggestedAccounts';

import { BASE_URL } from '../utils';
import useAuthStore from '../store/authStore';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  const { userProfile }: any = useAuthStore();

  const normalLink = `flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start 
  cursor-pointer font-semibold text-[#00B0F0] rounded`;

  return (
    <div>
    {userProfile && (
      <div>
        <div className="block xl:hidden m-2 ml-4 mt-3 text-xl" onClick={() => setShowSidebar((prev) => !prev)}>
          {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
        </div>
        {showSidebar && (
          <div className="xl:w-70 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
            <div className="xl:border-b-2 border-gray-200 xl:pb-4">
              <Link href="/">
                <div className={normalLink}>
                  <p className="text-2xl">
                    <AiFillHome />
                  </p>
                  <span className="text-xl hidden xl:block">
                    For You
                  </span>
                </div>
              </Link>
            </div>
            <div className="xl:border-b-2 border-gray-200 xl:pb-4 mt-3">
              <Link href={`/profile/${userProfile._id}`}>
                <div className={normalLink}>
                  <p className="text-2xl">
                    <FaUser />
                  </p>
                  <span className="text-xl hidden xl:block">
                    Your Profile
                  </span>
                </div>
              </Link>
            </div>
            {/* {!userProfile && (
              <div className="px-2 py-4 hidden xl:block">
                <p className="text-gray-400">Log in to like and comment on videos</p>
                <div className="pr-4">
                  <GoogleLogin 
                  clientId="" 
                  render={(renderProps) => (
                    <button  className="cursor-pointer big-white text-lg text-[#00B0F0] border-[1px] border-[#00B0F0] font-semibold px-6 py-3 rounded-md outline-none w-full mt-3 hover:text-white hover:bg-[#00B0F0]" 
                    onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      Log in
                    </button>
                  )}
                  onSuccess={() => {}} 
                  onFailure={() => {}} 
                  cookiePolicy='single_host_origin'/>
                </div>
              </div>
            )}

            <Discover /> */}
            <SuggestedAccounts />
            <Footer />
          </div>
        )}
      </div> 
    )}
    </div>
  )
}

export default Sidebar