import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import videoSlice from './videoSlice';
import channelSlice from './channelSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    videos: videoSlice,
    channels: channelSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;