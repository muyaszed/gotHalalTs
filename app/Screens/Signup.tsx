import React from 'react';
import {Item, View, Input, Label} from '@codler/native-base';
import {useDispatch} from 'react-redux';
import {userSignUp} from '../Store/Authentication/action';
import {AuthForm} from '../Components';
import {fbLogin} from '../Services/AuthenticationService';

const Signup = () => {
  const dispatch = useDispatch();
  const [credential, onChangeText] = React.useState({
    email: '',
    password: '',
  });
  const [confirmation] = React.useState();
  const [disableBtn, setBtn] = React.useState(true);

  return (
    <AuthForm
      buttonPrimaryText="SIGN UP"
      buttonSecondaryText="SIGN UP WITH FACEBOOK"
      handleOnPressButtonPrimary={() => dispatch(userSignUp(credential))}
      handleOnPressButtonSecondary={() => fbLogin(dispatch)}
      buttonPrimaryDisabled={disableBtn}
      signIn={false}>
      <View>
        <Item inlineLabel>
          <Label>Email</Label>
          <Input
            value={credential.email}
            onChangeText={(text) => onChangeText({...credential, email: text})}
          />
        </Item>
        <Item inlineLabel last>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            value={credential.password}
            onChangeText={(text) =>
              onChangeText({...credential, password: text})
            }
          />
        </Item>
        <Item inlineLabel last>
          <Label>Password Confirmation</Label>
          <Input
            secureTextEntry={true}
            value={confirmation}
            onChangeText={(text) => {
              text === credential.password ? setBtn(false) : setBtn(true);
            }}
          />
        </Item>
      </View>
    </AuthForm>
  );
};

export default Signup;
