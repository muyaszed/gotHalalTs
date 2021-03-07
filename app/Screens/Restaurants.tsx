/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';

import {RootState} from '../Store/reducers';
import {useNavigation} from '@react-navigation/native';
import {RestaurantList} from '../Components';
import {RestaurantModel} from '../Store/Restaurant/reducer';
import {getAllRestaurants} from '../Store/Restaurant/action';

const Restaurants = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentData, setCurrentData] = React.useState(3);
  const userToken = useSelector((state: RootState) => state.auth.userToken);
  const userSettings = useSelector(
    (state: RootState) => state.profile.settings,
  );
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const navigation = useNavigation();
  const restaurants = useSelector((state: RootState) => {
    const sortedList = state.restaurants.list
      .filter((allPlace: RestaurantModel) => allPlace.approved === true)
      .sort(
        (a: RestaurantModel, b: RestaurantModel) => a.distance - b.distance,
      );

    return sortedList;
  }).slice(0, currentData);
  const stableDispatch = useCallback(dispatch, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (userToken) {
        stableDispatch(getAllRestaurants(userToken));
        setCurrentData(3);
      }
    });

    return unsubscribe;
  }, [navigation, stableDispatch, userToken]);

  const wait = (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      if (userToken) {
        dispatch(getAllRestaurants(userToken));
        setRefreshing(false);
        setCurrentData(3);
      }
    });
  }, []);

  return (
    <RestaurantList
      restaurants={restaurants}
      userSettings={userSettings}
      refreshing={refreshing}
      onRefresh={onRefresh}
      setCurrentData={setCurrentData}
    />
  );
};

export default Restaurants;
