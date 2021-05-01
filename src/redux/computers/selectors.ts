import { createSelector } from 'reselect';
import { ComputerState, IComputerIdentity } from './types';

const getComputerState = (state: { computers: ComputerState }) =>
  state.computers;

export const getComputers = createSelector(
  getComputerState,
  (state) => state.computers
);

function computerEquality(a: IComputerIdentity, b: IComputerIdentity) {
  return a.serial === b.serial && a.model === b.model;
}

export const getSelectedComputer = createSelector(getComputerState, (state) => {
  const { selectedComputer } = state;

  if (!selectedComputer) {
    return undefined;
  }

  return state.computers?.find((c) => computerEquality(c, selectedComputer));
});

export const getLastFingerprint = createSelector(
  getSelectedComputer,
  (computer) => computer?.lastFingerprint
);
