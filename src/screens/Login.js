import React, {useState, useContext, useEffect} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Image,
  ScrollView,
  Alert,
} from 'react-native';

import {Button, Block, Input, Text} from '../components';
import {theme} from '../constants';

import {I18nContext} from '../translations/i18n';

import {Context as AuthContext} from '../context/auth/authContext';
import {NavigationEvents} from 'react-navigation';

const role = [
  {id: 0, item: 'utilisateur'},
  {id: 1, item: 'docteur'},
  {id: 2, item: 'infirmièr(e)'},
];
const Login = ({navigation}) => {
  const {state, signin, clearErrorMessage} = useContext(AuthContext);

  const {translate, isRTL} = useContext(I18nContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [roleValue, setRoleValue] = useState(null);

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    let myRegex = /^([a-z0-9._-]+)@([-a-z0-9]+\.+[a-z]{2,})$/;
    const err = [];
    Keyboard.dismiss();

    setLoading(true);
    // check with backend API or with some static data
    if (!email || !myRegex.test(email)) err.push('email');

    if (!password || password.length < 6) err.push('password');

    setErrors(err);
    setLoading(false);

    if (!err.length) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      signin({email, password});
    }
  };

  const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
  useEffect(() => {}, []);
  return (
    <KeyboardAvoidingView style={styles.login} behavior="padding">
      <NavigationEvents onWillBlur={clearErrorMessage} />

      <Block padding={[0, theme.sizes.base * 1]}>
        <View
          style={{
            paddingBottom: theme.sizes.base * 3,
            paddingTop: theme.sizes.base * 1,
            alignItems: 'center',
          }}>
          <Image
            style={{width: 130, height: 130, justifyContent: 'center'}}
            source={require('../../assets/icon.png')}
          />
        </View>

        <Input
          label="Email"
          autoCapitalize="none"
          autoCorrect={false}
          error={hasErrors('email')}
          style={[styles.input, hasErrors('email')]}
          defaultValue={email}
          onChangeText={text => setEmail(text.replace(/ /g, ''))}
        />
        <Input
          secure
          label="Password"
          autoCapitalize="none"
          autoCorrect={false}
          error={hasErrors('password')}
          style={[styles.input, hasErrors('password')]}
          defaultValue={password}
          onChangeText={setPassword}
        />

        {state.errorMessage ? (
          <Text color="red" style={{marginLeft: 10, opacity: 0.6}}>
            {state.errorMessage}
          </Text>
        ) : null}

        {hasErrors('email') ? (
          <Text caption color="red" style={{marginLeft: 10, opacity: 0.6}}>
            adresse e-mail n'est pas valide
          </Text>
        ) : hasErrors('password') ? (
          <Text caption color="red" style={{marginLeft: 10, opacity: 0.6}}>
            entrer votre mot de passe correctement
          </Text>
        ) : null}

        <Button
          gradient
          onPress={() => {
            handleLogin();
          }}>
          {loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text bold white center>
              S'identifier
            </Text>
          )}
        </Button>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginRight: 5,
            marginLeft: 5,
            direction: isRTL ? 'rtl' : 'ltr',
          }}>
          <Button onPress={() => navigation.navigate('SignUp')}>
            <Text gray caption center style={{textDecorationLine: 'underline'}}>
              Create un account
            </Text>
          </Button>
          <Button onPress={() => navigation.navigate('Forgot')}>
            <Text gray caption style={{textDecorationLine: 'underline'}}>
              Mot de passe oublié?
            </Text>
          </Button>
        </View>
      </Block>
    </KeyboardAvoidingView>
  );
};
export default Login;
const styles = StyleSheet.create({
  header: {
    // paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
    paddingTop: theme.sizes.base * 2,
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
    // alignItems: 'center',
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
});
