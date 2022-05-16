import { createGlobalStyle } from 'styled-components';
import latoWoff2 from '../assets/fonts/Lato/lato-v17-latin-regular.woff2';
import latoWoff from '../assets/fonts/Lato/lato-v17-latin-regular.woff';

export default createGlobalStyle`
/* lato-regular - latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  src: local(''),
       url(${latoWoff2}) format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url(${latoWoff}) format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
`;
