import styled from 'styled-components';
import style from '../styling';

const Button = styled.button<{ primary?: boolean }>`
  background: ${(props) =>
    props.primary ? style.colors.primary : style.colors.white};
  border: 0;
`;

export default Button;
