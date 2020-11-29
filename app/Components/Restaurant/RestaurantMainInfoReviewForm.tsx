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
import {RootState} from '../../Store/reducers';
import {
  setReviewCancelModalVisible,
  setReviewImage,
  setShowReviewForm,
} from '../../Store/Restaurant/action';
import {setNewReview} from '../../Store/Review/action';
import {showToast} from '../../Services/helper';

interface Props {
  userToken: string;
  showReviewForm: boolean;
  selectedReviewImage: string | null;
  currentReview: string;
  disableReviewSubmit: boolean;
  selectedPlaceId: number | null;
  handleCurrentReview: (text: string) => void;
}

const RestaurantMainInformationActionButtons: React.FC<Props> = ({
  userToken,
  showReviewForm,
  selectedReviewImage,
  currentReview,
  disableReviewSubmit,
  selectedPlaceId,
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
            placeholder="........"
            onChangeText={(text) => handleCurrentReview(text)}
            value={currentReview}
          />
          {selectedReviewImage ? (
            <View style={styles.reviewImagePreview}>
              <Image
                resizeMode="cover"
                source={{
                  uri: selectedReviewImage ? selectedReviewImage : '',
                }}
                style={styles.reviewImage}
              />
            </View>
          ) : null}
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
                  dispatch(setReviewImage(response.uri));
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
              if (selectedPlaceId && userToken) {
                dispatch(
                  setNewReview(userToken, reviewInfo, selectedPlaceId),
                ).then((res) => {
                  if (res) {
                    handleCurrentReview('');
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
