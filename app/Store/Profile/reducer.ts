import {RestaurantModel} from '../Restaurant/reducer';
import {ReviewModel} from '../Review/reducer';
import types, {Actions} from '../actions';

interface UserReview extends ReviewModel {
  restaurant_name: string;
}

interface CheckIn {
  id: number;
  restaurant_id: number;
}

interface CheckIns {
  checkin: CheckIn;
  detail: RestaurantModel;
  time: number;
}

export interface UserSettingItems {
  facebook_avatar: boolean;
  distance_unit: 'kilometer' | 'mile';
  [key: string]: string | boolean;
}

export interface UserProfile {
  userId: number | null;
  email: string;
  firstName: string;
  lastName: string;
  avatarUri: string | null;
  fbAvatarUri: string | null;
  restaurantPosted: RestaurantModel[];
  reviews: UserReview[];
  bookmark: RestaurantModel[];
  checkIns: CheckIns[];
  settings: UserSettingItems;
}

export interface UpdatableUserProfile {
  first_name?: string;
  last_name?: string;
  avatar?: string;
}

export const initialProfileState: UserProfile = {
  userId: null,
  email: '',
  firstName: '',
  lastName: '',
  avatarUri: null,
  fbAvatarUri: null,
  restaurantPosted: [],
  reviews: [],
  bookmark: [],
  checkIns: [],
  settings: {
    facebook_avatar: false,
    distance_unit: 'kilometer',
  },
};

export const profileReducer = (
  state = initialProfileState,
  action: Actions,
): UserProfile => {
  switch (action.type) {
    case types.SAVE_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
