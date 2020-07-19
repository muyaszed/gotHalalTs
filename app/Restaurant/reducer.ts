import {CategoryType} from '../Category/reducer';
import {CuisineType} from '../Cuisine/reducer';
import types, {Actions} from '../Store/actions';
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
  selectedRestaurantId: number | null;
  error: string;
}

export const restaurantInitialState: RestaurantState = {
  list: [],
  isLoading: false,
  selectedRestaurantId: null,
  error: '',
};

export const restaurantReducer = (
  state = restaurantInitialState,
  action: Actions,
): RestaurantState => {
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
    case types.SET_SELECTED_RESTAURANT:
      return {
        ...state,
        selectedRestaurantId: action.payload,
      };
    default:
      return state;
  }
};
