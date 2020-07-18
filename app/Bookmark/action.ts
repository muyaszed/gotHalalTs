import {Action} from 'redux';
import Api from '../Services/api';
import {RootState} from '../Store/reducers';
import {showToast} from '../Services/helper';
import {updateCurrentProfile} from '../Profile/action';
import {ThunkDispatch} from 'redux-thunk';
import {getAllRestaurants} from '../Restaurant/action';

export const userBookmark = (userToken: string) => async (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState,
) => {
  const restaurantId = getState().restaurants.selectedRestaurantId;
  const userId = getState().profile.userId;
  try {
    await Api.Post.bookmark(userToken, restaurantId, userId!);
    showToast('You have bookmark this place');
    dispatch(updateCurrentProfile(userToken));
    dispatch(getAllRestaurants(userToken));
  } catch (error) {}
};
