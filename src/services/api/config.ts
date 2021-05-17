export const serviceUrl =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000/api'
    : 'https://api.dive.littledev.nl/api';

export default serviceUrl;
