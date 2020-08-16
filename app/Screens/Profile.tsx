import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UserProfile from './UserProfile';
import UserListing from './UserListing';
import UserReviews from './UserReviews';
import UserBookmarks from './UserBookmarks';
import UserCheckins from './UserCheckins';
import UserSettings from './UserSettings';

export type RootStackParamList = {
  'My Profile': undefined;
  'My Listing': undefined;
  'My Reviews': undefined;
  'My Bookmarks': undefined;
  'My Check-ins': undefined;
  'My Settings': undefined;
};

const Profile = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator>
      <>
        <Stack.Screen name={'My Profile'} component={UserProfile} />
        <Stack.Screen name={'My Listing'} component={UserListing} />
        <Stack.Screen name={'My Reviews'} component={UserReviews} />
        <Stack.Screen name={'My Bookmarks'} component={UserBookmarks} />
        <Stack.Screen name={'My Check-ins'} component={UserCheckins} />
        <Stack.Screen name={'My Settings'} component={UserSettings} />
      </>
    </Stack.Navigator>
  );
};

export default Profile;
