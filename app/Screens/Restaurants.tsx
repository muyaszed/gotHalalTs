import React, {useEffect} from 'react';
import {Text, Icon, Content} from '@codler/native-base';
import Geolocation from '@react-native-community/geolocation';
import {FlatList, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Store/reducers';
import {useNavigation} from '@react-navigation/native';
import ListCard from '../Components/listCard';
import {setSelectedRestaurant} from '../Restaurant/action';
import {RestaurantModel} from '../Restaurant/reducer';
import {distanceBetweenLocation} from '../Services/helper';
import {getAllRestaurants} from '../Restaurant/action';
import {saveErrorMessage, showErrorDialog} from '../Error/action';

const styles = StyleSheet.create({
  noListing: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listingFooter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  footerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  footerItemIcon: {
    color: '#098E33',
    fontSize: 20,
  },
});

const footerChildComponent = (item: RestaurantModel) => {
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

const Restaurants = () => {
  const userProfile = useSelector((state: RootState) => state.profile);
  const userToken = useSelector((state: RootState) => state.auth.userToken);
  const userSettings = useSelector(
    (state: RootState) => state.profile.settings,
  );
  const dispatch = useDispatch();
  const [currentPosition, setCurrentPosition] = React.useState({
    lat: 0,
    long: 0,
  });
  const navigation = useNavigation();
  const restaurants = useSelector((state: RootState) => {
    const sortedList = state.restaurants.list
      .map((place) => {
        console.log(currentPosition);
        const distance = distanceBetweenLocation(
          currentPosition.lat,
          currentPosition.long,
          place.latitude,
          place.longitude,
          userSettings.distance_unit === 'kilometer' ? 'K' : 'M',
        );
        const newPlace = {...place, distance};
        return newPlace;
      })
      .sort((a, b) => a.distance - b.distance);

    return sortedList;
  });
  useEffect(() => {
    const unsubscribe: () => void = navigation.addListener('focus', () => {
      Geolocation.getCurrentPosition((res) =>
        setCurrentPosition((prevState) => ({
          ...prevState,
          lat: res.coords.latitude,
          long: res.coords.longitude,
        })),
      );

      if (userToken) {
        dispatch(getAllRestaurants(userToken));
      }

      return unsubscribe;
    });
  }, [navigation, dispatch, userToken]);

  useEffect(() => {
    if (
      userProfile.firstName.length === 0 &&
      userProfile.lastName.length === 0
    ) {
      dispatch(
        saveErrorMessage(
          'Looks like you have not set you name properly. Please go to your profile and set your full name(long press the first or last name)',
        ),
      );
      dispatch(showErrorDialog());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return restaurants.length > 0 ? (
    <FlatList
      data={restaurants}
      renderItem={({item}) => (
        <Content padder>
          <ListCard
            name={item.name}
            description={item.desc}
            mainImageUri={item.cover_uri}
            avatar={false}
            footerChild={footerChildComponent(item)}
            topRightInfoContent={`${Math.round(item.distance).toString()}${
              userSettings.distance_unit === 'kilometer' ? 'km' : 'miles'
            }`}
            onPress={() => {
              dispatch(setSelectedRestaurant(item.id));
              navigation.navigate('The Place');
            }}
          />
        </Content>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  ) : (
    <View style={styles.noListing}>
      <Text>Sorry, there is no listing yet.</Text>
    </View>
  );
};

export default Restaurants;
