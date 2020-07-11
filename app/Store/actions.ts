import {AuthAction} from '../Authentication/action';
import {RestaurantAction} from '../Restaurant/action';
import {ReviewAction} from '../Review/action';
import {ProfileAction} from '../Profile/action';

export type Actions =
  | AuthAction
  | RestaurantAction
  | ReviewAction
  | ProfileAction;

export default {
  USER_SIGN_IN: 'USER_SIGN_IN' as const,
  RESTORE_TOKEN: 'RESTORE_TOKEN' as const,
  USER_SIGN_OUT: 'USER_SIGN_OUT' as const,
  GETTING_ALL_RESTAURANTS: 'GETTING_ALL_RESTAURANTS' as const,
  GETTING_ALL_RESTAURANTS_SUCCESS: 'GETTING_ALL_RESTAURANTS_SUCCESS' as const,
  GETTING_ALL_RESTAURANTS_FAILED: 'GETTING_ALL_RESTAURANTS_FAILED' as const,
  SET_SELECTED_RESTAURANT: 'SET_SELECTED_RESTAURANT' as const,
  GETTING_ALL_REVIEWS: 'GETTING_ALL_REVIEWS' as const,
  GETTING_ALL_REVIEWS_SUCCESS: 'GETTING_ALL_REVIEWS_SUCCESS' as const,
  GETTING_ALL_REVIEWS_FAILED: 'GETTING_ALL_REVIEWS_FAILED' as const,
  SAVE_PROFILE: 'SAVE_PROFILE' as const,
};
