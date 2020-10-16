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
    // paddingLeft: 15,
    // paddingRight: 15,
  },
  title: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  description: {
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  mainImageContainer: {
    flex: 1,
    height: 300,
  },
  mainImage: {
    height: 300,
    resizeMode: 'cover',
    paddingLeft: 0,
    paddingRight: 0,
  },
  verifyButtonContainer: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  verifyButton: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#098E33',
    borderColor: '#098E33',
  },
  verifyBtnText: {
    color: '#f4f4f4',
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
    backgroundColor: '#098E33',
    borderColor: '#098E33',
  },
  groupBtnIcon: {
    color: '#f4f4f4',
  },
  groupBtnText: {
    color: '#f4f4f4',
  },
  reviewContainer: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
  },
  reviewTextArea: {
    marginBottom: 20,
  },
  reviewPhotoBtn: {
    marginBottom: 10,
    backgroundColor: '#098E33',
  },
  reviewSubmitBtn: {
    borderColor: '#098E33',
  },
  reviewSubmitBtnText: {
    color: '#098E33',
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
    justifyContent: 'center',
  },
  extraInfo: {
    justifyContent: 'space-around',
  },
  extraInfoCheckWrapper: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#098E33',
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraInfoCheck: {
    fontSize: 26,
  },
  socMedIcon: {
    color: '#098E33',
    fontSize: 40,
  },
  statusIconGroup: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
  },
  verificationContainer: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#098E33',
    borderRadius: 10,
  },
  verificationIcons: {
    paddingTop: 10,
    paddingBottom: 20,
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
  verifyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#098E33',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 12,
  },
  verifyTitle: {
    position: 'relative',
    bottom: 11,
    left: 15,
    backgroundColor: '#f4f4f4',
    width: 136,
    paddingLeft: 3,
    paddingRight: 3,
  },
  reviewBtn: {
    textAlign: 'center',
    backgroundColor: '#098E33',
    borderColor: '#098E33',
  },
  reviewForm: {
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 15,
    paddingBottom: 5,
    borderRadius: 5,
  },
  reviewFormCancelIcon: {
    alignItems: 'flex-end',
  },
  reviewContent: {
    paddingLeft: 80,
    paddingBottom: 10,
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
  showReviewForm: boolean,
  setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return (
    <View>
      <View style={styles.mainContainer}>
        <H1 style={styles.title}>{restaurant.name.toUpperCase()}</H1>
        <H3 style={styles.description}>{restaurant.desc}</H3>

        <View style={styles.mainImage}>
          <Image
            style={styles.mainImage}
            source={{
              uri: restaurant.cover_uri ? restaurant.cover_uri : 'Image URL',
            }}
          />
        </View>
        <View style={styles.verificationContainer}>
          <Text style={styles.verifyTitle}>Halal Verifications</Text>
          <View style={styles.verificationIcons}>
            <View style={styles.verifyCircle}>
              <Icon type="FontAwesome" name="certificate" />
              <Text
                style={
                  styles.percentage
                }>{`${restaurant.certificate_verification}%`}</Text>
            </View>

            <View style={styles.verifyCircle}>
              <Icon type="FontAwesome" name="commenting" />
              <Text
                style={
                  styles.percentage
                }>{`${restaurant.confirmation_verification}%`}</Text>
            </View>

            <View style={styles.verifyCircle}>
              <View style={styles.logoIcon}>
                <Text>حلا</Text>
              </View>
              <Text
                style={
                  styles.percentage
                }>{`${restaurant.logo_verification}%`}</Text>
            </View>
          </View>
        </View>

        {restaurant.halal_verifications.map((item) => item.user_id === userId)
          .length === 0 ? (
          <View style={styles.verifyButtonContainer}>
            <Button
              style={styles.verifyButton}
              iconLeft
              bordered
              block
              onPress={() => setVerifyModalVisible(true)}>
              <Text style={styles.verifyBtnText}>Verify Halal Status</Text>
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

            <ListItem itemDivider style={styles.socMed}>
              {Object.values(restaurant.soc_med)
                .filter((item: string) => item.length > 0)
                .map((item, index) => {
                  const socMed = restaurant.soc_med;
                  return (
                    <Icon
                      style={styles.socMedIcon}
                      key={index}
                      onPress={() => Linking.openURL(socMed[item])}
                      type="Entypo"
                      name={item}
                    />
                  );
                })}
            </ListItem>

            <ListItem itemDivider style={styles.extraInfo}>
              <View style={styles.statusIconGroup}>
                <Icon type="FontAwesome5" name="mosque" />
                {restaurant.surau ? (
                  <View style={styles.extraInfoCheckWrapper}>
                    <Icon
                      type="AntDesign"
                      name="check"
                      style={styles.extraInfoCheck}
                    />
                  </View>
                ) : (
                  <Icon type="AntDesign" name="close" />
                )}
              </View>
              <View style={styles.statusIconGroup}>
                <Icon type="FontAwesome5" name="baby-carriage" />
                {restaurant.family_friendly ? (
                  <View style={styles.extraInfoCheckWrapper}>
                    <Icon
                      type="AntDesign"
                      name="check"
                      style={styles.extraInfoCheck}
                    />
                  </View>
                ) : (
                  <Icon type="AntDesign" name="close" />
                )}
              </View>
              <View style={styles.statusIconGroup}>
                <Icon type="FontAwesome" name="wheelchair" />
                {restaurant.disabled_accessibility ? (
                  <View style={styles.extraInfoCheckWrapper}>
                    <Icon
                      type="AntDesign"
                      name="check"
                      style={styles.extraInfoCheck}
                    />
                  </View>
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
            <Icon
              style={styles.groupBtnIcon}
              active
              type="FontAwesome5"
              name="calendar-check"
            />
            <Text style={styles.groupBtnText}>Check-In Here</Text>
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
              <Icon
                style={styles.groupBtnIcon}
                active
                type="Foundation"
                name="book-bookmark"
              />
              <Text style={styles.groupBtnText}>Unbookmark</Text>
            </Button>
          ) : (
            <Button
              style={styles.groupBtn}
              iconLeft
              bordered
              block
              onPress={() => dispatch(userBookmark(userToken))}>
              <Icon
                style={styles.groupBtnIcon}
                active
                type="Foundation"
                name="book-bookmark"
              />
              <Text style={styles.groupBtnText}>Bookmark</Text>
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
          <H3>Reviews</H3>
          {!showReviewForm ? (
            <Button
              style={styles.reviewBtn}
              iconLeft
              bordered
              block
              onPress={() => setShowReviewForm(true)}>
              <Icon
                style={styles.groupBtnIcon}
                active
                type="Foundation"
                name="book-bookmark"
              />
              <Text style={styles.groupBtnText}>Write a review</Text>
            </Button>
          ) : null}
          {showReviewForm ? (
            <Form style={styles.reviewForm}>
              <View style={styles.reviewFormCancelIcon}>
                <Icon
                  onPress={() => setShowReviewForm(false)}
                  type="AntDesign"
                  name="close"
                />
              </View>
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
                style={styles.reviewSubmitBtn}
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
                <Text style={styles.reviewSubmitBtnText}>Submit</Text>
              </Button>
            </Form>
          ) : null}
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
  const [showReviewForm, setShowReviewForm] = React.useState(false);
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
            mainTextStyle={styles.reviewContent}
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
        showReviewForm,
        setShowReviewForm,
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default Restaurant;
