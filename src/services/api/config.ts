const useProduction = process.env.NODE_ENV === 'production';

export const serviceUrl = useProduction
  ? 'https://api.dive.littledev.nl/api'
  : 'http://localhost:8000/api';

export default serviceUrl;
