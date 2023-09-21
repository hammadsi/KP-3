import * as apiCaller from '~utils/apiCaller';
import {rawSessionMock} from '~state/ducks/__mocks__/session.mocks';
import {store} from '~state/store';

import {uploadSession} from '../session.actions';
import {UploadSessionDto} from '../session.interface';

describe('Test session-actions', () => {
  it('uploadSession should correctly POST @ "/sessions"', async () => {
    const data: UploadSessionDto = {...rawSessionMock, userId: '3113213sd'};
    const apiSpy = jest
      .spyOn(apiCaller, 'apiCaller')
      .mockImplementation(() => Promise.resolve());
    await store.dispatch(uploadSession(data));
    expect(apiSpy).toBeCalledWith({
      url: 'sessions',
      data,
      method: 'POST',
    });
  });
});
