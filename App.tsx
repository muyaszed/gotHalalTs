/* eslint-disable react-hooks/exhaustive-deps */
import 'react-native-gesture-handler';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-community/async-storage';
import SignInScreen from './app/Screens/SignIn';
import SignUpScreen from './app/Screens/Signup';
import LandingScreen from './app/Screens/Landing';
import HomeScreen from './app/Screens/Home';
import UserProfile from './app/Screens/UserProfile';
import AddListing from './app/Screens/AddListing';
import {RootState} from './app/Store/reducers';
import {restoreToken} from './app/Authentication/action';
import {View, StyleSheet} from 'react-native';
import {Icon} from '@codler/native-base';

const styles = StyleSheet.create({
  addNewTab: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addNewTabIcon: {
    fontSize: 50,
  },
});

const App = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userTokenStorage = null;
      try {
        userTokenStorage = await AsyncStorage.getItem('userToken');
        if (userTokenStorage) {
          dispatch(restoreToken(userTokenStorage));
        }
      } catch (e) {
        console.log(e);
      }
    };

    bootstrapAsync();
  }, []);

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      {authState.userToken == null ? (
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={LandingScreen} />
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{tabBarLabel: 'Home'}}
          />
          <Tab.Screen
            name="NewListing"
            component={AddListing}
            options={{
              title: '',
              tabBarLabel: undefined,
              tabBarIcon: () => (
                <View style={styles.addNewTab}>
                  <Icon
                    style={styles.addNewTabIcon}
                    type="Feather"
                    name="plus"
                  />
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={UserProfile}
            options={{tabBarLabel: 'Profile'}}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
