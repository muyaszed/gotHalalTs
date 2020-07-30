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
// import {AuthContext} from '../Authentication/context';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {userSignUp} from '../Authentication/action';

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

  return (
    <Container>
      <Content padder>
        <Form>
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
            block
            bordered
            onPress={() => {
              dispatch(userSignUp(credential));
            }}
            disabled={disableBtn}>
            <Text>SIGN UP</Text>
          </Button>
          <Text>
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
