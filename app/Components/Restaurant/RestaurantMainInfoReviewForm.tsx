import {
  View,
  Button,
  Icon,
  Text,
  Form,
  Textarea,
  H3,
} from '@codler/native-base';
import React from 'react';
import ImagePicker from 'react-native-image-picker';
import {Image, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {AirbnbRating} from 'react-native-ratings';
import {RootState} from '../../Store/reducers';
import {
  setReviewCancelModalVisible,
  setReviewImage,
  setShowReviewForm,
} from '../../Store/Restaurant/action';
import {setNewReview} from '../../Store/Review/action';
import {showToast} from '../../Services/helper';
import {SelectedReviewImage} from '../../Store/Restaurant/reducer';
import {setLoadingState} from '../../Store/Authentication/action';

export const reviewRatings = [
  'Not satisfied',
  'Ok',
  'Not Bad',
  'Good',
  'Excellent',
];

interface Props {
  userToken: string;
  showReviewForm: boolean;
  selectedReviewImage: SelectedReviewImage | false;
  currentReview: string;
  disableReviewSubmit: boolean;
  selectedPlaceId: number | null;
  currentRating: number;
  handleCurrentRating: (rating: number) => void;
  handleCurrentReview: (text: string) => void;
}

const RestaurantMainInformationActionButtons: React.FC<Props> = ({
  userToken,
  showReviewForm,
  selectedReviewImage,
  currentReview,
  disableReviewSubmit,
  selectedPlaceId,
  currentRating,
  handleCurrentRating,
  handleCurrentReview,
}) => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();

  return (
    <View style={styles.reviewContainer}>
      <H3>Reviews</H3>
      {!showReviewForm ? (
        <Button
          style={styles.reviewBtn}
          iconLeft
          bordered
          block
          onPress={() => dispatch(setShowReviewForm(true))}>
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
              onPress={() => {
                dispatch(setReviewCancelModalVisible(true));
              }}
              type="AntDesign"
              name="close"
            />
          </View>
          <Textarea
            style={styles.reviewTextArea}
            underline
            rowSpan={5}
            bordered
            placeholder="Write your review here...."
            onChangeText={(text) => handleCurrentReview(text)}
            value={currentReview}
          />
          {selectedReviewImage ? (
            <View style={styles.reviewImagePreview}>
              <Image
                resizeMode="cover"
                source={{
                  uri: selectedReviewImage ? selectedReviewImage.uri : '',
                }}
                style={styles.reviewImage}
              />
            </View>
          ) : null}
          <AirbnbRating
            count={5}
            reviews={reviewRatings}
            defaultRating={0}
            size={25}
            onFinishRating={handleCurrentRating}
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
                  if (response.type) {
                    dispatch(
                      setReviewImage({
                        name: 'review-photo.jpg',
                        type: response.type,
                        uri: response.uri.replace('file://', ''),
                      }),
                    );
                  }
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
              dispatch(setLoadingState(true));
              const reviewInfo = new FormData();
              reviewInfo.append('comment', currentReview);
              reviewInfo.append('rating', currentRating);
              if (selectedReviewImage) {
                reviewInfo.append('photo', selectedReviewImage);
              }
              if (selectedPlaceId && userToken) {
                dispatch(
                  setNewReview(userToken, reviewInfo, selectedPlaceId),
                ).then((res) => {
                  if (res) {
                    handleCurrentReview('');
                    handleCurrentRating(0);
                    dispatch(setShowReviewForm(false));
                    dispatch(setReviewImage(false));
                    dispatch(setLoadingState(false));
                    showToast('Review successfully added');
                  }
                });
              }
            }}>
            <Text
              style={
                disableReviewSubmit
                  ? styles.reviewSubmitBtnTextDIsable
                  : styles.reviewSubmitBtnText
              }>
              Submit
            </Text>
          </Button>
        </Form>
      ) : null}
    </View>
  );
};

export default RestaurantMainInformationActionButtons;

const styles = StyleSheet.create({
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
  reviewSubmitBtnDisable: {
    color: '#737974',
  },
  reviewSubmitBtnText: {
    color: '#098E33',
  },
  reviewSubmitBtnTextDIsable: {
    color: '#737974',
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
  reviewImagePreview: {
    height: 250,
    paddingBottom: 5,
  },
  reviewImage: {
    height: '100%',
  },
  groupBtnIcon: {
    color: '#f4f4f4',
  },
  groupBtnText: {
    color: '#f4f4f4',
  },
});
