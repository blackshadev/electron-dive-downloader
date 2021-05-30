import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from './user/reducer';
import authReducer from './auth/reducer';
import computersReducer from './computers/reducer';
import contextReducer from './divecomputer/context/reducer';
import readerReducer from './divecomputer/reader/reducer';
import descriptorReducer from './divecomputer/descriptor/reducer';
import transportReducer from './divecomputer/transport/reducer';
import loggingReducer from './logging/reducer';
import writerReducer from './writer/reducer';
import persistanceReducer from './persistence/reducer';
import sagas from './sagas';
import { initialize } from './global/actions';
import { fetchPersistedState } from './persistence';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    context: contextReducer,
    descriptors: descriptorReducer,
    reader: readerReducer,
    user: userReducer,
    transport: transportReducer,
    computers: computersReducer,
    writer: writerReducer,
    persistance: persistanceReducer,
    logging: loggingReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});
export type RootState = ReturnType<typeof store.getState>;

sagaMiddleware.run(sagas);

store.dispatch(initialize());

store.dispatch(fetchPersistedState());

export default store;
