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
import {RootState} from './app/Store/reducers';
import {restoreToken} from './app/Authentication/action';

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
            name="Profile"
            component={HomeScreen}
            options={{tabBarLabel: 'Profile'}}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
