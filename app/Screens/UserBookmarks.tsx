import React from 'react';
import {Content} from '@codler/native-base';
import {FlatList, StyleSheet, Text, View} from 'react-native';
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

const UserBookmarks = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const uerBookmarks = useSelector(
    (state: RootState) => state.profile.bookmark,
  );
  return uerBookmarks.length > 0 ? (
    <FlatList
      data={uerBookmarks}
      renderItem={({item}) => (
        <Content padder>
          <ListCard
            name={item.name}
            description={item.desc}
            mainImageUri={item.cover_uri}
            avatarUri={item.cover_uri}
            footer={false}
            onPress={() => {
              dispatch(setSelectedRestaurant(item.id));
              navigation.navigate('The Place', {restaurant: item.id});
            }}
          />
        </Content>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  ) : (
    <View style={styles.emptyText}>
      <Text>You do not have any bookmark</Text>
    </View>
  );
};

export default UserBookmarks;
