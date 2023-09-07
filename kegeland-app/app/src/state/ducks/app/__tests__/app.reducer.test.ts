import {anchor, settingsPayload} from '~state/ducks/__mocks__/app.mocks';
import {store} from '~state/store';

import {updateSetting} from '../app.actions';
import appReducer, {setAnchorRoute, initialState} from '../app.reducer';

describe('Test app-reducer', () => {
  it('Should return initial state', () => {
    const state = store.getState().app;
    expect(state).toEqual(initialState);
  });

  it('@app/setAnchorRoute should set anchor route', () => {
    const action = {
      type: setAnchorRoute.type,
      payload: anchor,
    };
    const state = appReducer({...initialState}, action);
    expect(state).toEqual({...initialState, anchorRoute: anchor});
  });

  it('@app/setAnchorRoute with no payload should clear anchor route', () => {
    const action = {
      type: setAnchorRoute.type,
    };
    const state = appReducer({...initialState, anchorRoute: anchor}, action);
    expect(state).toEqual(initialState);
  });

  it('@app/updateSettings should update setting by key-value', () => {
    const action = {
      type: updateSetting.type,
      payload: settingsPayload,
    };
    const state = appReducer(initialState, action);
    const {key, value} = settingsPayload;
    expect(state).toEqual({
      ...initialState,
      settings: {...initialState.settings, [key]: value},
    });
  });
});
