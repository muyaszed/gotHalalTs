import types from '../Store/actions';
import Api, {Credential} from '../Services/api';
import {Dispatch} from 'redux';
import {saveProfile} from '../Profile/action';
import {FBToken} from '../Screens/SignIn';
import {
  saveErrorMessage,
  showErrorDialog,
  resetErrorFlags,
} from '../Error/action';
import {RootState} from '../Store/reducers';

export type AuthAction =
  | ReturnType<typeof signIn>
  | ReturnType<typeof userSignOut>
  | ReturnType<typeof restoreToken>
  | ReturnType<typeof setLoadingState>;

export const signIn = (token: string) => ({
  type: types.USER_SIGN_IN,
  payload: token,
});

export const setLoadingState = (status: boolean) => ({
  type: types.SET_LOADING_STATE,
  payload: status,
});

export const userSignOut = () => ({
  type: types.USER_SIGN_OUT,
});

export const signOut = () => async (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  const needLogOut = getState().error.needLogOut;
  await Api.Post.userSignout();
  dispatch(userSignOut());
  if (needLogOut) {
    dispatch(resetErrorFlags());
  }
};

export const restoreToken = (newToken: string) => ({
  type: types.RESTORE_TOKEN,
  payload: newToken,
});

export const userSignUp = (credential: Credential) => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch(setLoadingState(true));
    const apiCall = await Api.Post.userSignup(credential);
    const token = apiCall.data.auth_token;
    // await SInfo.setItem('token', token, {});
    dispatch(signIn(token));
    dispatch(
      saveProfile({
        userId: apiCall.data.user.id,
        email: apiCall.data.user.email,
        firstName: apiCall.data.user.profile.first_name
          ? apiCall.data.user.profile.first_name
          : '',
        lastName: apiCall.data.user.profile.last_name
          ? apiCall.data.user.profile.last_name
          : '',
        avatarUri: apiCall.data.user.profile.avatar_uri,
        fbAvatarUri: apiCall.data.user.facebook_auth
          ? apiCall.data.user.facebook_auth.fb_avatar
          : null,
        restaurantPosted: apiCall.data.user.restaurants,
        reviews: apiCall.data.user.reviews,
        bookmark: apiCall.data.user.bookmarked_restaurant,
        checkIns: apiCall.data.user.checkinlist,
        settings: apiCall.data.user.settings,
      }),
    );
    dispatch(setLoadingState(false));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(saveErrorMessage(error.response.data.message));
    dispatch(showErrorDialog());
  }
};

export const userSignIn = (credential: Credential) => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch(setLoadingState(true));
    const apiCall = await Api.Post.userLogin(credential);
    const token = apiCall.data.auth_token;
    // await SInfo.setItem('token', token, {});
    dispatch(signIn(token));
    dispatch(
      saveProfile({
        userId: apiCall.data.user.id,
        email: apiCall.data.user.email,
        firstName: apiCall.data.user.profile.first_name
          ? apiCall.data.user.profile.first_name
          : '',
        lastName: apiCall.data.user.profile.last_name
          ? apiCall.data.user.profile.last_name
          : '',
        avatarUri: apiCall.data.user.profile.avatar_uri,
        fbAvatarUri: apiCall.data.user.facebook_auth
          ? apiCall.data.user.facebook_auth.fb_avatar
          : null,
        restaurantPosted: apiCall.data.user.restaurants,
        reviews: apiCall.data.user.reviews,
        bookmark: apiCall.data.user.bookmarked_restaurant,
        checkIns: apiCall.data.user.checkinlist,
        settings: apiCall.data.user.settings,
      }),
    );
    dispatch(setLoadingState(false));
  } catch (error) {
    console.log(error.response.data.message);
    dispatch(saveErrorMessage(error.response.data.message));
    dispatch(showErrorDialog());
  }
};

export const signInWithFaceBook = (fbToken: FBToken) => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch(setLoadingState(true));
    const apiCall = await Api.Post.fbAuthentication(fbToken);
    const token = apiCall.data.auth_token;
    // await SInfo.setItem('token', token, {});
    dispatch(signIn(token));
    dispatch(
      saveProfile({
        userId: apiCall.data.user.id,
        email: apiCall.data.user.email,
        firstName: apiCall.data.user.profile.first_name
          ? apiCall.data.user.profile.first_name
          : '',
        lastName: apiCall.data.user.profile.last_name
          ? apiCall.data.user.profile.last_name
          : '',
        avatarUri: apiCall.data.user.profile.avatar_uri,
        fbAvatarUri: apiCall.data.user.facebook_auth
          ? apiCall.data.user.facebook_auth.fb_avatar
          : null,
        restaurantPosted: apiCall.data.user.restaurants,
        reviews: apiCall.data.user.reviews,
        bookmark: apiCall.data.user.bookmarked_restaurant,
        checkIns: apiCall.data.user.checkinlist,
        settings: apiCall.data.user.settings,
      }),
    );
    dispatch(setLoadingState(false));
  } catch (error) {
    console.log(error);
  }
};
