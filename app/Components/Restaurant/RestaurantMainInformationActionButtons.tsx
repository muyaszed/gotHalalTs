import {View, Button, Icon, Text} from '@codler/native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {userUnbookmark, userBookmark} from '../../Store/Bookmark/action';
import {userCheckin} from '../../Store/CheckIn/action';
import {RootState} from '../../Store/reducers';
import {RestaurantModel} from '../../Store/Restaurant/reducer';

interface Props {
  restaurant: RestaurantModel;
  currentUserBookmarkList: RestaurantModel[];
  userToken: string;
  userDistanceSetting: string;
}

const RestaurantMainInformationActionButtons: React.FC<Props> = ({
  restaurant,
  currentUserBookmarkList,
  userToken,
  userDistanceSetting,
}) => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();

  const checkDistanceAndSetCheckInButton = () => {
    console.log(userDistanceSetting, restaurant.distance);
    if (userDistanceSetting === 'mile') {
      if (restaurant.distance * 5280 <= 10) {
        return false;
      } else {
        return true;
      }
    } else {
      if (restaurant.distance * 1000 <= 8) {
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <View style={styles.groupBtnContainer}>
      <Button
        style={
          checkDistanceAndSetCheckInButton()
            ? styles.groupBtnDisable
            : styles.groupBtn
        }
        iconLeft
        bordered
        block
        disabled={checkDistanceAndSetCheckInButton()}
        onPress={() => dispatch(userCheckin())}>
        <Icon
          style={styles.groupBtnIcon}
          active
          type="FontAwesome5"
          name="calendar-check"
        />
        <Text style={styles.groupBtnText}>Check-In Here</Text>
      </Button>
      {currentUserBookmarkList.find(
        (bookamarkedRestaurant) => bookamarkedRestaurant.id === restaurant.id,
      ) ? (
        <Button
          style={styles.groupBtn}
          iconLeft
          bordered
          block
          onPress={() => {
            if (userToken) {
              dispatch(userUnbookmark(userToken));
            }
          }}>
          <Icon
            style={styles.groupBtnIcon}
            active
            type="Foundation"
            name="book-bookmark"
          />
          <Text style={styles.groupBtnText}>Unbookmark</Text>
        </Button>
      ) : (
        <Button
          style={styles.groupBtn}
          iconLeft
          bordered
          block
          onPress={() => {
            if (userToken) {
              dispatch(userBookmark(userToken));
            }
          }}>
          <Icon
            style={styles.groupBtnIcon}
            active
            type="Foundation"
            name="book-bookmark"
          />
          <Text style={styles.groupBtnText}>Bookmark</Text>
        </Button>
      )}
    </View>
  );
};

export default RestaurantMainInformationActionButtons;

const styles = StyleSheet.create({
  groupBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  groupBtn: {
    width: '45%',
    textAlign: 'center',
    backgroundColor: '#098E33',
    borderColor: '#098E33',
  },
  groupBtnDisable: {
    width: '45%',
    textAlign: 'center',
    backgroundColor: '#8e9c93',
    borderColor: '#8e9c93',
  },
  groupBtnIcon: {
    color: '#f4f4f4',
  },
  groupBtnText: {
    color: '#f4f4f4',
  },
});
