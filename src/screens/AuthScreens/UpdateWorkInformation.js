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

import Select2 from 'react-native-select-two';
const specialite = [
  {id: 0, name: 'ANATOMIE-PATHOLOGIE', value: 'ANATOMIE-PATHOLOGIE'},
  {id: 1, name: 'ANESTHESIE-REANIMATION', value: 'ANESTHESIE-REANIMATION'},
  {id: 2, name: 'BIOLOGIE CLINIQUE', value: 'BIOLOGIE CLINIQUE'},
  {id: 3, name: 'CARCINOLOGIE MEDICALE', value: 'CARCINOLOGIE MEDICALE'},
  {id: 4, name: 'CARDIOLOGIE', value: 'CARDIOLOGIE'},
  {
    id: 5,
    name: 'CHI. CARDIOVASCULAIRE T',
    value: 'CHI. CARDIOVASCULAIRE T',
  },
  {id: 6, name: 'CHIRURGIE CARCINOLOGIE', value: 'CHIRURGIE CARCINOLOGIE'},
  {id: 7, name: 'CHIRURGIE GENERALE', value: 'CHIRURGIE GENERALE'},
  {id: 8, name: 'CHIRURGIE INFANTILE', value: 'CHIRURGIE INFANTILE'},
  {
    id: 9,
    name: 'CHIRURGIE MAXILLO-FACIALE',
    value: 'CHIRURGIE MAXILLO-FACIALE',
  },
  {id: 10, name: 'CHIRURGIE ORTHOPEDIQUE', value: 'CHIRURGIE ORTHOPEDIQUE'},
  {id: 11, name: 'CHIRURGIE PLASTIQUE', value: 'CHIRURGIE PLASTIQUE'},
  {id: 12, name: 'DERMATOLOGIE', value: 'DERMATOLOGIE'},
  {id: 13, name: 'ENDOCRINOLOGIE', value: 'ENDOCRINOLOGIE'},
  {id: 14, name: 'GASTROLOGIE', value: 'GASTROLOGIE'},
  {
    id: 15,
    name: 'GYNECOLOGIE-OBSTETRIQUE',
    value: 'GYNECOLOGIE-OBSTETRIQUE',
  },
  {id: 16, name: 'HEMATOLOGIE', value: 'HEMATOLOGIE'},
  {id: 17, name: 'HISTOLOGIE EMBRYOLOGIE', value: 'HISTOLOGIE EMBRYOLOGIE'},
  {id: 18, name: 'MALADIES INFECTIEUSES', value: 'MALADIES INFECTIEUSES'},
  {id: 19, name: 'MEDECINE INTERNE', value: 'MEDECINE INTERNE'},
  {id: 20, name: 'MEDECINE LEGALE', value: 'MEDECINE LEGALE'},
  {id: 21, name: 'MEDECINE NUCLEAIRE', value: 'MEDECINE NUCLEAIRE'},
  {id: 22, name: 'MEDECINE PHYSIQUE', value: 'MEDECINE PHYSIQUE'},
  {id: 23, name: 'NEPHROLOGIE', value: 'NEPHROLOGIE'},
  {id: 24, name: 'NEURO-CHIRURGIE', value: 'NEURO-CHIRURGIE'},
  {id: 25, name: 'Neurochirurgien', value: 'Neurochirurgien'},
  {id: 26, name: 'NEUROLOGIE', value: 'NEUROLOGIE'},
  {id: 27, name: 'NON CLASSE', value: 'NON CLASSE'},
  {id: 28, name: 'NUTRITION', value: 'NUTRITION'},
  {id: 29, name: 'O R L', value: 'O R L'},
  {id: 30, name: 'OPHTALMOLOGIE', value: 'OPHTALMOLOGIE'},
  {id: 31, name: 'PARASITOLOGIE', value: 'PARASITOLOGIE'},
  {id: 32, name: 'PEDIATRIE', value: 'PEDIATRIE'},
  {id: 33, name: 'PNEUMOLOGIE', value: 'PNEUMOLOGIE'},
  {id: 34, name: 'PSYCHIATRIE', value: 'PSYCHIATRIE'},
  {id: 35, name: 'RADIOLOGIE', value: 'RADIOLOGIE'},
  {id: 36, name: 'RADIOTHERAPIE', value: 'RADIOTHERAPIE'},
  {id: 37, name: 'RHUMATOLOGIE', value: 'RHUMATOLOGIE'},
  {id: 38, name: 'STOMATOLOGIE', value: 'STOMATOLOGIE'},
  {id: 39, name: 'UROLOGIE', value: 'UROLOGIE'},
];
const titleList = [{id: 0, name: 'Docteur'}, {id: 1, name: 'Professeur'}];
const mockData0 = [
  {id: 0, name: 'Arab'},
  {id: 1, name: 'Francais'},
  {id: 2, name: 'Anglais'},
];

const mockData2 = [
  {id: 0, name: '10 min'},
  {id: 1, name: '15 min'},
  {id: 2, name: '20 min'},
  {id: 3, name: '25 min'},
  {id: 4, name: '30 min'},
  {id: 5, name: '35 min'},
  {id: 6, name: '40 min'},
  {id: 7, name: '45 min'},
  {id: 8, name: '50 min'},
  {id: 9, name: '55 min'},
  {id: 10, name: '60 min'},
];

const UpdateWorkInformation = ({navigation}) => {
  const doctor = navigation.state.params.doctor;
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState();
  const [spec, setSpec] = useState();
  const [langue, setLangue] = useState();
  const [consl, setConsl] = useState();

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
            title: title,
            specialiteDocteur: spec,

            langueParlee: langue,
            dureeConsultation: parseInt(consl),
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
            Title Professionnel
          </Text>
          <View style={styles.SectionStyle}>
            <Image
              source={require('../../../assets/icons/spec.png')}
              style={styles.ImageStyle}
            />
            <Select2
              isSelectSingle
              showSearchBox={false}
              cancelButtonText="Annuler"
              selectButtonText="Ok"
              colorTheme="#43cde9"
              popupTitle="votre titre"
              title="Votre titre professionnel"
              data={titleList}
              value={title}
              onSelect={data => {
                !data.length ? setTitle('') : setTitle(titleList[data].name);
              }}
              onRemoveItem={data => {}}
            />
          </View>
          <Text bold style={{margin: 12}}>
            Spécialité
          </Text>
          <View style={styles.SectionStyle}>
            <Image
              source={require('../../../assets/icons/spec.png')}
              style={styles.ImageStyle}
            />
            <Select2
              isSelectSingle
              cancelButtonText="Annuler"
              selectButtonText="Ok"
              colorTheme="#43cde9"
              popupTitle="Votre Specialite Principale"
              title="Votre Specialite Principale"
              data={specialite}
              //   value={spec}
              onSelect={data => {
                let sp = [];
                data.length ? sp.push(specialite[data].name) : null;
                setSpec(sp);
              }}
              onRemoveItem={data => {}}
            />
          </View>
          <Text bold style={{margin: 12}}>
            Langue Parlé
          </Text>
          <View style={styles.SectionStyle}>
            <Image
              source={require('../../../assets/icons/lang.png')}
              style={styles.ImageStyle}
            />
            <Select2
              isSelectmulti
              showSearchBox={false}
              colorTheme="#43cde9"
              popupTitle="Langues que vous parlez"
              title="Langues que vous parlez"
              data={mockData0}
              //   value={langue}
              onSelect={data => {
                let langue = [];
                data.map(d => langue.push(mockData0[d].name));
                setLangue(langue);
              }}
              onRemoveItem={data => {
                // langueParlee.splice(langueParlee.indexOf(data), 1);
                let langue = [];
                data.map(d => langue.push(mockData0[d].name));
                setLangue(langue);
              }}
            />
          </View>

          <Text bold style={{margin: 12}}>
            Durée de Consultation
          </Text>
          <View style={styles.SectionStyle}>
            <Image
              source={require('../../../assets/icons/time.png')}
              style={styles.ImageStyle}
            />
            <Select2
              isSelectSingle
              showSearchBox={false}
              colorTheme="#43cde9"
              popupTitle="Duree Moyenne de consultation"
              title="Duree Moyenne de consultation"
              data={mockData2}
              //   value={consl}
              onSelect={data => {
                !data.length ? setConsl('') : setConsl(mockData2[data].name);
              }}
              onRemoveItem={data => {}}
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

export default UpdateWorkInformation;
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
});
