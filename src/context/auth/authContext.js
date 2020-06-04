import AuthState from './AuthState';

import trackerApi from '../../api/tracker';

import {navigate} from '../../navigationRef';
import {AsyncStorage} from 'react-native';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'signup':
      return {errorMessage: '', token: action.payload.token};
    case 'signin':
      return {errorMessage: '', token: action.payload.token};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'signout':
      return {token: null, errorMessage: ''};
    default:
      return state;
  }
};

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({type: 'signin', payload: token});
  }
};

const clearErrorMessage = dispatch => () => {
  dispatch({type: 'clear_error_message'});
};

const signup = dispatch => async ({name, email, password}) => {
  // make api request to sign up with email and password
  try {
    const response = await trackerApi.post(
      'https://api', //signup api
      {
        name: name,
        email: email,
        password: password,
      },
    );
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'signup', payload: response.data});
  } catch (error) {
    dispatch({type: 'add_error', payload: error.message});
  }
  // if sign iup, modify our state, and say that we are authentificated
  //if signing up fails, we probably need to reflect an error message somewhere
};

const signin = dispatch => async ({email, password}) => {
  try {
    const response = await trackerApi.post(
      'http://api', //login api
      {email: email, password: password},
    );
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'signin', payload: response.data});
    navigate('Welcome');
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: "adresse e-mail ou mot de passe n'est pas valide",
    });
  }
  // handle success by updating state
  // handle failure by showing error message (somehow)
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({type: 'signout'});
};
export const {Provider, Context} = AuthState(
  authReducer,
  {signin, signout, signup, clearErrorMessage, tryLocalSignin},
  {token: null, errorMessage: ''},
);
