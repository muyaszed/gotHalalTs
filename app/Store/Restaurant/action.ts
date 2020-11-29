import {Dispatch, Action} from 'redux';
import Geolocation from '@react-native-community/geolocation';
import Api from '../../Services/api';
import types from '../actions';
import {RestaurantModel, VerificationData} from './reducer';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../reducers';
import {showToast} from '../../Services/helper';
import {saveErrorMessage, showErrorDialog} from '../Error/action';
import {setLoadingState} from '../Authentication/action';

export type RestaurantAction =
  | ReturnType<typeof gettingAllRestaurants>
  | ReturnType<typeof gettingAllRestaurantsSuccess>
  | ReturnType<typeof gettingAllRestaurantsFailed>
  | ReturnType<typeof setSelectedRestaurant>
  | ReturnType<typeof setRestaurantMapModalVisible>
  | ReturnType<typeof setUseGoogleMap>
  | ReturnType<typeof setReviewImage>
  | ReturnType<typeof setReviewSubmitButtonStatus>
  | ReturnType<typeof setVerificationData>
  | ReturnType<typeof setVerificationModalVisible>
  | ReturnType<typeof setShowReviewForm>
  | ReturnType<typeof setReviewCancelModalVisible>;

const gettingAllRestaurants = () => ({
  type: types.GETTING_ALL_RESTAURANTS,
});

const gettingAllRestaurantsSuccess = (
  data: RestaurantModel[],
  userLocation: {
    lat: number;
    long: number;
  },
  userDistanceSetting: string,
) => ({
  type: types.GETTING_ALL_RESTAURANTS_SUCCESS,
  payload: data,
  userLocation,
  userDistanceSetting,
});

const gettingAllRestaurantsFailed = (error: string) => ({
  type: types.GETTING_ALL_RESTAURANTS_FAILED,
  payload: error,
});

export const setReviewCancelModalVisible = (status: boolean) => ({
  type: types.SET_REVIEW_CANCEL_MODAL_VISIBLE,
  payload: status,
});

export const setShowReviewForm = (status: boolean) => ({
  type: types.SET_SHOW_REVIEW_FORM,
  payload: status,
});

export const setVerificationModalVisible = (status: boolean) => ({
  type: types.SET_RESTAURANT_VERIFICATION_MODAL_VISIBLE,
  payload: status,
});

export const setVerificationData = (data: VerificationData) => ({
  type: types.SET_VERIFICATION_DATA,
  payload: data,
});

export const setReviewSubmitButtonStatus = (status: boolean) => ({
  type: types.SET_REVIEW_SUBMIT_BUTTON_STATUS,
  payload: status,
});

export const setReviewImage = (uri: string | null) => ({
  type: types.SET_REVIEW_IMAGE,
  payload: uri,
});

export const setUseGoogleMap = (status: boolean) => ({
  type: types.SET_USE_GOOGLE_MAP,
  payload: status,
});

export const setRestaurantMapModalVisible = (status: boolean) => ({
  type: types.SET_RESTAURANT_MAP_MODAL_VISIBLE,
  payload: status,
});

export const getAllRestaurants = (userToken: string) => async (
  dispatch: Dispatch,
  getState: () => RootState,
) => {
  try {
    const data = await (await Api.Get.restaurants(userToken)).data;
    const userDistanceSetting = getState().profile.settings.distance_unit;
    Geolocation.getCurrentPosition((res) => {
      console.log(res.coords.latitude, res.coords.longitude);
      dispatch(
        gettingAllRestaurantsSuccess(
          data,
          {
            lat: res.coords.latitude,
            long: res.coords.longitude,
          },
          userDistanceSetting,
        ),
      );
    });
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.message
      : error.message;
    dispatch(gettingAllRestaurantsFailed(errorMessage));
    dispatch(saveErrorMessage(errorMessage));
    dispatch(showErrorDialog());
  }
};

export const setSelectedRestaurant = (restaurantId: number) => {
  return {
    type: types.SET_SELECTED_RESTAURANT,
    payload: restaurantId,
  };
};

export const setNewListing = (newData: FormData, token: string) => async (
  dispatch: ThunkDispatch<RootState, void, Action>,
) => {
  try {
    await Api.Post.restaurant(newData, token);
    dispatch(getAllRestaurants(token));
    showToast('You have successfully added a new place.');
    return true;
  } catch (error) {
    console.log(error.response);
    dispatch(setLoadingState(false));
    dispatch(
      saveErrorMessage(
        'Your submission may not be complete. Please check and try to submit again',
      ),
    );
    dispatch(showErrorDialog());
    return false;
  }
};
