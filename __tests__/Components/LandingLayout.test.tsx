import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {LandingLayout} from '../../app/Components';

beforeAll(() => {
  jest.clearAllMocks();
});

describe('LandingLayout', () => {
  test('sign up button will call handle function when click', () => {
    const mockedHandleNaviagtion = jest.fn();
    const {getByTestId} = render(
      <LandingLayout handleNavigation={mockedHandleNaviagtion} />,
    );

    const signUpButton = getByTestId('createAccountScreenBtn');
    fireEvent(signUpButton, 'press');
    expect(mockedHandleNaviagtion).toHaveBeenCalled();
  });

  test('sign in button will call handle function when click', () => {
    const mockedHandleNaviagtion = jest.fn();
    const {getByTestId} = render(
      <LandingLayout handleNavigation={mockedHandleNaviagtion} />,
    );

    const signInButton = getByTestId('signInScreenBtn');
    fireEvent(signInButton, 'press');
    expect(mockedHandleNaviagtion).toHaveBeenCalled();
  });
});
