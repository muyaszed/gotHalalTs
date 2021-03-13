import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Container, Content, Form, Button, Text} from '@codler/native-base';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import {AuthFormStyles} from '../../Styles';
import {useDispatch} from 'react-redux';
import {signInWithApple} from '../../Store/Authentication/action';

interface Props {
  buttonPrimaryText: string;
  buttonSecondaryText: string;
  handleOnPressButtonPrimary: () => void;
  handleOnPressButtonSecondary: () => void;
  buttonPrimaryDisabled?: boolean;
  buttonSecondaryDisabled?: boolean;
  signIn: boolean;
}

const AuthForm: React.FC<Props> = ({
  children,
  buttonPrimaryText,
  buttonSecondaryText,
  handleOnPressButtonPrimary,
  handleOnPressButtonSecondary,
  buttonPrimaryDisabled = false,
  buttonSecondaryDisabled = false,
  signIn,
}) => {
  const dispatch = useDispatch();
  const onAppleButtonPress = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      dispatch(signInWithApple(appleAuthRequestResponse));
    } catch (error) {
      console.log(error);
    }
  };

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
          <View>
            <Text style={styles.authNote}>
              If you are having a different email for the authentication methods
              below, a separate account will be created
            </Text>
          </View>
          <Button
            block
            bordered
            onPress={handleOnPressButtonSecondary}
            disabled={buttonSecondaryDisabled}>
            <Text>{buttonSecondaryText}</Text>
          </Button>
          {Platform.OS === 'ios' && (
            <AppleButton
              buttonStyle={AppleButton.Style.WHITE_OUTLINE}
              buttonType={
                signIn ? AppleButton.Type.SIGN_IN : AppleButton.Type.SIGN_UP
              }
              style={styles.appleButton}
              onPress={onAppleButtonPress}
            />
          )}
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
  appleButton: {
    ...AuthFormStyles.appleBtn,
  },
  authNote: {
    ...AuthFormStyles.authNote,
  },
});
