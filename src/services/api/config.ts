const useProduction = process.env.NODE_ENV === 'production';

export const serviceOrigin = useProduction
? 'https://api.dive.littledev.nl'
: 'http://api.littledivelog.local'

export const serviceUrl = `${serviceOrigin}/api`;

export default serviceUrl;
