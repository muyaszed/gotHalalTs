/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Image, StyleSheet, FlatList, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {
  Left,
  Text,
  Button,
  Right,
  Container,
  Content,
  H1,
  H3,
  List,
  ListItem,
  Form,
  Textarea,
  Icon,
} from '@codler/native-base';
import Toast from 'react-native-simple-toast';
import {RootState} from '../Store/reducers';
import {loadReviews, setNewReview, setReviewText} from '../Review/action';
import ListCard from '../Components/listCard';
import {RestaurantModel} from '../Restaurant/reducer';
import {userBookmark} from '../Bookmark/action';

const styles = StyleSheet.create({
  title: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 15,
  },
  description: {
    paddingLeft: 15,
  },
  mainImage: {
    height: 300,
    flex: 1,
  },
  groupBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  groupBtn: {
    width: '45%',
    textAlign: 'center',
  },
  reviewTextArea: {
    marginBottom: 20,
  },
});

const renderAboveReviews = (
  restaurant: RestaurantModel,
  dispatch: Dispatch<any>,
  userToken: string,
  currentReviewText: string,
) => {
  return (
    <Container>
      <H1 style={styles.title}>{restaurant.name.toUpperCase()}</H1>
      <H3 style={styles.description}>{restaurant.desc.toUpperCase()}</H3>

      <Content>
        <Image
          source={{
            uri: restaurant.cover_uri ? restaurant.cover_uri : 'Image URL',
          }}
          style={styles.mainImage}
        />
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
        <View style={styles.groupBtnContainer}>
          <Button
            style={styles.groupBtn}
            iconLeft
            bordered
            block
            onPress={() => Toast.show('This is a toast.')}>
            <Icon active type="FontAwesome5" name="calendar-check" />
            <Text>Check-In Here</Text>
          </Button>
          <Button
            style={styles.groupBtn}
            iconLeft
            bordered
            block
            onPress={() => dispatch(userBookmark(userToken))}>
            <Icon active type="Foundation" name="book-bookmark" />
            <Text>Bookmark</Text>
          </Button>
        </View>
        <Content padder>
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
        </Content>
      </Content>
    </Container>
  );
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
      )}
    />
  );
};

export default Restaurant;
