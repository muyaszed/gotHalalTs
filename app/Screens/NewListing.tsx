import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setNewListing} from '../Store/Restaurant/action';
import {RootState} from '../Store/reducers';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setLoadingState} from '../Store/Authentication/action';
import {NewPlaceForm} from '../Components/';

export interface NewPlaceInfo {
  name: string;
  sub_header: string;
  cover: {} | false;
  desc: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
  category: string;
  cuisine: string;
  start: string;
  end: string;
  contact_number: string;
  web: string;
  soc_med: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  surau: boolean;
  family_friendly: boolean;
  disabled_accessibility: boolean;
}

const NewListing = () => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const [displayImageUri, setDisplayImageUri] = React.useState<string | null>(
    null,
  );
  const navigation = useNavigation();
  const [hasEndTime, setHasEndTime] = React.useState(true);
  const [submitBtnStatus, setSubmitBtnStatus] = React.useState(true);
  const token = useSelector((state: RootState) => state.auth.userToken);
  const [placeInfo, setPlaceInfo] = React.useState<NewPlaceInfo>({
    name: '',
    sub_header: '',
    cover: false,
    desc: '',
    address: '',
    city: '',
    postcode: '',
    country: '',
    category: '',
    cuisine: '',
    start: '',
    end: '',
    contact_number: '',
    web: '',
    soc_med: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
    surau: false,
    family_friendly: false,
    disabled_accessibility: false,
  });

  React.useEffect(() => {
    const enableBtn =
      placeInfo.name.length > 5 &&
      placeInfo.sub_header.length > 5 &&
      placeInfo.desc.length > 15 &&
      placeInfo.address.length > 10 &&
      placeInfo.city.length > 1 &&
      placeInfo.postcode.length > 1 &&
      placeInfo.country.length > 1 &&
      placeInfo.cuisine.length > 1 &&
      placeInfo.category.length > 1 &&
      placeInfo.start.length > 1;

    setSubmitBtnStatus(!enableBtn);
    if (placeInfo.start === '24 hours') {
      setHasEndTime(false);
    } else {
      setHasEndTime(true);
    }
  }, [placeInfo]);

  const handleSubmit = () => {
    dispatch(setLoadingState(true));
    const newData = new FormData();
    Object.entries(placeInfo).forEach(([key, value]) => {
      if (key === 'soc_med') {
        newData.append(key, JSON.stringify(value));
      } else {
        newData.append(key, value);
      }
    });
    if (token) {
      dispatch(setNewListing(newData, token)).then((res) => {
        if (res) {
          setPlaceInfo({
            name: '',
            sub_header: '',
            cover: false,
            desc: '',
            address: '',
            city: '',
            postcode: '',
            country: '',
            category: '',
            cuisine: '',
            start: '',
            end: '',
            contact_number: '',
            web: '',
            soc_med: {
              facebook: '',
              instagram: '',
              twitter: '',
            },
            surau: false,
            family_friendly: false,
            disabled_accessibility: false,
          });
          setDisplayImageUri(null);
          navigation.navigate('EXPLORE PLACES');
          dispatch(setLoadingState(false));
        }
      });
    }
  };

  return (
    <KeyboardAwareScrollView>
      <NewPlaceForm
        placeInfo={placeInfo}
        displayImageUri={displayImageUri}
        hasEndTime={hasEndTime}
        submitBtnStatus={submitBtnStatus}
        setPlaceInfo={setPlaceInfo}
        setDisplayImageUri={setDisplayImageUri}
        handleSubmit={handleSubmit}
      />
    </KeyboardAwareScrollView>
  );
};

export default NewListing;
