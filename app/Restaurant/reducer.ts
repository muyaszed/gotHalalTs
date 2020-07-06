import {CategoryType} from '../Category/reducer';
import {CuisineType} from '../Cuisine/reducer';
import {Actions} from '../Store/actions';
import types from '../Store/actions';

interface OnlyIds {
  id: number;
}

interface BookmarkingUser extends OnlyIds {}

interface CheckingIns extends OnlyIds {}

interface Reviews extends OnlyIds {}

export interface RestaurantModel {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
  category: CategoryType;
  cuisine: CuisineType;
  start: string;
  desc: string;
  cover_uri: null | string;
  created_at: string;
  end: string;
  latitude: number;
  longitude: number;
  location: string;
  web: string;
  updated_at: number;
  bookmarking_user: BookmarkingUser[];
  checking_ins: CheckingIns[];
  reviews: Reviews[];
}

export interface RestaurantState {
  list: RestaurantModel[];
  isLoading: boolean;
  error: string;
}

export const restaurantInitialState = {
  list: [],
  isLoading: false,
  error: '',
};

export const restaurantReducer = (
  state = restaurantInitialState,
  action: Actions,
) => {
  switch (action.type) {
    case types.GETTING_ALL_RESTAURANTS:
      return {
        ...state,
        isLoading: true,
      };
    case types.GETTING_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload,
      };
    case types.GETTING_ALL_RESTAURANTS_FAILED:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
