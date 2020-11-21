import React from 'react';
import {Button, Content, Segment} from '@codler/native-base';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Store/reducers';
import {useNavigation} from '@react-navigation/native';
import ListCard from '../Components/Generic/listCard';
import {setSelectedRestaurant} from '../Store/Restaurant/action';

const styles = StyleSheet.create({
  tab: {
    width: '40%',
    justifyContent: 'center',
    borderColor: '#098E33',
  },
  activTab: {
    width: '40%',
    justifyContent: 'center',
    backgroundColor: '#098E33',
    borderColor: '#098E33',
  },
  emptyText: {
    alignItems: 'center',
    top: '500%',
  },
});

const UserListing = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userListingApproved = useSelector((state: RootState) =>
    state.profile.restaurantPosted.filter((item) => item.approved),
  );
  const userListingPending = useSelector((state: RootState) =>
    state.profile.restaurantPosted.filter((item) => !item.approved),
  );
  const [currentContent, setCurrentContent] = React.useState('approved');

  const renderContent = () => {
    switch (currentContent) {
      case 'pending':
        return userListingPending;
      case 'approved':
        return userListingApproved;
      default:
        return userListingApproved;
    }
  };

  const checkActiveTab = (tab: string) => {
    return tab === currentContent ? true : false;
  };

  return (
    <FlatList
      ListHeaderComponent={
        <Segment>
          <Button
            style={checkActiveTab('pending') ? styles.activTab : styles.tab}
            first
            active={checkActiveTab('pending')}
            onPress={() => setCurrentContent('pending')}>
            <Text>Pending</Text>
          </Button>
          <Button
            style={checkActiveTab('approved') ? styles.activTab : styles.tab}
            last
            active={checkActiveTab('approved')}
            onPress={() => setCurrentContent('approved')}>
            <Text>Approved</Text>
          </Button>
        </Segment>
      }
      ListEmptyComponent={
        <View style={styles.emptyText}>
          <Text>{`You do not have any ${currentContent} item`}</Text>
        </View>
      }
      data={renderContent()}
      renderItem={({item}) => (
        <Content padder>
          <ListCard
            name={item.name}
            description={item.sub_header}
            mainImageUri={item.cover_uri}
            avatarUri={item.cover_uri}
            footer={false}
            onPress={() => {
              if (currentContent === 'approved') {
                dispatch(setSelectedRestaurant(item.id));
                navigation.navigate('The Place', {restaurant: item.id});
              }
            }}
          />
        </Content>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default UserListing;
