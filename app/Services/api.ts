import axios from 'axios';

export interface Credential {
  email: string;
  password: string;
}

export default {
  Post: {
    userLogin: (credential: Credential) => {
      return axios({
        method: 'post',
        url: 'http://localhost:3000/auth/login',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(credential),
      });
    },
    userSignup: (credential: Credential) => {
      return axios({
        method: 'post',
        url: 'http://localhost:3000/signup',
        headers: {'Content-Type': 'application/json'},
        data: JSON.stringify(credential),
      });
    },
  },
  Get: {
    restaurants: (userToken: string) => {
      return axios({
        method: 'get',
        url: 'http://localhost:3000/restaurants',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/vnd.halaldir.v1+json',
          Authorization: userToken,
        },
      });
    },
  },
};
