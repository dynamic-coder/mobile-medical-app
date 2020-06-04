import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  AsyncStorage,
  Keyboard,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';

import {Button, Block, Input, Text} from '../../components';
import {theme} from '../../constants';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const UpdateUserInformation = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const currentUser = navigation.state.params.user;

  const handleLogin = () => {
    let myRegex = /^([a-z0-9._-]+)@([-a-z0-9]+\.+[a-z]{2,})$/;
    const err = [];
    Keyboard.dismiss();
    console.log(currentUser);

    setLoading(true);
    // check with backend API or with some static data
    if (!name) err.push('name');

    if (!email || !myRegex.test(email)) err.push('email');

    setErrors(err);
    setLoading(false);

    if (!err.length) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      update();
    }
  };
  const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
  const update = () => {
    AsyncStorage.getItem('token').then(token => {
      axios
        .put(
          'https://api/auth/updatedetails',
          {name: name, email: email},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then(response => {
          Alert.alert('modification terminée'), navigation.navigate('Profile');
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    });
  };
  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, []);
  return (
    <LinearGradient style={{flex: 1}} colors={['#dedfde', '#dedfde']}>
      <StatusBar backgroundColor="#3f67e6" barStyle="default" />
      <Block style={{marginHorizontal: 15}}>
        <Text black h1 style={{margin: 12}}>
          Modification :
        </Text>
        <View style={{backgroundColor: '#f5f5f5', borderRadius: 10}}>
          <Text bold style={{margin: 12, marginTop: 30}}>
            Nom et Prénom
          </Text>
          <View style={[styles.SectionStyle, hasErrors('name')]}>
            <Image
              source={require('../../../assets/icons/pers.png')}
              style={styles.ImageStyle}
            />

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={100}
              style={{flex: 1}}
              placeholder="nom et prénom.."
              underlineColorAndroid="transparent"
              onChangeText={setName}
              value={name}

              //autoFocus
            />
          </View>
          <Text bold style={{margin: 12}}>
            Adresse Email
          </Text>
          <View style={[styles.SectionStyle, hasErrors('email')]}>
            <Image
              source={require('../../../assets/icons/email.png')}
              style={styles.ImageStyle}
            />

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="adresse e-mail.."
              underlineColorAndroid="transparent"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View
            style={{
              alignSelf: 'center',
              height: 0.7,
              width: '70%',

              marginVertical: 20,
              //   marginHorizontal: 30,
              backgroundColor: '#000',
            }}
          />

          <View style={{alignItems: 'center'}}>
            <Button
              color="#3f67e6"
              style={{width: 200}}
              onPress={() => {
                handleLogin();
              }}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Enregistrer
                </Text>
              )}
            </Button>
          </View>
        </View>
      </Block>
    </LinearGradient>
  );
};

export default UpdateUserInformation;
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  SectionStyle: {
    flexDirection: 'row',
    //justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dedfde',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },

  hasErrors: {
    borderColor: theme.colors.accent,
    borderWidth: 0.5,
  },
});
