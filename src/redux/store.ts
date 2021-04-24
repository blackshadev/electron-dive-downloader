import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { makeSerializable, loadPersistedState } from './persist';
import userReducer from './user/reducer';
import authReducer from './auth/reducer';
import contextReducer from './divecomputer/context/reducer';
import deviceReducer from './divecomputer/device/reducer';
import descriptorReducer from './divecomputer/descriptor/reducer';
import transportReducer from './divecomputer/transport/reducer';
import { serializableAuthSelector } from './auth';
import { serializableDescriptorSelector } from './divecomputer/descriptor';

const store = configureStore({
  reducer: {
    auth: authReducer,
    context: contextReducer,
    descriptors: descriptorReducer,
    device: deviceReducer,
    user: userReducer,
    transport: transportReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export type RootState = ReturnType<typeof store.getState>;

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
