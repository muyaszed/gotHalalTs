import React from 'react';
import {View} from 'react-native';
import {Item, Input, Label} from '@codler/native-base';
import {useDispatch} from 'react-redux';
import {userSignIn} from '../Store/Authentication/action';
import {fbLogin} from '../Services/AuthenticationService';
import {AuthForm} from '../Components';

export interface FBToken {
  facebook_access_token: string;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const [credential, onChangeText] = React.useState({
    email: '',
    password: '',
  });

  return (
    <AuthForm
      buttonPrimaryText="SIGN IN"
      buttonSecondaryText="SIGN IN WITH FACEBOOK"
      handleOnPressButtonPrimary={() => dispatch(userSignIn(credential))}
      handleOnPressButtonSecondary={() => fbLogin(dispatch)}>
      <View>
        <Item inlineLabel>
          <Label>Email</Label>
          <Input
            testID="signInEmail"
            value={credential.email}
            onChangeText={(text) => onChangeText({...credential, email: text})}
          />
        </Item>
        <Item inlineLabel>
          <Label>Password</Label>
          <Input
            testID="signInPassword"
            value={credential.password}
            secureTextEntry={true}
            onChangeText={(text) =>
              onChangeText({...credential, password: text})
            }
          />
        </Item>
      </View>
    </AuthForm>
  );
};

export default SignIn;
