export enum UserRole {
  PATIENT = 'patient',
  PHYSICIAN = 'physician',
}

export enum Token {
  ACCESS_TOKEN = '@access_token',
  ID_TOKEN = '@id_token',
  REFRESH_TOKEN = '@refresh_token',
}

/**
 * How often to refresh the auth tokens
 */
export const REFRESH_INTERVAL_MS = 50 * 60 * 1000; // every 50th minute
