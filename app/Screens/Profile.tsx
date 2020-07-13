import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Store/reducers';
import {Icon, List, ListItem, Left, Right, Button} from '@codler/native-base';
import {signOut} from '../Authentication/action';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  avatarContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'ghostwhite',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  avatarIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  avatarIcon: {
    fontSize: 70,
  },
  informationContainer: {
    flex: 4,
  },
  logoutContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
        {profile.avatarUri ? (
          <Image
            style={styles.avatar}
            source={{
              uri: profile.avatarUri,
            }}
          />
        ) : (
          <View style={[styles.avatarIconContainer, styles.avatar]}>
            <Icon type="Entypo" name="bowl" style={styles.avatarIcon} />
          </View>
        )}
      </View>
      <View style={styles.informationContainer}>
        <List>
          <ListItem>
            <Left>
              <Text>First Name</Text>
            </Left>
            <View>
              <Text>{profile.firstName}</Text>
            </View>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Last Name</Text>
            </Left>
            <View>
              <Text>{profile.lastName}</Text>
            </View>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Email</Text>
            </Left>
            <View>
              <Text>{profile.email}</Text>
            </View>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('My Listing')}>
            <Left>
              <Text>My Listing</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('My Reviews')}>
            <Left>
              <Text>My Reviews</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('My Bookmarks')}>
            <Left>
              <Text>My Bookmarks</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('My Check-ins')}>
            <Left>
              <Text>My Check-ins</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </View>
      <View style={styles.logoutContainer}>
        <Button block onPress={() => dispatch(signOut())}>
          <Text>Sign Out</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
