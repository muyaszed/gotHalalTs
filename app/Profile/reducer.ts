import {RestaurantModel} from '../Restaurant/reducer';
import {ReviewModel} from '../Review/reducer';
import types, {Actions} from '../Store/actions';

interface UserReview extends ReviewModel {
  restaurant_name: string;
}

interface CheckIn {
  id: number;
}

interface CheckIns {
  checkin: CheckIn;
  detail: RestaurantModel;
}

export interface UserProfile {
  userId: number | null;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUri: string | null;
  restaurantPosted: RestaurantModel[];
  reviews: UserReview[];
  bookmark: RestaurantModel[];
  checkIns: CheckIns[];
}

export const initialProfileState = {
  userId: null,
  email: '',
  firstName: '',
  lastName: '',
  avatarUri: null,
  restaurantPosted: [],
  reviews: [],
  bookmark: [],
  checkIns: [],
};

export const profileReducer = (
  state = initialProfileState,
  action: Actions,
) => {
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
