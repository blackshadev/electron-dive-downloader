import styled from 'styled-components';
import styling from '../styling';
import colors from '../styling/colors';

const Select = styled.select`
  height: ${styling.form.height};
  padding: 0 ${styling.spacing.sm};
  border: 0;
  border-bottom: 1px solid ${colors.primary};
`;

export default Select;
