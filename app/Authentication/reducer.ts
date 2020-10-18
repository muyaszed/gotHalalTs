import types, {Actions} from '../Store/actions';

export interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
}

export const authInitialState: AuthState = {
  isLoading: false,
  isSignout: true,
};

export const authReducer = (
  state = authInitialState,
  action: Actions,
): AuthState => {
  switch (action.type) {
    case types.USER_SIGN_IN:
      return {
        ...state,
        isLoading: false,
        isSignout: false,
      };
    case types.USER_SIGN_OUT:
      return {
        ...state,
        isSignout: true,
      };
    case types.SET_LOADING_STATE:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
