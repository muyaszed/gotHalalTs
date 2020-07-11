import types from '../Store/actions';
import {UserProfile} from './reducer';

export type ProfileAction = ReturnType<typeof saveProfile>;

export const saveProfile = (profile: UserProfile) => ({
  type: types.SAVE_PROFILE,
  payload: profile,
});
