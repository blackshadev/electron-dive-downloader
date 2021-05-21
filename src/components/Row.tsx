import styled from 'styled-components';
import styling from '../styling';

const Row = styled.div<{ full?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${styling.form.marginBottom};

  &.full {
    flex-grow: 1;
  }

  &.content-centered {
    justify-content: center;
    align-content: center;
  }
`;

export default Row;
