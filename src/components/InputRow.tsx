import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import styling from '../styling';
import Label from './Label';
import Row from './Row';

const InputContainer = styled.div`
  display: flex;
  align-items: center;

  & > * {
    margin-right: ${styling.spacing.sm};
  }
`;

const StyledRow = styled(Row)`
  height: ${styling.spacing.lg};

  ${Label} {
    min-width: 8rem;
  }
  ${InputContainer} {
    flex-grow: 1;

    ${Label} {
      min-width: auto;
    }

    .-grow {
      flex-grow: 1;
    }
  }
`;

export default function InputRow({
  label,
  name,
  children,
}: PropsWithChildren<{ label: string | React.ReactNode; name: string }>) {
  const labelElement =
    typeof label === 'string' ? <Label htmlFor={name}>{label}</Label> : label;

  return (
    <StyledRow>
      {labelElement}
      <InputContainer>{children}</InputContainer>
    </StyledRow>
  );
}
