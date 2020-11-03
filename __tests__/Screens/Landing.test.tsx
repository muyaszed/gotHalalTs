import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {render, fireEvent} from '@testing-library/react-native';
import MockedNaviator from '../Helper/MockedNavigator';

import LandingScreen from '../../app/Screens/Landing';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('Testing navigation', () => {
  test('screen conatain the correct title', async () => {
    const component = <MockedNaviator component={LandingScreen} />;
    const {findByText} = render(component);
    const header = await findByText('Welcome');
    expect(header).toBeTruthy();
  });
});
