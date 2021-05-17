export function bearerToken(token: string): { Authorization: string } {
  return { Authorization: `Bearer ${token}` };
}
export default {
  bearerToken,
};
