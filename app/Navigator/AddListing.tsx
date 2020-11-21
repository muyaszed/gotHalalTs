import React from 'react';
import NewLsiting from '../Screens/NewListing';
import {createStackNavigator} from '@react-navigation/stack';

const AddListing = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <>
        <Stack.Screen name={'New Listing'} component={NewLsiting} />
      </>
    </Stack.Navigator>
  );
};

export default AddListing;
