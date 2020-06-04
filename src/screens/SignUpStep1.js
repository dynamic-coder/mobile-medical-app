import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';

import {Button, Block, Input, Text} from '../components';
import {theme} from '../constants';
import {TextInputMask} from 'react-native-masked-text';
import {ScrollView} from 'react-native-gesture-handler';

import Select2 from 'react-native-select-two';

import StepIndicator from './StepIndicator';

// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import DateTimePickerModal from '@react-native-community/datetimepicker';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';

const SignUpStep1 = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  const [genre, setGenre] = useState('');
  const [genreType, setGenreType] = useState([
    {name: 'homme', id: 0},
    {name: 'femme', id: 1},
  ]);

  const [date, setDate] = useState();
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [mode, setMode] = useState('date');
  const [checkMail, setSheckMail] = useState(false);
  const [fixe, setFixe] = useState('');
  const [mobile, setMobile] = useState('');
  const currentIndex = 0;
  const steps = [
    {
      label: 'étape 1',
      icon: require('../../assets/doc/one.png'),
    },
    {
      label: 'étape 2',
      icon: require('../../assets/doc/two.png'),
    },
    {label: 'étape 3', icon: require('../../assets/doc/three.png')},
    {label: 'étape 4', icon: require('../../assets/doc/four.png')},
  ];

  const handleSignUp = () => {
    navigation.navigate('SignUpStep2', {
      day,
      month,
      year,
      genre,
      fixe,
      mobile,
    });
  };

  const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

  const getDateAttributes = data => {
    let d = new Date(data); // i assume your date as 01-11-1933
    let day = d.getDate(); // 11
    let month = d.getMonth(); // 0  month is like array so you have to do +1 for correct month
    let year = d.getFullYear(); // 1933

    setDay(day);
    setMonth(month + 1);
    setYear(year);
  };

  useEffect(() => {
    // getPermissionAsync();
  });

  return (
    <Block>
      <KeyboardAvoidingView style={{flex: 1}} behavior="margin">
        <StepIndicator
          steps={steps}
          onChangeTab={() => {}}
          currentIndex={currentIndex}
        />
        <ScrollView style={{marginTop: 10}}>
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

          <View style={styles.SectionStyle}>
            <Image
              source={require('../../assets/icons/pers.png')}
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
              data={genreType}
              onSelect={data => {
                !data.length ? setGenre('') : setGenre(genreType[data].name);
              }}
              onRemoveItem={data => {}}
            />
          </View>

          <View style={styles.SectionStyle}>
            <Image
              source={require('../../assets/icons/phone11.png')}
              style={styles.ImageStyle}
            />
            <TextInputMask
              style={{flex: 1}}
              placeholder="numéro téléphone de travail..."
              keyboardType={'phone-pad'}
              type={'custom'}
              options={{
                // maskType: 'INTERNATIONAL',
                mask: '+999 999 999 999',
              }}
              value={fixe}
              onChangeText={setFixe}
            />
          </View>
          <View style={styles.SectionStyle}>
            <Image
              source={require('../../assets/icons/phone.png')}
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
              value={mobile}
              onChangeText={setMobile}
            />
          </View>
        </ScrollView>
        <Button gradient onPress={() => handleSignUp()} style={{margin: 10}}>
          <Text bold white center>
            Suivant
          </Text>
        </Button>
      </KeyboardAvoidingView>
    </Block>
  );
};

export default SignUpStep1;
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

  hasErrors: {
    borderColor: theme.colors.accent,
    borderWidth: 1,
  },
});
