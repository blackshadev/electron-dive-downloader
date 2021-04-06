import axios from 'axios';
import handleAxiosError from './axiosErrorHandling';
import { serviceUrl, bearerToken } from './config';

export interface IUserData {
  buddy_count: number;
  computer_count: number;
  dive_count: number;
  email: string;
  inserted: string;
  name: string;
  tag_count: number;
  user_id: number;
}

export async function userInfo(accessToken: string) {
  return handleAxiosError(async () => {
    const response = await axios.get<IUserData>(`${serviceUrl}/user/profile`, {
      headers: bearerToken(accessToken),
    });

    return response.data;
  });
}
