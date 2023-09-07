import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import reduxFlipper from 'redux-flipper';

import appReducer from './ducks/app/app.reducer';
import bluetoothReducer from './ducks/bluetooth/bluetooth.reducer';
import authReducer from './ducks/auth/auth.reducer';
import questionsReducer from './ducks/questions/questions.reducer';
import sessionReducer from './ducks/session/session.reducer';

import rootSaga, {sagaMiddleware} from './rootSaga';

/**
 * Configuration for redux-persist.
 * Redux-persist is responsible for maintaining the state
 * between sessions.
 */
const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
  whitelist: ['app', 'auth', 'bluetooth'],
};

// Initiate the root reducer
export const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  bluetooth: bluetoothReducer,
  questions: questionsReducer,
  session: sessionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Check if development-environment is enabled
const isDev = !['production', 'test', 'integration'].includes(
  process.env.NODE_ENV || '',
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    isDev
      ? getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        })
          .concat(logger)
          .concat(reduxFlipper())
          .concat(sagaMiddleware)
      : getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(sagaMiddleware),
  devTools: isDev,
});

// Start redux-saga
sagaMiddleware.run(rootSaga);

// Create persistor for persisting state
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
