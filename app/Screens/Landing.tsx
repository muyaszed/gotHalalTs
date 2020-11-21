import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {LandingLayout} from '../Components';

const Landing = () => {
  const navigation = useNavigation();

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
  };

  return <LandingLayout handleNavigation={handleNavigation} />;
};

export default Landing;
