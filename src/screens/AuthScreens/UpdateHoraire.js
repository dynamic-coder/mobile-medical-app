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
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import {Button, Block, Input, Text, Switch} from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';

import TimePicker from 'react-native-24h-timepicker';

const UpdateHoraire = ({navigation}) => {
  const doctor = navigation.state.params.doctor;
  const [loading, setLoading] = useState(false);

  const [post, setPost] = useState('');
  const [index, setIndex] = useState(0);

  const [horaire, setHoraire] = useState([
    {id: 0, day: 'Lundi', debut: '00:00', fin: '00:00', status: true},
    {id: 1, day: 'Mardi', debut: '00:00', fin: '00:00', status: true},
    {id: 2, day: 'Mercredi', debut: '00:00', fin: '00:00', status: true},
    {id: 3, day: 'Jeudi', debut: '00:00', fin: '00:00', status: true},
    {id: 4, day: 'Vendredi', debut: '00:00', fin: '00:00', status: true},
    {id: 5, day: 'Samedi', debut: '00:00', fin: '00:00', status: true},
    {id: 6, day: 'Dimanche', debut: '00:00', fin: '00:00', status: false},
  ]);
  const [timetable, setTimeTable] = useState(doctor[0].horaire);

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
            horaire: horaire,
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

  const hor = () => {
    let d = doctor[0].horaire[0];
    setHoraire([
      {
        id: 0,
        day: 'Lundi',
        debut: d[0].debut,
        fin: d[0].fin,
        status: d[0].status,
      },
      {
        id: 1,
        day: 'Mardi',
        debut: d[1].debut,
        fin: d[1].fin,
        status: d[1].status,
      },
      {
        id: 2,
        day: 'Mercredi',
        debut: d[2].debut,
        fin: d[2].fin,
        status: d[2].status,
      },
      {
        id: 3,
        day: 'Jeudi',
        debut: d[3].debut,
        fin: d[3].fin,
        status: d[3].status,
      },
      {
        id: 4,
        day: 'Vendredi',
        debut: d[4].debut,
        fin: d[4].fin,
        status: d[4].status,
      },
      {
        id: 5,
        day: 'Samedi',
        debut: d[5].debut,
        fin: d[5].fin,
        status: d[5].status,
      },
      {
        id: 6,
        day: 'Dimanche',
        debut: d[6].debut,
        fin: d[6].fin,
        status: d[6].status,
      },
    ]);
  };
  useEffect(() => {
    hor();
  }, []);
  return (
    <LinearGradient style={{flex: 1}} colors={['#dedfde', '#dedfde']}>
      <StatusBar backgroundColor="#3f67e6" barStyle="default" />
      <Block style={{marginHorizontal: 15}}>
        <Text black h1 style={{margin: 12}}>
          Modification :
        </Text>
        <View style={{backgroundColor: '#f5f5f5', borderRadius: 10}}>
          <Text bold style={{margin: 12}}>
            Horaire de travail
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
          <TimePicker
            ref={ref => {
              this.TimePicker = ref;
            }}
            onCancel={() => onCancel()}
            onConfirm={(hour, minute) => onConfirm(hour, minute)}
          />
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

export default UpdateHoraire;
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
  MainContainer: {
    marginHorizontal: 10,
  },
});
