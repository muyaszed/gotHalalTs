import {Spinner} from '@codler/native-base';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  spinner: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'grey',
    opacity: 0.8,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Loading: React.FC = () => {
  return (
    <View style={styles.spinner}>
      <Spinner />
      <Text>Loading</Text>
    </View>
  );
};

export default Loading;
