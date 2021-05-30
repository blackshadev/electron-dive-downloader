const useProductionService = process.env.NODE_ENV !== 'production';

export const serviceUrl = useProductionService
  ? 'http://localhost:8000/api'
  : 'https://api.dive.littledev.nl/api';

export default serviceUrl;
