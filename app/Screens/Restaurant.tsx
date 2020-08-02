/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Image, StyleSheet, FlatList, View, RefreshControl} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {
  Left,
  Text,
  Button,
  Right,
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
import MapView, {Marker, Callout} from 'react-native-maps';
import openMap from 'react-native-open-maps';
import {RootState} from '../Store/reducers';
import {loadReviews, setNewReview, setReviewText} from '../Review/action';
import ListCard from '../Components/listCard';
import {RestaurantModel} from '../Restaurant/reducer';
import {userBookmark, userUnbookmark} from '../Bookmark/action';
import {getAllRestaurants} from '../Restaurant/action';
import {userCheckin} from '../CheckIn/action';
import Modal from '../Components/modal';

const styles = StyleSheet.create({
  mainContainer: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    paddingTop: 30,
    paddingBottom: 30,
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
});

interface MapOption {
  latitude: number;
  longitude: number;
  google: boolean;
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
  dispatch: Dispatch<any>,
  userToken: string,
  currentReviewText: string,
  currentUserBookmarkList: RestaurantModel[],
  mapModalVisible: boolean,
  setMapModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
  useGoogleMap: boolean,
  setUseGoogleMap: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return (
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

      <View>
        <List>
          <ListItem itemDivider>
            <Left>
              <Text>Cuisine</Text>
            </Left>
            <Right>
              <Text>{restaurant.cuisine}</Text>
            </Right>
          </ListItem>
          <ListItem itemDivider>
            <Left>
              <Text>Category</Text>
            </Left>
            <Right>
              <Text>{restaurant.category}</Text>
            </Right>
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
              <Right>
                <Text>{restaurant.web}</Text>
              </Right>
            </ListItem>
          )}
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
          (bookamarkedRestaurant) => bookamarkedRestaurant.id === restaurant.id,
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
            onChangeText={(text) => dispatch(setReviewText(text))}
            value={currentReviewText}
          />
          <Button
            bordered
            block
            onPress={() => dispatch(setNewReview(userToken))}>
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
    </View>
  );
};

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Restaurant = () => {
  const route = useRoute();
  const restaurant = useSelector(
    (state: RootState) =>
      state.restaurants.list.filter(
        (item) => item.id === parseInt(route.params.restaurant, 10),
      )[0],
  );
  const userToken = useSelector((state: RootState) => state.auth.userToken);
  const dispatch = useDispatch();
  const reviews = useSelector((state: RootState) => state.reviews.list);
  const currentReviewText = useSelector(
    (state: RootState) => state.reviews.currentReview,
  );
  const currentUserBookmarkList = useSelector(
    (state: RootState) => state.profile.bookmark,
  );

  const [refreshing, setRefreshing] = React.useState(false);
  const [mapModalVisible, setMapModalVisible] = React.useState(false);
  const [useGoogleMap, setUseGoogleMap] = React.useState(true);

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

  return (
    <FlatList
      data={reviews}
      renderItem={({item}) => (
        <Content padder>
          <ListCard
            name={`${item.user.firtName} ${item.user.lastName}`}
            avatarUri={item.user.avatar}
            mainImage={false}
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
        currentReviewText,
        currentUserBookmarkList,
        mapModalVisible,
        setMapModalVisible,
        useGoogleMap,
        setUseGoogleMap,
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default Restaurant;
