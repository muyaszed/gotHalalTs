import {Dispatch} from 'redux';
import Api from '../Services/api';
import {RootState} from 'app/Store/reducers';
import types from '../Store/actions';

export type ReviewAction = ReturnType<typeof loadReviewsSuccess>;

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
