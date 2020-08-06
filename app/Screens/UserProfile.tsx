import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from './Profile';
import UserListing from './UserListing';
import UserReviews from './UserReviews';
import UserBookmarks from './UserBookmarks';
import UserCheckins from './UserCheckins';

const UserProfile = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <>
        <Stack.Screen name={'Profile'} component={Profile} />
        <Stack.Screen name={'My Listing'} component={UserListing} />
        <Stack.Screen name={'My Reviews'} component={UserReviews} />
        <Stack.Screen name={'My Bookmarks'} component={UserBookmarks} />
        <Stack.Screen name={'My Check-ins'} component={UserCheckins} />
      </>
    </Stack.Navigator>
  );
};

export default UserProfile;
