import React from 'react';
import {Container, Content, Button, Text, Icon} from '@codler/native-base';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 0.85,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  bottom: {
    flex: 0.15,
    backgroundColor: '#009165',
    paddingLeft: 10,
    paddingRight: 10,
  },
  bottomButton: {
    position: 'relative',
    top: 10,
  },
  bottomText: {
    textAlign: 'center',
    position: 'relative',
    top: 25,
  },
  logo: {
    fontSize: 100,
  },
});

const Landing = () => {
  const navigation = useNavigation();

  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.main} padder>
        <Icon type="Entypo" name="bowl" style={styles.logo} />
        <Text>GotHalal?</Text>
        <Button block light onPress={() => navigation.navigate('Sign Up')}>
          <Text>Create free account</Text>
        </Button>
        <Text style={styles.bottomText}>
          Already have Account?
          <Text onPress={() => navigation.navigate('Sign In')}> Log in</Text>
        </Text>
      </Content>
    </Container>
  );
};

export default Landing;
