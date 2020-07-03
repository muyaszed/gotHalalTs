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
} from 'native-base';
import {AuthContext} from '../Authentication/context';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();
  const {signUp} = React.useContext(AuthContext);
  const [credential, onChangeText] = React.useState({
    email: '',
    password: '',
  });
  const [confirmation, setConfirmation] = React.useState();
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
              if (signUp) {
                signUp(credential);
              }
            }}
            disabled={disableBtn}>
            <Text>SIGN IN</Text>
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
