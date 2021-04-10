import styled from 'styled-components';
import styling from '../styling';
import Button from './Button';

type Size = 'sm' | 'md';

function getSize(size?: Size) {
  switch (size) {
    case 'md':
      return '32px';
    case 'sm':
    default:
      return '16px';
  }
}

interface IconButtonProps {
  rounded?: boolean;
  size?: Size;
}

export default styled(Button)`
  ${(props: IconButtonProps) => (props.rounded ? `border-radius: 50%;` : '')}

  line-height: 0;
  padding: ${(props: IconButtonProps) => styling.spacing[props.size ?? 'sm']};

  svg {
    ${(props: IconButtonProps) => `
    width: ${getSize(props.size)};
    height: ${getSize(props.size)};
  `}
  }
`;
