import React from 'react';
import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import {
  Form,
  Item,
  Input,
  Label,
  Textarea,
  Picker,
  Icon,
  Button,
  CheckBox,
} from '@codler/native-base';
import {categories, cuisines, countries, time} from '../Services/constant';
import ImagePicker from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {setNewListing} from '../Restaurant/action';
import {RootState} from '../Store/reducers';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setLoadingState} from '../Authentication/action';

const styles = StyleSheet.create({
  form: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    marginTop: 10,
  },
  imageFrame: {
    marginTop: 10,
    height: 250,
    borderWidth: 1,
  },
  imageDisplay: {height: '100%'},
  checkBoxGroupContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  checkBoxLabel: {
    fontSize: 15,
    marginLeft: 12,
  },
  facebookIcon: {
    color: '#4267B2',
  },
  instagramIcon: {
    color: '#e95950',
  },
  twitterIcon: {
    color: '#1DA1F2',
  },
  submitBtn: {
    marginBottom: 50,
  },
});

const windowWidth = Dimensions.get('window').width;

interface NewPlaceInfo {
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

    console.log(enableBtn);
    setSubmitBtnStatus(!enableBtn);
    if (placeInfo.start === '24 hours') {
      setHasEndTime(false);
    } else {
      setHasEndTime(true);
    }
  }, [placeInfo]);

  return (
    <KeyboardAwareScrollView>
      <Form style={styles.form}>
        <View style={[styles.input]}>
          <Text>All item with * is required</Text>
        </View>
        <Item regular style={[styles.input]}>
          <Input
            placeholder="Place name *"
            value={placeInfo.name}
            onChangeText={(text) => setPlaceInfo({...placeInfo, name: text})}
          />
        </Item>
        <Item regular style={[styles.input]}>
          <Input
            placeholder="Sub-header"
            value={placeInfo.sub_header}
            onChangeText={(text) =>
              setPlaceInfo({...placeInfo, sub_header: text})
            }
          />
        </Item>
        <View style={[styles.input]}>
          <Label>Image</Label>
          {displayImageUri ? (
            <View style={styles.imageFrame}>
              <Image
                resizeMode="cover"
                source={{
                  uri: displayImageUri ? displayImageUri : '',
                }}
                style={styles.imageDisplay}
              />
            </View>
          ) : null}
          <View>
            <Button
              style={[styles.input]}
              block
              onPress={() => {
                const options = {
                  title: 'Select Your Image',

                  storageOptions: {
                    skipBackup: true,
                    path: 'images',
                  },
                };
                ImagePicker.showImagePicker(options, (response) => {
                  console.log('Response = ', response);

                  if (response.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                  } else if (response.customButton) {
                    console.log(
                      'User tapped custom button: ',
                      response.customButton,
                    );
                  } else {
                    setDisplayImageUri(response.uri);
                    setPlaceInfo({
                      ...placeInfo,
                      cover: {
                        name: response.fileName
                          ? response.fileName
                          : 'cover.jpg',
                        type: response.type,
                        uri: response.uri.replace('file://', ''),
                      },
                    });
                  }
                });
              }}>
              <Icon name="camera" />
            </Button>
          </View>
        </View>

        <View>
          <Textarea
            value={placeInfo.desc}
            style={[styles.input]}
            onChangeText={(text) => setPlaceInfo({...placeInfo, desc: text})}
            rowSpan={5}
            bordered
            underline
            placeholder="Description *"
          />
        </View>
        <Item regular style={[styles.input]}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: windowWidth * 0.95}}
            placeholder="Select Category *"
            selectedValue={placeInfo.category}
            onValueChange={(value) =>
              setPlaceInfo({...placeInfo, category: value})
            }>
            {categories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>
        </Item>
        <Item regular style={[styles.input]}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: windowWidth * 0.95}}
            placeholder="Select Cuisine *"
            selectedValue={placeInfo.cuisine}
            onValueChange={(value) =>
              setPlaceInfo({...placeInfo, cuisine: value})
            }>
            {cuisines.map((cuisine, index) => (
              <Picker.Item key={index} label={cuisine} value={cuisine} />
            ))}
          </Picker>
        </Item>
        <Item regular style={[styles.input]}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: windowWidth * 0.95}}
            placeholder="Select start time *"
            selectedValue={placeInfo.start}
            onValueChange={(value) =>
              setPlaceInfo({...placeInfo, start: value})
            }>
            {time.map((hours, index) => (
              <Picker.Item key={index} label={hours} value={hours} />
            ))}
          </Picker>
        </Item>
        {hasEndTime ? (
          <Item regular style={[styles.input]}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{width: windowWidth * 0.95}}
              placeholder="Select end time *"
              selectedValue={placeInfo.end}
              onValueChange={(value) =>
                setPlaceInfo({...placeInfo, end: value})
              }>
              {time.slice(1).map((hours, index) => (
                <Picker.Item key={index} label={hours} value={hours} />
              ))}
            </Picker>
          </Item>
        ) : null}
        <Item regular style={[styles.input]}>
          <Input
            placeholder="Address *"
            value={placeInfo.address}
            onChangeText={(text) => setPlaceInfo({...placeInfo, address: text})}
          />
        </Item>
        <Item regular style={[styles.input]}>
          <Input
            placeholder="City *"
            value={placeInfo.city}
            onChangeText={(text) => setPlaceInfo({...placeInfo, city: text})}
          />
        </Item>
        <Item regular style={[styles.input]}>
          <Input
            placeholder="Postcode *"
            value={placeInfo.postcode}
            onChangeText={(text) =>
              setPlaceInfo({...placeInfo, postcode: text})
            }
          />
        </Item>
        <Item regular style={[styles.input]}>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{width: windowWidth * 0.95}}
            placeholder="Select country *"
            selectedValue={placeInfo.country}
            onValueChange={(value) =>
              setPlaceInfo({...placeInfo, country: value})
            }>
            {countries.map((country, index) => (
              <Picker.Item
                key={index}
                label={country.name}
                value={country.name}
              />
            ))}
          </Picker>
        </Item>
        <Item regular style={[styles.input]}>
          <Input
            placeholder="Phone Number"
            value={placeInfo.contact_number}
            onChangeText={(text) =>
              setPlaceInfo({...placeInfo, contact_number: text})
            }
          />
        </Item>
        <View style={[styles.input]}>
          <Item regular>
            <Input
              placeholder="Website address"
              value={placeInfo.web}
              onChangeText={(text) => setPlaceInfo({...placeInfo, web: text})}
            />
          </Item>
          <Text>(link nust include http:// or https://)</Text>
        </View>
        <View style={[styles.input]}>
          <Label>Social Media</Label>
          <Item regular style={[styles.input]}>
            <Icon
              style={styles.facebookIcon}
              type="EvilIcons"
              name="sc-facebook"
            />
            <Input
              placeholder="Facebook link"
              value={placeInfo.soc_med.facebook}
              onChangeText={(text) =>
                setPlaceInfo({
                  ...placeInfo,
                  soc_med: {...placeInfo.soc_med, facebook: text},
                })
              }
            />
          </Item>

          <Item regular style={[styles.input]}>
            <Icon
              style={styles.instagramIcon}
              type="AntDesign"
              name="instagram"
            />
            <Input
              placeholder="Instagram link"
              value={placeInfo.soc_med.instagram}
              onChangeText={(text) =>
                setPlaceInfo({
                  ...placeInfo,
                  soc_med: {...placeInfo.soc_med, instagram: text},
                })
              }
            />
          </Item>
          <Item regular style={[styles.input]}>
            <Icon style={styles.twitterIcon} type="AntDesign" name="twitter" />
            <Input
              placeholder="Twitter link"
              value={placeInfo.soc_med.twitter}
              onChangeText={(text) =>
                setPlaceInfo({
                  ...placeInfo,
                  soc_med: {...placeInfo.soc_med, twitter: text},
                })
              }
            />
          </Item>
        </View>
        <View style={styles.checkBoxGroupContainer}>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              checked={placeInfo.surau}
              onPress={() =>
                setPlaceInfo((prevState) => ({
                  ...prevState,
                  surau: !prevState.surau,
                }))
              }
            />
            <Label style={[styles.checkBoxLabel]}>Solat place</Label>
          </View>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              checked={placeInfo.family_friendly}
              onPress={() =>
                setPlaceInfo((prevState) => ({
                  ...prevState,
                  family_friendly: !prevState.family_friendly,
                }))
              }
            />
            <Label style={[styles.checkBoxLabel]}>Family friendly</Label>
          </View>
          <View style={styles.checkBoxContainer}>
            <CheckBox
              checked={placeInfo.disabled_accessibility}
              onPress={() =>
                setPlaceInfo((prevState) => ({
                  ...prevState,
                  disabled_accessibility: !prevState.disabled_accessibility,
                }))
              }
            />
            <Label style={[styles.checkBoxLabel]}>Disabled accessibility</Label>
          </View>
        </View>
        <View>
          <Button
            style={[styles.input, styles.submitBtn]}
            block
            light={submitBtnStatus}
            disabled={submitBtnStatus}
            onPress={() => {
              dispatch(setLoadingState(true));
              const newData = new FormData();
              Object.entries(placeInfo).forEach(([key, value]) => {
                if (key === 'soc_med') {
                  newData.append(key, JSON.stringify(value));
                } else {
                  newData.append(key, value);
                }
              });
              dispatch(setNewListing(newData)).then((res) => {
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
                  navigation.navigate('Listing');
                  dispatch(setLoadingState(false));
                }
              });
            }}>
            <Text>Submit</Text>
          </Button>
        </View>
      </Form>
    </KeyboardAwareScrollView>
  );
};

export default NewListing;
