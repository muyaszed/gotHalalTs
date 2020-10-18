import {Action} from 'redux';
import Api from '../Services/api';
import {RootState} from '../Store/reducers';
import {showToast} from '../Services/helper';
import {updateCurrentProfile} from '../Profile/action';
import {ThunkDispatch} from 'redux-thunk';
import {getAllRestaurants} from '../Restaurant/action';
import {saveErrorMessage, showErrorDialog} from '../Error/action';

export const userBookmark = () => async (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState,
) => {
  const restaurantId = getState().restaurants.selectedRestaurantId;
  const userId = getState().profile.userId;

  if (userId && restaurantId) {
    try {
      await Api.Post.bookmark(restaurantId, userId);
      showToast('You have bookmark this place');
      dispatch(updateCurrentProfile());
      dispatch(getAllRestaurants());
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(saveErrorMessage(errorMessage));
      dispatch(showErrorDialog());
    }
  }
};

export const userUnbookmark = () => async (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState,
) => {
  const restaurantId = getState().restaurants.selectedRestaurantId;
  const userId = getState().profile.userId;
  if (userId && restaurantId) {
    try {
      await Api.Post.unbookmark(restaurantId, userId);
      showToast('You have unbookmark this place');
      dispatch(updateCurrentProfile());
      dispatch(getAllRestaurants());
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(saveErrorMessage(errorMessage));
      dispatch(showErrorDialog());
    }
  }
};
