import AsyncStorage from '@react-native-community/async-storage';
import types from '../Store/actions';
import Api, {Credential} from '../Services/api';
import {Dispatch, Action} from 'redux';
import {RootState} from 'app/Store/reducers';

export type AuthAction =
  | ReturnType<typeof signIn>
  | ReturnType<typeof userSignOut>
  | ReturnType<typeof restoreToken>;

export const signIn = (token: string) => ({
  type: types.USER_SIGN_IN,
  payload: token,
});

export const userSignOut = () => ({
  type: types.USER_SIGN_OUT,
});

export const restoreToken = (newToken: string) => ({
  type: types.RESTORE_TOKEN,
  payload: newToken,
});

export const userSignIn = (credential: Credential) => async (
  dispatch: Dispatch,
) => {
  const apiCall = await Api.Post.userLogin(credential);
  const token = apiCall.data.auth_token;
  try {
    await AsyncStorage.setItem('userToken', token);
    dispatch(signIn(token));
  } catch (error) {
    console.log(error);
  }
};
