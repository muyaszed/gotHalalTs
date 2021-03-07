import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {Restaurants} from '../../app/Screens';
import configureStore from 'redux-mock-store';
import MockedNavigator from '../Helper/MockedNavigator';

beforeAll(() => {
  jest.clearAllMocks();
});

describe('Restaurant screen', () => {
  test('Show a list of restaurant', () => {
    const mockedState = {
      restaurants: {
        list: [
          {
            id: 1,
            name: 'Restaurant 1',
            bookmarking_user: [],
            checking_ins: [],
            reviews: [],
            approved: true,
            distance: 300,
          },
          {
            id: 2,
            name: 'Restaurant 2',
            bookmarking_user: [],
            checking_ins: [],
            reviews: [],
            approved: true,
            distance: 200,
          },
        ],
      },
      auth: {
        userToken: '',
      },
      profile: {
        firstName: '',
        lastName: '',
        settings: {
          distance_unit: '',
        },
      },
    };

    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={Restaurants} />
      </Provider>,
    );
    const restaurants = wrapper.getAllByTestId('restaurantItem');
    expect(restaurants.length).toBe(2);
    wrapper.unmount();
  });

  test('Show correct message when no restaurant listed', () => {
    const mockedState = {
      restaurants: {
        list: [],
      },
      auth: {
        userToken: '',
      },
      profile: {
        firstName: '',
        lastName: '',
        settings: {
          distance_unit: '',
        },
      },
    };

    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={Restaurants} />
      </Provider>,
    );
    const restaurants = wrapper.queryAllByTestId('restaurantItem');
    expect(restaurants.length).toBe(0);

    const message = wrapper.getByLabelText('no-listing-message');
    expect(message).toBeTruthy();

    wrapper.unmount();
  });
});
