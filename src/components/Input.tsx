import styled from 'styled-components';
import styling from '../styling';

const Input = styled.input`
  outline: none;
  height: ${styling.form.height};
  border: 0;
  border-bottom: 1px solid ${styling.colors.darkGrey};
  background: ${styling.colors.inputBackground};
  border-radius: ${styling.misc.borderRadius} ${styling.misc.borderRadius} 0 0;
  margin-bottom: 1px;
  padding: 0 ${styling.spacing.sm};

  &:focus,
  &:active {
    background: ${styling.colors.grey};
    border-color: ${styling.colors.primary};
    border-width: 2px;
    margin-bottom: 0;
  }
`;

export default Input;
