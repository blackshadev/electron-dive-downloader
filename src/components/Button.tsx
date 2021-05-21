import { darken } from 'polished';
import styled, { css } from 'styled-components';
import style from '../styling';

export interface ButtonProps {
  primary?: boolean;
  flat?: boolean;
  outline?: boolean;
  disabled?: boolean;
}

const color = (props: ButtonProps) => {
  if (props.disabled) {
    return style.colors.disabled;
  }

  if (props.primary) {
    return style.colors.primary;
  }

  return style.colors.font;
};

const border = (props: ButtonProps) =>
  props.outline ? `1px solid ${color(props)}` : '0';
const background = (props: ButtonProps) =>
  props.flat || props.outline ? 'transparent' : color(props);
const fontColor = (props: ButtonProps) =>
  props.flat || props.outline ? color(props) : style.colors.background;

export const ButtonCSS = css<ButtonProps>`
  color: ${fontColor};
  padding: ${style.spacing.sm} ${style.spacing.md};
  border: ${border};
  background: ${background};
  border-radius: ${style.misc.borderRadius};
  cursor: pointer;

  &:disabled {
    cursor: disabled;
  }

  &:hover {
    background: ${(props) => darken(0.2, background(props))};
  }
`;

const Button = styled.button<ButtonProps>`
  ${ButtonCSS}
`;

export default Button;
