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
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

const UpdateExp = ({navigation}) => {
  const doctor = navigation.state.params.doctor;
  const [loading, setLoading] = useState(false);
  const [formation, setFormation] = useState(
    '  ' + doctor[0].diplomesExperience[0],
  );

  const handleLogin = () => {
    setLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    update();
  };

  const update = () => {
    AsyncStorage.getItem('token').then(token => {
      axios
        .put(
          `https://api/doctors/${doctor[0]._id}`,
          {
            diplomesExperience: formation,
          },
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        )
        .then(response => {
          Alert.alert('modification terminée'), navigation.navigate('Profile');
        })
        .catch(error => {
          Alert.alert('problème de connexion');
        });
    });
  };

  useEffect(() => {}, []);
  return (
    <LinearGradient style={{flex: 1}} colors={['#dedfde', '#dedfde']}>
      <StatusBar backgroundColor="#3f67e6" barStyle="default" />
      <Block style={{marginHorizontal: 15}}>
        <Text black h1 style={{margin: 12}}>
          Modification :
        </Text>
        <View style={{backgroundColor: '#f5f5f5', borderRadius: 10}}>
          <Text bold style={{margin: 12}}>
            Experience et Diplômes
          </Text>
          <View
            style={styles.inputtextmulti}
            //style={{ width: 140, borderColor: "gray", borderWidth: 1 }}
          >
            <TextInput
              multiline
              underlineColorAndroid={'transparent'}
              editable
              onChangeText={setFormation}
              placeholder=" expérience et diplomes..."
              value={formation}
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

export default UpdateExp;
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
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
  inputtextmulti: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dedfde',
    height: 240,
    borderRadius: 5,
    margin: 10,
  },
});
