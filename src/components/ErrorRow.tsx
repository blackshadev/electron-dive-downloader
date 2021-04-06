import styled from 'styled-components';
import styling from '../styling';
import Row from './Row';

export default styled(Row)`
  color: ${styling.colors.darkRed};
  background: ${styling.colors.lightRed};
  padding: ${styling.spacing.md};
  border-radius: ${styling.misc.borderRadius};
`;
