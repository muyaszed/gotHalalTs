import {Dispatch} from 'redux';
import Api from '../Services/api';
import {RootState} from 'app/Store/reducers';
import types from '../Store/actions';
import {showToast} from '../Services/helper';

export type ReviewAction =
  | ReturnType<typeof loadReviewsSuccess>
  | ReturnType<typeof loadReviewsFailed>
  | ReturnType<typeof setNewReviewSucces>
  | ReturnType<typeof setNewReviewFailed>
  | ReturnType<typeof resetReviewText>
  | ReturnType<typeof setReviewText>;

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
  try {
    const data = await (
      await Api.Get.reviews(userToken.toString(), restaurantId)
    ).data;
    dispatch(loadReviewsSuccess(data));
  } catch (error) {
    dispatch(loadReviewsFailed(error));
  }
};

const setNewReviewSucces = () => ({
  type: types.SETTING_NEW_REVIEW_SUCCESS,
});

const setNewReviewFailed = (error: string) => ({
  type: types.SETTING_NEW_REVIEW_FAILED,
  payload: error,
});

const resetReviewText = () => ({
  type: types.RESET_REVIEW_TEXT,
});

export const setReviewText = (comment: string) => ({
  type: types.SET_REVIEW_TEXT,
  payload: comment,
});

export const setNewReview = (userToken: string) => async (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  const restaurantId = getState().restaurants.selectedRestaurantId;
  const currentReviewText = getState().reviews.currentReview;
  try {
    await Api.Post.reviews(
      userToken,
      {comment: currentReviewText},
      restaurantId,
    );
    dispatch(setNewReviewSucces());
    const response = await Api.Get.reviews(userToken.toString(), restaurantId);
    const data = response.data;
    dispatch(loadReviewsSuccess(data));
    showToast({
      text: 'Review successfully submited',
      buttonText: 'OK',
      position: 'top',
      duration: 3000,
    });
    dispatch(resetReviewText());
  } catch (error) {
    dispatch(setNewReviewFailed(error));
  }
};
