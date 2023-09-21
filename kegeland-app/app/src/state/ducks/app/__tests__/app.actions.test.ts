import {settingsPayload} from '~state/ducks/__mocks__/app.mocks';
import {store} from '~state/store';

import {updateSetting} from '../app.actions';

describe('Test app-actions', () => {
  it('should call updateSetting', async () => {
    const call = store.dispatch(updateSetting(settingsPayload));
    expect(call).toStrictEqual({
      type: updateSetting.type,
      payload: settingsPayload,
    });
  });
});
