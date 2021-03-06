import { createAction } from '@reduxjs/toolkit';
import { IComputer } from './types';

export const resetComputers = createAction('resetComputers');
export const refreshComputers = createAction('refreshComputers');
export const setComputers = createAction<IComputer[]>('setComputers');
export const selectComputer = createAction<IComputer>('selectComputer');
