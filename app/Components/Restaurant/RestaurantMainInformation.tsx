import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Action} from 'redux';
import {Text, ListItem, CheckBox, Body} from '@codler/native-base';
import openMap from 'react-native-open-maps';
import {RootState} from '../../Store/reducers';
import {
  setRestaurantMapModalVisible,
  setReviewCancelModalVisible,
  setReviewImage,
  setShowReviewForm,
  setUseGoogleMap,
  setVerificationData,
  setVerificationModalVisible,
} from '../../Store/Restaurant/action';
import Modal from '../Generic/modal';
import {ThunkDispatch} from 'redux-thunk';
import {userVerify} from '../../Store/HalalVerification/action';
import {
  RestaurantModel,
  SelectedReviewImage,
  VerificationData,
} from '../../Store/Restaurant/reducer';
import RestaurantMainInformationHeader from './RestaurantMainInformationHeader';
import RestaurantMainInformationVerification from './RestaurantMainInformationVerification';
import RestaurantMainInformationDetail from './RestaurantMainInformationDetail';
import RestaurantMainInformationActionButtons from './RestaurantMainInformationActionButtons';
import RestaurantMainInformationMap from './RestaurantMainInformationMap';
import RestaurantMainInfoReviewForm from './RestaurantMainInfoReviewForm';

export interface RestaurantProps {
  restaurant: RestaurantModel;
  userToken: string;
  userId: number;
  currentUserBookmarkList: RestaurantModel[];
  mapModalVisible: boolean;
  useGoogleMap: boolean;
  selectedReviewImage: SelectedReviewImage | false;
  currentReview: string;
  disableReviewSubmit: boolean;
  selectedPlaceId: number | null;
  verificationData: VerificationData;
  verifyModalVisible: boolean;
  showReviewForm: boolean;
  reviewCancelModalVisible: boolean;
  userDistanceSetting: string;
  currentRating: number;
  handleCurrentRating: (rating: number) => void;
  handleCurrentReview: (text: string) => void;
}

interface MapOption {
  latitude: number;
  longitude: number;
  google: boolean;
}

const RestaurantMainInformation: React.FC<RestaurantProps> = ({
  restaurant,
  userId,
  currentUserBookmarkList,
  userToken,
  showReviewForm,
  currentReview,
  selectedReviewImage,
  disableReviewSubmit,
  selectedPlaceId,
  mapModalVisible,
  useGoogleMap,
  verifyModalVisible,
  verificationData,
  reviewCancelModalVisible,
  userDistanceSetting,
  currentRating,
  handleCurrentRating,
  handleCurrentReview,
}) => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
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

  return (
    <View>
      <View>
        <RestaurantMainInformationHeader
          restaurantName={restaurant.name}
          restaurantSubHeader={restaurant.sub_header}
          restaurantCoverUri={restaurant.cover_uri}
          restaurantDescription={restaurant.desc}
        />
        <RestaurantMainInformationVerification
          restaurant={restaurant}
          userId={userId}
        />
        <RestaurantMainInformationDetail restaurant={restaurant} />
        <RestaurantMainInformationActionButtons
          restaurant={restaurant}
          currentUserBookmarkList={currentUserBookmarkList}
          userToken={userToken}
          userDistanceSetting={userDistanceSetting}
        />
        <RestaurantMainInformationMap restaurant={restaurant} />
        <RestaurantMainInfoReviewForm
          userToken={userToken}
          showReviewForm={showReviewForm}
          selectedReviewImage={selectedReviewImage}
          currentReview={currentReview}
          disableReviewSubmit={disableReviewSubmit}
          selectedPlaceId={selectedPlaceId}
          currentRating={currentRating}
          handleCurrentRating={handleCurrentRating}
          handleCurrentReview={handleCurrentReview}
        />
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
            dispatch(setRestaurantMapModalVisible(false));
          }}
          handleRightButton={() =>
            dispatch(setRestaurantMapModalVisible(false))
          }>
          <ListItem onPress={() => dispatch(setUseGoogleMap(true))}>
            <CheckBox checked={useGoogleMap} />
            <Body>
              <Text>Google Map</Text>
            </Body>
          </ListItem>
          <ListItem onPress={() => dispatch(setUseGoogleMap(false))}>
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
            if (userToken) {
              dispatch(userVerify(userToken, data));
            }
            console.log(data);
            dispatch(setVerificationModalVisible(false));
            dispatch(
              setVerificationData({
                confirmation: false,
                certification: false,
                logo: false,
              }),
            );
          }}
          handleRightButton={() => {
            dispatch(setVerificationModalVisible(false));
            dispatch(
              setVerificationData({
                confirmation: false,
                certification: false,
                logo: false,
              }),
            );
          }}>
          <ListItem
            onPress={() =>
              dispatch(
                setVerificationData({
                  confirmation: true,
                  certification: false,
                  logo: false,
                }),
              )
            }>
            <CheckBox checked={verificationData.confirmation} />
            <Body>
              <Text>Written or verbal confirmation</Text>
            </Body>
          </ListItem>
          <ListItem
            onPress={() =>
              dispatch(
                setVerificationData({
                  confirmation: false,
                  certification: true,
                  logo: false,
                }),
              )
            }>
            <CheckBox checked={verificationData.certification} />
            <Body>
              <Text>Halal certification</Text>
            </Body>
          </ListItem>
          <ListItem
            onPress={() =>
              dispatch(
                setVerificationData({
                  confirmation: false,
                  certification: false,
                  logo: true,
                }),
              )
            }>
            <CheckBox checked={verificationData.logo} />
            <Body>
              <Text>Halal logo</Text>
            </Body>
          </ListItem>
        </Modal>
        <Modal
          title="Are you sure you want to cancel?"
          leftButtonName="OK"
          rightButtonName="Cancel"
          modalVisible={reviewCancelModalVisible}
          handleLeftButton={() => {
            dispatch(setReviewImage(false));
            handleCurrentReview('');
            handleCurrentRating(0);
            dispatch(setShowReviewForm(false));
            dispatch(setReviewCancelModalVisible(false));
          }}
          handleRightButton={() =>
            dispatch(setReviewCancelModalVisible(false))
          }>
          <Text>You will lose all your current review.</Text>
        </Modal>
      </View>
    </View>
  );
};

export default RestaurantMainInformation;
