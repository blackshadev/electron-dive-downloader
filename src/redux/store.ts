import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import descriptorSlice, { serializableSelector } from './descriptorSlice';
import { makeSerializable, loadPersistedState } from './persist';

const store = configureStore({
  reducer: {
    descriptors: descriptorSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        'descriptors/setDescriptors',
        'descriptors/selectDescriptor',
      ],
      ignoredPaths: ['descriptors.all'],
    },
  }),
});

store.subscribe(() => {
  const serializableState = makeSerializable(
    store.getState(),
    serializableSelector
  );
  localStorage.setItem('reduxState', JSON.stringify(serializableState));
});

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function getPersistedState(): any {
  const stateString = localStorage.getItem('reduxState');
  return stateString ? JSON.parse(stateString) : {};
}

store.dispatch(loadPersistedState(getPersistedState()));

export default store;
