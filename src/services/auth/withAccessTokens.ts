import axios from 'axios';
import { requestAccessToken } from './authentication';

export default async function withAccessToken<T>(
  getTokens: () => { refreshToken?: string; accessToken?: string },
  requestFn: (token: string) => Promise<T>,
  tokenFn?: (token: string) => void
) {
  try {
    const { accessToken } = getTokens();
    if (!accessToken) {
      throw new Error('No access token set');
    }

    return await requestFn(accessToken);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const { refreshToken } = getTokens();
      if (!refreshToken) {
        throw new Error('No refresh token set');
      }

      const newToken = await requestAccessToken(refreshToken);
      tokenFn?.(newToken.access_token);
      return requestFn(newToken.access_token);
    }

    throw error;
  }
}
