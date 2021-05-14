// export const serviceUrl = 'https://api.dive.littledev.nl/api';
export const serviceUrl = 'http://littledive.local/api';

export function bearerToken(token: string): { Authorization: string } {
  return { Authorization: `Bearer ${token}` };
}

export default serviceUrl;
