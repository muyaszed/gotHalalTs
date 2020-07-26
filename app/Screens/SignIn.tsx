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
import {userSignIn} from '../Authentication/action';
import {StyleSheet, View} from 'react-native';

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
  },
  underBtnText: {
    textAlign: 'center',
  },
});

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [credential, onChangeText] = React.useState({
    email: '',
    password: '',
  });

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
                onChangeText={(text) =>
                  onChangeText({...credential, password: text})
                }
              />
            </Item>
          </View>
          <Button
            style={styles.signInBtn}
            block
            bordered
            onPress={() => {
              dispatch(userSignIn(credential));
            }}>
            <Text>SIGN IN</Text>
          </Button>
          <Button block bordered onPress={() => {}}>
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
