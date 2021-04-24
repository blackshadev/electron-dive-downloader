import { DiveState } from './types';

export const getDives = (state: { dives: DiveState }) => state.dives.dives;
export const getDiveCount = (state: { dives: DiveState }) =>
  state.dives.dives.length;
