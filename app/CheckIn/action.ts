import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../Store/reducers';
import {updateCurrentProfile} from '../Profile/action';
import {getAllRestaurants} from '../Restaurant/action';
import {showToast} from '../Services/helper';
import Api from '../Services/api';
import {saveErrorMessage, showErrorDialog} from '../Error/action';

export const userCheckin = () => async (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState,
) => {
  const currentUserCheckinList = getState().profile.checkIns;
  const currentUserId = getState().profile.userId;

  const currentRestaurantId = getState().restaurants.selectedRestaurantId;
  if (
    currentUserId &&
    currentRestaurantId &&
    currentUserCheckinList.find(
      (item) => item.checkin.restaurant_id === currentRestaurantId,
    )
  ) {
    const lastCheckinTime = currentUserCheckinList.reduce((prev, curr) => {
      return curr.checkin.restaurant_id === currentRestaurantId &&
        curr.time > prev.time
        ? curr
        : prev;
    }).time;
    const currentTime = Date.now() / 1000;
    const oneDayInSeconds = 24 * 60 * 60;
    if (currentTime - lastCheckinTime > oneDayInSeconds) {
      try {
        await Api.Post.checkin(currentRestaurantId, currentUserId);
        dispatch(updateCurrentProfile());
        dispatch(getAllRestaurants());
        showToast('You have successfully check-in to this place.');
      } catch (error) {
        const errorMessage = error.response
          ? error.response.data.message
          : error.message;
        dispatch(saveErrorMessage(errorMessage));
        dispatch(showErrorDialog());
      }
    } else {
      showToast(
        "You can't check-in now. Pull to refresh content and try again",
      );
    }
  } else {
    try {
      if (currentRestaurantId && currentUserId) {
        await Api.Post.checkin(currentRestaurantId, currentUserId);
        dispatch(updateCurrentProfile());
        dispatch(getAllRestaurants());
        showToast('You have successfully check-in to this place.');
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(saveErrorMessage(errorMessage));
      dispatch(showErrorDialog());
    }
  }
};
