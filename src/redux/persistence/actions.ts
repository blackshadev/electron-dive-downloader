import { createAction } from '@reduxjs/toolkit';

export const fetchPersistedState = createAction('persistedState.fetch');
export const loadPersistedState = createAction<unknown>('persistedState.load');
export const persistedStateLoaded = createAction('persistedState.loaded');
