import {Action} from 'redux';
import types from '../Store/actions';
import {UserProfile} from './reducer';
import Api from '../Services/api';
import {RootState} from '../Store/reducers';
import {ThunkDispatch} from 'redux-thunk';
import {saveErrorMessage, showErrorDialog} from '../Error/action';

export type ProfileAction = ReturnType<typeof saveProfile>;

export const saveProfile = (profile: UserProfile) => ({
  type: types.SAVE_PROFILE,
  payload: profile,
});

export const updateCurrentProfile = (userToken: string) => async (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState,
) => {
  const userId = getState().profile.userId;

  try {
    const apiCall = await Api.Get.user(userToken, userId!);

    dispatch(
      saveProfile({
        userId: apiCall.data.id,
        email: apiCall.data.email,
        firstName: apiCall.data.profile.first_name
          ? apiCall.data.profile.first_name
          : '',
        lastName: apiCall.data.profile.last_name
          ? apiCall.data.profile.last_name
          : '',
        avatarUri: apiCall.data.profile.avatar_uri,
        fbAvatarUri: apiCall.data.facebook_auth
          ? apiCall.data.facebook_auth.fb_avatar
          : null,
        restaurantPosted: apiCall.data.restaurants,
        reviews: apiCall.data.reviews,
        bookmark: apiCall.data.bookmarked_restaurant,
        checkIns: apiCall.data.checkinlist,
        settings: apiCall.data.settings,
      }),
    );
  } catch (error) {}
};

export const updateUserProfile = (
  userToken: string,
  userData: any,
  cuurentUserId: number,
) => async (dispatch: ThunkDispatch<RootState, void, Action>) => {
  try {
    await Api.Put.profile(userToken, userData, cuurentUserId);
    dispatch(updateCurrentProfile(userToken));
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    dispatch(saveErrorMessage(errorMessage));
    dispatch(showErrorDialog());
  }
};
