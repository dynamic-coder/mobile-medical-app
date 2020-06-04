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
  StatusBar,
} from 'react-native';

const WorkAddress = ({navigation}) => {
  const user = navigation.state.params.currentUser;
  const doctor = navigation.state.params.myId;

  useEffect(() => {}, []);
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
                Adresse
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
                    {doctor[0].location.formattedAddress}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.panelFooter, styles.panelFooterCol]}
              onPress={() => {
                doctor
                  ? navigation.navigate('UpdateAddress', {doctor})
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

export default WorkAddress;

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
