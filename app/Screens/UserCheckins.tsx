import React from 'react';
import {Content} from '@codler/native-base';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Store/reducers';
import {useNavigation} from '@react-navigation/native';
import ListCard from '../Components/Generic/listCard';
import {setSelectedRestaurant} from '../Store/Restaurant/action';

const styles = StyleSheet.create({
  emptyText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const UserCheckins = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userCheckedIns = useSelector(
    (state: RootState) => state.profile.checkIns,
  );
  return userCheckedIns.length > 0 ? (
    <FlatList
      data={userCheckedIns}
      renderItem={({item}) => (
        <Content padder>
          <ListCard
            name={item.detail.name}
            description={item.detail.sub_header}
            mainImage={false}
            avatarUri={item.detail.cover_uri}
            footer={false}
            onPress={() => {
              dispatch(setSelectedRestaurant(item.detail.id));
              navigation.navigate('The Place', {restaurant: item.detail.id});
            }}
          />
        </Content>
      )}
      keyExtractor={(item) => item.checkin.id.toString()}
    />
  ) : (
    <View style={styles.emptyText}>
      <Text>You do not have any check-in</Text>
    </View>
  );
};

export default UserCheckins;
