import {RestaurantModel} from '../Restaurant/reducer';
import {ReviewModel} from '../Review/reducer';
import types, {Actions} from '../Store/actions';

interface UserReview extends ReviewModel {
  restaurantName: string;
}

export interface UserProfile {
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarUri: string | null;
  restaurantPosted: RestaurantModel[];
  reviews: UserReview | [];
  bookmark: RestaurantModel[];
}

export const initialProfileState = {
  email: '',
  firstName: '',
  lastName: '',
  avatarUri: null,
  restaurantPosted: [],
  reviews: [],
  bookmark: [],
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
