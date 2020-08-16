import {combineReducers} from 'redux';
import {authReducer, AuthState} from '../Authentication/reducer';
import {restaurantReducer, RestaurantState} from '../Restaurant/reducer';
import {reviewReducer, ReviewState} from '../Review/reducer';
import {UserProfile, profileReducer} from '../Profile/reducer';
import {ErrorState, errorReducer} from '../Error/reducer';

export interface RootState {
  auth: AuthState;
  restaurants: RestaurantState;
  reviews: ReviewState;
  profile: UserProfile;
  error: ErrorState;
}

const reducers = combineReducers({
  auth: authReducer,
  restaurants: restaurantReducer,
  reviews: reviewReducer,
  profile: profileReducer,
  error: errorReducer,
});

export default reducers;
