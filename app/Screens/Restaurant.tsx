/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Action} from 'redux';
import {RootState} from '../Store/reducers';
import {loadReviews} from '../Store/Review/action';
import {
  getAllRestaurants,
  setReviewSubmitButtonStatus,
} from '../Store/Restaurant/action';
import {ThunkDispatch} from 'redux-thunk';
import {RestaurantMainInformation, RestaurantReviewList} from '../Components';
import {View} from 'react-native';
import Loading from '../Components/Generic/loading';

const Restaurant = () => {
  const [currentReview, setCurrentReview] = React.useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const [currentRating, setCurrentRating] = React.useState(0);

  const selectedPlaceId = useSelector(
    (state: RootState) => state.restaurants.selectedRestaurantId,
  );
  const restaurant = useSelector(
    (state: RootState) =>
      state.restaurants.list.filter((item) => item.id === selectedPlaceId)[0],
  );
  const loadingStatus = useSelector((state: RootState) => state.auth.isLoading);
  const userToken = useSelector((state: RootState) => state.auth.userToken);
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const reviews = useSelector((state: RootState) => state.reviews.list);
  const userId = useSelector((state: RootState) => state.profile.userId);
  const calculateAverageRating = () => {
    const totalRating = reviews.reduce((acc, review) => {
      return acc + review.rating;
    }, 0);

    return reviews.length !== 0 ? totalRating / reviews.length : null;
  };
  const currentUserBookmarkList = useSelector(
    (state: RootState) => state.profile.bookmark,
  );
  const showReviewForm = useSelector(
    (state: RootState) => state.restaurants.restaurantInfo.showReviewForm,
  );
  const selectedReviewImage = useSelector(
    (state: RootState) => state.restaurants.restaurantInfo.selectedReviewImage,
  );
  const disableReviewSubmit = useSelector(
    (state: RootState) => state.restaurants.restaurantInfo.disableReviewSubmit,
  );
  const mapModalVisible = useSelector(
    (state: RootState) => state.restaurants.restaurantInfo.mapModalVisible,
  );
  const useGoogleMap = useSelector(
    (state: RootState) => state.restaurants.restaurantInfo.useGoogleMap,
  );
  const verifyModalVisible = useSelector(
    (state: RootState) => state.restaurants.restaurantInfo.verifyModalVisible,
  );
  const verificationData = useSelector(
    (state: RootState) => state.restaurants.restaurantInfo.verificationData,
  );
  const reviewCancelModalVisible = useSelector(
    (state: RootState) =>
      state.restaurants.restaurantInfo.reviewCancelModalVisible,
  );
  const userDistanceSetting = useSelector(
    (state: RootState) => state.profile.settings.distance_unit,
  );

  const wait = (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

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
      dispatch(setReviewSubmitButtonStatus(false));
    } else {
      dispatch(setReviewSubmitButtonStatus(true));
    }
  }, [currentReview]);

  const renderRestaurantMainInformation = () => {
    if (userId && userToken) {
      return (
        <RestaurantMainInformation
          restaurant={restaurant}
          userId={userId}
          currentUserBookmarkList={currentUserBookmarkList}
          userToken={userToken}
          showReviewForm={showReviewForm}
          currentReview={currentReview}
          selectedReviewImage={selectedReviewImage}
          disableReviewSubmit={disableReviewSubmit}
          selectedPlaceId={selectedPlaceId}
          mapModalVisible={mapModalVisible}
          useGoogleMap={useGoogleMap}
          verifyModalVisible={verifyModalVisible}
          verificationData={verificationData}
          reviewCancelModalVisible={reviewCancelModalVisible}
          userDistanceSetting={userDistanceSetting}
          currentRating={currentRating}
          handleCurrentRating={handleCurrentRating}
          handleCurrentReview={handleCurrentReview}
          averageRating={calculateAverageRating()}
        />
      );
    }

    return null;
  };

  const handleCurrentReview = (text: string) => {
    setCurrentReview(text);
  };

  const handleCurrentRating = (rating: number) => {
    console.log(rating);
    setCurrentRating(rating);
  };

  return (
    <View>
      <RestaurantReviewList
        reviews={reviews}
        refreshing={refreshing}
        renderRestaurantMainInformation={renderRestaurantMainInformation()}
        onRefresh={onRefresh}
      />
      {loadingStatus ? <Loading /> : null}
    </View>
  );
};

export default Restaurant;
