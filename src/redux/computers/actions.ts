import { createAction } from '@reduxjs/toolkit';
import { IComputer, IComputerIdentity } from './types';

export const resetComputers = createAction('resetComputers');
export const setComputers = createAction<IComputer[]>('setComputers');
export const selectComputer = createAction<IComputerIdentity>('selectComputer');
