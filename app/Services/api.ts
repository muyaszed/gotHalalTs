import axios from 'axios';
import Config from 'react-native-config';
import {FBToken} from 'app/Screens/SignIn';

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
        withCredentials: true,
      });
    },
    userSignout: () => {
      return axios({
        method: 'post',
        url: `${Config.API_ADDRESS_DEV}/auth/logout`,
        headers: {'Content-Type': 'application/json'},
        withCredentials: true,
      });
    },
    userSignup: (credential: Credential) => {
      return axios({
        method: 'post',
        url: `${Config.API_ADDRESS_DEV}/signup`,
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(credential),
        withCredentials: true,
      });
    },
    fbAuthentication: (token: FBToken) => {
      return axios({
        method: 'post',
        url: `${Config.API_ADDRESS_DEV}/auth/fb_login`,
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(token),
        withCredentials: true,
      });
    },
    reviews: (reviewInfo: FormData, id: number) => {
      return axios({
        method: 'post',
        url: `${Config.API_ADDRESS_DEV}/restaurants/${id}/reviews`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
        },
        data: reviewInfo,
        withCredentials: true,
      });
    },
    bookmark: (restaurantId: number, userId: number) =>
      axios({
        method: 'POST',
        url: `${Config.API_ADDRESS_DEV}/restaurants/${restaurantId}/${userId}/bookmark_restaurant`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }),
    unbookmark: (restaurantId: number, userId: number) =>
      axios({
        method: 'POST',
        url: `${Config.API_ADDRESS_DEV}/restaurants/${restaurantId}/${userId}/unbookmark_restaurant`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }),
    checkin: (restaurantId: number, userId: number) =>
      axios({
        method: 'POST',
        url: `${Config.API_ADDRESS_DEV}/restaurants/${restaurantId}/${userId}/checkin_restaurant`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }),
    restaurant: (data: FormData) =>
      axios({
        method: 'POST',
        url: `${Config.API_ADDRESS_DEV}/restaurants`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
        },
        data: data,
        withCredentials: true,
      }),
    verification: (restaurantId: number, userId: number, data: FormData) =>
      axios({
        method: 'POST',
        url: `${Config.API_ADDRESS_DEV}/restaurants/${restaurantId}/${userId}/halal_verification`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
        },
        data,
        withCredentials: true,
      }),
  },
  Get: {
    restaurants: () => {
      return axios({
        method: 'get',
        url: `${Config.API_ADDRESS_DEV}/restaurants`,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.halaldir.v1+json',
        },
        withCredentials: true,
      });
    },
    reviews: (id: number) => {
      return axios({
        method: 'get',
        url: `${Config.API_ADDRESS_DEV}/restaurants/${id}/reviews`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
    },
    user: (id: number) =>
      axios({
        method: 'GET',
        url: `${Config.API_ADDRESS_DEV}/users/${id}`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }),
  },
  Put: {
    profile: (data: FormData, currentUserId: number) => {
      return axios({
        method: 'PUT',
        url: `${Config.API_ADDRESS_DEV}/profiles/${currentUserId}`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
        },
        data: data,
        withCredentials: true,
      });
    },
  },
};
