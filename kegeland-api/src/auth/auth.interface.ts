export type RefreshResponse = {
  access_token: string;
  expires_in: string;
  token_type: string;
  refresh_token: string;
  id_token: string;
  user_id: string;
  project_id: string;
};

export type RefreshErrorResponse = {
  error: {
    message:
      | 'TOKEN_EXPIRED'
      | 'USER_DISABLED'
      | 'USER_NOT_FOUND'
      | 'INVALID_REFRESH_TOKEN';
  };
};
