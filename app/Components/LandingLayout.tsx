import React from 'react';
import {Container, Content, Button, Text} from '@codler/native-base';
import {StyleSheet, Image, View} from 'react-native';
import {LandingStyles} from '../Styles';

interface Props {
  handleNavigation(screen: string): void;
}

const LandingLayout: React.FC<Props> = ({handleNavigation}) => {
  return (
    <Container style={styles.container}>
      <Content contentContainerStyle={styles.main} padder>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMode="cover"
            source={require('../Images/logo.png')}
          />
        </View>
        <Button
          testID="createAccountScreenBtn"
          style={styles.createAccBtn}
          block
          light
          onPress={() => handleNavigation('Sign Up')}>
          <Text>Create free account</Text>
        </Button>
        <Button
          testID="signInScreenBtn"
          style={styles.createAccBtn}
          block
          light
          onPress={() => handleNavigation('Sign In')}>
          <Text>Sign in</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default LandingLayout;

const styles = StyleSheet.create({
  container: {
    ...LandingStyles.container,
  },
  main: {
    ...LandingStyles.main,
  },
  bottom: {
    ...LandingStyles.bottom,
  },
  bottomButton: {
    ...LandingStyles.bottomButton,
  },
  bottomText: {
    ...LandingStyles.bottomText,
  },
  logoContainer: {
    ...LandingStyles.logoContainer,
  },
  logo: {
    ...LandingStyles.logo,
  },
  createAccBtn: {
    ...LandingStyles.createAccBtn,
  },
});
