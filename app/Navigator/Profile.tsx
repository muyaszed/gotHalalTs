import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserProfile from '../Screens/UserProfile';
import UserListing from '../Screens/UserListing';
import UserReviews from '../Screens/UserReviews';
import UserBookmarks from '../Screens/UserBookmarks';
import UserCheckins from '../Screens/UserCheckins';
import UserSettings from '../Screens/UserSettings';

export type RootStackParamList = {
  'MY PROFILE': undefined;
  'MY PLACES': undefined;
  'MY REVIEWS': undefined;
  'MY BOOKMARKS': undefined;
  'MY CHECK-INS': undefined;
  'MY SETTINGS': undefined;
};

const Profile = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      <>
        <Stack.Screen name={'MY PROFILE'} component={UserProfile} />
        <Stack.Screen name={'MY PLACES'} component={UserListing} />
        <Stack.Screen name={'MY REVIEWS'} component={UserReviews} />
        <Stack.Screen name={'MY BOOKMARKS'} component={UserBookmarks} />
        <Stack.Screen name={'MY CHECK-INS'} component={UserCheckins} />
        <Stack.Screen name={'MY SETTINGS'} component={UserSettings} />
      </>
    </Stack.Navigator>
  );
};

export default Profile;
