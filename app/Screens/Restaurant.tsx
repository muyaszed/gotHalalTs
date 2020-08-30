/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Image, StyleSheet, Linking, View, RefreshControl} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Action} from 'redux';
import {
  Left,
  Text,
  Button,
  Content,
  H1,
  H3,
  List,
  ListItem,
  Form,
  Textarea,
  Icon,
  CheckBox,
  Body,
} from '@codler/native-base';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import MapView, {Marker, Callout} from 'react-native-maps';
import openMap from 'react-native-open-maps';
import {RootState} from '../Store/reducers';
import {loadReviews, setNewReview} from '../Review/action';
import ListCard from '../Components/listCard';
import {RestaurantModel} from '../Restaurant/reducer';
import {userBookmark, userUnbookmark} from '../Bookmark/action';
import {getAllRestaurants} from '../Restaurant/action';
import {userCheckin} from '../CheckIn/action';
import Modal from '../Components/modal';
import ImagePicker from 'react-native-image-picker';
import {ThunkDispatch} from 'redux-thunk';
import {showToast} from '../Services/helper';
import {userVerify} from '../HalalVerification/action';

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 10,
  },
  description: {},
  mainImageContainer: {
    flex: 1,
    height: 300,
  },
  mainImage: {
    height: 300,
    resizeMode: 'cover',
  },
  verifyButtonContainer: {
    paddingTop: 10,
  },
  verifyButton: {
    width: '100%',
    textAlign: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  groupBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  groupBtn: {
    width: '45%',
    textAlign: 'center',
  },
  reviewContainer: {
    flex: 1,
    marginTop: 20,
  },
  reviewTextArea: {
    marginBottom: 20,
  },
  reviewPhotoBtn: {
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    height: 300,
    marginTop: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 300,
  },
  mapModal: {},
  mapModalContent: {},
  mapModalTitle: {},
  socMed: {
    justifyContent: 'space-around',
  },
  statusIconGroup: {
    flexDirection: 'row',
  },
  verificationIcons: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 1,
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface MapOption {
  latitude: number;
  longitude: number;
  google: boolean;
}

interface VerificationData {
  confirmation: boolean;
  certification: boolean;
  logo: boolean;
}

const handleOpenMap = (option: MapOption) => {
  if (option.google) {
    openMap({
      provider: 'google',
      latitude: option.latitude,
      longitude: option.longitude,
    });
  } else {
    openMap({
      latitude: option.latitude,
      longitude: option.longitude,
    });
  }
};

const renderAboveReviews = (
  restaurant: RestaurantModel,
  dispatch: ThunkDispatch<RootState, void, Action>,
  userToken: string,
  userId: number,
  currentUserBookmarkList: RestaurantModel[],
  mapModalVisible: boolean,
  setMapModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  useGoogleMap: boolean,
  setUseGoogleMap: React.Dispatch<React.SetStateAction<boolean>>,
  selectedReviewImage: string | null,
  setReviewImage: React.Dispatch<React.SetStateAction<string | null>>,
  currentReview: string,
  setCurrentReview: React.Dispatch<React.SetStateAction<string>>,
  disableReviewSubmit: boolean,
  selectedPlaceId: number | null,
  verificationData: VerificationData,
  setVerification: React.Dispatch<React.SetStateAction<VerificationData>>,
  verifyModalVisible: boolean,
  setVerifyModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return (
    <View>
      <View style={styles.mainContainer}>
        <H1 style={styles.title}>{restaurant.name.toUpperCase()}</H1>
        <H3 style={styles.description}>{restaurant.desc.toUpperCase()}</H3>

        <View style={styles.mainImage}>
          <Image
            style={styles.mainImage}
            source={{
              uri: restaurant.cover_uri ? restaurant.cover_uri : 'Image URL',
            }}
          />
        </View>
        <View style={styles.verificationIcons}>
          {restaurant.certificate_verification !== '0' ? (
            <View>
              <Icon type="FontAwesome" name="certificate" />
              <Text>{`${restaurant.certificate_verification}%`}</Text>
            </View>
          ) : null}
          {restaurant.confirmation_verification !== '0' ? (
            <View>
              <Icon type="FontAwesome" name="commenting" />
              <Text>{`${restaurant.confirmation_verification}%`}</Text>
            </View>
          ) : null}
          {restaurant.logo_verification !== '0' ? (
            <View>
              <View style={styles.logoIcon}>
                <Text>حلا</Text>
              </View>
              <Text>{`${restaurant.logo_verification}%`}</Text>
            </View>
          ) : null}
        </View>
        {restaurant.halal_verifications.map((item) => item.user_id === userId)
          .length === 0 ? (
          <View style={styles.verifyButtonContainer}>
            <Button
              iconLeft
              bordered
              block
              onPress={() => setVerifyModalVisible(true)}>
              <Text>Verify Halal Status</Text>
            </Button>
          </View>
        ) : null}
        <View>
          <List>
            <ListItem itemDivider>
              <Left>
                <Text>Cuisine</Text>
              </Left>
              <Text>{restaurant.cuisine}</Text>
            </ListItem>
            <ListItem itemDivider>
              <Left>
                <Text>Category</Text>
              </Left>
              <Text>{restaurant.category}</Text>
            </ListItem>
            <ListItem itemDivider>
              <Left>
                <Text>Operating Hours</Text>
              </Left>
              {restaurant.end.length === 0 ? (
                <Text>{restaurant.start}</Text>
              ) : (
                <Text>{`From: ${restaurant.start} - To: ${restaurant.end}`}</Text>
              )}
            </ListItem>
            {restaurant.web.length === 0 ? null : (
              <ListItem itemDivider>
                <Left>
                  <Text>Website</Text>
                </Left>
                <Text>{restaurant.web}</Text>
              </ListItem>
            )}
            {restaurant.contact_number.length === 0 ? null : (
              <ListItem itemDivider>
                <Left>
                  <Text>Contact number</Text>
                </Left>
                <Text>{restaurant.contact_number}</Text>
              </ListItem>
            )}
            {Object.keys(restaurant.soc_med).length === 0 ? null : (
              <ListItem itemDivider style={styles.socMed}>
                {Object.keys(restaurant.soc_med).map((item, index) => {
                  const socMed = restaurant.soc_med;
                  return (
                    <Icon
                      key={index}
                      onPress={() => Linking.openURL(socMed[item])}
                      type="Entypo"
                      name={item}
                    />
                  );
                })}
              </ListItem>
            )}
            <ListItem itemDivider style={styles.socMed}>
              <View style={styles.statusIconGroup}>
                <Icon type="FontAwesome5" name="mosque" />
                {restaurant.surau ? (
                  <Icon type="AntDesign" name="check" />
                ) : (
                  <Icon type="AntDesign" name="close" />
                )}
              </View>
              <View style={styles.statusIconGroup}>
                <Icon type="FontAwesome5" name="baby-carriage" />
                {restaurant.family_friendly ? (
                  <Icon type="AntDesign" name="check" />
                ) : (
                  <Icon type="AntDesign" name="close" />
                )}
              </View>
              <View style={styles.statusIconGroup}>
                <Icon type="FontAwesome" name="wheelchair" />
                {restaurant.disabled_accessibility ? (
                  <Icon type="AntDesign" name="check" />
                ) : (
                  <Icon type="AntDesign" name="close" />
                )}
              </View>
            </ListItem>
          </List>
        </View>

        <View style={styles.groupBtnContainer}>
          <Button
            style={styles.groupBtn}
            iconLeft
            bordered
            block
            onPress={() => dispatch(userCheckin())}>
            <Icon active type="FontAwesome5" name="calendar-check" />
            <Text>Check-In Here</Text>
          </Button>
          {currentUserBookmarkList.find(
            (bookamarkedRestaurant) =>
              bookamarkedRestaurant.id === restaurant.id,
          ) ? (
            <Button
              style={styles.groupBtn}
              iconLeft
              bordered
              block
              onPress={() => dispatch(userUnbookmark(userToken))}>
              <Icon active type="Foundation" name="book-bookmark" />
              <Text>Unbookmark</Text>
            </Button>
          ) : (
            <Button
              style={styles.groupBtn}
              iconLeft
              bordered
              block
              onPress={() => dispatch(userBookmark(userToken))}>
              <Icon active type="Foundation" name="book-bookmark" />
              <Text>Bookmark</Text>
            </Button>
          )}
        </View>
        <View style={styles.mapContainer}>
          <MapView
            onPress={() => setMapModalVisible(true)}
            provider="google"
            style={styles.map}
            region={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
              }}
            />
            <Callout />
          </MapView>
        </View>
        <View style={styles.reviewContainer}>
          <Text>Reviews</Text>
          <Form>
            <Textarea
              style={styles.reviewTextArea}
              underline
              rowSpan={5}
              bordered
              placeholder="........"
              onChangeText={(text) => setCurrentReview(text)}
              value={currentReview}
            />
            <Button
              block
              disabled={disableReviewSubmit}
              style={styles.reviewPhotoBtn}
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
                    setReviewImage(response.uri);
                  }
                });
              }}>
              <Icon name="camera" />
            </Button>
            <Button
              bordered
              block
              disabled={disableReviewSubmit}
              onPress={() => {
                const reviewInfo = new FormData();
                reviewInfo.append('comment', currentReview);
                if (selectedReviewImage) {
                  reviewInfo.append('photo', {
                    name: 'review-photo.jpg',
                    type: 'image/jpeg',
                    uri: selectedReviewImage.replace('file://', ''),
                  });
                }
                if (selectedPlaceId) {
                  dispatch(
                    setNewReview(userToken, reviewInfo, selectedPlaceId),
                  ).then((res) => {
                    if (res) {
                      setCurrentReview('');
                      showToast('Review successfully added');
                    }
                  });
                }
              }}>
              <Text>Submit</Text>
            </Button>
          </Form>
        </View>
        <Modal
          title="Please select your desired map application."
          leftButtonName="Open"
          rightButtonName="Cancel"
          modalVisible={mapModalVisible}
          handleLeftButton={() => {
            handleOpenMap({
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
              google: useGoogleMap,
            });
            setMapModalVisible(false);
          }}
          handleRightButton={() => setMapModalVisible(false)}>
          <ListItem onPress={() => setUseGoogleMap(true)}>
            <CheckBox checked={useGoogleMap} />
            <Body>
              <Text>Google Map</Text>
            </Body>
          </ListItem>
          <ListItem onPress={() => setUseGoogleMap(false)}>
            <CheckBox checked={!useGoogleMap} />
            <Body>
              <Text>IOS Map</Text>
            </Body>
          </ListItem>
        </Modal>
        <Modal
          title="Please select item you'll like to verify"
          leftButtonName="Verify"
          rightButtonName="Cancel"
          modalVisible={verifyModalVisible}
          handleLeftButton={() => {
            const data = new FormData();
            data.append('confirmation', verificationData.confirmation);
            data.append('certificate', verificationData.certification);
            data.append('logo', verificationData.logo);
            dispatch(userVerify(userToken, data));
            console.log(data);
            setVerifyModalVisible(false);
            setVerification({
              confirmation: false,
              certification: false,
              logo: false,
            });
          }}
          handleRightButton={() => {
            setVerifyModalVisible(false);
            setVerification({
              confirmation: false,
              certification: false,
              logo: false,
            });
          }}>
          <ListItem
            onPress={() =>
              setVerification((prevState) => ({
                ...prevState,
                confirmation: !prevState.confirmation,
              }))
            }>
            <CheckBox checked={verificationData.confirmation} />
            <Body>
              <Text>Written or verbal confirmation</Text>
            </Body>
          </ListItem>
          <ListItem
            onPress={() =>
              setVerification((prevState) => ({
                ...prevState,
                certification: !prevState.certification,
              }))
            }>
            <CheckBox checked={verificationData.certification} />
            <Body>
              <Text>Halal certification</Text>
            </Body>
          </ListItem>
          <ListItem
            onPress={() =>
              setVerification((prevState) => ({
                ...prevState,
                logo: !prevState.logo,
              }))
            }>
            <CheckBox checked={verificationData.logo} />
            <Body>
              <Text>Halal logo</Text>
            </Body>
          </ListItem>
        </Modal>
      </View>
    </View>
  );
};

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Restaurant = () => {
  const [currentReview, setCurrentReview] = React.useState('');
  const [disableReviewSubmit, setReviewSubitButtonStatus] = React.useState(
    true,
  );
  const selectedPlaceId = useSelector(
    (state: RootState) => state.restaurants.selectedRestaurantId,
  );
  const restaurant = useSelector(
    (state: RootState) =>
      state.restaurants.list.filter((item) => item.id === selectedPlaceId)[0],
  );
  const userToken = useSelector((state: RootState) => state.auth.userToken);
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const reviews = useSelector((state: RootState) => state.reviews.list);
  const userId = useSelector((state: RootState) => state.profile.userId);
  const currentUserBookmarkList = useSelector(
    (state: RootState) => state.profile.bookmark,
  );

  const [refreshing, setRefreshing] = React.useState(false);
  const [mapModalVisible, setMapModalVisible] = React.useState(false);
  const [useGoogleMap, setUseGoogleMap] = React.useState(true);
  const [selectedReviewImage, setReviewImage] = React.useState<string | null>(
    null,
  );

  const [verificationData, setVerification] = React.useState<VerificationData>({
    confirmation: false,
    certification: false,
    logo: false,
  });
  const [verifyModalVisible, setVerifyModalVisible] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      if (userToken) {
        dispatch(getAllRestaurants(userToken));
        setRefreshing(false);
      }
    });
  }, []);

  React.useEffect(() => {
    if (userToken) {
      dispatch(loadReviews(userToken));
    }
  }, []);

  React.useEffect(() => {
    const reviewHasContent = currentReview.length > 10;
    if (reviewHasContent) {
      setReviewSubitButtonStatus(false);
    } else {
      setReviewSubitButtonStatus(true);
    }
  }, [currentReview]);

  return (
    <KeyboardAwareFlatList
      data={reviews}
      renderItem={({item}) => (
        <Content padder>
          <ListCard
            name={`${item.user.firtName} ${item.user.lastName}`}
            avatarUri={item.user.avatar}
            mainImage={false}
            mainImageUri={item.photo}
            mainText={item.comment}
            footer={false}
          />
        </Content>
      )}
      keyExtractor={(item) => item.id!.toString()}
      ListHeaderComponent={renderAboveReviews(
        restaurant,
        dispatch,
        userToken!,
        userId!,
        currentUserBookmarkList,
        mapModalVisible,
        setMapModalVisible,
        useGoogleMap,
        setUseGoogleMap,
        selectedReviewImage,
        setReviewImage,
        currentReview,
        setCurrentReview,
        disableReviewSubmit,
        selectedPlaceId,
        verificationData,
        setVerification,
        verifyModalVisible,
        setVerifyModalVisible,
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default Restaurant;
