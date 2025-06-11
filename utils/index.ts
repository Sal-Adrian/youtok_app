import axios from 'axios';
import { jwtDecode }  from 'jwt-decode';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const YOUTUBE_API = process.env.NEXT_PUBLIC_YOUTUBE_API_TOKEN;
export const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL;
export const SINGLE_URL = process.env.NEXT_PUBLIC_SINGLE_YOUTUBE_URL;

export const createOrGetUser = async (response: any, addUser: any) => {
  let decoded: { name: string, picture: string, sub: string };
  if(response == 'Guest') {
    decoded = {name: 'Barry Bearstain', picture: 'https://static3.depositphotos.com/1000608/109/i/950/depositphotos_1095458-stock-photo-brown-bear.jpg', sub: '44b91ffe-36a9-4ad3-88e1-b29c1e70acfc'}
  } else {
    decoded = jwtDecode(response.credential);
  }

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