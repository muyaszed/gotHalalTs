import React, {useContext} from 'react';
import {View, Text, Button, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {userSignOut} from '../Authentication/action';

const Home = () => {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = React.useState([]);

  // React.useEffect(() => {
  //   const fetchList = async (userToken: string) => {
  //     const restaurantList = await Api.Get.restaurants(userToken);
  //     setRestaurants(restaurantList.data);
  //   };
  //   console.log('The user token: ', authState.userToken);
  //   if (authState.userToken) {
  //     fetchList(authState.userToken);
  //   }
  // }, []);

  return (
    <SafeAreaView>
      <Text>This is Home in screen</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          dispatch(userSignOut());
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
