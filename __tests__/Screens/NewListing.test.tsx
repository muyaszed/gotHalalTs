import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {NewListing} from '../../app/Screens';
import configureStore from 'redux-mock-store';
import MockedNavigator from '../Helper/MockedNavigator';

jest.useFakeTimers();
jest.mock('react-native-image-picker', () => {
  return {
    showImagePicker: jest.fn(),
  };
});

afterAll(() => {
  jest.clearAllMocks();
});

describe('New Listing screen', () => {
  test('render a place name input text', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const placeNameInput = wrapper.getByTestId('place-name-input-text');
    expect(placeNameInput).toBeTruthy();
    expect(placeNameInput.props.placeholder).toBe('Place name *');
    wrapper.unmount();
  });

  test('render a sub-header input text', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const subHeaderInput = wrapper.getByTestId('sub-header-input-text');
    expect(subHeaderInput).toBeTruthy();
    expect(subHeaderInput.props.placeholder).toBe('Sub-header');
    wrapper.unmount();
  });

  test('render a load image button', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const imageButton = wrapper.queryByLabelText('image-button');
    expect(imageButton).toBeTruthy();
    wrapper.unmount();
  });

  test('render selected image container', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );

    const imageContainer = wrapper.queryByLabelText('image-container');
    expect(imageContainer).toBeFalsy();
    wrapper.unmount();
  });

  test('render a description text area', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const descTextArea = wrapper.getByTestId('description-text');
    expect(descTextArea).toBeTruthy();
    expect(descTextArea.props.placeholder).toBe('Description *');
    wrapper.unmount();
  });

  test('render a dropdown category select', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const categorySelect = wrapper.getByTestId('category-select');
    expect(categorySelect).toBeTruthy();
    wrapper.unmount();
  });

  test('render a dropdown cuisine select', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const cuisineSelect = wrapper.getByTestId('cuisine-select');
    expect(cuisineSelect).toBeTruthy();
    wrapper.unmount();
  });

  test('render a dropdown start time select', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const startTimeSelect = wrapper.getByTestId('start-time-select');
    expect(startTimeSelect).toBeTruthy();
    wrapper.unmount();
  });

  test('render a dropdown end time select', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const endTimeSelect = wrapper.getByTestId('end-time-select');
    expect(endTimeSelect).toBeTruthy();
    wrapper.unmount();
  });

  test('render an address input text', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const addressInput = wrapper.getByLabelText('address-input-text');
    expect(addressInput).toBeTruthy();
    expect(addressInput.props.placeholder).toBe('Address *');
    wrapper.unmount();
  });

  test('render a city input text', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const cityInput = wrapper.getByLabelText('city-input-text');
    expect(cityInput).toBeTruthy();
    expect(cityInput.props.placeholder).toBe('City *');
    wrapper.unmount();
  });

  test('render a postcode input text', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const postcodeInput = wrapper.getByLabelText('postcode-input-text');
    expect(postcodeInput).toBeTruthy();
    expect(postcodeInput.props.placeholder).toBe('Postcode *');
    wrapper.unmount();
  });

  test('render a dropdown country select', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const countrySelect = wrapper.getByTestId('country-select');
    expect(countrySelect).toBeTruthy();
    wrapper.unmount();
  });

  test('render a phone number input text', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const phoneNumberInput = wrapper.getByLabelText('phone-number-input-text');
    expect(phoneNumberInput).toBeTruthy();
    expect(phoneNumberInput.props.placeholder).toBe('Phone Number');
    wrapper.unmount();
  });

  test('render a website input text', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const websiteInput = wrapper.getByLabelText('website-input-text');
    expect(websiteInput).toBeTruthy();
    expect(websiteInput.props.placeholder).toBe('Website address');
    wrapper.unmount();
  });

  test('render a Facebook input text', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const facebookInput = wrapper.getByLabelText('facebook-input-text');
    expect(facebookInput).toBeTruthy();
    expect(facebookInput.props.placeholder).toBe('Facebook link');
    wrapper.unmount();
  });

  test('render a Instagram input text', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const instagramInput = wrapper.getByLabelText('instagram-input-text');
    expect(instagramInput).toBeTruthy();
    expect(instagramInput.props.placeholder).toBe('Instagram link');
    wrapper.unmount();
  });

  test('render a Twitter input text', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const twitterInput = wrapper.getByLabelText('twitter-input-text');
    expect(twitterInput).toBeTruthy();
    expect(twitterInput.props.placeholder).toBe('Twitter link');
    wrapper.unmount();
  });
  test('render a solat place checkbox', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const solatCheckBox = wrapper.getByLabelText('solat-check-box');
    expect(solatCheckBox).toBeTruthy();
    wrapper.unmount();
  });

  test('render a family friendly checkbox', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const familyCheckBox = wrapper.getByLabelText('family-check-box');
    expect(familyCheckBox).toBeTruthy();
    wrapper.unmount();
  });

  test('render a disabled accessibility checkbox', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const disabledCheckBox = wrapper.getByLabelText('disabled-check-box');
    expect(disabledCheckBox).toBeTruthy();
    wrapper.unmount();
  });

  test('render a submit button', () => {
    const mockedState = {
      auth: {
        userToken: '',
      },
    };
    const mockStore = configureStore([]);
    const store = mockStore(mockedState);
    const wrapper = render(
      <Provider store={store}>
        <MockedNavigator component={NewListing} />
      </Provider>,
    );
    const submitButton = wrapper.getByLabelText('submit-button');
    expect(submitButton).toBeTruthy();
    expect(submitButton.props.children[0].props.children).toBe('Submit');
    wrapper.unmount();
  });
});
