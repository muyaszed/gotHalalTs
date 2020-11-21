import types, {Actions} from '../actions';

export interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
}

export const authInitialState: AuthState = {
  isLoading: false,
  isSignout: true,
  userToken: null,
};

export const authReducer = (
  state = authInitialState,
  action: Actions,
): AuthState => {
  switch (action.type) {
    case types.USER_SIGN_IN:
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      };
    case types.RESTORE_TOKEN:
      return {
        ...state,
        isSignout: false,
        userToken: action.payload,
      };
    case types.USER_SIGN_OUT:
      return {
        ...state,
        isSignout: true,
        userToken: null,
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
