import styled from 'styled-components';
import styling from '../styling';
import Button from './Button';

type Size = 'sm' | 'md' | 'lg' | 'xl';

function getSize(size?: Size) {
  switch (size) {
    case 'xl':
      return '64px';
    case 'lg':
      return '48px';
    case 'md':
      return '32px';
    case 'sm':
    default:
      return '16px';
  }
}

function getSpacing(size?: Size) {
  switch (size) {
    case 'xl':
    case 'lg':
      return styling.spacing.lg;
    case 'md':
      return styling.spacing.md;
    default:
      return styling.spacing.sm;
  }
}

interface IconButtonProps {
  rounded?: boolean;
  size?: Size;
}

export default styled(Button)`
  ${(props: IconButtonProps) => (props.rounded ? `border-radius: 50%;` : '')}

  line-height: 0;
  padding: ${(props: IconButtonProps) => getSpacing(props.size)};

  svg {
    ${(props: IconButtonProps) => `
    width: ${getSize(props.size)};
    height: ${getSize(props.size)};
  `}
  }
`;
