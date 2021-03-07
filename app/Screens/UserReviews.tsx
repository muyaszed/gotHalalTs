import React from 'react';
import {Content} from '@codler/native-base';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../Store/reducers';
import ListCard from '../Components/Generic/listCard';

const styles = StyleSheet.create({
  emptyText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const UserReviews = () => {
  const userReviews = useSelector((state: RootState) => state.profile.reviews);
  return userReviews.length > 0 ? (
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
  ) : (
    <View style={styles.emptyText}>
      <Text>You do not have any review</Text>
    </View>
  );
};

export default UserReviews;
