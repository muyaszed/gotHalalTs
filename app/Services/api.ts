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
        url: `${Config.API_ADDRESS}/auth/login`,
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(credential),
        withCredentials: true,
      });
    },
    userSignup: (credential: Credential) => {
      return axios({
        method: 'post',
        url: `${Config.API_ADDRESS}/signup`,
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(credential),
        withCredentials: true,
      });
    },
    fbAuthentication: (token: FBToken) => {
      return axios({
        method: 'post',
        url: `${Config.API_ADDRESS}/auth/fb_login`,
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(token),
      });
    },
    reviews: (token: string, reviewInfo: FormData, id: number) => {
      return axios({
        method: 'post',
        url: `${Config.API_ADDRESS}/restaurants/${id}/reviews`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          Authorization: token,
        },
        data: reviewInfo,
      });
    },
    bookmark: (token: string, restaurantId: number, userId: number) =>
      axios({
        method: 'POST',
        url: `${Config.API_ADDRESS}/restaurants/${restaurantId}/${userId}/bookmark_restaurant`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }),
    unbookmark: (token: string, restaurantId: number, userId: number) =>
      axios({
        method: 'POST',
        url: `${Config.API_ADDRESS}/restaurants/${restaurantId}/${userId}/unbookmark_restaurant`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }),
    checkin: (token: string, restaurantId: number, userId: number) =>
      axios({
        method: 'POST',
        url: `${Config.API_ADDRESS}/restaurants/${restaurantId}/${userId}/checkin_restaurant`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }),
    restaurant: (data: FormData, token: string) =>
      axios({
        method: 'POST',
        url: `${Config.API_ADDRESS}/restaurants`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          Authorization: token,
        },
        data: data,
      }),
    verification: (
      token: string,
      restaurantId: number,
      userId: number,
      data: FormData,
    ) =>
      axios({
        method: 'POST',
        url: `${Config.API_ADDRESS}/restaurants/${restaurantId}/${userId}/halal_verification`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data,
      }),
  },
  Get: {
    restaurants: (userToken: string) => {
      return axios({
        method: 'get',
        url: `${Config.API_ADDRESS}/restaurants`,
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
        url: `${Config.API_ADDRESS}/restaurants/${id}/reviews`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
          Authorization: userToken,
        },
      });
    },
    user: (token: string, id: number) =>
      axios({
        method: 'GET',
        url: `${Config.API_ADDRESS}/users/${id}`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }),
  },
  Put: {
    profile: (token: string, data: FormData, currentUserId: number) => {
      return axios({
        method: 'PUT',
        url: `${Config.API_ADDRESS}/profiles/${currentUserId}`,
        headers: {
          Accept: 'application/vnd.halaldir.v1+json',
          Authorization: token,
        },
        data: data,
      });
    },
  },
};
