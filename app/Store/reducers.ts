import {combineReducers} from 'redux';
import {authReducer, AuthState} from '../Authentication/reducer';

export interface RootState {
  auth: AuthState;
}

const reducers = combineReducers({
  auth: authReducer,
});

export default reducers;
