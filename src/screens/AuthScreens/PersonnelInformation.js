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
} from 'react-native';

import axios from 'axios';
import doctorContext from '../../context/doctor/doctorContext';
// import Timetable from '../Timetable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconFont from 'react-native-vector-icons/FontAwesome';
import TimeLine from 'react-native-timeline-theme';
const {width, height} = Dimensions.get('window');
import {theme} from '../../constants';

const PersonnelInformation = ({navigation}) => {
  const user = navigation.state.params.currentUser;
  const doctor = navigation.state.params.myId;

  useEffect(() => {}, []);
  return (
    <View style={{position: 'relative', flex: 1, backgroundColor: '#FFFFFF'}}>
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
                Identification
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
                    Nom et Prénom
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(75,102,234)',
                    }}>
                    {user.name}
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
                    Addresse e-mail
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(75,102,234)',
                    }}>
                    {user.email}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.panelFooter}>
              <TouchableOpacity
                style={styles.panelFooterCol}
                onPress={() => {
                  user
                    ? navigation.navigate('UpdateUserInformation', {
                        user,
                      })
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
                  Modifier
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  height: 40,
                  width: 0.7,
                  marginLeft: 0,
                  marginRight: 20,
                  backgroundColor: 'rgb(229,229,229)',
                }}
              />
              <TouchableOpacity
                style={styles.panelFooterCol}
                onPress={() => {
                  user
                    ? navigation.navigate('UpdatePassword', {user})
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
                  Modifier mot de passe
                </Text>
              </TouchableOpacity>
            </View>
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
                Basique
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
                    Date de naissance
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(75,102,234)',
                    }}>
                    {doctor[0].birth.year}-{doctor[0].birth.month}-
                    {doctor[0].birth.day}
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
                    Genre
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(75,102,234)',
                    }}>
                    {doctor[0].genre}
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
                    Numero téléphone personnel
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(75,102,234)',
                    }}>
                    {doctor[0].tel}
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
                    Numéro téléphone de travail
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      lineHeight: 23,
                      color: 'rgb(75,102,234)',
                    }}>
                    {doctor[0].mobile}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.panelFooter, styles.panelFooterCol]}
              onPress={() => {
                doctor
                  ? navigation.navigate('UpdateBasicInformation', {doctor})
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
                Modifier
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PersonnelInformation;

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
