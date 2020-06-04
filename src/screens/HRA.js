import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome';
import TimeLine from 'react-native-timeline-theme';
const {width, height} = Dimensions.get('window');
import {theme} from '../constants';

const HRA = ({navigation}) => {
  const info = navigation.state.params.resource;
  const [dat, setDat] = useState([]);
  const hor = () => {
    let d = info.horaire[0];

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
    let f = info.horaire[0];
    console.log(f[0].debut);
  }, []);
  return (
    <ScrollView>
      <View style={{alignItems: 'center', margin: 'auto'}}>
        <Text
          style={{
            fontSize: 15,
            lineHeight: 23,
            color: 'rgb(105,105,105)',
          }}
        />
        <View>
          <TimeLine
            data={dat}
            dashLine
            widthLineContainer={width / 2}
            style={{width: width, margin: 20}}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HRA;

const styles = StyleSheet.create({});
