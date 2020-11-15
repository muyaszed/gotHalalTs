import React from 'react';
import {render} from '@testing-library/react-native';
import {SignUp} from '../../app/Screens';

jest.mock('react-redux');

beforeAll(() => {
  jest.clearAllMocks();
});

describe('Signup screen', () => {
  test('render the correct button titles', () => {
    const {getByText} = render(<SignUp />);
    const signUpBtnTitle = getByText('SIGN UP');
    const signIUpFBBtnTitle = getByText('SIGN UP WITH FACEBOOK');
    expect(signUpBtnTitle).toBeTruthy();
    expect(signIUpFBBtnTitle).toBeTruthy();
  });

  test('render correct input text labels', () => {
    const {getByText} = render(<SignUp />);
    const emailInputLabel = getByText('Email');
    const passwordInputLabel = getByText('Password');
    const passwordConfirmationInputLabel = getByText('Password Confirmation');
    expect(emailInputLabel).toBeTruthy();
    expect(passwordInputLabel).toBeTruthy();
    expect(passwordConfirmationInputLabel).toBeTruthy();
  });
});
