import React, {useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Store/reducers';
import {
  Icon,
  List,
  ListItem,
  Left,
  Right,
  Button,
  Input,
} from '@codler/native-base';
import {signOut} from '../Store/Authentication/action';
import {useNavigation} from '@react-navigation/native';
import Modal from '../Components/Generic/modal';
import {updateUserProfile} from '../Store/Profile/action';

import ImagePicker from 'react-native-image-picker';
import {Dispatch} from 'redux';
import {saveErrorMessage, showErrorDialog} from '../Store/Error/action';
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
  uploadAvatar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'snow',
    position: 'absolute',
    right: '35%',
    bottom: '15%',
  },
  informationContainer: {
    flex: 4,
  },
  logoutContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  logoutBtn: {
    backgroundColor: '#098E33',
  },
  cameraIcon: {
    fontSize: 20,
  },
});

const updateFullName = (config: {
  dispatch: Dispatch<any>;
  fullName: {
    firstName: string;
    lastName: string;
  };
  userToken: string;
  userId: number;
}) => {
  const form = new FormData();
  form.append('first_name', config.fullName.firstName);
  form.append('last_name', config.fullName.lastName);
  config.dispatch(updateUserProfile(config.userToken, form, config.userId));
};

const Profile = () => {
  const profile = useSelector((state: RootState) => state.profile);
  const userToken = useSelector((state: RootState) => state.auth.userToken);
  const [photoModal, setPhotoModal] = React.useState(false);
  const [fullName, setFullName] = React.useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [enableSetName, setEnableSetNameStatus] = React.useState(false);
  const stableDispatch = useCallback(dispatch, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (profile.firstName.length === 0 && profile.lastName.length === 0) {
        stableDispatch(
          saveErrorMessage(
            'Looks like you have not set you name properly. Please go to your profile and set your full name(long press the first or last name)',
          ),
        );
        stableDispatch(showErrorDialog());
      }
    });
    return unsubscribe;
  }, [navigation, profile, stableDispatch]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
        {profile.avatarUri ? (
          <Image
            style={styles.avatar}
            source={{
              uri:
                profile.settings.facebook_avatar && profile.fbAvatarUri
                  ? profile.fbAvatarUri
                  : profile.avatarUri,
            }}
          />
        ) : profile.settings.facebook_avatar && profile.fbAvatarUri ? (
          <Image
            style={styles.avatar}
            source={{
              uri: profile.fbAvatarUri,
            }}
          />
        ) : (
          <View style={[styles.avatarIconContainer, styles.avatar]}>
            <Icon type="Entypo" name="bowl" style={styles.avatarIcon} />
          </View>
        )}
        {profile.settings.facebook_avatar && profile.fbAvatarUri ? null : (
          <TouchableOpacity
            style={styles.uploadAvatar}
            onPress={() => {
              const options = {
                title: 'Select Avatar',
                storageOptions: {
                  skipBackup: true,
                  path: 'images',
                },
              };
              ImagePicker.showImagePicker(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else {
                  const form = new FormData();

                  form.append('avatar', {
                    name: response.fileName ? response.fileName : 'avatar.jpeg',
                    type: response.type,
                    uri: response.uri.replace('file://', ''),
                  });
                  if (userToken && profile.userId) {
                    dispatch(
                      updateUserProfile(userToken, form, profile.userId),
                    );
                  }
                }
              });
            }}>
            <Icon type="Entypo" name="camera" style={styles.cameraIcon} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.informationContainer}>
        <List>
          {enableSetName ? (
            <ListItem>
              <Left>
                <Input
                  placeholder="Your First Name"
                  onChangeText={(text) =>
                    setFullName({
                      ...fullName,
                      firstName: text,
                    })
                  }
                  value={fullName.firstName}
                />
              </Left>
              <View>
                <Icon
                  onPress={() => {
                    setEnableSetNameStatus(false);
                    if (userToken && profile.userId) {
                      updateFullName({
                        dispatch,
                        fullName,
                        userToken,
                        userId: profile.userId,
                      });
                    }
                  }}
                  type="AntDesign"
                  name="save"
                />
                <Icon
                  onPress={() => {
                    setEnableSetNameStatus(false);
                  }}
                  type="MaterialIcons"
                  name="cancel"
                />
              </View>
            </ListItem>
          ) : (
            <ListItem onLongPress={() => setEnableSetNameStatus(true)}>
              <Left>
                <Text>First Name</Text>
              </Left>
              <View>
                <Text>{profile.firstName}</Text>
              </View>
            </ListItem>
          )}
          {enableSetName ? (
            <ListItem>
              <Left>
                <Input
                  placeholder="Your Last Name"
                  onChangeText={(text) =>
                    setFullName({
                      ...fullName,
                      lastName: text,
                    })
                  }
                  value={fullName.lastName}
                />
              </Left>
              <View>
                <Icon
                  onPress={() => {
                    setEnableSetNameStatus(false);
                    if (userToken && profile.userId) {
                      updateFullName({
                        dispatch,
                        fullName,
                        userToken,
                        userId: profile.userId,
                      });
                    }
                  }}
                  type="AntDesign"
                  name="save"
                />
                <Icon
                  onPress={() => {
                    setEnableSetNameStatus(false);
                  }}
                  type="MaterialIcons"
                  name="cancel"
                />
              </View>
            </ListItem>
          ) : (
            <ListItem onLongPress={() => setEnableSetNameStatus(true)}>
              <Left>
                <Text>Last Name</Text>
              </Left>
              <View>
                <Text>{profile.lastName}</Text>
              </View>
            </ListItem>
          )}
          <ListItem>
            <Left>
              <Text>Email</Text>
            </Left>
            <View>
              <Text>{profile.email}</Text>
            </View>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('MY PLACES')}>
            <Left>
              <Text>My Listing</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('MY REVIEWS')}>
            <Left>
              <Text>My Reviews</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('MY BOOKMARKS')}>
            <Left>
              <Text>My Bookmarks</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('MY CHECK-INS')}>
            <Left>
              <Text>My Check-ins</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem onPress={() => navigation.navigate('MY SETTINGS')}>
            <Left>
              <Text>My Settings</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </View>
      <View style={styles.logoutContainer}>
        <Button
          style={styles.logoutBtn}
          block
          onPress={() => dispatch(signOut())}>
          <Text>Sign Out</Text>
        </Button>
      </View>
      <Modal
        title="Please select the source of your photo."
        leftButtonName="Photo"
        rightButtonName="Camera"
        modalVisible={photoModal}
        handleLeftButton={() => {
          navigation.navigate('Photo');
          setPhotoModal(false);
        }}
        handleRightButton={() => {
          navigation.navigate('Camera');
          setPhotoModal(false);
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;
