import {combineReducers} from 'redux';
import {authReducer, AuthState} from '../Authentication/reducer';
import {restaurantReducer, RestaurantState} from '../Restaurant/reducer';

export interface RootState {
  auth: AuthState;
  restaurants: RestaurantState;
}

const reducers = combineReducers({
  auth: authReducer,
  restaurants: restaurantReducer,
});

export default reducers;
