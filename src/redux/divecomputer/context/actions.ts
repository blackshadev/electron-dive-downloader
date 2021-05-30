import { createAction } from '@reduxjs/toolkit';

export const setContextState = createAction<'ready' | 'uninitialized'>(
  'setState'
);
export default setContextState;
