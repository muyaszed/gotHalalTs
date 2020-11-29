import {View, Text, Icon, Button} from '@codler/native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Action} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from '../../Store/reducers';
import {setVerificationModalVisible} from '../../Store/Restaurant/action';
import {RestaurantModel} from '../../Store/Restaurant/reducer';

interface Props {
  restaurant: RestaurantModel;
  userId: number;
}

const RestaurantMainInformationVerification: React.FC<Props> = ({
  restaurant,
  userId,
}) => {
  const dispatch: ThunkDispatch<RootState, void, Action> = useDispatch();
  return (
    <View>
      <View style={styles.verificationContainer}>
        <Text style={styles.verifyTitle}>Halal Verifications</Text>
        <View style={styles.verificationIcons}>
          <View style={styles.verifyCircle}>
            <Icon type="FontAwesome" name="certificate" />
            <Text
              style={
                styles.percentage
              }>{`${restaurant.certificate_verification}%`}</Text>
          </View>

          <View style={styles.verifyCircle}>
            <Icon type="FontAwesome" name="commenting" />
            <Text
              style={
                styles.percentage
              }>{`${restaurant.confirmation_verification}%`}</Text>
          </View>

          <View style={styles.verifyCircle}>
            <View style={styles.logoIcon}>
              <Text>حلا</Text>
            </View>
            <Text
              style={
                styles.percentage
              }>{`${restaurant.logo_verification}%`}</Text>
          </View>
        </View>
      </View>
      {restaurant.halal_verifications.map((item) => item.user_id === userId)
        .length === 0 ? (
        <View style={styles.verifyButtonContainer}>
          <Button
            style={styles.verifyButton}
            iconLeft
            bordered
            block
            onPress={() => dispatch(setVerificationModalVisible(true))}>
            <Text style={styles.verifyBtnText}>Verify Halal Status</Text>
          </Button>
        </View>
      ) : null}
    </View>
  );
};

export default RestaurantMainInformationVerification;

const styles = StyleSheet.create({
  verifyButtonContainer: {
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  verifyButton: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#098E33',
    borderColor: '#098E33',
  },
  verifyBtnText: {
    color: '#f4f4f4',
  },
  verificationContainer: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#098E33',
    borderRadius: 10,
  },
  verificationIcons: {
    paddingTop: 10,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 1,
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#098E33',
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 12,
  },
  verifyTitle: {
    position: 'relative',
    bottom: 11,
    left: 15,
    backgroundColor: '#f4f4f4',
    width: 136,
    paddingLeft: 3,
    paddingRight: 3,
  },
});
