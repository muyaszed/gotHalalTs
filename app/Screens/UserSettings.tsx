import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, Switch} from 'react-native';
import {List, ListItem, Left, Picker, Icon} from '@codler/native-base';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../Store/reducers';
import {updateUserProfile} from '../Profile/action';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../Screens/Profile';
import {UserSettingItems} from 'app/Profile/reducer';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'My Settings'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  settingsContainer: {
    flex: 4,
  },
});

const UserSettings: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const userToken = useSelector((state: RootState) => state.auth.userToken);
  const userId = useSelector((state: RootState) => state.profile.userId);
  const currentSettings = useSelector(
    (state: RootState) => state.profile.settings,
  );
  const [enableSave, setEnableSave] = React.useState(false);
  const [newSettingsValue, onChange] = React.useState<UserSettingItems>({
    facebook_avatar: false,
    distance_unit: 'kilometer',
  });

  React.useEffect(() => {
    let count = [];
    Object.keys(currentSettings).forEach((setting) => {
      if (currentSettings[setting] !== newSettingsValue[setting]) {
        count.push(1);
      }
    });
    if (count.length > 0) {
      navigation.setOptions({
        headerBackTitle: 'Save',
      });
      setEnableSave(true);
    } else {
      navigation.setOptions({
        headerBackTitle: 'Back',
      });
      setEnableSave(false);
    }
  }, [newSettingsValue, currentSettings, navigation]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      console.log('enable status', enableSave);
      if (enableSave && userToken && userId) {
        console.log('Saving settings');
        const userData = new FormData();
        userData.append(
          'settings',
          JSON.stringify({
            facebook_avatar: newSettingsValue.facebook_avatar,
            distance_unit: newSettingsValue.distance_unit,
          }),
        );
        dispatch(updateUserProfile(userToken, userData, userId));
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, enableSave]);

  React.useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', () => {
      onChange(currentSettings);
    });

    return unsubscribeFocus;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back',
    });
  }, [navigation]);
  console.log(enableSave);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.settingsContainer}>
        <List>
          <ListItem>
            <Left>
              <Text>Enable Facebook Avatar</Text>
            </Left>
            <View>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() =>
                  onChange((state) => ({
                    ...newSettingsValue,
                    facebook_avatar: !state.facebook_avatar,
                  }))
                }
                value={newSettingsValue.facebook_avatar}
              />
            </View>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Select Unit for distance</Text>
            </Left>
            <View>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder={newSettingsValue.distance_unit}
                selectedValue={'test'}
                onValueChange={(value) =>
                  onChange({
                    ...newSettingsValue,
                    distance_unit: value,
                  })
                }>
                <Picker.Item label={'kilometer'} value={'kilometer'} />
                <Picker.Item label={'mile'} value={'mile'} />
              </Picker>
            </View>
          </ListItem>
        </List>
      </View>
    </SafeAreaView>
  );
};

export default UserSettings;
