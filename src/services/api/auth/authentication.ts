import axios from 'axios';
import { bearerToken } from '../../headers';
import { serviceUrl } from '../config';

export interface AuthenticateParameters {
  email: string;
  password: string;
}

export async function requestAccessToken(
  refreshToken: string
): Promise<string> {
  const response = await axios.get<{
    access_token: string;
  }>(`${serviceUrl}/auth/sessions/refresh`, {
    headers: bearerToken(refreshToken),
  });

  return response.data.access_token;
}

export async function authenticate({
  email,
  password,
}: AuthenticateParameters) {
  const response = await axios.post<{
    refresh_token: string;
    access_token: string;
  }>(`${serviceUrl}/auth/sessions`, {
    email,
    password,
    description: 'electron-dive-downloader User Login',
  });

  return response.data;
}

export async function logout(accessToken: string): Promise<void> {
  await axios.delete<{
    access_token: string;
  }>(`${serviceUrl}/auth/sessions/`, {
    headers: bearerToken(accessToken),
  });
}
