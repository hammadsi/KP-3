import {createAsyncThunk} from '@reduxjs/toolkit';

import {apiCaller} from '~utils/apiCaller';

import {UploadSessionDto, UploadSessionResponse} from './session.interface';

/**
 * Thunk action for uploading the current session stored in state to the database
 * @param param0 the request params
 * @see {@link UploadSessionDto}
 */
export const uploadSession = createAsyncThunk(
  'session/upload',
  async (data: UploadSessionDto) =>
    apiCaller<UploadSessionResponse>({
      url: 'sessions',
      method: 'POST',
      data,
    }),
);
