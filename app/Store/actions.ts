import {AuthAction} from './Authentication/action';
import {RestaurantAction} from './Restaurant/action';
import {ReviewAction} from './Review/action';
import {ProfileAction} from './Profile/action';
import {ErrorAction} from './Error/action';

export type Actions =
  | AuthAction
  | RestaurantAction
  | ReviewAction
  | ProfileAction
  | ErrorAction;

export default {
  USER_SIGN_IN: 'USER_SIGN_IN' as const,
  RESTORE_TOKEN: 'RESTORE_TOKEN' as const,
  USER_SIGN_OUT: 'USER_SIGN_OUT' as const,
  SET_LOADING_STATE: 'SET_LOADING_STATE' as const,
  GETTING_ALL_RESTAURANTS: 'GETTING_ALL_RESTAURANTS' as const,
  GETTING_ALL_RESTAURANTS_SUCCESS: 'GETTING_ALL_RESTAURANTS_SUCCESS' as const,
  GETTING_ALL_RESTAURANTS_FAILED: 'GETTING_ALL_RESTAURANTS_FAILED' as const,
  SET_SELECTED_RESTAURANT: 'SET_SELECTED_RESTAURANT' as const,
  GETTING_ALL_REVIEWS: 'GETTING_ALL_REVIEWS' as const,
  GETTING_ALL_REVIEWS_SUCCESS: 'GETTING_ALL_REVIEWS_SUCCESS' as const,
  GETTING_ALL_REVIEWS_FAILED: 'GETTING_ALL_REVIEWS_FAILED' as const,
  SETTING_NEW_REVIEW_SUCCESS: 'SETTING_NEW_REVIEW_SUCCESS' as const,
  SETTING_NEW_REVIEW_FAILED: 'SETTING_NEW_REVIEW_FAILED' as const,
  SAVE_PROFILE: 'SAVE_PROFILE' as const,
  SHOW_ERROR_DIALOG: 'SHOW_ERROR_DIALOG' as const,
  CLOSE_ERROR_DIALOG: 'CLOSE_ERROR_DIALOG' as const,
  SAVE_ERROR_MESSAGE: 'SAVE_ERROR_MESSAGE' as const,
  RESET_ERROR_FLAGS: 'RESET_ERROR_FLAGS' as const,
};
