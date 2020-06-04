/** @format */

import React, {PureComponent} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import PickMap from './PickMap';
import {Button, Block, Input, Text} from '../components';

import StepIndicator from './StepIndicator';
import axios from 'axios';

// Geocoder.init('XyXvyt9ckod7UTm81pZslF2BQZMmixQa');
class SignUpStep2 extends PureComponent {
  state = {
    requiredMap: false,
    location: '',
    currentIndex: 1,
    loading: true,

    steps: [
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
    ],
  };
  render() {
    let {onBack} = this.props;
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <StepIndicator
          steps={this.state.steps}
          onChangeTab={() => {}}
          currentIndex={this.state.currentIndex}
        />
        <View stye={[styles.boxLocation]}>
          <Image
            source={require('../../assets/doc/location.png')}
            style={styles.icon}
          />
          <TextInput
            editable={true}
            style={styles.input}
            autoCapitalize={'none'}
            autoCorrect={false}
            placeholder={'glisser le marqueur ou editer ici...'}
            placeholderTextColor="#aaa"
            underlineColorAndroid={'transparent'}
            clearButtonMode={'while-editing'}
            onChangeText={text => this.setState({location: text})}
            value={this.state.location}
          />
          {this.state.loading ? (
            <ActivityIndicator size="small" color="red" />
          ) : null}
        </View>
        <PickMap onBack={onBack} onPickMap={this._onPickMap} />
        <View style={{marginHorizontal: 20, marginBottom: 0}}>
          <Button
            gradient
            onPress={() => {
              this.state.location
                ? navigation.navigate('SignUpStep3', {
                    day: this.props.navigation.state.params.day,
                    month: this.props.navigation.state.params.month,
                    year: this.props.navigation.state.params.year,

                    genre: this.props.navigation.state.params.genre,
                    fixe: this.props.navigation.state.params.fixe,
                    mobile: this.props.navigation.state.params.mobile,
                    region: this.state.location,
                  })
                : Alert.alert(
                    'En cas de problème avec le géolocation',
                    ' vous devez saisir votre adresse manuellement: \n rue, ville, Gouvernorat, code postal, pays',
                  );
            }}>
            <Text bold white center>
              Suivant
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  _onPickMap = async pickMap => {
    this.pickMap = pickMap;
    console.log(this.pickMap.latitude, this.pickMap.longitude);
    await axios
      .get(
        `https://reverse.geocoder.cit.api.here.com/6.2/reversegeocode.json?prox=${
          this.pickMap.latitude
        }%2C${
          this.pickMap.longitude
        }%2C250&mode=retrieveAddresses&maxresults=1&gen=8&app_id=bwYIqvh9w9Gw2Pzp5lft&app_code=T804t1zqekEiHTI4JR2Q9A&language=fr`,
      )

      .then(res => {
        console.log(res.data.Response.View[0].Result[0].Location.Address.Label);
        this.setState({
          location: res.data.Response.View[0].Result[0].Location.Address.Label,
        });
      })
      .catch(error => {
        Alert.alert('Lieu inconnu');
      });
    this.setState({
      loading: false,
    });
  };
}
export default SignUpStep2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  boxLocation: {
    margin: 10,
    flexDirection: 'row',
    borderRadius: 2,
    backgroundColor: 'red',
    ...Platform.select({
      ios: {
        shadowColor: '#333',
        shadowOffset: {
          width: 2,
          height: 5,
        },
        shadowRadius: 8,
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 1.5,
      },
    }),
  },
  icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    tintColor: '#aaa',
    marginHorizontal: 10,
    position: 'absolute',
    left: 5,
    top: 30,
  },
  input: {
    fontSize: 13,
    paddingVertical: 7,
    paddingLeft: 5,
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});
