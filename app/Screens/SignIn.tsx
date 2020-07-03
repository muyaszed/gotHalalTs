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

const SignIn = () => {
  const navigation = useNavigation();
  const {signIn} = React.useContext(AuthContext);
  const [credential, onChangeText] = React.useState({
    email: '',
    password: '',
  });

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
          <Button
            block
            bordered
            onPress={() => {
              if (signIn) {
                signIn(credential);
              }
            }}>
            <Text>SIGN IN</Text>
          </Button>
          <Text>
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
