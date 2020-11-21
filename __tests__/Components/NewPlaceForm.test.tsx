import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {NewPlaceForm} from '../../app/Components';
import {NewPlaceFormProps} from '../../app/Components/NewPlaceForm';
import {NewPlaceInfo} from 'app/Screens/NewListing';

beforeAll(() => {
  jest.clearAllMocks();
});

describe('NewPlaceForm', () => {
  test('place name text change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        name: 'Old Name',
        soc_med: {
          facebook: '',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByTestId} = render(<NewPlaceForm {...mockedProps} />);
    const placeNameInput = getByTestId('place-name-input-text');
    fireEvent(placeNameInput, 'onChangeText');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
    expect(placeNameInput.props.value).toBe('Old Name');
  });

  test('sub header text change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        sub_header: 'sub header',
        soc_med: {
          facebook: '',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByTestId} = render(<NewPlaceForm {...mockedProps} />);
    const subHeaderInput = getByTestId('sub-header-input-text');
    fireEvent(subHeaderInput, 'onChangeText');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
    expect(subHeaderInput.props.value).toBe('sub header');
  });

  describe('Selected image container', () => {
    test('will be rendered when displayImageUri is truthy', () => {
      const mockedProps = ({
        setPlaceInfo: jest.fn(),
        displayImageUri: 'uri',
        placeInfo: {
          sub_header: 'sub header',
          soc_med: {
            facebook: '',
          },
        } as Partial<NewPlaceInfo>,
      } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

      const {queryByLabelText} = render(<NewPlaceForm {...mockedProps} />);
      const imageContainer = queryByLabelText('image-container');
      expect(imageContainer).toBeTruthy();
    });

    test('will not be rendered when displayImageUri is truthy', () => {
      const mockedProps = ({
        setPlaceInfo: jest.fn(),
        displayImageUri: null,
        placeInfo: {
          sub_header: 'sub header',
          soc_med: {
            facebook: '',
          },
        } as Partial<NewPlaceInfo>,
      } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

      const {queryByLabelText} = render(<NewPlaceForm {...mockedProps} />);
      const imageContainer = queryByLabelText('image-container');
      expect(imageContainer).toBeFalsy();
    });
  });

  test('description text change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        desc: 'Some description',
        soc_med: {
          facebook: '',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByTestId} = render(<NewPlaceForm {...mockedProps} />);
    const descriptionInput = getByTestId('description-text');
    fireEvent(descriptionInput, 'onChangeText');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
    expect(descriptionInput.props.value).toBe('Some description');
  });

  test('Category select change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        category: 'My category',
        soc_med: {
          facebook: '',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByTestId} = render(<NewPlaceForm {...mockedProps} />);
    const categorySelect = getByTestId('category-select');
    fireEvent(categorySelect, 'onValueChange');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
  });

  test('Cuisine select change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        cuisine: 'My cuisine',
        soc_med: {
          facebook: '',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByTestId} = render(<NewPlaceForm {...mockedProps} />);
    const cuisineSelect = getByTestId('category-select');
    fireEvent(cuisineSelect, 'onValueChange');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
  });

  test('start time select change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        start: 'My start',
        soc_med: {
          facebook: '',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByTestId} = render(<NewPlaceForm {...mockedProps} />);
    const startTimeSelect = getByTestId('start-time-select');
    fireEvent(startTimeSelect, 'onValueChange');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
  });

  describe('End Time selector', () => {
    test('will render if hasEndTime is truthty', () => {
      const mockedProps = ({
        setPlaceInfo: jest.fn(),
        hasEndTime: true,
        placeInfo: {
          desc: 'Some description',
          soc_med: {
            facebook: '',
          },
        } as Partial<NewPlaceInfo>,
      } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

      const {queryByTestId} = render(<NewPlaceForm {...mockedProps} />);
      const endTimeSelect = queryByTestId('end-time-select');
      expect(endTimeSelect).toBeTruthy();
    });

    test('end time select change invoke setPlaceInfo dispatch set state function', () => {
      const mockedProps = ({
        setPlaceInfo: jest.fn(),
        hasEndTime: true,
        placeInfo: {
          end: 'My end',
          soc_med: {
            facebook: '',
          },
        } as Partial<NewPlaceInfo>,
      } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

      const {getByTestId} = render(<NewPlaceForm {...mockedProps} />);
      const endTimeSelect = getByTestId('end-time-select');
      fireEvent(endTimeSelect, 'onValueChange');
      expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
    });

    test('will not render if hasEndTime is falsy', () => {
      const mockedProps = ({
        setPlaceInfo: jest.fn(),
        hasEndTime: false,
        placeInfo: {
          desc: 'Some description',
          soc_med: {
            facebook: '',
          },
        } as Partial<NewPlaceInfo>,
      } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

      const {queryByTestId} = render(<NewPlaceForm {...mockedProps} />);
      const endTimeSelect = queryByTestId('end-time-select');
      expect(endTimeSelect).toBeFalsy();
    });
  });

  test('address text change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        address: 'My address',
        soc_med: {
          facebook: '',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByLabelText} = render(<NewPlaceForm {...mockedProps} />);
    const addressInput = getByLabelText('address-input-text');
    fireEvent(addressInput, 'onChangeText');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
    expect(addressInput.props.value).toBe('My address');
  });

  test('city text change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        city: 'My city',
        soc_med: {
          facebook: '',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByLabelText} = render(<NewPlaceForm {...mockedProps} />);
    const cityInput = getByLabelText('city-input-text');
    fireEvent(cityInput, 'onChangeText');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
    expect(cityInput.props.value).toBe('My city');
  });

  test('postcode text change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        postcode: 'My postcode',
        soc_med: {
          facebook: '',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByLabelText} = render(<NewPlaceForm {...mockedProps} />);
    const postCodeInput = getByLabelText('postcode-input-text');
    fireEvent(postCodeInput, 'onChangeText');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
    expect(postCodeInput.props.value).toBe('My postcode');
  });

  test('country select change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        start: 'My start',
        soc_med: {
          facebook: '',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByTestId} = render(<NewPlaceForm {...mockedProps} />);
    const countrySelect = getByTestId('country-select');
    fireEvent(countrySelect, 'onValueChange');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
  });

  test('phone number text change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        contact_number: '1234',
        soc_med: {
          facebook: '',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByLabelText} = render(<NewPlaceForm {...mockedProps} />);
    const phoneNumberInput = getByLabelText('phone-number-input-text');
    fireEvent(phoneNumberInput, 'onChangeText');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
    expect(phoneNumberInput.props.value).toBe('1234');
  });

  test('website text change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        web: 'My web',
        soc_med: {
          facebook: '',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByLabelText} = render(<NewPlaceForm {...mockedProps} />);
    const websiteInput = getByLabelText('website-input-text');
    fireEvent(websiteInput, 'onChangeText');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
    expect(websiteInput.props.value).toBe('My web');
  });

  test('facebook link text change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        soc_med: {
          facebook: 'My facebook',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByLabelText} = render(<NewPlaceForm {...mockedProps} />);
    const facebookInput = getByLabelText('facebook-input-text');
    fireEvent(facebookInput, 'onChangeText');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
    expect(facebookInput.props.value).toBe('My facebook');
  });

  test('instagram link text change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        soc_med: {
          instagram: 'My instagram',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByLabelText} = render(<NewPlaceForm {...mockedProps} />);
    const instagramInput = getByLabelText('instagram-input-text');
    fireEvent(instagramInput, 'onChangeText');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
    expect(instagramInput.props.value).toBe('My instagram');
  });

  test('twitter link text change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        soc_med: {
          twitter: 'My twitter',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByLabelText} = render(<NewPlaceForm {...mockedProps} />);
    const twitterInput = getByLabelText('twitter-input-text');
    fireEvent(twitterInput, 'onChangeText');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
    expect(twitterInput.props.value).toBe('My twitter');
  });

  test('solat checkbox change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        soc_med: {
          twitter: 'My twitter',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByLabelText} = render(<NewPlaceForm {...mockedProps} />);
    const solatCheckBox = getByLabelText('solat-check-box');
    fireEvent(solatCheckBox, 'onPress');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
  });

  test('family checkbox change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        soc_med: {
          twitter: 'My twitter',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByLabelText} = render(<NewPlaceForm {...mockedProps} />);
    const familyCheckBox = getByLabelText('family-check-box');
    fireEvent(familyCheckBox, 'onPress');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
  });

  test('disabled checkbox change invoke setPlaceInfo dispatch set state function', () => {
    const mockedProps = ({
      setPlaceInfo: jest.fn(),
      placeInfo: {
        soc_med: {
          twitter: 'My twitter',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByLabelText} = render(<NewPlaceForm {...mockedProps} />);
    const disabledCheckBox = getByLabelText('disabled-check-box');
    fireEvent(disabledCheckBox, 'onPress');
    expect(mockedProps.setPlaceInfo).toHaveBeenCalled();
  });

  test('submit button invoke handleSubmit when press', () => {
    const mockedProps = ({
      handleSubmit: jest.fn(),
      placeInfo: {
        soc_med: {
          twitter: 'My twitter',
        },
      } as Partial<NewPlaceInfo>,
    } as Partial<NewPlaceFormProps>) as NewPlaceFormProps;

    const {getByLabelText} = render(<NewPlaceForm {...mockedProps} />);
    const submitButton = getByLabelText('submit-button');
    fireEvent(submitButton, 'onPress');
    expect(mockedProps.handleSubmit).toHaveBeenCalled();
  });
});
