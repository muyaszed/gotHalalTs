import 'react-native-gesture-handler';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  setJSExceptionHandler,
  setNativeExceptionHandler,
} from 'react-native-exception-handler';

import SignInScreen from './app/Screens/SignIn';
import SignUpScreen from './app/Screens/Signup';
import LandingScreen from './app/Screens/Landing';
import HomeScreen from './app/Screens/Home';
import Profile from './app/Screens/Profile';
import AddListing from './app/Screens/AddListing';
import {RootState} from './app/Store/reducers';
import {signOut} from './app/Authentication/action';
import {View, StyleSheet, Text, DevSettings, Alert} from 'react-native';
import {Icon} from '@codler/native-base';
import Modal from './app/Components/modal';
import {closeErrorDialog, resetErrorFlags} from './app/Error/action';
import Loading from './app/Components/loading';

setJSExceptionHandler((error, isFatal) => {
  if (isFatal) {
    if (error) {
      Alert.alert(
        'Sorry, something is not right.',
        `
      Error: ${isFatal ? 'Fatal:' : ''} ${error.name} ${error.message}
      We will need to restart the app.
      `,
        [
          {
            text: 'Restart',
            onPress: () => {
              DevSettings.reload();
            },
          },
        ],
      );
    }
  } else {
    console.log(error);
  }
});

setNativeExceptionHandler(() => {
  console.log('setNativeExceptionHandler');
});

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
    color: '#098E33',
  },
});

const App = () => {
  const needLogOut = useSelector((state: RootState) => state.error.needLogOut);
  const needReload = useSelector((state: RootState) => state.error.needReload);
  const dispatch = useDispatch();
  const showErrorModal = useSelector(
    (state: RootState) => state.error.showModal,
  );
  const errorMessage = useSelector((state: RootState) => state.error.message);
  const authState = useSelector((state: RootState) => state.auth);

  // React.useEffect(() => {
  //   const bootstrapAsync = async () => {
  //     let userTokenStorage = null;
  //     try {
  //       userTokenStorage = await SInfo.getItem('token', {});
  //       if (userTokenStorage) {
  //         dispatch(restoreToken(userTokenStorage));
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   bootstrapAsync();
  // }, []);

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      {authState.isSignout ? (
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={LandingScreen} />
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Sign Up" component={SignUpScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#098E33',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: () => <Icon type="Entypo" name="home" />,
            }}
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
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: () => <Icon type="Octicons" name="person" />,
            }}
          />
        </Tab.Navigator>
      )}
      <Modal
        modalVisible={showErrorModal}
        title="Sorry, something is not right."
        rightButtonName="OK"
        handleRightButton={() => {
          dispatch(closeErrorDialog());
          if (needLogOut) {
            dispatch(signOut());
          }
          if (needReload) {
            dispatch(resetErrorFlags);
            DevSettings.reload();
          }
        }}>
        <Text>{errorMessage}</Text>
      </Modal>
      {authState.isLoading ? <Loading /> : null}
    </NavigationContainer>
  );
};

export default App;
