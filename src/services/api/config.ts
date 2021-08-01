const useDevService = process.env.NODE_ENV !== 'production';

export const serviceUrl = useDevService
  ? 'http://localhost:8000/api'
  : 'https://api.dive.littledev.nl/api';

export default serviceUrl;
