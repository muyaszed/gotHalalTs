import {AuthAction} from '../Authentication/action';
import {RestaurantAction} from '../Restaurant/action';

export type Actions = AuthAction | RestaurantAction;

export default {
  USER_SIGN_IN: 'USER_SIGN_IN' as const,
  RESTORE_TOKEN: 'RESTORE_TOKEN' as const,
  USER_SIGN_OUT: 'USER_SIGN_OUT' as const,
  GETTING_ALL_RESTAURANTS: 'GETTING_ALL_RESTAURANTS' as const,
  GETTING_ALL_RESTAURANTS_SUCCESS: 'GETTING_ALL_RESTAURANTS_SUCCESS' as const,
  GETTING_ALL_RESTAURANTS_FAILED: 'GETTING_ALL_RESTAURANTS_FAILED' as const,
};
