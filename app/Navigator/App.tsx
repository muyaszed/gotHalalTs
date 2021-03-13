/* eslint-disable react-hooks/exhaustive-deps */
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
import SplashScreen from 'react-native-splash-screen';
import SInfo from 'react-native-sensitive-info';
import {Landing, SignIn, SignUp} from '../Screens';
import HomeNavigator from './Home';
import ProfileNavigator from './Profile';
import AddListingNavigator from './AddListing';
import {RootState} from '../Store/reducers';
import {restoreToken, signOut} from '../Store/Authentication/action';
import {View, StyleSheet, Text, DevSettings, Alert} from 'react-native';
import {Icon} from '@codler/native-base';
import Modal from '../Components/Generic/modal';
import {closeErrorDialog, resetErrorFlags} from '../Store/Error/action';
import Loading from '../Components/Generic/loading';
import {AppStyles} from '../Styles';

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
    ...AppStyles.addNewTab,
  },
  addNewTabIcon: {
    ...AppStyles.addNewTabIcon,
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

  React.useEffect(() => {
    SplashScreen.hide();
    const bootstrapAsync = async () => {
      let userTokenStorage = null;
      try {
        userTokenStorage = await SInfo.getItem('token', {});
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
          <Stack.Screen name="WELCOME" component={Landing} />
          <Stack.Screen name="SIGN IN" component={SignIn} />
          <Stack.Screen name="SIGN UP" component={SignUp} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#098E33',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeNavigator}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: () => <Icon type="Entypo" name="home" />,
            }}
          />
          <Tab.Screen
            name="NewListing"
            component={AddListingNavigator}
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
            component={ProfileNavigator}
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
