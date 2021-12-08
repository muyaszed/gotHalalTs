/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {Text, View} from 'react-native';
import {RootState} from '../Store/reducers';
import {useNavigation} from '@react-navigation/native';
import {RestaurantList, FoodNotes} from '../Components';
import {RestaurantModel} from '../Store/Restaurant/reducer';
import {getAllRestaurants} from '../Store/Restaurant/action';
import FoodNoteModal from '../Components/FoodNote/FoodNoteModal';

//Temp foodnote data

const foodNotesItem = [
  {
    id: 1,
    avatar: 'https://lorempixel.com/400/200/people/1',
    note: 'This is the first note',
    foodImage: 'https://lorempixel.com/400/200/food/1',
  },
  {
    id: 2,
    avatar: 'https://lorempixel.com/400/200/people/2',
    note: 'This is the second note',
    foodImage: 'https://lorempixel.com/400/200/food/2',
  },
  {
    id: 3,
    avatar: 'https://lorempixel.com/400/200/people/3',
    note: 'This is the third note',
    foodImage: 'https://lorempixel.com/400/200/food/3',
  },
  {
    id: 4,
    avatar: 'https://lorempixel.com/400/200/people/4',
    note: 'This is the fourth note',
    foodImage: 'https://lorempixel.com/400/200/food/4',
  },
  {
    id: 5,
    avatar: 'https://lorempixel.com/400/200/people/5',
    note: 'This is the fifth note',
    foodImage: 'https://lorempixel.com/400/200/food/5',
  },
  {
    id: 6,
    avatar: 'https://lorempixel.com/400/200/people/6',
    note: 'This is the sixth note',
    foodImage: 'https://lorempixel.com/400/200/food/6',
  },
  {
    id: 7,
    avatar: 'https://lorempixel.com/400/200/people/7',
    note: 'This is the seventh note',
    foodImage: 'https://lorempixel.com/400/200/food/7',
  },
  {
    id: 8,
    avatar: 'https://lorempixel.com/400/200/people/8',
    note: 'This is the eighth note',
    foodImage: 'https://lorempixel.com/400/200/food/8',
  },
];

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
    <View>
      <FoodNotes list={foodNotesItem} />
      <RestaurantList
        restaurants={restaurants}
        userSettings={userSettings}
        refreshing={refreshing}
        onRefresh={onRefresh}
        setCurrentData={setCurrentData}
      />
      <FoodNoteModal modalVisible />
    </View>
  );
};

export default Restaurants;
