import axios from 'axios';
import { jwtDecode }  from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const YOUTUBE_API = process.env.NEXT_PUBLIC_YOUTUBE_API_TOKEN;
export const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL;
export const SINGLE_URL = process.env.NEXT_PUBLIC_SINGLE_YOUTUBE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: { name: string, picture: string, sub: string } = jwtDecode(response.credential);

  const { name, picture, sub } = decoded;
  
  const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture,
  };
  
  addUser(user);

  await axios.post(`${BASE_URL}/api/auth`, user);
};