import React, {Component, useState, useEffect, useContext} from 'react';
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  TextInput,
} from 'react-native';

import {Button, Block, Input, Text} from '../components';
import {theme} from '../constants';
import axios from 'axios';

const Forgot = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleForgot = () => {
    let myRegex = /^([a-z0-9._-]+)@([-a-z0-9]+\.+[a-z]{2,})$/;
    const err = [];
    Keyboard.dismiss();

    setLoading(true);

    // check with backend API or with some static data
    if (!email || !myRegex.test(email)) err.push('email');
    setErrors(err);
    setLoading(false);

    if (!err.length) {
      Keyboard.dismiss();
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      axios
        .post('https://api/auth/forgotpassword', {
          email: email,
        })
        .then(response => {
          if (response.data.success) {
            Alert.alert(
              'récupération!',
              'Consultez votre boîte de réception e-mail.',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    navigation.navigate('Welcome');
                  },
                },
              ],
              {cancelable: false},
            );
          }
        })
        .catch(error => {
          Alert.alert('problème de connexion');
        });
    }
  };
  useEffect(() => {}, []);

  const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

  return (
    <KeyboardAvoidingView style={styles.forgot} behavior="padding">
      <Block padding={[0, theme.sizes.base * 2]}>
        <Block middle>
          <View
            style={{
              paddingBottom: theme.sizes.base * 3,
              paddingTop: theme.sizes.base * 1,
              alignItems: 'center',
            }}>
            <Image
              style={{width: 130, height: 130}}
              source={require('../../assets/icon.png')}
            />
          </View>
          {/* </Block> */}

          <Input
            label="Email"
            error={hasErrors('email')}
            style={[styles.input, hasErrors('email')]}
            defaultValue={email}
            onChangeText={text => setEmail(text.replace(/ /g, ''))}
          />

          <Button gradient onPress={() => handleForgot()}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Récupérer
              </Text>
            )}
          </Button>

          <Button onPress={() => navigation.navigate('Login')}>
            <Text gray caption center style={{textDecorationLine: 'underline'}}>
              Retour a S'identifier
            </Text>
          </Button>
        </Block>
      </Block>
    </KeyboardAvoidingView>
  );
};
export default Forgot;

const styles = StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: 'center',
  },

  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  SectionStyle: {
    flexDirection: 'row',
    //justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
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
  logo: {
    paddingBottom: theme.sizes.base * 2,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
