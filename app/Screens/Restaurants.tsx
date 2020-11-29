/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';

import {RootState} from '../Store/reducers';
import {useNavigation} from '@react-navigation/native';
import {RestaurantList} from '../Components';
import {RestaurantModel} from '../Store/Restaurant/reducer';
import {getAllRestaurants} from '../Store/Restaurant/action';
import {saveErrorMessage, showErrorDialog} from '../Store/Error/action';

const Restaurants = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentData, setCurrentData] = React.useState(3);
  const userProfile = useSelector((state: RootState) => state.profile);
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

  useEffect(() => {
    const unsubscribe: () => void = navigation.addListener('focus', () => {
      if (userToken) {
        dispatch(getAllRestaurants(userToken));
        setCurrentData(3);
      }

      return unsubscribe;
    });
  }, [navigation, dispatch, userToken]);

  useEffect(() => {
    if (
      userProfile.firstName.length === 0 &&
      userProfile.lastName.length === 0
    ) {
      dispatch(
        saveErrorMessage(
          'Looks like you have not set you name properly. Please go to your profile and set your full name(long press the first or last name)',
        ),
      );
      dispatch(showErrorDialog());
    }
  }, []);

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
