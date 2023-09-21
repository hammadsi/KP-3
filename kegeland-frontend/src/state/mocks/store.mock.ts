/* istanbul ignore file */
import {
  AnyAction,
  configureStore,
  isAsyncThunkAction,
  Store,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { isFunction } from 'lodash';
import { isFSA } from '@reduxjs/toolkit/src/createAction';

import { rootReducer, RootState } from '../store';
import { initialState as authState } from '../ducks/auth/auth.reducer';
import { initialState as patientsState } from '../ducks/patients/patients.reducer';
import { initialState as questionnairesState } from '../ducks/questionnaires/questionnaires.reducer';
import { initialState as sensorsState } from '../ducks/sensors/sensors.reducer';
import { initialState as sessionState } from '../ducks/sessions/sessions.reducer';
import { initialState as settingsState } from '../ducks/settings/settings.reducer';

type MockState = Omit<RootState, '_persist'>;
type ActionHistory = { type: string; meta: any; payload: any }[];
export type MockStore = Store<MockState, AnyAction> & {
  getActions: () => ActionHistory;
};
export const initialStore: MockState = {
  auth: authState,
  patients: patientsState,
  questionnaires: questionnairesState,
  sensors: sensorsState,
  sessions: sessionState,
  settings: settingsState,
};
export function mockStore(initialState: MockState = initialStore) {
  const actions: ActionHistory = [];
  const listeners: (() => void)[] = [];
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: true,
        thunk: true,
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    preloadedState: initialState,
  });
  const self: Partial<Store<MockState, AnyAction>> & {
    getActions: () => ActionHistory;
  } = {
    getState() {
      return store.getState();
    },
    getActions() {
      return actions;
    },
    dispatch(action: unknown) {
      if (isFSA(action)) {
        const { type, meta, payload } = action;
        actions.push({ type, meta, payload });
        return store.dispatch(action);
      } else {
        return store.dispatch(action as any).then((res: unknown) => {
          if (isAsyncThunkAction(res)) {
            const { type, meta, payload } = res;
            actions.push({ type, meta, payload });
            for (let i = 0; i < listeners.length; i++) {
              listeners[i]();
            }
          }
          return res;
        });
      }
    },
    subscribe(listener: () => void) {
      if (isFunction(listener)) {
        listeners.push(listener);
      }
      return () => {
        const index = listeners.indexOf(listener);
        if (index < 0) {
          return;
        }
        listeners.splice(index, 1);
      };
    },
    replaceReducer(nextReducer) {
      if (!isFunction(nextReducer)) {
        throw new Error('Expected the nextReducer to be a function.');
      }
    },
  };
  return self as MockStore;
}
