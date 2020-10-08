import React, {Dispatch} from 'react';
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
// import {AuthContext} from '../Authentication/context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {signInWithFaceBook, userSignUp} from '../Authentication/action';
import {StyleSheet} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {FBToken} from './SignIn';

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  signUpForm: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  signUpBtn: {
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: '#098E33',
  },
  underBtnText: {
    textAlign: 'center',
    paddingTop: 10,
  },
});

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

const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const {signUp} = React.useContext(AuthContext);
  const [credential, onChangeText] = React.useState({
    email: '',
    password: '',
  });
  const [confirmation] = React.useState();
  const [disableBtn, setBtn] = React.useState(true);

  //TODO- need to extract tis into a componen

  return (
    <Container>
      <Content padder contentContainerStyle={styles.mainContent}>
        <Form style={styles.signUpForm}>
          <Item inlineLabel>
            <Label>Email</Label>
            <Input
              value={credential.email}
              onChangeText={(text) =>
                onChangeText({...credential, email: text})
              }
            />
          </Item>
          <Item inlineLabel last>
            <Label>Password</Label>
            <Input
              value={credential.password}
              onChangeText={(text) =>
                onChangeText({...credential, password: text})
              }
            />
          </Item>
          <Item inlineLabel last>
            <Label>Password Confirmation</Label>
            <Input
              value={confirmation}
              onChangeText={(text) => {
                text === credential.password ? setBtn(false) : setBtn(true);
              }}
            />
          </Item>
          <Button
            style={styles.signUpBtn}
            block
            onPress={() => {
              dispatch(userSignUp(credential));
            }}
            disabled={disableBtn}>
            <Text>SIGN UP</Text>
          </Button>
          <Button block bordered onPress={() => fbLogin(dispatch)}>
            <Text>SIGN UP WITH FACEBOOK</Text>
          </Button>
          <Text style={styles.underBtnText}>
            Already have an account?{' '}
            <Text onPress={() => navigation.navigate('Sign In')}>
              Sign in here
            </Text>
          </Text>
        </Form>
      </Content>
    </Container>
  );
};

export default Signup;
