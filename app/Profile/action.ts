import {Action} from 'redux';
import types from '../Store/actions';
import {UserProfile} from './reducer';
import Api from '../Services/api';
import {RootState} from '../Store/reducers';
import {ThunkDispatch} from 'redux-thunk';

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
        firstName: apiCall.data.profile.first_name,
        lastName: apiCall.data.profile.last_name,
        avatarUri: apiCall.data.profile.avatar_uri,
        restaurantPosted: apiCall.data.restaurants,
        reviews: apiCall.data.reviews,
        bookmark: apiCall.data.bookmarked_restaurant,
        checkIns: apiCall.data.checkinlist,
      }),
    );
  } catch (error) {}
};
