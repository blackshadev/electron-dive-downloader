const useProduction = process.env.NODE_ENV === 'production';

export const serviceUrl = useProduction
  ? 'https://api.dive.littledev.nl/api'
  : 'http://api.littledivelog.local/api';

export default serviceUrl;
