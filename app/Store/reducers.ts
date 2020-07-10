import {combineReducers} from 'redux';
import {authReducer, AuthState} from '../Authentication/reducer';
import {restaurantReducer, RestaurantState} from '../Restaurant/reducer';
import {reviewReducer, ReviewState} from '../Review/reducer';

export interface RootState {
  auth: AuthState;
  restaurants: RestaurantState;
  reviews: ReviewState;
}

const reducers = combineReducers({
  auth: authReducer,
  restaurants: restaurantReducer,
  reviews: reviewReducer,
});

export default reducers;
