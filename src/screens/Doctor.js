import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';

import call from 'react-native-phone-call';

import {Block, Text, Button, Card} from '../components';
import {theme, mocks} from '../constants';
import {I18nContext} from '../translations/i18n';

// import { Rating, AirbnbRating } from 'react-native-elements';

const {width, height} = Dimensions.get('window');

const Doctor = ({navigation}) => {
  const resource = navigation.state.params.item;
  const {translate, isRTL, langCode} = useContext(I18nContext);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [errorr, setErrorr] = useState(null);
  const [rating, setRating] = useState(3.5);
  const [loading, setLoading] = useState(true);

  const Call = tel => {
    const args = {
      number: tel,
      prompt: false,
    };
    call(args).catch(error => {
      Alert.alert('Pas de Numéro de téléphone');
    });
  };

  const navigateLocation = () => {
    const rla = resource.location.coordinates[0];
    const rlo = resource.location.coordinates[1];
    const url = `http://maps.google.com/?saddr=${rla},${rlo}&daddr=${-6.270565},${16.75955}&dirflg=d`;
    return Linking.openURL(url);
  };

  const handleRating = rating => {
    setRating(rating);
  };

  useEffect(() => {
    // currentposition();
  }, []);
  return (
    <Block style={styles.header}>
      <Block space="between" style={styles.header}>
        <Block style={styles.header} center>
          <Block center style={{flexDirection: 'row'}}>
            <Button onPress={() => Call(resource.mobile)}>
              <Image
                style={{
                  width: theme.sizes.base * 3.5,
                  height: theme.sizes.base * 3.5,
                  // borderRadius: 130,
                  // borderWidth: 0.5,
                  borderColor: 'gray',
                }}
                source={require('../../assets/doc/icCall.png')}
              />
            </Button>

            <View
              style={{
                margin: 13,
                justifyContent: 'center',
              }}>
              {resource.photo === 'no-photo.jpg' ? (
                <Image
                  style={{
                    width: theme.sizes.base * 11,
                    height: theme.sizes.base * 11,
                    borderRadius: 100,

                    borderWidth: 0.5,
                    borderColor: 'gray',
                  }}
                  source={require('../../assets/icons/male.png')}
                />
              ) : (
                <Image
                  style={{
                    width: theme.sizes.base * 11,
                    height: theme.sizes.base * 11,
                    borderRadius: 100,
                    borderWidth: 0.5,
                    borderColor: 'gray',
                  }}
                  source={{
                    uri: `http://whispering-earth-48189.herokuapp.com/uploads/${
                      resource.photo
                    }`,
                  }}
                />
              )}
              <Text
                h3
                center
                color="#43cde9"
                style={{marginTop: theme.sizes.base / 4}}>
                {resource.title === 'Professeur' ? 'pr. ' : 'dr. '}
                {resource.description}
              </Text>
              <Text
                h5
                center
                color="gray"
                style={{marginTop: theme.sizes.base / 4}}>
                {resource.specialiteDocteur[0]}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Button onPress={() => navigateLocation()}>
                <Image
                  style={{
                    width: theme.sizes.base * 2.5,
                    height: theme.sizes.base * 2.5,

                    marginRight: 5,
                  }}
                  source={require('../../assets/icons/mapp.png')}
                />
              </Button>
            </View>
            {/* <Button>
              <Image
                style={{
                  width: theme.sizes.base * 2,
                  height: theme.sizes.base * 2,
                  // borderRadius: 130,
                  //marginTop: 13,
                  // borderWidth: 0.5,
                  borderColor: 'gray',
                  resizeMode: 'stretch'
                }}
                source={require('../../assets/doc/speechBubble1.png')}
              />
            </Button> */}
          </Block>

          <Block center style={{marginTop: 30}}>
            <Block center style={{marginTop: -10}}>
              <Button
                gradient
                onPress={() => navigation.navigate('DoctorInfo', {resource})}>
                <Block
                  row
                  center
                  style={{
                    margin: 10,
                    width: theme.sizes.base * 20,
                    height: theme.sizes.base * 20,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Icon name="person" style={{fontSize: 23, color: 'white'}} />
                  <Text center semibold white>
                    {translate('Informations Personel')}
                  </Text>
                  <Icon
                    name="arrow-forward"
                    style={{fontSize: 23, color: 'white'}}
                  />
                </Block>
              </Button>

              <Button
                gradient
                onPress={() => navigation.navigate('Maps', {resource})}>
                <Block
                  row
                  center
                  style={{
                    margin: 10,
                    width: theme.sizes.base * 20,
                    height: theme.sizes.base * 20,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Icon name="home" style={{fontSize: 23, color: 'white'}} />
                  <Text center semibold white>
                    {translate('Adresse de Travail')}
                  </Text>
                  <Icon
                    name="arrow-forward"
                    style={{fontSize: 23, color: 'white'}}
                  />
                </Block>
              </Button>

              <Button
                gradient
                onPress={() => navigation.navigate('HRA', {resource})}>
                <Block
                  row
                  center
                  style={{
                    margin: 10,
                    width: theme.sizes.base * 20,
                    height: theme.sizes.base * 20,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Icon
                    name="calendar"
                    style={{fontSize: 23, color: 'white'}}
                  />
                  <Text center semibold white>
                    {translate('Horaire de Travail')}
                  </Text>
                  <Icon
                    name="arrow-forward"
                    style={{fontSize: 23, color: 'white'}}
                  />
                </Block>
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  button1: {
    borderWidth: 0.4,
    borderColor: 'gray',
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  lineStyle: {
    borderWidth: 0.4,
    borderColor: 'black',
    //marginTop: 0,
    width: 320,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    overflow: 'visible',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.1,
    width,
    paddingBottom: theme.sizes.base * 3,
  },
});
