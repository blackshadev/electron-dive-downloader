import { PersistanceState } from './types';

export const isLoaded = (state: { persistance: PersistanceState }) =>
  state.persistance.isLoaded;
export default isLoaded;
