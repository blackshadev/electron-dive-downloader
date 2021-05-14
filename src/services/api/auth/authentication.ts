import axios from 'axios';
import handleAxiosError from '../../axiosErrorHandling';
import { bearerToken, serviceUrl } from '../config';

export interface AuthenticateParameters {
  email: string;
  password: string;
}

export async function requestAccessToken(
  refreshToken: string
): Promise<string> {
  return handleAxiosError(async () => {
    const response = await axios.get<{
      access_token: string;
    }>(`${serviceUrl}/auth/sessions/refresh`, {
      headers: bearerToken(refreshToken),
    });

    return response.data.access_token;
  });
}

export async function authenticate({
  email,
  password,
}: AuthenticateParameters) {
  return handleAxiosError(async () => {
    const response = await axios.post<{
      refresh_token: string;
      access_token: string;
    }>(`${serviceUrl}/auth/sessions`, {
      email,
      password,
      description: 'electron-dive-downloader User Login',
    });

    return response.data;
  });
}

export async function logout(accessToken: string): Promise<void> {
  await axios.delete<{
    access_token: string;
  }>(`${serviceUrl}/auth/sessions/`, {
    headers: bearerToken(accessToken),
  });
}
