import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Form, Button, Text} from '@codler/native-base';
import {AuthFormStyles} from '../Styles';

interface Props {
  buttonPrimaryText: string;
  buttonSecondaryText: string;
  handleOnPressButtonPrimary: () => void;
  handleOnPressButtonSecondary: () => void;
}

const AuthForm: React.FC<Props> = ({
  children,
  buttonPrimaryText,
  buttonSecondaryText,
  handleOnPressButtonPrimary,
  handleOnPressButtonSecondary,
}) => {
  return (
    <Container>
      <Content padder contentContainerStyle={styles.mainContent}>
        <Form style={styles.signInForm}>
          {children}
          <Button
            style={styles.signInBtn}
            block
            onPress={handleOnPressButtonPrimary}>
            <Text>{buttonPrimaryText}</Text>
          </Button>
          <Button block bordered onPress={handleOnPressButtonSecondary}>
            <Text>{buttonSecondaryText}</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  mainContent: {
    ...AuthFormStyles.mainContent,
  },
  signInForm: {
    ...AuthFormStyles.signInForm,
  },
  signInBtn: {
    ...AuthFormStyles.signInBtn,
  },
});
