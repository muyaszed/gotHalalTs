import React from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Form, Button, Text} from '@codler/native-base';
import {AuthFormStyles} from '../Styles';

interface Props {
  buttonPrimaryText: string;
  buttonSecondaryText: string;
  handleOnPressButtonPrimary: () => void;
  handleOnPressButtonSecondary: () => void;
  buttonPrimaryDisabled?: boolean;
  buttonSecondaryDisabled?: boolean;
}

const AuthForm: React.FC<Props> = ({
  children,
  buttonPrimaryText,
  buttonSecondaryText,
  handleOnPressButtonPrimary,
  handleOnPressButtonSecondary,
  buttonPrimaryDisabled = false,
  buttonSecondaryDisabled = false,
}) => {
  return (
    <Container>
      <Content padder contentContainerStyle={styles.mainContent}>
        <Form style={styles.signInForm}>
          {children}
          <Button
            style={styles.signInBtn}
            block
            onPress={handleOnPressButtonPrimary}
            disabled={buttonPrimaryDisabled}>
            <Text>{buttonPrimaryText}</Text>
          </Button>
          <Button
            block
            bordered
            onPress={handleOnPressButtonSecondary}
            disabled={buttonSecondaryDisabled}>
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
