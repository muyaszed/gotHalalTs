import React from 'react';
import {Content} from '@codler/native-base';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Store/reducers';
import {useNavigation} from '@react-navigation/native';
import ListCard from '../Components/listCard';
import {setSelectedRestaurant} from '../Restaurant/action';

const UserCheckins = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userCheckIns = useSelector(
    (state: RootState) => state.profile.checkIns,
  );
  return (
    <FlatList
      data={userCheckIns}
      renderItem={({item}) => (
        <Content padder>
          <ListCard
            name={item.detail.name}
            description={item.detail.desc}
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
  );
};

export default UserCheckins;
