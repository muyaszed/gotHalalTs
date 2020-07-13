import React from 'react';
import {Content} from '@codler/native-base';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Store/reducers';
import {useNavigation} from '@react-navigation/native';
import ListCard from '../Components/listCard';
import {setSelectedRestaurant} from '../Restaurant/action';
const UserBookmarks = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const uerBookmarks = useSelector(
    (state: RootState) => state.profile.bookmark,
  );
  return (
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
  );
};

export default UserBookmarks;
