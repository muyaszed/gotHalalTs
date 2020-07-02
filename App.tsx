import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthReducer from './app/Authentication/reducer';
import AsyncStorage from '@react-native-community/async-storage';
import Api, {Credential} from './app/Services/api';
import SignInScreen from './app/Screens/SignIn';
import SignUpScreen from './app/Screens/Signup';
import HomeScreen from './app/Screens/Home';
import {AuthContext} from './app/Authentication/context';

const App = () => {
  const [state, dispatch] = React.useReducer(AuthReducer, {
    isLoading: true,
    isSignout: true,
    userToken: null,
  });

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {}

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (credential: Credential) => {
        const apiCall = await Api.Post.userLogin(credential);
        const token = apiCall.data.auth_token;
        try {
          await AsyncStorage.setItem('userToken', token);
        } catch (error) {}
        dispatch({type: 'SIGN_IN', token: token});
      },
      signOut: () => {
        AsyncStorage.removeItem('userToken');
        dispatch({type: 'SIGN_OUT', token: null});
      },
      signUp: async (credential: Credential) => {
        const apiCall = await Api.Post.userSignup(credential);
        const token = apiCall.data.auth_token;
        dispatch({type: 'SIGN_IN', token: token});
      },
    }),
    [],
  );

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
          {state.userToken == null ? (
            <>
              <Stack.Screen name="Sign In" component={SignInScreen} />
              <Stack.Screen name="Sign Up" component={SignUpScreen} />
            </>
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
};

export default App;
