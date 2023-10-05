import { combineReducers, configureStore } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage';

import authReducer from './ducks/auth/auth.reducer';
import patientsReducer from './ducks/patients/patients.reducer';
import questionnairesReducer from './ducks/questionnaires/questionnaires.reducer';
import { sensorReducer } from './ducks/sensors/sensors.reducer';
import sessionsReducer from './ducks/sessions/sessions.reducer';
import settingsReducer from './ducks/settings/settings.reducer';
import wheelchairPatientsReducer from './ducks/wheelchairPatients/wheelchairPatients.reducer';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['settings', 'auth'],
};

export const rootReducer = combineReducers({
  settings: settingsReducer,
  auth: authReducer,
  patients: patientsReducer,
  sensors: sensorReducer,
  sessions: sessionsReducer,
  questionnaires: questionnairesReducer,
  wheelchairPatients: wheelchairPatientsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const isDev = !['production', 'test'].includes(process.env.NODE_ENV || '');

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    isDev
      ? getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(logger)
      : getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
  devTools: isDev,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
