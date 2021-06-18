import {LoginManager, AccessToken, Settings} from 'react-native-fbsdk-next';
import {Dispatch} from 'redux';

import {signInWithFaceBook} from '../Store/Authentication/action';
import {FBToken} from '../Screens/SignIn';

export const fbLogin = (dispatch: Dispatch<any>) => {
  Settings.initializeSDK();
  LoginManager.logOut();
  LoginManager.logInWithPermissions(['email', 'public_profile']).then(
    (result) => {
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then((data) => {
          if (data) {
            const token: FBToken = {
              facebook_access_token: data.accessToken.toString(),
            };
            dispatch(signInWithFaceBook(token));
          }
        });
      }
    },
    (error) => {
      console.log('Login error: ', error);
    },
  );
};
