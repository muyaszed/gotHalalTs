/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getAllRestaurants} from '../Restaurant/action';
import {RootState} from '../Store/reducers';
import {createStackNavigator} from '@react-navigation/stack';
import Restaurants from './Restaurants';
import Restaurant from './Restaurant';

const Home = () => {
  const dispatch = useDispatch();
  // const userToken = useSelector((state: RootState) => state.auth.userToken);

  // React.useEffect(() => {
  //   if (userToken) {
  //     dispatch(getAllRestaurants(userToken));
  //   }
  // }, []);

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <>
        <Stack.Screen name={'Listing'} component={Restaurants} />
        <Stack.Screen name={'The Place'} component={Restaurant} />
      </>
    </Stack.Navigator>
  );
};

export default Home;
