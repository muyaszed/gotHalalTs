import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Restaurants from './Restaurants';
import Restaurant from './Restaurant';

const Home = () => {
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
