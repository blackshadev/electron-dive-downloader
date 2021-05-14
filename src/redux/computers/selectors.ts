import { createSelector } from 'reselect';
import { ComputerState, IComputer, IComputerIdentity } from './types';

const getComputerState = (state: { computers: ComputerState }) =>
  state.computers;

export const getComputers = createSelector(
  getComputerState,
  (state) => state.computers
);

function computerEquality(a: IComputerIdentity, b: IComputerIdentity) {
  return a.serial === b.serial;
}

export function findComputer(
  computers: IComputer[],
  target: IComputerIdentity
): IComputer | undefined {
  return computers.find((c) => computerEquality(c, target));
}

export const getSelectedComputer = (state: { computers: ComputerState }) =>
  state.computers.selectedComputer;
