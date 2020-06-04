import React, {useState, useEffect, useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';

import {Button, Block, Text, Card, Badge} from '../components';
import {theme, mocks} from '../constants';
import RNPickerSelect from 'react-native-picker-select';

// import { Ionicons, Entypo } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

const {width, height} = Dimensions.get('window');

import {I18nContext} from '../translations/i18n';

const ChercherDocteur = ({navigation}) => {
  const [region, setRegion] = useState('');
  const [spec, setSpec] = useState('');

  const [locations, setLocations] = useState([]);
  const [specialite, setSpecialite] = useState([]);
  const [serviceName, setServiceName] = useState([]);
  const [s, setS] = useState({});

  const service = navigation.state.params.value;

  const [isHidden, setIsHidden] = useState(false);
  // const [specialite, setSpecialite] = useState([]);
  const {translate, isRTL, langCode, dispatch} = useContext(I18nContext);
  const location = [
    {
      id: 0,
      label: 'Tunis',
      value: 'Tunis',
    },
    {
      id: 1,
      label: 'Bizert',
      value: 'Bizert',
    },
    {
      id: 2,
      label: 'Ariana',
      value: 'Ariana',
    },
    {
      id: 3,
      label: 'Manouba',
      value: 'Manouba',
    },
    {
      id: 4,
      label: 'Ben Arous',
      value: 'Ben Arous',
    },
    {
      id: 5,
      label: 'Kef',
      value: 'Kef',
    },
    {
      id: 6,
      label: 'Nabeul',
      value: 'Nabeul',
    },
    {
      id: 7,
      label: 'Jendouba',
      value: 'Jendouba',
    },
    {
      id: 8,
      label: 'Béja',
      value: 'Béja',
    },
    {
      id: 9,
      label: 'Siliana',
      value: 'Siliana',
    },
    {
      id: 10,
      label: 'Zaghouan',
      value: 'Zaghouan',
    },
    {
      id: 11,
      label: 'Sousse',
      value: 'Sousse',
    },
    {
      id: 12,
      label: 'Monastir',
      value: 'Monastir',
    },
    {
      id: 13,
      label: 'Mahdia',
      value: 'Mahdia',
    },
    {
      id: 14,
      label: 'Kairouan',
      value: 'Kairouan',
    },
    {
      id: 15,
      label: 'Kasserine',
      value: 'Kasserine',
    },
    {
      id: 16,
      label: 'Sidi Bouzid',
      value: 'Sidi Bouzid',
    },
    {
      id: 17,
      label: 'Sfax',
      value: 'Sfax',
    },
    {
      id: 18,
      label: 'Gafsa',
      value: 'Gafsa',
    },
    {
      id: 19,
      label: 'Tozeur',
      value: 'Tozeur',
    },
    {
      id: 20,
      label: 'Gabès',
      value: 'Gabès',
    },
    {
      id: 21,
      label: 'Kebili',
      value: 'Kebili',
    },
    {
      id: 22,
      label: 'Medenine',
      value: 'Medenine',
    },
    {
      id: 23,
      label: 'Tataouine',
      value: 'Tataouine',
    },
  ];
  const special = [
    {
      id: 0,
      label: 'ANATOMIE-PATHOLOGIE',
      value: 'ANATOMIE-PATHOLOGIE',
    },
    {
      id: 1,
      label: 'ANESTHESIE-REANIMATION',
      value: 'ANESTHESIE-REANIMATION',
    },
    {
      id: 2,
      label: 'BIOLOGIE CLINIQUE',
      value: 'BIOLOGIE CLINIQUE',
    },
    {
      id: 3,
      label: 'CARCINOLOGIE MEDICALE',
      value: 'CARCINOLOGIE MEDICALE',
    },
    {
      id: 4,
      label: 'CARDIOLOGIE',
      value: 'CARDIOLOGIE',
    },
    {
      id: 5,
      label: 'CHI. CARDIOVASCULAIRE T',
      value: 'CHI. CARDIOVASCULAIRE T',
    },
    {
      id: 6,
      label: 'CHIRURGIE CARCINOLOGIE',
      value: 'CHIRURGIE CARCINOLOGIE',
    },
    {
      id: 7,
      label: 'CHIRURGIE GENERALE',
      value: 'CHIRURGIE GENERALE',
    },
    {
      id: 8,
      label: 'CHIRURGIE INFANTILE',
      value: 'CHIRURGIE INFANTILE',
    },
    {
      id: 9,
      label: 'CHIRURGIE MAXILLO-FACIALE',
      value: 'CHIRURGIE MAXILLO-FACIALE',
    },
    {
      id: 10,
      label: 'CHIRURGIE ORTHOPEDIQUE',
      value: 'CHIRURGIE ORTHOPEDIQUE',
    },
    {
      id: 11,
      label: 'CHIRURGIE PLASTIQUE',
      value: 'CHIRURGIE PLASTIQUE',
    },
    {
      id: 12,
      label: 'DERMATOLOGIE',
      value: 'DERMATOLOGIE',
    },
    {
      id: 13,
      label: 'ENDOCRINOLOGIE',
      value: 'ENDOCRINOLOGIE',
    },
    {
      id: 14,
      label: 'GASTROLOGIE',
      value: 'GASTROLOGIE',
    },
    {
      id: 15,
      label: 'GYNECOLOGIE-OBSTETRIQUE',
      value: 'GYNECOLOGIE-OBSTETRIQUE',
    },
    {
      id: 16,
      label: 'HEMATOLOGIE',
      value: 'HEMATOLOGIE',
    },
    {
      id: 17,
      label: 'HISTOLOGIE EMBRYOLOGIE',
      value: 'HISTOLOGIE EMBRYOLOGIE',
    },
    {
      id: 18,
      label: 'MALADIES INFECTIEUSES',
      value: 'MALADIES INFECTIEUSES',
    },
    {
      id: 19,
      label: 'MEDECINE INTERNE',
      value: 'MEDECINE INTERNE',
    },
    {
      id: 20,
      label: 'MEDECINE LEGALE',
      value: 'MEDECINE LEGALE',
    },
    {
      id: 21,
      label: 'MEDECINE NUCLEAIRE',
      value: 'MEDECINE NUCLEAIRE',
    },
    {
      id: 22,
      label: 'MEDECINE PHYSIQUE',
      value: 'MEDECINE PHYSIQUE',
    },
    {
      id: 23,
      label: 'NEPHROLOGIE',
      value: 'NEPHROLOGIE',
    },
    {
      id: 24,
      label: 'NEURO-CHIRURGIE',
      value: 'NEURO-CHIRURGIE',
    },
    {
      id: 25,
      label: 'NEUROLOGIE',
      value: 'NEUROLOGIE',
    },
    {
      id: 26,
      label: 'NON CLASSE',
      value: 'NON CLASSE',
    },
    {
      id: 27,
      label: 'NUTRITION',
      value: 'NUTRITION',
    },
    {
      id: 28,
      label: 'O R L',
      value: 'O R L',
    },
    {
      id: 29,
      label: 'OPHTALMOLOGIE',
      value: 'OPHTALMOLOGIE',
    },
    {
      id: 30,
      label: 'PARASITOLOGIE',
      value: 'PARASITOLOGIE',
    },
    {
      id: 31,
      label: 'PEDIATRIE',
      value: 'PEDIATRIE',
    },
    {
      id: 32,
      label: 'PNEUMOLOGIE',
      value: 'PNEUMOLOGIE',
    },
    {
      id: 33,
      label: 'PSYCHIATRIE',
      value: 'PSYCHIATRIE',
    },
    {
      id: 34,
      label: 'RADIOLOGIE',
      value: 'RADIOLOGIE',
    },
    {
      id: 35,
      label: 'RADIOTHERAPIE',
      value: 'RADIOTHERAPIE',
    },
    {
      id: 36,
      label: 'RHUMATOLOGIE',
      value: 'RHUMATOLOGIE',
    },
    {
      id: 37,
      label: 'STOMATOLOGIE',
      value: 'STOMATOLOGIE',
    },
    {
      id: 38,
      label: 'UROLOGIE',
      value: 'UROLOGIE',
    },
  ];
  const specInf = [
    {
      id: 0,
      label: 'Pharmacie de nuit',
      value: 'Pharmacie de nuit',
    },
    {
      id: 1,
      label: 'Para-Pharmacie',
      value: 'Para-Pharmacie',
    },
    {
      id: 2,
      label: 'Autre',
      value: 'Autre',
    },
  ];
  const onPressNavigate = () => {
    if (
      (region != '' && spec != '' && isHidden === false) ||
      (region != '' && isHidden === true)
    ) {
      navigation.navigate('List', {region, spec, service});
    } else {
      Alert.alert(
        'Erreur',
        'Remplir les Champs nécessaire',
        [
          {
            text: 'OK',
            style: {
              color: '#43cde9',
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const onCheck = service => {
    switch (service) {
      case 'Docteurs':
        {
          setSpecialite(special);
          langCode === 'en'
            ? setServiceName('Doctor')
            : langCode === 'ar'
            ? setServiceName('عن طبيب')
            : setServiceName('Docteur');
        }
        break;
      case 'Infirmières':
        {
          langCode === 'en'
            ? setServiceName('Nurse')
            : langCode === 'ar'
            ? setServiceName('عن ممرضة')
            : setServiceName('Infirmière');
        }
        setIsHidden(true);
        break;
      case 'Pharmacies':
        {
          setSpecialite(specInf);
          langCode === 'en'
            ? setServiceName('Pharmacie')
            : langCode === 'ar'
            ? setServiceName('عن صيدلية')
            : setServiceName('Pharmacie');
        }
        break;
      case 'Hopitaux':
        {
          setSpecialite(special);
          langCode === 'en'
            ? setServiceName('Hospital / Clinic / Medical Office')
            : langCode === 'ar'
            ? setServiceName('عن مستشفى / مصحة / عيادة')
            : setServiceName('Hôpital / Clinique / Cabinet');
        }
        break;
      case 'Ambulance':
        {
          langCode === 'en'
            ? setServiceName('Ambulance')
            : langCode === 'ar'
            ? setServiceName('عن سيارة إسعاف')
            : setServiceName('Ambulance');
        }
        setIsHidden(true);
        break;
      case 'Laboratoires':
        {
          langCode === 'en'
            ? setServiceName('Laboratorie')
            : langCode === 'ar'
            ? setServiceName('عن مختبر')
            : setServiceName('Laboratoire');
        }
        setIsHidden(true);
        break;
      default:
        null;
    }
  };

  useEffect(() => {
    setLocations(location);

    onCheck(service);
  }, []);

  const renderList = () => {
    return (
      <Block style={styles.Radio}>
        <Block style={{marginBottom: 15}}>
          <Text bold style={{marginBottom: 10}}>
            Select Region :
          </Text>
          <RNPickerSelect
            style={{
              ...pickerSelectStyles,
              iconContainer: {
                top: 10,
                right: 12,
              },
            }}
            placeholder={{
              label: 'Sélect région...',
              value: null,
            }}
            useNativeAndroidPickerStyle={false}
            value={region}
            onValueChange={value => setRegion(value)}
            items={location}
            itemKey={location.id}
            // textInputProps={{ underlineColor: 'yellow' }}
            Icon={() => {
              return (
                <Entypo
                  name="location"
                  size={24}
                  color="#43cde9"
                  style={{marginHorizontal: 5}}
                />
              );
            }}
          />
        </Block>
        {isHidden ? null : (
          <Block>
            <Text bold style={{marginBottom: 10}}>
              Select Spécialité :
            </Text>
            <RNPickerSelect
              style={{
                ...pickerSelectStyles,
                iconContainer: {
                  top: 10,
                  right: 12,
                },
              }}
              placeholder={{
                label: 'Sélect spécialité...',
                value: null,
              }}
              useNativeAndroidPickerStyle={false}
              value={spec}
              onValueChange={value => setSpec(value)}
              items={specialite}
              itemKey={specialite.id}
              textInputProps={{underlineColor: 'yellow'}}
              Icon={() => {
                return (
                  <Ionicons
                    name="ios-journal"
                    size={24}
                    color="#43cde9"
                    style={{marginHorizontal: 5}}
                  />
                );
              }}
            />
          </Block>
        )}
      </Block>
    );
  };

  const renderFooter = () => {
    return (
      <Block middle padding={[theme.sizes.base / 2, theme.sizes.padding]}>
        <Button gradient onPress={() => onPressNavigate()}>
          <Text center white>
            {translate('suivant')}
          </Text>
        </Button>
      </Block>
    );
  };

  return (
    <Block>
      <Block flex={false} row space="between" style={styles.header}>
        <Text h1 bold>
          {translate('chercher')} {serviceName}
        </Text>
      </Block>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.locate}>
        {renderList()}
      </ScrollView>

      {renderFooter()}
    </Block>
  );
};

export default ChercherDocteur;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 1.5,
    paddingBottom: theme.sizes.base * 2,
  },
  locate: {
    marginHorizontal: theme.sizes.padding * 1,
  },
  Radio: {
    flex: 1,

    justifyContent: 'center',
    // marginBottom: height / 3,
    // minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) ,
    // maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base),
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
  SelectStyle: {
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: 'gray',
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  banner: {
    height: theme.sizes.base * 5,
    width: theme.sizes.base * 10,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
});
