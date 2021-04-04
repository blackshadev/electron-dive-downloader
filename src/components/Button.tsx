import styled from 'styled-components';
import style from '../styling';

interface InputProps {
  primary?: boolean;
}

const color = (props: InputProps) =>
  props.primary ? style.colors.primary : style.colors.font;

const Button = styled.button<InputProps>`
  color: ${color};
  padding: ${style.spacing.sm} ${style.spacing.md};
  border: 1px solid ${color};
  background: ${style.colors.background};
  border-radius: 0.2rem;
`;

export default Button;
