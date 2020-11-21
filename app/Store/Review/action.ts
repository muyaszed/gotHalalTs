import {Dispatch, Action} from 'redux';
import Api from '../../Services/api';
import {RootState} from 'app/Store/reducers';
import types from '../actions';
import {updateCurrentProfile} from '../Profile/action';
import {getAllRestaurants} from '../Restaurant/action';
import {ThunkDispatch} from 'redux-thunk';
import {saveErrorMessage, showErrorDialog} from '../Error/action';
export type ReviewAction =
  | ReturnType<typeof loadReviewsSuccess>
  | ReturnType<typeof loadReviewsFailed>
  | ReturnType<typeof setNewReviewSucces>
  | ReturnType<typeof setNewReviewFailed>;

export const loadReviewsSuccess = (data: any) => ({
  type: types.GETTING_ALL_REVIEWS_SUCCESS,
  payload: data,
});

export const loadReviewsFailed = (error: any) => ({
  type: types.GETTING_ALL_REVIEWS_FAILED,
  payload: error,
});

export const loadReviews = (userToken: string) => async (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  const restaurantId = getState().restaurants.selectedRestaurantId;
  if (restaurantId) {
    try {
      const data = await (
        await Api.Get.reviews(userToken.toString(), restaurantId)
      ).data;
      dispatch(loadReviewsSuccess(data));
    } catch (error) {
      dispatch(loadReviewsFailed(error));
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;
      dispatch(saveErrorMessage(errorMessage));
      dispatch(showErrorDialog());
    }
  }
};

const setNewReviewSucces = () => ({
  type: types.SETTING_NEW_REVIEW_SUCCESS,
});

const setNewReviewFailed = (error: string) => ({
  type: types.SETTING_NEW_REVIEW_FAILED,
  payload: error,
});

export const setNewReview = (
  userToken: string,
  reviewInfo: FormData,
  placeId: number,
) => async (dispatch: ThunkDispatch<RootState, void, Action>) => {
  try {
    await Api.Post.reviews(userToken, reviewInfo, placeId);
    dispatch(setNewReviewSucces());
    const response = await Api.Get.reviews(userToken.toString(), placeId);
    const data = response.data;
    dispatch(loadReviewsSuccess(data));
    dispatch(updateCurrentProfile(userToken));
    dispatch(getAllRestaurants(userToken));
    return true;
  } catch (error) {
    dispatch(setNewReviewFailed(error));
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    dispatch(saveErrorMessage(errorMessage));
    dispatch(showErrorDialog());
    return false;
  }
};
