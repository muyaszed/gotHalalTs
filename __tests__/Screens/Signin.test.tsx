import React from 'react';
import {render} from '@testing-library/react-native';
import {SignIn} from '../../app/Screens';

jest.mock('react-redux');

beforeAll(() => {
  jest.clearAllMocks();
});

describe('Signin screen', () => {
  test('render the correct button titles', () => {
    const {getByText} = render(<SignIn />);
    const signInBtnTitle = getByText('SIGN IN');
    const signInFBBtnTitle = getByText('SIGN IN WITH FACEBOOK');
    expect(signInBtnTitle).toBeTruthy();
    expect(signInFBBtnTitle).toBeTruthy();
  });

  test('render correct input text labels', () => {
    const {getByText} = render(<SignIn />);
    const emailInputLabel = getByText('Email');
    const passwordInputLabel = getByText('Password');
    expect(emailInputLabel).toBeTruthy();
    expect(passwordInputLabel).toBeTruthy();
  });
});
