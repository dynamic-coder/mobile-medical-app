import React, {useEffect, useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  FlatList,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import IconFont from 'react-native-vector-icons/FontAwesome';
import TimeLine from 'react-native-timeline-theme';
const {width, height} = Dimensions.get('window');
import {theme} from '../../constants';

const WorkInformation = ({navigation}) => {
  const user = navigation.state.params.currentUser;
  const doctor = navigation.state.params.myId;

  // const [myId, setMyId] = useState({});
  const [profile, setProfile] = useState({});
  // const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  const datatime = [
    {
      title: `de ${doctor[0].horaire[0].debut} à 00:00`,
      time: 'Lun',
      renderIcon: () => (
        <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
      ),
      lineColor: '#546e7a',
      titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
    },
    {
      title: 'de 00:00 à 00:00',
      description: '',

      time: 'Mar',
      renderIcon: () => (
        <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
      ),
      lineColor: '#546e7a',
      titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
    },
    {
      title: 'de 00:00 à 00:00',
      description: '',

      time: 'Mer',
      renderIcon: () => (
        <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
      ),
      lineColor: '#546e7a',
      titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
    },
    {
      title: 'de 00:00 à 00:00',
      description: '',

      time: 'Jeu',
      renderIcon: () => (
        <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
      ),
      lineColor: '#546e7a',
      titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
    },
    {
      title: 'de 00:00 à 00:00',
      description: '',
      time: 'Ven',
      renderIcon: () => (
        <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
      ),
      lineColor: '#546e7a',
      titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
    },
    {
      title: 'de 00:00 à 00:00',
      description: '',

      time: 'Sam',
      renderIcon: () => (
        <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
      ),
      lineColor: '#546e7a',
      titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
    },
    {
      title: 'de 00:00 à 00:00',
      description: '',
      time: 'Dim',
      renderIcon: () => (
        <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
      ),
      lineColor: '#546e7a',
      titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
    },
  ];
  const [dat, setDat] = useState([]);
  const hor = () => {
    let d = doctor[0].horaire[0];

    setDat([
      {
        title: d[0].status ? `de ${d[0].debut} à ${d[0].fin}` : 'fermer',
        time: 'Lun',
        renderIcon: () => (
          <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
        ),
        lineColor: '#546e7a',
        titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
      },
      {
        title: d[1].status ? `de ${d[1].debut} à ${d[1].fin}` : 'Fermer',
        description: '',

        time: 'Mar',
        renderIcon: () => (
          <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
        ),
        lineColor: '#546e7a',
        titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
      },
      {
        title: d[2].status ? `de ${d[2].debut} à ${d[2].fin}` : 'Fermer',
        description: '',

        time: 'Mer',
        renderIcon: () => (
          <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
        ),
        lineColor: '#546e7a',
        titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
      },
      {
        title: d[3].status ? `de ${d[3].debut} à ${d[3].fin}` : 'Fermer',
        description: '',

        time: 'Jeu',
        renderIcon: () => (
          <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
        ),
        lineColor: '#546e7a',
        titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
      },
      {
        title: d[4].status ? `de ${d[4].debut} à ${d[4].fin}` : 'Fermer',
        description: '',
        time: 'Ven',
        renderIcon: () => (
          <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
        ),
        lineColor: '#546e7a',
        titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
      },
      {
        title: d[5].status ? `de ${d[5].debut} à ${d[5].fin}` : 'Fermer',
        description: '',

        time: 'Sam',
        renderIcon: () => (
          <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
        ),
        lineColor: '#546e7a',
        titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
      },
      {
        title: d[6].status ? `de ${d[6].debut} à ${d[6].fin}` : 'Fermer',
        description: '',
        time: 'Dim',
        renderIcon: () => (
          <IconFont name={'dot-circle-o'} size={25} color={'#546e7a'} />
        ),
        lineColor: '#546e7a',
        titleStyle: {color: '#333333', fontSize: 15, fontWeight: '200'},
      },
    ]);
  };

  useEffect(() => {
    hor();
  }, []);
  return (
    <View style={{position: 'relative', flex: 1, backgroundColor: '#FFFFFF'}}>
      <StatusBar backgroundColor="#3f67e6" barStyle="default" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 15,
              marginRight: 15,
              borderRadius: 8,
              backgroundColor: '#FFFFFF',
              elevation: 6,
            }}>
            <View style={styles.panelHeader}>
              <Text
                style={{
                  fontSize: 17,
                  lineHeight: 29,
                  color: 'rgb(150,150,150)',
                }}>
                Avancée
              </Text>
            </View>
            <View style={styles.panelBody}>
              <View style={styles.orderServiceItemBox}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(105,105,105)',
                    }}>
                    Title professionnel
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(75,102,234)',
                    }}>
                    {doctor[0].title}
                  </Text>
                </View>
              </View>
              <View style={styles.orderServiceItemBox}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(105,105,105)',
                    }}>
                    Spécialité
                  </Text>
                  <FlatList
                    snapToAlignment="center"
                    data={doctor[0].specialiteDocteur}
                    renderItem={({item}) => (
                      <Text
                        style={{
                          fontSize: 15,
                          lineHeight: 23,
                          color: 'rgb(75,102,234)',
                        }}>
                        {item}
                      </Text>
                    )}
                  />
                </View>
              </View>
              <View style={styles.orderServiceItemBox}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(105,105,105)',
                    }}>
                    Langue parlée
                  </Text>
                  <FlatList
                    snapToAlignment="center"
                    data={doctor[0].langueParlee}
                    renderItem={({item}) => (
                      <Text
                        style={{
                          fontSize: 15,
                          lineHeight: 23,
                          color: 'rgb(75,102,234)',
                        }}>
                        {item}
                      </Text>
                    )}
                  />
                </View>
              </View>
              <View style={styles.orderServiceItemBox}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(105,105,105)',
                    }}>
                    Durée de consultation
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(75,102,234)',
                    }}>
                    {doctor[0].dureeConsultation} mn
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.panelFooter, styles.panelFooterCol]}
              onPress={() => {
                doctor
                  ? navigation.navigate('UpdateWorkInformation', {doctor})
                  : Alert.alert('Problème de connexion');
              }}>
              <Image
                source={require('../../../assets/doc/cancel.png')}
                style={{width: 16, height: 16}}
              />
              <Text
                style={{
                  color: 'rgb(150,150,150)',
                  fontSize: 14,
                  marginLeft: 5,
                }}>
                Editer
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 15,
              marginRight: 15,
              borderRadius: 8,
              backgroundColor: '#FFFFFF',
              elevation: 6,
            }}>
            <View style={styles.panelHeader}>
              <Text
                style={{
                  fontSize: 17,
                  lineHeight: 29,
                  color: 'rgb(150,150,150)',
                }}>
                Expérience et Diplomes
              </Text>
            </View>
            <View style={styles.panelBody}>
              <View style={styles.orderServiceItemBox}>
                <View>
                  <FlatList
                    snapToAlignment="center"
                    data={doctor[0].diplomesExperience}
                    renderItem={({item}) => (
                      <Text
                        style={{
                          fontSize: 15,
                          lineHeight: 23,
                          color: 'rgb(105,105,105)',
                        }}>
                        {item}
                      </Text>
                    )}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.panelFooter, styles.panelFooterCol]}
              onPress={() => {
                doctor
                  ? navigation.navigate('UpdateExp', {doctor})
                  : Alert.alert('Problème de connexion');
              }}>
              <Image
                source={require('../../../assets/doc/cancel.png')}
                style={{width: 16, height: 16}}
              />
              <Text
                style={{
                  color: 'rgb(150,150,150)',
                  fontSize: 14,
                  marginLeft: 5,
                }}>
                Editer
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 15,
              marginRight: 15,
              borderRadius: 8,
              backgroundColor: '#FFFFFF',
              elevation: 6,
            }}>
            <View style={styles.panelHeader}>
              <Text
                style={{
                  fontSize: 17,
                  lineHeight: 29,
                  color: 'rgb(150,150,150)',
                }}>
                Horaire de travail
              </Text>
            </View>
            <View style={styles.panelBody}>
              <View style={styles.orderServiceItemBox}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(105,105,105)',
                    }}
                  />
                  <TimeLine
                    data={dat}
                    dashLine
                    widthLineContainer={65}
                    style={{width: width * 0.8}}
                  />
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.panelFooter, styles.panelFooterCol]}
              onPress={() => {
                doctor
                  ? navigation.navigate('UpdateHoraire', {doctor})
                  : Alert.alert('Problème de connexion');
              }}>
              <Image
                source={require('../../../assets/doc/cancel.png')}
                style={{width: 16, height: 16}}
              />
              <Text
                style={{
                  color: 'rgb(150,150,150)',
                  fontSize: 14,
                  marginLeft: 5,
                }}>
                Editer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default WorkInformation;

const styles = StyleSheet.create({
  panelHeader: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: 'rgb(243,246,254)',
  },
  panelBody: {
    // height: 250,
    paddingTop: 25,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(229,229,229)',
  },
  panelFooter: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  panelFooterCol: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderServiceItemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    paddingHorizontal: 20,
    borderColor: 'rgb(229,229,229)',
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
});
