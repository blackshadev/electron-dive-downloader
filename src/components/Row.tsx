import styled from 'styled-components';
import styling from '../styling';

const Row = styled.div<{ full?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${styling.form.marginBottom};
`;

export default Row;
