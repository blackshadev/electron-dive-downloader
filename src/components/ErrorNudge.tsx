import React from 'react';
import styled from 'styled-components';
import styling from '../styling';
import IconButton from './IconButton';
import { ReactComponent as CloseIcon } from '../../assets/icons/fa/times-solid.svg';

export const ErrorNudgeDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: ${styling.spacing.md};
  border: 1px solid ${styling.colors.darkRed};
  border-radius: ${styling.misc.borderRadius};
  background: ${styling.colors.lightRed};
`;

const ErrorMessage = styled.span`
  flex-grow: 1;
  padding: ${styling.spacing.md};
  color: ${styling.colors.darkRed};
`;

export default function ErrorNudge({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <ErrorNudgeDiv>
      <ErrorMessage>{message}</ErrorMessage>
      <IconButton flat onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </ErrorNudgeDiv>
  );
}
