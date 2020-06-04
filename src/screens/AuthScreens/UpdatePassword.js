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

const UpdatePassword = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [old, setOld] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleLogin = () => {
    const err = [];
    Keyboard.dismiss();

    setLoading(true);
    // check with backend API or with some static data
    if (!old) err.push('old');
    if (!newPass || newPass.length < 6) err.push('new');
    if (!confirm || !confirm == newPass) err.push('confirm');

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
          'https://api/auth/updatepassword',
          {currentPassword: old, newPassword: newPass},
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        )
        .then(response => {
          Alert.alert('modification terminée'), navigation.navigate('Profile');
        })
        .catch(error => {
          Alert.alert("mot de passe n'est pas valide");
        });
    });
  };
  return (
    <LinearGradient style={{flex: 1}} colors={['#dedfde', '#dedfde']}>
      <StatusBar backgroundColor="#3f67e6" barStyle="default" />
      <Block style={{margin: 15}}>
        <Text black h1 style={{margin: 12}}>
          Modification :
        </Text>
        <View style={{backgroundColor: '#f5f5f5', borderRadius: 10}}>
          <Text bold style={{margin: 12, marginTop: 30}}>
            Ancient
          </Text>
          <View style={[styles.SectionStyle, hasErrors('old')]}>
            <Image
              source={require('../../../assets/icons/psst.png')}
              style={styles.ImageStyle}
            />

            <TextInput
              maxLength={100}
              style={{flex: 1}}
              placeholder="ancient mot de passe.."
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              onChangeText={setOld}
            />
          </View>
          <Text bold style={{margin: 12}}>
            Nouveau
          </Text>
          <View style={[styles.SectionStyle, hasErrors('new')]}>
            <Image
              source={require('../../../assets/icons/psst.png')}
              style={styles.ImageStyle}
            />

            <TextInput
              style={{flex: 1}}
              placeholder="nouveau mot de passe.."
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              onChangeText={setNewPass}
            />
          </View>
          <Text bold style={{margin: 12}}>
            Confirme
          </Text>
          <View style={[styles.SectionStyle, hasErrors('password')]}>
            <Image
              source={require('../../../assets/icons/psst.png')}
              style={styles.ImageStyle}
            />

            <TextInput
              style={{flex: 1}}
              placeholder="confirmer votre mot de passe.."
              underlineColorAndroid="transparent"
              secureTextEntry={true}
              onChangeText={setConfirm}
            />
          </View>
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

export default UpdatePassword;
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
  hasErrors: {
    borderBottomColor: theme.colors.accent,
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
  addtof: {
    padding: 60,
    margin: 15,
    height: 25,
    width: 25,
    //resizeMode: "stretch",
    //alignItems: "center"
  },
  img: {
    marginLeft: 32,
    fontSize: 14,
  },
  hasErrors: {
    borderColor: theme.colors.accent,
    borderWidth: 1,
  },
});
