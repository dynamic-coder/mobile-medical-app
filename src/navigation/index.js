import React, {useState} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Button} from '../components';

// import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Login,
  SignUp,
  SignUpStep1,
  SignUpStep2,
  SignUpStep3,
  SignUpStep4,
  Forgot,
  Welcome,
  Browse,
  Chercher,
  List,
  DoctorInfo,
  Doctor,
  Maps,
  Profile,
  PersonnelInformation,
  Success,
  UpdatePassword,
  UpdateUserInformation,
  UpdateBasicInformation,
  WorkInformation,
  WorkAddress,
  UpdateWorkInformation,
  UpdateExp,
  UpdateHoraire,
  UpdateAddress,
  Covid,
  HRA,
} from '../screens';

import LinearGradient from 'react-native-linear-gradient';
import {theme} from '../constants';
// import * as Icon from '@expo/vector-icons';

const screens = createStackNavigator(
  {
    Welcome: {screen: Welcome, navigationOptions: {header: null}},
    Login,
    SignUp,
    SignUpStep1,
    SignUpStep2,
    SignUpStep3,
    SignUpStep4,
    Forgot,
    Browse,

    Chercher,
    Maps,
    DoctorInfo,

    List,
    Doctor,
    Profile: {screen: Profile, navigationOptions: {header: null}},
    PersonnelInformation,
    Success: {screen: Success, navigationOptions: {header: null}},
    UpdatePassword: {
      screen: UpdatePassword,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#dedfde',
          borderBottomColor: 'transparent',
          elevation: 0,
        },
      },
    },
    UpdateUserInformation: {
      screen: UpdateUserInformation,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#dedfde',
          borderBottomColor: 'transparent',
          elevation: 0,
        },
      },
    },
    UpdateBasicInformation: {
      screen: UpdateBasicInformation,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#dedfde',
          borderBottomColor: 'transparent',
          elevation: 0,
        },
      },
    },
    WorkInformation,
    WorkAddress,
    UpdateWorkInformation: {
      screen: UpdateWorkInformation,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#dedfde',
          borderBottomColor: 'transparent',
          elevation: 0,
        },
      },
    },
    UpdateExp: {
      screen: UpdateExp,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#dedfde',
          borderBottomColor: 'transparent',
          elevation: 0,
        },
      },
    },
    UpdateHoraire: {
      screen: UpdateHoraire,
      navigationOptions: {
        headerStyle: {
          backgroundColor: '#dedfde',
          borderBottomColor: 'transparent',
          elevation: 0,
        },
      },
    },
    UpdateAddress,
    Covid: {
      screen: Covid,
      navigationOptions: {
        headerTitle: 'Covid-19 / Corona Virus',

        headerTitleStyle: {
          color: theme.colors.black,
          textAlign: 'left',
          flex: 1,
        },
      },
    },
    HRA: {
      screen: HRA,
      navigationOptions: {
        headerTitle: 'Horaire de Travail',

        headerTitleStyle: {
          color: theme.colors.black,
          textAlign: 'left',
          flex: 1,
        },
      },
    },
  },

  {
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
      },
    }),
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 3.5,
        borderBottomColor: 'transparent',
        elevation: 0, // for android
        // marginBottom: theme.sizes.padding / 2
        // display: 'none'
      },
      // headerBackground: (
      //   <LinearGradient
      //     start={{ x: 0.3 }}
      //     end={{ x: 1.2 }}
      //     colors={['#43cde9', '#91e2ed']}
      //     style={{ flex: 1 }}
      //   />
      // ),
      headerBackImage: (
        // <Image source={require('../../assets/icons/back.png')} />
        <MaterialCommunityIcons
          name="keyboard-backspace"
          size={28}
          color={theme.colors.grey2}
        />
      ),
      headerBackTitle: null,
      headerLeftContainerStyle: {
        alignItems: 'center',
        marginLeft: theme.sizes.base / 3,
        paddingRight: theme.sizes.base,
      },
      headerRightContainerStyle: {
        alignItems: 'center',
        paddingRight: theme.sizes.base,
      },
      // headerRight: (
      //   <TouchableOpacity
      //     onPress={() => screens.Settings}
      //     style={{ width: 26, height: 23 }}
      //   >
      //     <Image source={require('../../assets/icons/settings.png')} />
      //   </TouchableOpacity>
      // ),
      headerTitle: '',
      headerTitleStyle: {
        color: theme.colors.black,
        textAlign: 'center',
        flex: 1,
      },
      cardStyle: {backgroundColor: '#FFFFFF'},
    },
  },
);

export default createAppContainer(screens);
