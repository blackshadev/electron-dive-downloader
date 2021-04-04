import axios from 'axios';

export interface AuthenticateParameters {
  email: string;
  password: string;
}

const serviceUrl = 'https://api.dive.littledev.nl/api';

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

export async function logout(session: string) {
  await axios.delete(`${serviceUrl}/auth/sessions`, {
    headers: {
      Authorization: 'Bearer ' + session,
    },
  });
}
