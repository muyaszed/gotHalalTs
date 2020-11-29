import {H1, H3} from '@codler/native-base';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  restaurantName: string;
  restaurantSubHeader: string;
  restaurantCoverUri: string | null;
  restaurantDescription: string;
}

const RestaurantMainInformationHeader: React.FC<Props> = ({
  restaurantName,
  restaurantSubHeader,
  restaurantCoverUri,
  restaurantDescription,
}) => {
  return (
    <View>
      <H1 style={styles.title}>{restaurantName.toUpperCase()}</H1>
      <H3 style={styles.subHeader}>{restaurantSubHeader}</H3>

      <View style={styles.mainImage}>
        <Image
          style={restaurantCoverUri ? styles.mainImage : styles.imageLogo}
          source={
            restaurantCoverUri
              ? {
                  uri: restaurantCoverUri,
                }
              : require('../../Images/logo.png')
          }
        />
      </View>
      <View style={styles.description}>
        <Text>{restaurantDescription}</Text>
      </View>
    </View>
  );
};

export default RestaurantMainInformationHeader;

const styles = StyleSheet.create({
  title: {
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  subHeader: {
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  mainImage: {
    height: 300,
    resizeMode: 'cover',
    paddingLeft: 0,
    paddingRight: 0,
  },
  description: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  imageLogo: {
    resizeMode: 'center',
  },
});
