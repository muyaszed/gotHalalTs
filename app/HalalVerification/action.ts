import {Action} from 'redux';
import Api from '../Services/api';
import {RootState} from '../Store/reducers';
import {showToast} from '../Services/helper';
import {ThunkDispatch} from 'redux-thunk';
import {getAllRestaurants} from '../Restaurant/action';
import {saveErrorMessage, showErrorDialog} from '../Error/action';

export const userVerify = (data: FormData) => async (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState,
) => {
  const restaurantId = getState().restaurants.selectedRestaurantId;
  const userId = getState().profile.userId;

  if (userId && restaurantId) {
    try {
      await Api.Post.verification(restaurantId, userId, data);
      showToast('You have successfully submit a verification');
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
