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
import {TextInputMask} from 'react-native-masked-text';
import DatePicker from 'react-native-datepicker';
import Select2 from 'react-native-select-two';

const UpdateBasicInformation = ({navigation}) => {
  const doctor = navigation.state.params.doctor;
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState(doctor[0].genre);
  const [tel, setTel] = useState(doctor[0].tel);
  const [mobile, setMobile] = useState(doctor[0].mobile);

  const [date, setDate] = useState(
    new Date(
      doctor[0].birth.year - doctor[0].birth.month - doctor[0].birth.day,
    ),
  );
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [genreType, setGenreType] = useState([
    {name: 'homme', id: 0},
    {name: 'femme', id: 1},
  ]);

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
            tel: tel,
            mobile: mobile,

            genre: genre,
            birth: {
              year: parseInt(year),
              month: parseInt(month),
              day: parseInt(day),
            },
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
  const getDateAttributes = data => {
    let d = new Date(data); // i assume your date as 01-11-1933
    let day = d.getDate(); // 11
    let month = d.getMonth(); // 0  month is like array so you have to do +1 for correct month
    let year = d.getFullYear(); // 1933

    setDay(day);
    setMonth(month + 1);
    setYear(year);
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
            Date de Naissance
          </Text>
          <View style={styles.SectionStyle}>
            <DatePicker
              style={{width: 300}}
              date={date}
              mode="date"
              placeholder="date de naissance.."
              format="YYYY-MM-DD"
              minDate="1940-01-01"
              maxDate="2000-01-01"
              confirmBtnText="Confirmer"
              cancelBtnText="Annuler"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderWidth: 0,
                  marginLeft: 40,
                  alignItems: 'flex-start',
                },
              }}
              onDateChange={data => {
                setDate(data);
                getDateAttributes(data);
              }}
            />
          </View>
          <Text bold style={{margin: 12}}>
            Genre
          </Text>
          <View style={styles.SectionStyle}>
            <Image
              source={require('../../../assets/icons/pers.png')}
              style={styles.ImageStyle}
            />
            <Select2
              cancelButtonText="Annuler"
              selectButtonText="Ok"
              showSearchBox={false}
              isSelectSingle
              colorTheme="#43cde9"
              popupTitle="genre"
              title="genre.."
              // placeholder='genre'
              value={genre}
              data={genreType}
              onSelect={data => {
                !data.length ? setGenre('') : setGenre(genreType[data].name);
              }}
              onRemoveItem={data => {}}
            />
          </View>

          <Text bold style={{margin: 12}}>
            Num Téléphone de travail
          </Text>
          <View style={styles.SectionStyle}>
            <Image
              source={require('../../../assets/icons/phone11.png')}
              style={styles.ImageStyle}
            />
            <TextInputMask
              style={{flex: 1}}
              placeholder="numéro de téléphone de travail..."
              keyboardType={'phone-pad'}
              type={'custom'}
              options={{
                // maskType: 'INTERNATIONAL',
                mask: '+999 999 999 999',
              }}
              value={mobile}
              onChangeText={setMobile}
            />
          </View>
          <Text bold style={{margin: 12}}>
            Num Téléphone Personnel
          </Text>
          <View style={styles.SectionStyle}>
            <Image
              source={require('../../../assets/icons/phone.png')}
              style={styles.ImageStyle}
            />
            <TextInputMask
              style={{flex: 1}}
              placeholder="numéro de téléphone personnel..."
              keyboardType={'phone-pad'}
              type={'custom'}
              options={{
                // maskType: 'INTERNATIONAL',
                mask: '+999 999 999 999',
              }}
              value={tel}
              onChangeText={setTel}
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

export default UpdateBasicInformation;
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
