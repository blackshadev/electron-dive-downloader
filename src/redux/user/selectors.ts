import { UserState } from './types';

export const userInfoSelector = (state: { user: UserState }) =>
  state.user.userData;

export default userInfoSelector;
