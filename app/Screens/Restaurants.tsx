import React from 'react';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import {FlatList, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Store/reducers';
import {RestaurantModel} from '../Restaurant/reducer';
import {userSignOut} from '../Authentication/action';

const renderRestaurant = (restaurant: RestaurantModel) => {
  return (
    <Card>
      <CardItem>
        <Left>
          {restaurant.cover_uri ? (
            <Thumbnail
              source={{
                uri: restaurant.cover_uri ? restaurant.cover_uri : 'Image URL',
              }}
            />
          ) : (
            <Icon
              type="Entypo"
              name="bowl"
              style={{
                height: 50,
                width: 50,
                fontSize: 50,
              }}
            />
          )}

          <Body>
            <Text>{restaurant.name}</Text>
            <Text note>{restaurant.desc}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody style={{flex: 1, justifyContent: 'center'}}>
        {restaurant.cover_uri ? (
          <Image
            source={{
              uri: restaurant.cover_uri ? restaurant.cover_uri : 'Image URL',
            }}
            style={{height: 200, flex: 1}}
          />
        ) : (
          <Icon
            type="Entypo"
            name="bowl"
            style={{
              height: 200,
              width: 200,
              fontSize: 150,
            }}
          />
        )}
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active type="Foundation" name="book-bookmark" />
            <Text>{`${restaurant.bookmarking_user.length} ${
              restaurant.bookmarking_user.length > 1 ? 'bookmarks' : 'bookmark'
            }`}</Text>
          </Button>
          <Button transparent>
            <Icon active name="chatbubbles" />
            <Text>{`${restaurant.reviews.length} ${
              restaurant.reviews.length > 1 ? 'reviews' : 'review'
            }`}</Text>
          </Button>
        </Left>
        <Right>
          <Button transparent>
            <Icon active type="FontAwesome5" name="calendar-check" />
            <Text>{`${restaurant.checking_ins.length} ${
              restaurant.checking_ins.length > 1 ? 'check-ins' : 'check-in'
            }`}</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  );
};

const Restaurants = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector((state: RootState) => state.restaurants.list);
  return (
    <Container>
      <Content>
        <Button onPress={() => dispatch(userSignOut())}>
          <Text>Logout</Text>
        </Button>

        <FlatList
          data={restaurants}
          renderItem={({item}) => renderRestaurant(item)}
          keyExtractor={(item) => item.id.toString()}
        />
      </Content>
    </Container>
  );
};

export default Restaurants;
