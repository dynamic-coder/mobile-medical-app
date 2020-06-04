/** @format */

import React, {PureComponent} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
  AsyncStorage,
  Keyboard,
  StatusBar,
} from 'react-native';
import PickMap from '../PickMap';
import {Button, Block, Input, Text} from '../../components';

import axios from 'axios';

class UpdateAddress extends PureComponent {
  state = {
    requiredMap: false,
    location: '',
    currentIndex: 1,
    loading: false,
    doctor: this.props.navigation.state.params.doctor,
  };
  render() {
    let {onBack} = this.props;
    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#3f67e6" barStyle="default" />
        <View stye={styles.boxLocation}>
          <Image
            source={require('../../../assets/doc/location.png')}
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
        </View>
        <PickMap onBack={onBack} onPickMap={this._onPickMap} />
        <View style={{marginHorizontal: 20, marginBottom: 0}}>
          <Button color="#3f67e6" onPress={() => this.handleLog()}>
            {this.state.loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text bold white center>
                Enregistrer
              </Text>
            )}
          </Button>
        </View>
      </View>
    );
  }
  handleLog = () => {
    this.setState({loading: true});
    Keyboard.dismiss();

    setTimeout(() => {
      this.setState({loading: false});
    }, 2000);
    {
      this.state.location
        ? this.update()
        : Alert.alert(
            'En cas de problème avec le géolocation',
            'vous devez saisir votre adresse manuellement: \n rue, ville, Gouvernorat, code postal, pays',
          );
    }
  };

  update = () => {
    AsyncStorage.getItem('token').then(token => {
      axios
        .put(
          `https://api/${this.state.doctor[0]._id}`, //api to update doctor by id
          {
            location: this.state.location,
          },
          {
            headers: {Authorization: `Bearer ${token}`},
          },
        )
        .then(response => {
          Alert.alert('modification terminée'),
            this.props.navigation.navigate('Profile');
        })
        .catch(error => {
          Alert.alert('problème de connexion');
        });
    });
  };

  _onPickMap = pickMap => {
    this.pickMap = pickMap;

    axios
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
        Alert.alert('problème de connexion');
      });
    this.setState({
      loading: false,
    });
  };
}
export default UpdateAddress;
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
