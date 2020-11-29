import {View} from '@codler/native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import MapView, {Marker, Callout} from 'react-native-maps';
import {setRestaurantMapModalVisible} from '../../Store/Restaurant/action';
import {RootState} from '../../Store/reducers';
import {RestaurantModel} from '../../Store/Restaurant/reducer';

interface Props {
  restaurant: RestaurantModel;
}

const RestaurantMainInformationMap: React.FC<Props> = ({restaurant}) => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();

  return (
    <View style={styles.mapContainer}>
      <MapView
        onPress={() => dispatch(setRestaurantMapModalVisible(true))}
        provider="google"
        style={styles.map}
        region={{
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          title={restaurant.name}
          coordinate={{
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
          }}
        />
        <Callout />
      </MapView>
    </View>
  );
};

export default RestaurantMainInformationMap;

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    height: 300,
    marginTop: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: 300,
  },
});
