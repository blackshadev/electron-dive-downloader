import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice, { serializableAuthSelector } from './authSlice';
import descriptorSlice, {
  serializableDescriptorSelector,
} from './descriptorSlice';
import { makeSerializable, loadPersistedState } from './persist';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    descriptors: descriptorSlice,
    auth: authSlice,
    user: userSlice,
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
    serializableDescriptorSelector,
    serializableAuthSelector
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
