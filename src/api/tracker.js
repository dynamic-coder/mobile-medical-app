import axios from 'axios';
import { AsyncStorage } from 'react-native';

// const instance = axios.create({
//   baseUrl: 'http://8c4625f2.ngrok.io'
// });

// instance.interceptors.request.use(
//   async config => {
//     const token = await AsyncStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );
// export default instance;

export default axios.create({
  baseUrl: 'http://8c4625f2.ngrok.io'
});
