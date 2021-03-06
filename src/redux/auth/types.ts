export type AuthState = {
  refreshToken?: string;
  accessToken?: string;
  isLoggedIn: boolean;
};

export interface ICredentials {
  email: string;
  password: string;
}

export type PersistedAuthState = {
  refreshToken?: string;
  accessToken?: string;
};
