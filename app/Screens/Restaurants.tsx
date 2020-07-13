import React from 'react';
import {Text, Button, CardItem, Left, Icon, Right} from '@codler/native-base';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Store/reducers';
import {useNavigation} from '@react-navigation/native';
import ListCard from '../Components/listCard';
import {setSelectedRestaurant} from '../Restaurant/action';
import {RestaurantModel} from '../Restaurant/reducer';

const footerChildComponent = (item: RestaurantModel) => {
  return (
    <CardItem>
      <Left>
        <Button transparent>
          <Icon active type="Foundation" name="book-bookmark" />
          <Text>{`${item.bookmarking_user.length} ${
            item.bookmarking_user.length > 1 ? 'bookmarks' : 'bookmark'
          }`}</Text>
        </Button>
        <Button transparent>
          <Icon active name="chatbubbles" />
          <Text>{`${item.reviews.length} ${
            item.reviews.length > 1 ? 'reviews' : 'review'
          }`}</Text>
        </Button>
      </Left>
      <Right>
        <Button transparent>
          <Icon active type="FontAwesome5" name="calendar-check" />
          <Text>{`${item.checking_ins.length} ${
            item.checking_ins.length > 1 ? 'check-ins' : 'check-in'
          }`}</Text>
        </Button>
      </Right>
    </CardItem>
  );
};

const Restaurants = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const restaurants = useSelector((state: RootState) => state.restaurants.list);
  return (
    <FlatList
      data={restaurants}
      renderItem={({item}) => (
        <ListCard
          name={item.name}
          description={item.desc}
          mainImageUri={item.cover_uri}
          avatarUri={item.cover_uri}
          footerChild={footerChildComponent(item)}
          onPress={() => {
            dispatch(setSelectedRestaurant(item.id));
            navigation.navigate('The Place', {restaurant: item.id});
          }}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default Restaurants;
