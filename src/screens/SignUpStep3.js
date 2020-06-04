import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, Image, Keyboard } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import { Icon } from 'native-base';
import Select2 from 'react-native-select-two';
import StepIndicator from './StepIndicator';
import { ScrollView } from 'react-native-gesture-handler';

const specialite = [
  { id: 0, name: 'ANATOMIE-PATHOLOGIE', value: 'ANATOMIE-PATHOLOGIE' },
  { id: 1, name: 'ANESTHESIE-REANIMATION', value: 'ANESTHESIE-REANIMATION' },
  { id: 2, name: 'BIOLOGIE CLINIQUE', value: 'BIOLOGIE CLINIQUE' },
  { id: 3, name: 'CARCINOLOGIE MEDICALE', value: 'CARCINOLOGIE MEDICALE' },
  { id: 4, name: 'CARDIOLOGIE', value: 'CARDIOLOGIE' },
  { id: 5, name: 'CHI. CARDIOVASCULAIRE T', value: 'CHI. CARDIOVASCULAIRE T' },
  { id: 6, name: 'CHIRURGIE CARCINOLOGIE', value: 'CHIRURGIE CARCINOLOGIE' },
  { id: 7, name: 'CHIRURGIE GENERALE', value: 'CHIRURGIE GENERALE' },
  { id: 8, name: 'CHIRURGIE INFANTILE', value: 'CHIRURGIE INFANTILE' },
  {
    id: 9,
    name: 'CHIRURGIE MAXILLO-FACIALE',
    value: 'CHIRURGIE MAXILLO-FACIALE',
  },
  { id: 10, name: 'CHIRURGIE ORTHOPEDIQUE', value: 'CHIRURGIE ORTHOPEDIQUE' },
  { id: 11, name: 'CHIRURGIE PLASTIQUE', value: 'CHIRURGIE PLASTIQUE' },
  { id: 12, name: 'DERMATOLOGIE', value: 'DERMATOLOGIE' },
  { id: 13, name: 'ENDOCRINOLOGIE', value: 'ENDOCRINOLOGIE' },
  { id: 14, name: 'GASTROLOGIE', value: 'GASTROLOGIE' },
  { id: 15, name: 'GYNECOLOGIE-OBSTETRIQUE', value: 'GYNECOLOGIE-OBSTETRIQUE' },
  { id: 16, name: 'HEMATOLOGIE', value: 'HEMATOLOGIE' },
  { id: 17, name: 'HISTOLOGIE EMBRYOLOGIE', value: 'HISTOLOGIE EMBRYOLOGIE' },
  { id: 18, name: 'MALADIES INFECTIEUSES', value: 'MALADIES INFECTIEUSES' },
  { id: 19, name: 'MEDECINE INTERNE', value: 'MEDECINE INTERNE' },
  { id: 20, name: 'MEDECINE LEGALE', value: 'MEDECINE LEGALE' },
  { id: 21, name: 'MEDECINE NUCLEAIRE', value: 'MEDECINE NUCLEAIRE' },
  { id: 22, name: 'MEDECINE PHYSIQUE', value: 'MEDECINE PHYSIQUE' },
  { id: 23, name: 'NEPHROLOGIE', value: 'NEPHROLOGIE' },
  { id: 24, name: 'NEURO-CHIRURGIE', value: 'NEURO-CHIRURGIE' },
  { id: 25, name: 'Neurochirurgien', value: 'Neurochirurgien' },
  { id: 26, name: 'NEUROLOGIE', value: 'NEUROLOGIE' },
  { id: 27, name: 'NON CLASSE', value: 'NON CLASSE' },
  { id: 28, name: 'NUTRITION', value: 'NUTRITION' },
  { id: 29, name: 'O R L', value: 'O R L' },
  { id: 30, name: 'OPHTALMOLOGIE', value: 'OPHTALMOLOGIE' },
  { id: 31, name: 'PARASITOLOGIE', value: 'PARASITOLOGIE' },
  { id: 32, name: 'PEDIATRIE', value: 'PEDIATRIE' },
  { id: 33, name: 'PNEUMOLOGIE', value: 'PNEUMOLOGIE' },
  { id: 34, name: 'PSYCHIATRIE', value: 'PSYCHIATRIE' },
  { id: 35, name: 'RADIOLOGIE', value: 'RADIOLOGIE' },
  { id: 36, name: 'RADIOTHERAPIE', value: 'RADIOTHERAPIE' },
  { id: 37, name: 'RHUMATOLOGIE', value: 'RHUMATOLOGIE' },
  { id: 38, name: 'STOMATOLOGIE', value: 'STOMATOLOGIE' },
  { id: 39, name: 'UROLOGIE', value: 'UROLOGIE' },
];
const titleList = [
  { id: 0, name: 'Docteur' },
  { id: 1, name: 'Professeur' },
];
const SignUpStep3 = ({ navigation }) => {
  const day = navigation.state.params.day;
  const month = navigation.state.params.month;
  const year = navigation.state.params.year;

  const genre = navigation.state.params.genre;
  const region = navigation.state.params.region;

  const [fixe, setFixe] = useState(navigation.state.params.fixe);
  const [mobile, setMobile] = useState(navigation.state.params.mobile);

  const [erreur, setErreur] = useState([]);
  const [loading, setLoading] = useState(false);

  const [spec, setSpecialite] = useState([]);
  const [formation, setFormation] = useState([]);
  const [title, setTitle] = useState('');
  const currentIndex = 2;
  const steps = [
    {
      label: 'étape 1',
      icon: require('../../assets/doc/one.png'),
    },
    {
      label: 'étape 2',
      icon: require('../../assets/doc/two.png'),
    },
    { label: 'étape 3', icon: require('../../assets/doc/three.png') },
    { label: 'étape 4', icon: require('../../assets/doc/four.png') },
  ];

  const handleSignUp = () => {
    Keyboard.dismiss();

    setTimeout(() => {
      setLoading(true);
    }, 2000);
    setLoading(false);

    navigation.navigate('SignUpStep4', {
      day,
      month,
      year,
      genre,
      fixe,
      mobile,
      region,
      title,
      spec,
      formation,
    });
  };

  useEffect(() => {
    // setFixe(fixe.replace(/ /g, ''));
    // setMobile(mobile.replace(/ /g, ''));
  }, []);
  return (
    <Block>
      <StepIndicator
        steps={steps}
        onChangeTab={() => {}}
        currentIndex={currentIndex}
      />

      <ScrollView>
        <Text bold style={{ margin: 12 }}>
          Title
        </Text>

        <View style={styles.SectionStyle}>
          <Image
            source={require('../../assets/icons/spec.png')}
            style={styles.ImageStyle}
          />
          <Select2
            isSelectSingle
            showSearchBox={false}
            cancelButtonText='Annuler'
            selectButtonText='Ok'
            colorTheme='#43cde9'
            popupTitle='votre titre'
            title='Votre titre professionnel'
            data={titleList}
            onSelect={(data) => {
              !data.length ? setTitle('') : setTitle(titleList[data].name);
            }}
            onRemoveItem={(data) => {}}
          />
        </View>
        <Text bold style={{ margin: 12 }}>
          Specialite
        </Text>

        <View style={styles.SectionStyle}>
          <Image
            source={require('../../assets/icons/spec.png')}
            style={styles.ImageStyle}
          />
          <Select2
            isSelectSingle
            cancelButtonText='Annuler'
            selectButtonText='Ok'
            colorTheme='#43cde9'
            popupTitle='Votre Specialite Principale'
            title='Votre Specialite Principale'
            data={specialite}
            onSelect={(data) => {
              let sp = [];
              data.length ? sp.push(specialite[data].name) : null;
              setSpecialite(sp);
            }}
            onRemoveItem={(data) => {}}
          />
        </View>

        <Text bold style={{ margin: 12 }}>
          Diplomes et Formations
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
            placeholder=' expérience et diplomes...'
            value={formation}
          />
        </View>
      </ScrollView>

      <Button gradient style={{ margin: 10 }} onPress={() => handleSignUp()}>
        <Text bold white center>
          Suivant
        </Text>
      </Button>
    </Block>
  );
};

export default SignUpStep3;
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
  inputtextmulti: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 240,
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
  Imageprog: {
    alignContent: 'center',
    justifyContent: 'center',
    //padding: 4,
    //margin: 1.5,
    //marginSt:12,
    marginLeft: 20,
    height: 6,
    width: 320,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  hasErrors: {
    borderColor: theme.colors.accent,
    borderWidth: 1,
  },
});
