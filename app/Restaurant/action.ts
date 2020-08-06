import {Dispatch, Action} from 'redux';
import Api from '../Services/api';
import types from '../Store/actions';
import {RestaurantModel} from './reducer';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../Store/reducers';

export type RestaurantAction =
  | ReturnType<typeof gettingAllRestaurants>
  | ReturnType<typeof gettingAllRestaurantsSuccess>
  | ReturnType<typeof gettingAllRestaurantsFailed>
  | ReturnType<typeof setSelectedRestaurant>;

const gettingAllRestaurants = () => ({
  type: types.GETTING_ALL_RESTAURANTS,
});

const gettingAllRestaurantsSuccess = (data: RestaurantModel[]) => ({
  type: types.GETTING_ALL_RESTAURANTS_SUCCESS,
  payload: data,
});

const gettingAllRestaurantsFailed = (error: string) => ({
  type: types.GETTING_ALL_RESTAURANTS_FAILED,
  payload: error,
});

export const getAllRestaurants = (userToken: string) => async (
  dispatch: Dispatch,
) => {
  try {
    const data = await (await Api.Get.restaurants(userToken)).data;
    dispatch(gettingAllRestaurantsSuccess(data));
  } catch (error) {
    dispatch(gettingAllRestaurantsFailed(error));
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
  } catch (error) {}
};
