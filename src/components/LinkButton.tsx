import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonCSS } from './Button';

const style = styled(Link)`
  ${ButtonCSS}
  text-decoration: none;
`;

export default style;
