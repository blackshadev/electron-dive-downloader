import { createAction } from '@reduxjs/toolkit';
import { Dive } from './types';

export const addDive = createAction<Dive>('addDive');
export const selectDive = createAction('selectDive');
