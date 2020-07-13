import React from 'react';
import {Content} from '@codler/native-base';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../Store/reducers';
import ListCard from '../Components/listCard';

const UserReviews = () => {
  const userReviews = useSelector((state: RootState) => state.profile.reviews);
  return (
    <FlatList
      data={userReviews}
      renderItem={({item}) => (
        <Content padder>
          <ListCard
            name={item.restaurant_name}
            description={item.comment}
            mainImage={false}
            avatar={false}
            footer={false}
          />
        </Content>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default UserReviews;
