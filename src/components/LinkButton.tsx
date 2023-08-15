import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonCSS, ButtonProps } from './Button';

const style = styled(Link)<ButtonProps>`
  ${ButtonCSS}
  text-decoration: none;
`;

export default style;
