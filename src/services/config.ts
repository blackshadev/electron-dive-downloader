export const serviceUrl = 'https://api.dive.littledev.nl/api';

export function bearerToken(token: string): { Authorization: string } {
  return { Authorization: `Bearer ${token}` };
}

export default serviceUrl;
