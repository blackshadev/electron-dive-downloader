import styled from 'styled-components';
import styling from '../styling';

const StyledProgressBar = styled.progress`
  -webkit-appearance: none;
  width: 100%;

  &::-webkit-progress-inner-element {
    border: 1px solid ${styling.colors.grey};
    border-radius: ${styling.misc.borderRadius};
  }
  &::-webkit-progress-bar {
    background-color: transparent;
  }
  &::-webkit-progress-value {
    background-color: ${styling.colors.primary};
    border-radius: ${styling.misc.borderRadius};
  }
`;

export default function ProgressBar({
  progress,
}: {
  progress: { current: number; maximum: number };
}) {
  return <StyledProgressBar max={progress.maximum} value={progress.current} />;
}
