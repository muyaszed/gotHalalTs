import axios from 'axios';
import Config from 'react-native-config';

export interface Credential {
  email: string;
  password: string;
}

export default {
  Post: {
    userLogin: (credential: Credential) => {
      return axios({
        method: 'post',
        url: `${Config.API_ADDRESS_DEV}/auth/login`,
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(credential),
      });
    },
    userSignup: (credential: Credential) => {
      return axios({
        method: 'post',
        url: `${Config.API_ADDRESS_DEV}/signup`,
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(credential),
      });
    },
  },
  Get: {
    restaurants: (userToken: string) => {
      return axios({
        method: 'get',
        url: `${Config.API_ADDRESS_DEV}/restaurants`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.halaldir.v1+json',
          Authorization: userToken,
        },
      });
    },
    reviews: (userToken: string, id: number) => {
      return axios({
        method: 'get',
        url: `${Config.API_ADDRESS_DEV}/restaurants/${id}/reviews`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
          Authorization: userToken,
        },
      });
    },
  },
};
