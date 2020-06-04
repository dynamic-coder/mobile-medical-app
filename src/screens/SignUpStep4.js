import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  AppRegistry,
  FlatList,
  Alert,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import {Button, Block, Input, Text, Switch} from '../components';
import {theme} from '../constants';

import TimePicker from 'react-native-24h-timepicker';
//import ReactNativePickerModule from "react-native-picker-module";
import Select2 from 'react-native-select-two';

import {Context as AuthContext} from '../context/auth/authContext';
import {NavigationEvents} from 'react-navigation';
import axios from 'axios';
import StepIndicator from './StepIndicator';
import {ScrollView} from 'react-native-gesture-handler';

const mockData0 = [
  {id: 0, name: 'Arab'},
  {id: 1, name: 'Francais'},
  {id: 2, name: 'Anglais'},
];

const mockData1 = [
  {id: 0, name: 'Espèces'},
  {id: 1, name: 'Carte Bancaire'},
  {id: 2, name: 'Chèque'},
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

const SignUpStep4 = ({navigation}) => {
  const day = navigation.state.params.day;
  const month = navigation.state.params.month;
  const year = navigation.state.params.year;
  const genre = navigation.state.params.genre;
  const fixe = navigation.state.params.fixe;
  const mobile = navigation.state.params.mobile;
  const region = navigation.state.params.region;
  const title = navigation.state.params.title;
  const spec = navigation.state.params.spec;
  const formation = navigation.state.params.formation;

  const [langueParlee, setLangueParlee] = useState([]);
  const [dureeConsultation, setDureeConsultation] = useState('');
  const [horaire, setHoraire] = useState([
    {
      id: 0,
      day: 'Lundi',
      debut: '00:00',
      fin: '00:00',
      status: true,
    },
    {
      id: 1,
      day: 'Mardi',
      debut: '00:00',
      fin: '00:00',
      status: true,
    },
    {
      id: 2,
      day: 'Mercredi',
      debut: '00:00',
      fin: '00:00',
      status: true,
    },
    {
      id: 3,
      day: 'Jeudi',
      debut: '00:00',
      fin: '00:00',
      status: true,
    },
    {
      id: 4,
      day: 'Vendredi',
      debut: '00:00',
      fin: '00:00',
      status: true,
    },
    {
      id: 5,
      day: 'Samedi',
      debut: '00:00',
      fin: '00:00',
      status: true,
    },
    {
      id: 6,
      day: 'Dimanche',
      debut: '00:00',
      fin: '00:00',
      status: false,
    },
  ]);

  const [post, setPost] = useState('');
  const [index, setIndex] = useState(0);

  const [erreur, setErreur] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [name, setName] = useState('');

  const {state, signup, clearErrorMessage} = useContext(AuthContext);
  const currentIndex = 3;
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

  //////////timer//////////
  const onCancel = () => {
    this.TimePicker.close();
  };

  const onConfirm = (hour, minute) => {
    let hor = {...horaire};
    {
      post === 'debut'
        ? (hor[index] = {
            ...horaire[index],
            debut: `${hour}:${minute}`,
          })
        : (hor[index] = {
            ...horaire[index],
            fin: `${hour}:${minute}`,
          });
    }
    setHoraire(hor);
    this.TimePicker.close();
  };
  ///////////////////////

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };

  const handleSignUp = () => {
    Keyboard.dismiss();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    console.log(name);
    console.log(mobile),
      console.log(fixe),
      console.log(title),
      console.log(userEmail),
      console.log(region),
      console.log(genre),
      console.log(parseInt(year)),
      console.log(parseInt(month)),
      console.log(parseInt(day)),
      console.log(formation),
      console.log(spec),
      console.log(langueParlee),
      console.log(horaire),
      console.log(parseInt(dureeConsultation)),
      axios
        .post(
          'https://api/doctors',
          {
            description: name,
            tel: mobile,
            mobile: fixe,
            title: title,
            email: userEmail,
            address: region,
            genre: genre,
            birth: {
              year: parseInt(year),
              month: parseInt(month),
              day: parseInt(day),
            },
            diplomesExperience: formation,
            specialiteDocteur: spec,
            langueParlee: langueParlee,
            horaire: horaire,
            dureeConsultation: parseInt(dureeConsultation),
          },
          {
            headers: {Authorization: `Bearer ${state.token}`},
          },
        )
        .then(response => {
          if (response.data.success) navigation.navigate('Success');
          else setErreur('problème de connexion');
        })
        .catch(error => {
          setErreur('problème de connexion');
        });
  };

  useEffect(() => {
    setErreur('');
    // get current user id
    axios
      .get('https://api/auth/me', {
        headers: {Authorization: `Bearer ${state.token}`},
      })
      .then(response => {
        setUserId(response.data.data._id);
        setUserEmail(response.data.data.email);
        setName(response.data.data.name);
      })
      .catch(error => {
        setErreur('problème de connexion');
      });
  }, []);
  return (
    <View style={{flex: 1}}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <StepIndicator
        steps={steps}
        onChangeTab={() => {}}
        currentIndex={currentIndex}
      />
      <ScrollView>
        <Text bold style={{margin: 12}}>
          Informations Pratiques:
        </Text>

        <View style={styles.SectionStyle}>
          <Image
            source={require('../../assets/icons/lang.png')}
            style={styles.ImageStyle}
          />
          <Select2
            isSelectmulti
            showSearchBox={false}
            colorTheme="#43cde9"
            popupTitle="Langues que vous parlez"
            title="Langues que vous parlez"
            data={mockData0}
            onSelect={data => {
              let langue = [];
              data.map(d => langue.push(mockData0[d].name));
              setLangueParlee(langue);
            }}
            onRemoveItem={data => {
              // langueParlee.splice(langueParlee.indexOf(data), 1);
              let langue = [];
              data.map(d => langue.push(mockData0[d].name));
              setLangueParlee(langue);
            }}
          />
        </View>

        <View style={styles.SectionStyle}>
          <Image
            source={require('../../assets/icons/time.png')}
            style={styles.ImageStyle}
          />
          <Select2
            isSelectSingle
            showSearchBox={false}
            colorTheme="#43cde9"
            popupTitle="Duree Moyenne de consultation"
            title="Duree Moyenne de consultation"
            data={mockData2}
            onSelect={data => {
              !data.length
                ? setDureeConsultation('')
                : setDureeConsultation(mockData2[data].name);
            }}
            onRemoveItem={data => {}}
          />
        </View>

        <Text bold style={{margin: 12}}>
          Horaire De Travaille:
        </Text>
        <View style={styles.MainContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{width: 75}}>{horaire[0].day}</Text>
            <TouchableOpacity
              disabled={!horaire[0].status}
              onPress={() => {
                setIndex(horaire[0].id);
                setPost('debut');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[0].status ? 'black' : '#cacaca'}>
                {horaire[0].debut}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!horaire[0].status}
              onPress={() => {
                setIndex(horaire[0].id);
                setPost('fin');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[0].status ? 'black' : '#cacaca'}>
                {horaire[0].fin}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text color={horaire[0].status ? 'green' : 'red'}>
                {horaire[0].status ? 'ouvrer' : 'fermer'}
              </Text>

              <Switch
                thumbColor={'#43cde9'}
                trackColor={{
                  false: 'red',
                  true: 'green',
                }}
                value={horaire[0].status}
                onValueChange={value => {
                  let hor = {...horaire};

                  hor[0] = {
                    ...horaire[0],
                    debut: '00:00',
                    fin: '00:00',
                    status: value,
                  };
                  setHoraire(hor);
                }}
              />
            </View>
          </View>
          {FlatListItemSeparator()}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{width: 75}}>{horaire[1].day}</Text>
            <TouchableOpacity
              disabled={!horaire[1].status}
              onPress={() => {
                setIndex(horaire[1].id);
                setPost('debut');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[1].status ? 'black' : '#cacaca'}>
                {horaire[1].debut}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!horaire[1].status}
              onPress={() => {
                setIndex(horaire[1].id);
                setPost('fin');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[1].status ? 'black' : '#cacaca'}>
                {horaire[1].fin}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text color={horaire[1].status ? 'green' : 'red'}>
                {horaire[1].status ? 'ouvrer' : 'fermer'}
              </Text>

              <Switch
                thumbColor={'#43cde9'}
                trackColor={{
                  false: 'red',
                  true: 'green',
                }}
                value={horaire[1].status}
                onValueChange={value => {
                  let hor = {...horaire};

                  hor[1] = {
                    ...horaire[1],
                    debut: '00:00',
                    fin: '00:00',
                    status: value,
                  };
                  setHoraire(hor);
                }}
              />
            </View>
          </View>
          {FlatListItemSeparator()}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{width: 75}}>{horaire[2].day}</Text>
            <TouchableOpacity
              disabled={!horaire[2].status}
              onPress={() => {
                setIndex(horaire[2].id);
                setPost('debut');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[2].status ? 'black' : '#cacaca'}>
                {horaire[2].debut}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!horaire[2].status}
              onPress={() => {
                setIndex(horaire[2].id);
                setPost('fin');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[2].status ? 'black' : '#cacaca'}>
                {horaire[2].fin}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text color={horaire[2].status ? 'green' : 'red'}>
                {horaire[2].status ? 'ouvrer' : 'fermer'}
              </Text>

              <Switch
                thumbColor={'#43cde9'}
                trackColor={{
                  false: 'red',
                  true: 'green',
                }}
                value={horaire[2].status}
                onValueChange={value => {
                  let hor = {...horaire};

                  hor[2] = {
                    ...horaire[2],
                    debut: '00:00',
                    fin: '00:00',
                    status: value,
                  };
                  setHoraire(hor);
                }}
              />
            </View>
          </View>
          {FlatListItemSeparator()}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{width: 75}}>{horaire[3].day}</Text>
            <TouchableOpacity
              disabled={!horaire[3].status}
              onPress={() => {
                setIndex(horaire[3].id);
                setPost('debut');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[3].status ? 'black' : '#cacaca'}>
                {horaire[3].debut}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!horaire[3].status}
              onPress={() => {
                setIndex(horaire[3].id);
                setPost('fin');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[3].status ? 'black' : '#cacaca'}>
                {horaire[3].fin}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text color={horaire[3].status ? 'green' : 'red'}>
                {horaire[3].status ? 'ouvrer' : 'fermer'}
              </Text>

              <Switch
                thumbColor={'#43cde9'}
                trackColor={{
                  false: 'red',
                  true: 'green',
                }}
                value={horaire[3].status}
                onValueChange={value => {
                  let hor = {...horaire};

                  hor[3] = {
                    ...horaire[3],
                    debut: '00:00',
                    fin: '00:00',
                    status: value,
                  };
                  setHoraire(hor);
                }}
              />
            </View>
          </View>
          {FlatListItemSeparator()}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{width: 75}}>{horaire[4].day}</Text>
            <TouchableOpacity
              disabled={!horaire[4].status}
              onPress={() => {
                setIndex(horaire[4].id);
                setPost('debut');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[4].status ? 'black' : '#cacaca'}>
                {horaire[4].debut}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!horaire[4].status}
              onPress={() => {
                setIndex(horaire[4].id);
                setPost('fin');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[4].status ? 'black' : '#cacaca'}>
                {horaire[4].fin}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text color={horaire[4].status ? 'green' : 'red'}>
                {horaire[4].status ? 'ouvrer' : 'fermer'}
              </Text>

              <Switch
                thumbColor={'#43cde9'}
                trackColor={{
                  false: 'red',
                  true: 'green',
                }}
                value={horaire[4].status}
                onValueChange={value => {
                  let hor = {...horaire};

                  hor[4] = {
                    ...horaire[4],
                    debut: '00:00',
                    fin: '00:00',
                    status: value,
                  };
                  setHoraire(hor);
                }}
              />
            </View>
          </View>
          {FlatListItemSeparator()}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{width: 75}}>{horaire[5].day}</Text>
            <TouchableOpacity
              disabled={!horaire[5].status}
              onPress={() => {
                setIndex(horaire[5].id);
                setPost('debut');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[5].status ? 'black' : '#cacaca'}>
                {horaire[5].debut}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!horaire[5].status}
              onPress={() => {
                setIndex(horaire[5].id);
                setPost('fin');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[5].status ? 'black' : '#cacaca'}>
                {horaire[5].fin}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text color={horaire[5].status ? 'green' : 'red'}>
                {horaire[5].status ? 'ouvrer' : 'fermer'}
              </Text>

              <Switch
                thumbColor={'#43cde9'}
                trackColor={{
                  false: 'red',
                  true: 'green',
                }}
                value={horaire[5].status}
                onValueChange={value => {
                  let hor = {...horaire};

                  hor[5] = {
                    ...horaire[5],
                    debut: '00:00',
                    fin: '00:00',
                    status: value,
                  };
                  setHoraire(hor);
                }}
              />
            </View>
          </View>
          {FlatListItemSeparator()}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{width: 75}}>{horaire[6].day}</Text>
            <TouchableOpacity
              disabled={!horaire[6].status}
              onPress={() => {
                setIndex(horaire[6].id);
                setPost('debut');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[6].status ? 'black' : '#cacaca'}>
                {horaire[6].debut}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={!horaire[6].status}
              onPress={() => {
                setIndex(horaire[6].id);
                setPost('fin');
                this.TimePicker.open();
              }}
              style={styles.button}>
              <Text color={horaire[6].status ? 'black' : '#cacaca'}>
                {horaire[6].fin}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <Text color={horaire[6].status ? 'green' : 'red'}>
                {horaire[6].status ? 'ouvrer' : 'fermer'}
              </Text>

              <Switch
                thumbColor={'#43cde9'}
                trackColor={{
                  false: 'red',
                  true: 'green',
                }}
                value={horaire[6].status}
                onValueChange={value => {
                  let hor = {...horaire};

                  hor[6] = {
                    ...horaire[6],
                    debut: '00:00',
                    fin: '00:00',
                    status: value,
                  };
                  setHoraire(hor);
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TimePicker
        ref={ref => {
          this.TimePicker = ref;
        }}
        onCancel={() => onCancel()}
        onConfirm={(hour, minute) => onConfirm(hour, minute)}
      />
      {erreur ? (
        <Text color="red" style={{marginLeft: 10, opacity: 0.6}}>
          {erreur}
        </Text>
      ) : null}
      <Button
        gradient
        style={{margin: 10}}
        onPress={() => {
          handleSignUp();
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
  );
};

export default SignUpStep4;
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
    borderColor: theme.colors.accent,
    borderWidth: 1,
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
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 10,
  },

  item: {
    padding: 10,
    fontSize: 14,
    //height: 30
  },
  SectionStyle1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E4EBF0',
    borderWidth: 0.5,
    borderColor: 'white',
    //height: 25,
    width: 78,
    borderRadius: 5,
    margin: 10,
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
});
