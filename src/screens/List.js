import React, {useState, useEffect, useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import {Block, Text, ListItem} from '../components';
import {theme, mocks} from '../constants';

import DoctorContext from '../context/doctor/doctorContext';

const {width, height} = Dimensions.get('window');

const ListDocteurs = ({navigation}) => {
  const [resources, setResources] = useState([]);
  const [category, setCategory] = useState('');
  const [distance, setDistance] = useState(1000);
  const [doc, setDoc] = useState([]);
  const [loading, setLoading] = useState(true);

  const region = navigation.state.params.region;
  const spec = navigation.state.params.spec;
  const service = navigation.state.params.service;
  const {getDoctor, doctor} = useContext(DoctorContext);

  const alertCallItem = tel => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${tel}`;
    } else {
      phoneNumber = `telprompt:${tel}`;
    }

    Linking.openURL(phoneNumber);
  };

  const onCheck = service => {
    switch (service) {
      case 'Docteurs':
        setCategory('doctor');
        setResources(doctor);

        break;
      case 'Infirmières':
        setCategory('nurse');

        break;
      case 'Pharmacies':
        setCategory('pharmacie');

        break;
      case 'Hopitaux':
        setCategory('hospital');

        break;
      case 'Ambulance':
        setCategory('ambulance');

        break;
      case 'Laboratoires':
        setCategory('labo');

        // setDisplay(false);
        break;
      default:
        null;
    }
  };
  const getDoc = () => {
    axios
      .get(
        `https://api/doctors?location.state=${region}&specialiteDocteur[0]=${spec}`,
      )
      .then(response => {
        setDoc(response.data.data);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    getDoc();
    getDoctor();
    onCheck(service);
  }, []);

  const renderList = () => {
    return (
      <View>
        {loading ? (
          <ActivityIndicator size="small" color={theme.colors.primary} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              {doc.map((item, index) => (
                <TouchableOpacity key={item._id}>
                  <ListItem
                    key={item._id}
                    imageUrl={
                      item.photo === 'no-photo.jpg'
                        ? require('../../assets/icons/male.png')
                        : {
                            uri: `http://whispering-earth-48189.herokuapp.com/uploads/${
                              item.photo
                            }`,
                          }
                    }
                    itemTitle={item.description}
                    specialite={item.specialiteDocteur[0]}
                    tel={item.mobile}
                    imageWidth={theme.sizes.base * 4}
                    imageHeight={theme.sizes.base * 4}
                    // isSpecial={item.isSpecial}
                    onPressButton={() => navigation.navigate('Doctor', {item})}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        )}

        {!doc.length ? (
          <Text caption gray center>
            pas de liste trouvé
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <Block>
      <Block flex={false} row space="between" style={styles.header}>
        <Text h1 bold>
          Liste {service}
        </Text>
      </Block>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderList()}
      </ScrollView>
    </Block>
  );
};

export default ListDocteurs;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  locate: {
    // marginHorizontal: theme.sizes.padding * 1
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

  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
    color: theme.colors.primary,
  },
});
