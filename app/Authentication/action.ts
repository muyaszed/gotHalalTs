import AsyncStorage from '@react-native-community/async-storage';
import types from '../Store/actions';
import Api, {Credential} from '../Services/api';
import {Dispatch} from 'redux';
import {saveProfile} from '../Profile/action';

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

export const signOut = () => (dispatch: Dispatch) => {
  AsyncStorage.removeItem('userToken');
  dispatch(userSignOut());
};

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
    console.log(token);
    dispatch(signIn(token));
  } catch (error) {
    console.log(error);
  }
  dispatch(
    saveProfile({
      email: apiCall.data.user.email,
      firstName: apiCall.data.user.profile.first_name,
      lastName: apiCall.data.user.profile.last_name,
      avatarUri: apiCall.data.user.profile.avatar_uri,
      restaurantPosted: apiCall.data.user.restaurants,
      reviews: apiCall.data.user.reviews,
      bookmark: apiCall.data.user.bookmarked_restaurant,
    }),
  );
};
