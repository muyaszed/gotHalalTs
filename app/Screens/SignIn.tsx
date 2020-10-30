import React from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
} from '@codler/native-base';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {userSignIn, signInWithFaceBook} from '../Authentication/action';
import {StyleSheet, View} from 'react-native';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {Dispatch} from 'redux';

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  signInForm: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  signInBtn: {
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: '#098E33',
  },
  underBtnText: {
    textAlign: 'center',
    paddingTop: 10,
  },
});

export interface FBToken {
  facebook_access_token: string;
}

//TODO - pull this function to a helper file
const fbLogin = (dispatch: Dispatch<any>) => {
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

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [credential, onChangeText] = React.useState({
    email: '',
    password: '',
  });

  //TODO- need to extract tis into a componen
  return (
    <Container>
      <Content padder contentContainerStyle={styles.mainContent}>
        <Form style={styles.signInForm}>
          <View>
            <Item inlineLabel>
              <Label>Email</Label>
              <Input
                value={credential.email}
                onChangeText={(text) =>
                  onChangeText({...credential, email: text})
                }
              />
            </Item>
            <Item inlineLabel>
              <Label>Password</Label>
              <Input
                value={credential.password}
                secureTextEntry={true}
                onChangeText={(text) =>
                  onChangeText({...credential, password: text})
                }
              />
            </Item>
          </View>
          <Button
            style={styles.signInBtn}
            block
            onPress={() => {
              dispatch(userSignIn(credential));
            }}>
            <Text>SIGN IN</Text>
          </Button>
          <Button block bordered onPress={() => fbLogin(dispatch)}>
            <Text>SIGN IN WITH FACEBOOK</Text>
          </Button>
          <Text style={styles.underBtnText}>
            Don't have an account yet?{' '}
            <Text onPress={() => navigation.navigate('Sign Up')}>
              Sign up here
            </Text>
          </Text>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
