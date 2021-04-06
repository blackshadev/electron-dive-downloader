import axios from 'axios';
import handleAxiosError from './axiosErrorHandling';
import { bearerToken, serviceUrl } from './config';

export interface AuthenticateParameters {
  email: string;
  password: string;
}

export async function requestAccessToken(
  refreshToken: string
): Promise<{ access_token: string }> {
  return handleAxiosError(async () => {
    const response = await axios.get<{
      access_token: string;
    }>(`${serviceUrl}/auth/sessions/refresh`, {
      headers: bearerToken(refreshToken),
    });

    return response.data;
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

export async function logout(refreshToken: string) {
  await axios.delete(`${serviceUrl}/auth/sessions`, {
    headers: bearerToken(refreshToken),
  });
}