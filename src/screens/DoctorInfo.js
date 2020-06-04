import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View, Dimensions, Image, FlatList} from 'react-native';
import {theme} from '../constants';
import {Text} from '../components';
const {width, height} = Dimensions.get('window');
import {Content, ListItem, Separator} from 'native-base';
import {I18nContext} from '../translations/i18n';

const datas1 = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren'];
const infopers = ({navigation}) => {
  const info = navigation.state.params.resource;
  const {translate, isRTL, langCode} = useContext(I18nContext);

  const renderList = () => {
    return (
      <Content style={{marginTop: 14}}>
        <Separator bordered style={{backgroundColor: theme.colors.primary}}>
          <Text bold style={{color: 'white'}}>
            {translate('Numéro de Téléphone')}:
          </Text>
        </Separator>
        <ListItem>
          <Text bold>{translate('Personnel')}:</Text>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 23,
              color: 'rgb(75,102,234)',
            }}>
            {info.tel}
          </Text>
        </ListItem>
        <ListItem
          style={{
            flexDirection: 'row',
            paddingRight: 20,
          }}>
          <Text bold>{translate('De Travail')}:</Text>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 23,
              color: 'rgb(75,102,234)',
            }}>
            {info.mobile}
          </Text>
        </ListItem>

        <Separator bordered style={{backgroundColor: theme.colors.primary}}>
          <Text bold style={{color: 'white'}}>
            {translate('Informations pratiques')}:
          </Text>
        </Separator>
        <ListItem last style={{marginLeft: 8, marginTop: -12}}>
          <Text bold>Title Professionnel:</Text>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 23,
              color: 'rgb(75,102,234)',
            }}>
            {info.title}
          </Text>
        </ListItem>
        <ListItem last style={{marginLeft: 8, marginTop: -12}}>
          <Text bold>Spécialité:</Text>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 23,
              color: 'rgb(75,102,234)',
            }}>
            {info.specialiteDocteur[0]}
          </Text>
        </ListItem>
        <ListItem last style={{marginLeft: 8, marginTop: -12}}>
          <Text bold>Langues Parlée:</Text>
          <FlatList
            snapToAlignment="center"
            data={info.langueParlee}
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
        </ListItem>
        <ListItem last style={{marginLeft: 8, marginTop: -12}}>
          <Text bold>Durée Consultation: </Text>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 23,
              color: 'rgb(75,102,234)',
            }}>
            {info.dureeConsultation} mn
          </Text>
        </ListItem>
        <Separator bordered style={{backgroundColor: theme.colors.primary}}>
          <Text style={{color: 'white'}}>
            {translate('Diplômes et Expérience')}:
          </Text>
        </Separator>

        <ListItem last style={{marginLeft: 8, marginTop: -12}}>
          <Text
            style={{
              fontSize: 15,
              lineHeight: 23,
              color: 'rgb(75,102,234)',
            }}>
            {info.diplomesExperience[0]}
          </Text>
        </ListItem>
      </Content>
    );
  };
  return (
    <View style={{flex: 1}} colors={['#FFFFFF', '#43cde9']}>
      <View style={{flexDirection: 'row'}}>
        {info.photo === 'no-photo.jpg' ? (
          <Image
            style={{
              width: theme.sizes.base * 8,
              height: theme.sizes.base * 8,

              margin: 18,
              borderWidth: 0.5,
              borderColor: 'gray',
            }}
            source={require('../../assets/icons/male.png')}
          />
        ) : (
          <Image
            style={{
              width: theme.sizes.base * 8,
              height: theme.sizes.base * 8,

              margin: 18,
              borderWidth: 0.5,
              borderColor: 'gray',
            }}
            source={{
              uri: `http://api/uploads/${info.photo}`,
            }}
          />
        )}
        <View style={styles.parent1}>
          <Text style={styles.child1} h1 bold style={{fontSize: 18}}>
            {info.description}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.child1}>{translate('Genre')}:</Text>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 23,
                color: 'rgb(75,102,234)',
              }}>
              {info.genre}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.child1}>{translate('Naissance')}:</Text>
            <Text
              style={{
                fontSize: 15,
                lineHeight: 23,
                color: 'rgb(75,102,234)',
              }}>
              {info.birth.year}-{info.birth.month}-{info.birth.day}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.child1}>{translate('Region')}:</Text>
            <Text
              style={{
                fontSize: 10,
                lineHeight: 23,
                color: 'rgb(75,102,234)',
                flex: 1,
                textAlign: 'left',
              }}>
              {info.location.state}
            </Text>
          </View>
        </View>
      </View>
      {renderList()}
    </View>
  );
};

export default infopers;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  marg: {
    marginRight: 10,
    marginTop: 14,
  },
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base * 2,
  },
  container: {
    backgroundColor: '#43cde9',
  },
  parent: {
    //flex: 1,
    flexDirection: 'row',
    backgroundColor: '#43cde9',
    marginTop: 30,
  },
  parent1: {
    marginTop: 30,
    //backgroundColor: "#43cde9",
  },
  child: {
    flex: 1,
    textAlign: 'center',
  },
  child1: {
    fontSize: 15,
  },
  lineStyle: {
    borderWidth: 0.4,
    borderColor: 'white',
    width: 270,
    marginTop: 10,
    textAlign: 'center',
  },
});
