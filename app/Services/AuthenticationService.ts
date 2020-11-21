import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {Dispatch} from 'redux';

import {signInWithFaceBook} from '../Store/Authentication/action';
import {FBToken} from '../Screens/SignIn';

export const fbLogin = (dispatch: Dispatch<any>) => {
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
