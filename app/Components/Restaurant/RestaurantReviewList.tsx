import {Content} from '@codler/native-base';
import React from 'react';
import {RefreshControl, StyleSheet} from 'react-native';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import {AirbnbRating} from 'react-native-ratings';
import ListCard from '../Generic/listCard';
import {ReviewModel} from '../../Store/Review/reducer';
import {reviewRatings} from './RestaurantMainInfoReviewForm';

interface Props {
  reviews: ReviewModel[];
  refreshing: boolean;
  onRefresh: () => void;
  renderRestaurantMainInformation: JSX.Element | null;
}

const RestaurantReviewList: React.FC<Props> = ({
  reviews,
  refreshing,
  renderRestaurantMainInformation,
  onRefresh,
}) => {
  const renderReviewFooter = (rating: number) => {
    return (
      <AirbnbRating
        count={5}
        defaultRating={rating}
        size={25}
        reviews={reviewRatings}
      />
    );
  };

  return (
    <KeyboardAwareFlatList
      data={reviews}
      renderItem={({item}) => (
        <Content padder>
          <ListCard
            name={`${item.user.firtName} ${item.user.lastName}`}
            avatarUri={item.user.avatar}
            mainImage={item.photo ? true : false}
            mainImageUri={item.photo}
            mainText={item.comment}
            mainTextStyle={styles.reviewContent}
            footer
            footerChild={renderReviewFooter(item.rating)}
            footerStyle={styles.starStyle}
          />
        </Content>
      )}
      keyExtractor={(item) => item.id!.toString()}
      ListHeaderComponent={renderRestaurantMainInformation}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default RestaurantReviewList;

const styles = StyleSheet.create({
  reviewContent: {
    paddingLeft: 80,
    paddingBottom: 10,
  },
  starStyle: {
    paddingBottom: 10,
  },
});
