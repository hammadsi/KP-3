import {
  AnyAction,
  configureStore,
  isAsyncThunkAction,
  Store,
} from '@reduxjs/toolkit';
import {isFunction} from 'lodash';
import {isFSA} from '@reduxjs/toolkit/src/createAction';

import {initialState as appState} from '~state/ducks/app/app.reducer';
import {initialState as authState} from '~state/ducks/auth/auth.reducer';
import {initialState as bluetoothState} from '~state/ducks/bluetooth/bluetooth.reducer';
import {initialState as questionsState} from '~state/ducks/questions/questions.reducer';
import {initialState as sessionState} from '~state/ducks/session/session.reducer';
import {rootReducer, RootState} from '~state/store';
import {sagaMiddleware} from '~state/rootSaga';

type MockState = Omit<RootState, '_persist'>;

type ActionHistory = {type: string; meta: any; payload: any}[];

export type MockStore = Store<MockState, AnyAction> & {
  getActions: () => ActionHistory;
};

export const initialStore: MockState = {
  app: appState,
  auth: authState,
  bluetooth: bluetoothState,
  questions: questionsState,
  session: sessionState,
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
      }).concat(sagaMiddleware),
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
        const {type, meta, payload} = action;
        actions.push({type, meta, payload});
        return store.dispatch(action);
      } else {
        return store.dispatch(action as any).then((res: unknown) => {
          if (isAsyncThunkAction(res)) {
            const {type, meta, payload} = res;
            actions.push({type, meta, payload});
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
