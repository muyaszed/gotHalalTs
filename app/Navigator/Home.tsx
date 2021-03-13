import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Restaurants from '../Screens/Restaurants';
import Restaurant from '../Screens/Restaurant';

const Home = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <>
        <Stack.Screen name={'EXPLORE PLACES'} component={Restaurants} />
        <Stack.Screen name={'THE PLACE'} component={Restaurant} />
      </>
    </Stack.Navigator>
  );
};

export default Home;
