import {Action} from 'redux';
import Api from '../../Services/api';
import {RootState} from '../reducers';
import {showToast} from '../../Services/helper';
import {updateCurrentProfile} from '../Profile/action';
import {ThunkDispatch} from 'redux-thunk';
import {getAllRestaurants} from '../Restaurant/action';
import {saveErrorMessage, showErrorDialog} from '../Error/action';

export const userBookmark = (userToken: string) => async (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState,
) => {
  const restaurantId = getState().restaurants.selectedRestaurantId;
  const userId = getState().profile.userId;

  if (userId && restaurantId) {
    try {
      await Api.Post.bookmark(userToken, restaurantId, userId);
      showToast('You have bookmark this place');
      dispatch(updateCurrentProfile(userToken));
      dispatch(getAllRestaurants(userToken));
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(saveErrorMessage(errorMessage));
      dispatch(showErrorDialog());
    }
  }
};

export const userUnbookmark = (userToken: string) => async (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState,
) => {
  const restaurantId = getState().restaurants.selectedRestaurantId;
  const userId = getState().profile.userId;
  if (userId && restaurantId) {
    try {
      await Api.Post.unbookmark(userToken, restaurantId, userId);
      showToast('You have unbookmark this place');
      dispatch(updateCurrentProfile(userToken));
      dispatch(getAllRestaurants(userToken));
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(saveErrorMessage(errorMessage));
      dispatch(showErrorDialog());
    }
  }
};
