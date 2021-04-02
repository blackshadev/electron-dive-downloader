import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import descriptorSlice from './descriptorSlice';

export default configureStore({
  reducer: {
    descriptors: descriptorSlice,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        'descriptors/setDescriptors',
        'descriptors/selectDescriptor',
      ],
      ignoredPaths: ['descriptors'],
    },
  }),
});
