import React from 'react';
import {render} from '@testing-library/react-native';
import {Landing} from '../../app/Screens';
import MockedNavigation from '../Helper/MockedNavigator';

beforeAll(() => {
  jest.clearAllMocks();
});

describe('Landing screen', () => {
  test('display the correct button titles', async () => {
    const {getByTestId} = render(<MockedNavigation component={Landing} />);
    const createAccountBtn = getByTestId('createAccountScreenBtn');
    const signInBtn = getByTestId('signInScreenBtn');
    const createAccountBtnText =
      createAccountBtn.props.children[0].props.children;
    const signInBtnText = signInBtn.props.children[0].props.children;

    expect(createAccountBtnText).toBe('Create free account');
    expect(signInBtnText).toBe('Sign in');
  });
});
