import {List, ListItem, Left, Icon} from '@codler/native-base';
import React from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {RestaurantModel} from '../../Store/Restaurant/reducer';

interface Props {
  restaurant: RestaurantModel;
}

const RestaurantMainInformationDetail: React.FC<Props> = ({restaurant}) => {
  return (
    <View>
      <List>
        <ListItem itemDivider>
          <Left>
            <Text>Cuisine</Text>
          </Left>
          <Text>{restaurant.cuisine}</Text>
        </ListItem>
        <ListItem itemDivider>
          <Left>
            <Text>Category</Text>
          </Left>
          <Text>{restaurant.category}</Text>
        </ListItem>
        <ListItem itemDivider>
          <Left>
            <Text>Operating Hours</Text>
          </Left>
          {restaurant.end.length === 0 ? (
            <Text>{restaurant.start}</Text>
          ) : (
            <Text>{`From: ${restaurant.start} - To: ${restaurant.end}`}</Text>
          )}
        </ListItem>
        {restaurant.web.length === 0 ? null : (
          <ListItem itemDivider>
            <Left>
              <Text>Website</Text>
            </Left>
            <Text>{restaurant.web}</Text>
          </ListItem>
        )}
        {restaurant.contact_number.length === 0 ? null : (
          <ListItem itemDivider>
            <Left>
              <Text>Contact number</Text>
            </Left>
            <Text>{restaurant.contact_number}</Text>
          </ListItem>
        )}

        <ListItem itemDivider style={styles.socMed}>
          {Object.keys(restaurant.soc_med)
            .filter((key: string) => restaurant.soc_med[key].length > 0)
            .map((item, index) => {
              const socMed = restaurant.soc_med;
              return (
                <Icon
                  style={styles.socMedIcon}
                  key={index}
                  onPress={() => Linking.openURL(socMed[item])}
                  type="Entypo"
                  name={item}
                />
              );
            })}
        </ListItem>

        <ListItem itemDivider style={styles.extraInfo}>
          <View style={styles.statusIconGroup}>
            <Icon type="FontAwesome5" name="mosque" />
            {restaurant.surau ? (
              <View style={styles.extraInfoCheckWrapper}>
                <Icon
                  type="AntDesign"
                  name="check"
                  style={styles.extraInfoCheck}
                />
              </View>
            ) : (
              <Icon type="AntDesign" name="close" />
            )}
          </View>
          <View style={styles.statusIconGroup}>
            <Icon type="FontAwesome5" name="baby-carriage" />
            {restaurant.family_friendly ? (
              <View style={styles.extraInfoCheckWrapper}>
                <Icon
                  type="AntDesign"
                  name="check"
                  style={styles.extraInfoCheck}
                />
              </View>
            ) : (
              <Icon type="AntDesign" name="close" />
            )}
          </View>
          <View style={styles.statusIconGroup}>
            <Icon type="FontAwesome" name="wheelchair" />
            {restaurant.disabled_accessibility ? (
              <View style={styles.extraInfoCheckWrapper}>
                <Icon
                  type="AntDesign"
                  name="check"
                  style={styles.extraInfoCheck}
                />
              </View>
            ) : (
              <Icon type="AntDesign" name="close" />
            )}
          </View>
        </ListItem>
      </List>
    </View>
  );
};

export default RestaurantMainInformationDetail;

const styles = StyleSheet.create({
  socMed: {
    justifyContent: 'center',
  },
  extraInfo: {
    justifyContent: 'space-around',
  },
  extraInfoCheckWrapper: {
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#098E33',
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraInfoCheck: {
    fontSize: 26,
  },
  socMedIcon: {
    color: '#098E33',
    fontSize: 40,
  },
  statusIconGroup: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 5,
  },
});
