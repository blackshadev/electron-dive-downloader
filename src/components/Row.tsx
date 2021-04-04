import styled from 'styled-components';

const Row = styled.div<{ full?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  grid-gap: 2rem;
`;

export default Row;
