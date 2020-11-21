import {Action} from 'redux';
import Api from '../../Services/api';
import {RootState} from '../reducers';
import {showToast} from '../../Services/helper';
import {ThunkDispatch} from 'redux-thunk';
import {getAllRestaurants} from '../Restaurant/action';
import {saveErrorMessage, showErrorDialog} from '../Error/action';

export const userVerify = (userToken: string, data: FormData) => async (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState,
) => {
  const restaurantId = getState().restaurants.selectedRestaurantId;
  const userId = getState().profile.userId;

  if (userId && restaurantId) {
    try {
      await Api.Post.verification(userToken, restaurantId, userId, data);
      showToast('You have successfully submit a verification');
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
