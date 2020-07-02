import React, {useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../Authentication/context';

const Home = () => {
  const {signOut} = useContext(AuthContext);
  return (
    <View>
      <Text>This is Home in screen</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          if (signOut) {
            signOut();
          }
        }}
      />
    </View>
  );
};

export default Home;
