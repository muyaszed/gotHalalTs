import {ReducerWithoutAction} from 'react';

interface AuthState {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null;
}
type Action = 'RESTORE_TOKEN' | 'SIGN_IN' | 'SIGN_OUT';
interface AuthActionType {
  type: Action;
  token: string | null;
}

const AuthReducer = (state: AuthState, action: AuthActionType) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
  }
};

export default AuthReducer;
