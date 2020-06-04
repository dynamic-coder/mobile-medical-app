import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from 'react-native';
import { theme } from '../constants';

import { Button, Text } from '../components';

const Success = ({ navigation }) => {
  return (
    <ImageBackground
      //   source={require('../../assets/images/bg.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text h1 center bold>
          Info -
          <Text h1 white>
            {' '}
            Santé.
          </Text>
        </Text>
        <Text h3 white center style={{ marginTop: 10 }}>
          merci d'être l'un de nos partenaires
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
          <Text style={styles.signup}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.login}>Profil</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default Success;
const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.secondary
  },
  logo: {
    width: 280,
    height: 280,
    marginLeft: '15%',
    marginTop: '10%'
  },
  text: {
    color: 'white',
    marginTop: '-25%',
    marginLeft: '20%'
  },
  signup: {
    backgroundColor: 'white',
    color: theme.colors.primary,
    width: '75%',
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '11%',
    padding: '2%',
    fontSize: 27,
    marginTop: '30%'
  },
  login: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    width: '75%',
    borderRadius: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: '11%',
    padding: '2%',
    fontSize: 27,
    marginTop: '10%'
  },
  container: {
    flex: 1,
    marginTop: '30%'
  }
});
