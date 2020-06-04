import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  NativeModules,
  I18nManager,
  View,
  Alert,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

// import RadioGroup from 'react-native-radio-buttons-group';

import {Button, Block, Text, Badge} from '../components';
import {theme, mocks} from '../constants';

const {width, height} = Dimensions.get('window');

import {SinglePickerMaterialDialog} from 'react-native-material-dialog';

import {I18nContext} from '../translations/i18n';
import {Context as AuthContext} from '../context/auth/authContext';
import avatar from '../../assets/icons/male.png';
import doctorContext from '../context/doctor/doctorContext';
import {NavigationEvents} from 'react-navigation';

const Welcome = ({navigation}) => {
  const {state} = useContext(AuthContext);

  const {getDoctor} = useContext(doctorContext);
  const {translate, langCode, dispatch} = useContext(I18nContext);

  const [slider, setSlider] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [user, setUser] = useState(0);

  const [showTerms, setShowTerms] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [singlePickerSelectedItem, singlePicker] = useState('0');
  const scrollX = new Animated.Value(0);
  const lang = [
    {id: 1, label: translate('arabe'), value: 'ar', color: '#43cde9'},
    {id: 2, label: translate('français'), value: 'fr', color: '#43cde9'},
    {id: 3, label: translate('anglais'), value: 'en', color: '#43cde9'},
  ];

  const getUser = () => {
    AsyncStorage.getItem('token').then(token => {
      axios
        .get('http://api/auth/me', {
          headers: {Authorization: `Bearer ${token}`},
        })
        .then(response => {
          setCurrentUser(response.data.data._id);

          axios
            .get(`http://api/doctors?user=${response.data.data._id}`)
            .then(res => {
              setUser(res.data.count);
            })
            .catch(error => {
              Alert.alert('problème de connexion');
            });
        });
    });
  };

  const renderIllustrations = () => {
    return (
      <Block>
        <FlatList
          horizontal
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToAlignment="center"
          data={slider}
          extraDate={singlePickerSelectedItem}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={({item}) => (
            <Block>
              <Image
                source={item.source}
                resizeMode="contain"
                style={{width, height: height / 2.4}}
              />
              <Text caption gray2 center style={styles.textStep}>
                {/* {`${item.title} + ${langCode}`} */}
                {langCode === 'ar'
                  ? item.title_ar
                  : langCode === 'en'
                  ? item.title_en
                  : item.title_fr}
              </Text>
            </Block>
          )}
          onScroll={Animated.event([
            {
              nativeEvent: {contentOffset: {x: scrollX}},
            },
          ])}
        />
      </Block>
    );
  };

  const renderSteps = () => {
    const stepPosition = Animated.divide(scrollX, width);
    return (
      <Block row center middle style={styles.stepsContainer}>
        {slider.map((item, index) => {
          const opacity = stepPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Block
              animated
              flex={false}
              key={`step-${index}`}
              color="#43cde9"
              style={[styles.steps, {opacity}]}
            />
          );
        })}
      </Block>
    );
  };

  useEffect(() => {
    getUser();
    getDoctor();
    setSlider(mocks.slider);
    // getUser();
  }, []);
  return (
    <Block>
      <NavigationEvents
        onWillFocus={() => {
          getUser();
        }}
      />

      <Block
        flex={false}
        row
        style={[styles.header, {justifyContent: 'space-between'}]}
        space="between">
        <TouchableOpacity
          onPress={() =>
            // setShowModal(true)
            navigation.navigate('Covid')
          }
          style={{paddingTop: theme.sizes.padding / 2}}>
          <Badge margin={[0, 0, 0]} size={45} color="rgba(41,216,143,0.20)">
            <Image
              source={require('../../assets/icons/lnch.png')}
              style={styles.trans}
            />
          </Badge>
          <Text caption gray>
            Covid-19
          </Text>
        </TouchableOpacity>
        <Image
          source={require('../../assets/icons/logo.png')}
          style={[styles.logo, {marginLeft: 0}]}
        />
        <View>
          <TouchableOpacity
            style={{paddingTop: theme.sizes.padding / 2}}
            onPress={() => {
              // setShowTerms(true)
            }}>
            <Badge margin={[0, 0, 0]} size={45} color="transparent">
              {/* <Image
                source={require('../../assets/images/info.png')}
                style={{
                  height: 30,
                  width: 30,
                  opacity: 0.6,
                }}
              /> */}
            </Badge>
          </TouchableOpacity>
        </View>
      </Block>
      <Text h3 center gray2>
        {translate('Bienvenue')}
      </Text>
      <Block center middle>
        {renderIllustrations()}
        {renderSteps()}
      </Block>
      <Block middle flex={0.3} margin={[0, theme.sizes.base * 3]}>
        <Button gradient onPress={() => navigation.navigate('Browse')}>
          <Text center semibold white>
            {translate('chercher')}
          </Text>
        </Button>

        <Button
          shadow
          onPress={() => {
            state.token
              ? !user == 0
                ? navigation.navigate('Profile')
                : (navigation.navigate('SignUpStep1'),
                  Alert.alert(
                    'Alert!',
                    'Completer vos donneées avant de passer a votre profil',
                  ))
              : navigation.navigate('Login');
          }}
          style={{
            marginTop: theme.sizes.padding / 8,
            // borderWidth: 1,
            borderColor: theme.colors.primary,
          }}>
          <Text
            center
            bold
            primary
            style={{
              textDecorationLine: 'underline',
            }}>
            {state.token ? 'Profil' : "s'identifier"}
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  avatar: {
    height: theme.sizes.base * 2.5,
    width: theme.sizes.base * 2.5,
    borderRadius: 100,
  },
  stepsContainer: {
    position: 'absolute',
    bottom: theme.sizes.base,
    right: 0,
    left: 0,
  },
  steps: {
    height: theme.sizes.base / 2,
    width: theme.sizes.base / 2,
    // backgroundColor:'grey',
    borderRadius: 5,
    marginHorizontal: 2.5,
  },
  trans: {
    height: theme.sizes.base * 3,
    width: theme.sizes.base * 3,
    borderRadius: 100,
  },
  header: {
    paddingHorizontal: theme.sizes.base,

    paddingTop: theme.sizes.padding / 2,
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: theme.sizes.base * 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    width: width,
    height: theme.sizes.base * 2,
  },
  logo: {
    height: theme.sizes.base * 5.5,
    width: theme.sizes.base * 5.5,
    // paddingTop: theme.sizes.padding / 2
  },
  textStep: {
    flex: 1,
    flexWrap: 'wrap',
    width,
    padding: theme.sizes.padding,
  },
});
