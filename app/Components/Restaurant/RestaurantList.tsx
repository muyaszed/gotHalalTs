import {Content, Icon} from '@codler/native-base';
import React, {Dispatch, SetStateAction} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setSelectedRestaurant} from '../../Store/Restaurant/action';
import {RestaurantModel} from '../../Store/Restaurant/reducer';
import ListCard from '../Generic/listCard';
import {RestaurantsStyles} from '../../Styles';
import {UserSettingItems} from '../../Store/Profile/reducer';
import {RootState} from '../../Store/reducers';

interface Props {
  restaurants: RestaurantModel[];
  userSettings: UserSettingItems;
  refreshing: boolean;
  onRefresh: () => void;
  setCurrentData: Dispatch<SetStateAction<number>>;
}

const RestaurantReviewList: React.FC<Props> = ({
  restaurants,
  userSettings,
  refreshing,
  onRefresh,
  setCurrentData,
}) => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  const navigation = useNavigation();

  const renderFooterChildComponent = (item: RestaurantModel) => {
    return (
      <View style={styles.listingFooter}>
        <View style={styles.footerItem}>
          <Icon
            style={styles.footerItemIcon}
            active
            type="Foundation"
            name="book-bookmark"
          />
          <Text>{`${item.bookmarking_user.length} ${
            item.bookmarking_user.length > 1 ? 'bookmarks' : 'bookmark'
          }`}</Text>
        </View>
        <View style={styles.footerItem}>
          <Icon style={styles.footerItemIcon} active name="chatbubbles" />
          <Text>{`${item.reviews.length} ${
            item.reviews.length > 1 ? 'reviews' : 'review'
          }`}</Text>
        </View>
        <View style={styles.footerItem}>
          <Icon
            style={styles.footerItemIcon}
            active
            type="FontAwesome5"
            name="calendar-check"
          />
          <Text>{`${item.checking_ins.length} ${
            item.checking_ins.length > 1 ? 'check-ins' : 'check-in'
          }`}</Text>
        </View>
      </View>
    );
  };
  return restaurants.length > 0 ? (
    <FlatList
      data={restaurants}
      renderItem={({item}) => (
        <View testID="restaurantItem">
          <Content padder>
            <ListCard
              name={item.name}
              description={item.sub_header}
              mainImageUri={item.cover_uri}
              avatar={false}
              footerChild={renderFooterChildComponent(item)}
              topRightInfoContent={`${item.distance.toFixed(2).toString()}${
                userSettings.distance_unit === 'kilometer' ? ' km' : ' miles'
              }`}
              onPress={() => {
                dispatch(setSelectedRestaurant(item.id));
                navigation.navigate('The Place');
              }}
            />
          </Content>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={() => {
        setCurrentData((state) => (state += 3));
      }}
      onEndReachedThreshold={0}
    />
  ) : (
    <View style={styles.noListing}>
      <Text accessibilityLabel="no-listing-message">
        Sorry, there is no listing yet.
      </Text>
    </View>
  );
};

export default RestaurantReviewList;

const styles = StyleSheet.create({
  noListing: {
    ...RestaurantsStyles.noListing,
  },
  listingFooter: {
    ...RestaurantsStyles.listingFooter,
  },
  footerItem: {
    ...RestaurantsStyles.footerItem,
  },
  footerItemIcon: {
    ...RestaurantsStyles.footerItemIcon,
  },
});
