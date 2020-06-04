import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';

import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  I18nManager,
  Linking,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  AsyncStorage,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {theme, mocks} from '../../constants';
import {I18nContext} from '../../translations/i18n';

// import { Rating, AirbnbRating } from 'react-native-elements';
import {Context as AuthContext} from '../../context/auth/authContext';
import ImagePicker from 'react-native-image-picker';

import {Constants, Permissions} from 'react-native-unimodules';

import {
  Divider,
  Button,
  Block,
  Text,
  Switch,
  ItemWithImage,
  Item,
  Badge,
} from '../../components';
import doctorContext from '../../context/doctor/doctorContext';

const {width, height} = Dimensions.get('window');
const blueGradient = {
  colors: [theme.colors.primary, theme.colors.secondary],
  colorsStart: {x: 0.2, y: 0.4},
  colorsEnd: {x: 1.0, y: 1.0},
};

const Profile = ({navigation}) => {
  const {signout} = useContext(AuthContext);
  const {getDoctor, getOneDoctor, oneDoctor, doctor} = useContext(
    doctorContext,
  );

  const [active, setActive] = useState('Profile');

  const [myId, setMyId] = useState({});
  const [profile, setProfile] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(null);
  const blueGradient = {
    colors: ['#3f67e6', '#3f67e6'],
    colorsStart: {x: 0.2, y: 0.4},
    colorsEnd: {x: 1.0, y: 1.0},
  };
  const tabs = ['Profile', 'Paramètre'];

  const handleEdit = (name, text) => {
    profile[name] = text;
    setProfile(profile);
    // this.setState({ profile });
  };

  const toggleEdit = name => {
    {
      setEditing(!editing ? name : null);
    }
  };

  const renderEdit = name => {
    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={text => handleEdit([name], text)}
        />
      );
    }
  };
  const getUser = () => {
    AsyncStorage.getItem('token').then(token => {
      axios
        .get('http://api', {
          headers: {Authorization: `Bearer ${token}`},
        }) //api to get authentifiated doctor's data from auth table
        .then(response => {
          setCurrentUser(response.data.data);

          axios
            .get(
              `http://api?user=${response.data.data._id}`, //api to get authentifiated doctor's data from doctors table by auth data
            )
            .then(res => {
              setMyId(res.data.data);
            })
            .then(res => setLoading(false))
            .catch(error => {
              Alert.alert('problème de connexion');
            });
        });
    });
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert("L'accés au camera roll est necessaire ");
      }
    }
  };
  const PickImage = async () => {
    var options = {
      title: 'Image de Profil',

      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        saveImage(source);
      }
    });
  };
  const saveImage = async img => {
    const token = await AsyncStorage.getItem('token');
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    let localUri = img.uri;
    let filename = localUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const formdata = new FormData();
    formdata.append('file', {uri: localUri, name: filename, type});

    const requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(
      `http://api/${_id}/photo`, //api to save profile image of doctor
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let msg = result.split('":"').pop();
        let message = msg.slice(0, -2);
        Alert.alert(message);
      })
      .catch(error =>
        Alert.alert('error', "type ou taille de fichier n'est pas valide"),
      );
  };

  useEffect(() => {
    getUser();
  }, [doctor]);
  useEffect(() => {
    getUser();
    getDoctor();
  }, []);
  return (
    <Block style={[styles.header]}>
      <StatusBar backgroundColor="#3f67e6" barStyle="default" />
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              marginBottom: 30,
            }}>
            <View>
              <TouchableOpacity onPress={() => PickImage()}>
                <Badge margin={[0, 0, 0]} size={103} color="#3f67e6">
                  {doctor
                    .filter(d => d.user === currentUser._id)
                    .map(m =>
                      image === 'no-photo.jpg' ||
                      !m ||
                      m.photo === 'no-photo.jpg' ? (
                        <Image
                          source={require('../../../assets/icons/male.png')}
                          style={{
                            height: 100,
                            width: 100,
                            borderRadius: 100,
                            alignItems: 'center',
                          }}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: `http://api/uploads/${m.photo}`, //api to get doctor profile image
                          }}
                          style={{
                            height: 100,
                            width: 100,
                            borderRadius: 100,
                            alignItems: 'center',
                          }}
                        />
                      ),
                    )}
                </Badge>
                <Badge margin={[-35, 0, 10]} size={35} color="#3f67e6">
                  <Image
                    source={require('../../../assets/doc/pencil1.png')}
                    style={styles.trans}
                  />
                </Badge>
              </TouchableOpacity>
            </View>
            {doctor
              .filter(d => d.user === currentUser._id)
              .map(m => (
                <View style={{marginLeft: 30}}>
                  <Text h3 bold color="#3f67e6">
                    {m.title === 'Professeur' ? 'pr. ' : 'dr. '}
                    {currentUser.name}
                  </Text>
                  <View>
                    <Text caption bold gray>
                      {m.specialiteDocteur[0]}
                    </Text>
                  </View>
                </View>
              ))}
          </View>

          <View style={styles.parentCircle}>
            <TouchableWithoutFeedback onPress={() => setActive('Profile')}>
              {(() => {
                if (active == 'Profile') {
                  return (
                    <LinearGradient
                      tart={blueGradient.colorsStart}
                      end={blueGradient.colorsEnd}
                      colors={blueGradient.colors}
                      style={styles.activeChildCircle}>
                      <Text style={styles.activeBtnText}>Profil</Text>
                    </LinearGradient>
                  );
                } else {
                  return (
                    <View style={styles.childCircle}>
                      <Text style={styles.btnText}>Profil</Text>
                    </View>
                  );
                }
              })()}
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setActive('Paramètre')}>
              {(() => {
                if (active == 'Paramètre') {
                  return (
                    <LinearGradient
                      start={blueGradient.colorsStart}
                      end={blueGradient.colorsEnd}
                      colors={blueGradient.colors}
                      style={styles.activeChildCircle}>
                      <Text style={styles.activeBtnText}>Paramètre</Text>
                    </LinearGradient>
                  );
                } else {
                  return (
                    <View style={styles.childCircle}>
                      <Text style={styles.btnText}>Paramètre</Text>
                    </View>
                  );
                }
              })()}
            </TouchableWithoutFeedback>
          </View>

          {active === 'Profile' ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <ItemWithImage
                itemImg={require('../../../assets/doc/user2.png')}
                iconWidth={18}
                iconHeight={26}
                itemHeaderText="Information Personal "
                onPressItem={() =>
                  navigation.navigate('PersonnelInformation', {
                    currentUser,
                    myId,
                  })
                }
              />
              <ItemWithImage
                itemImg={require('../../../assets/doc/transfusion.png')}
                iconWidth={26}
                iconHeight={25}
                itemHeaderText="Information de Travail"
                onPressItem={() =>
                  navigation.navigate('WorkInformation', {currentUser, myId})
                }
              />
              <ItemWithImage
                itemImg={require('../../../assets/doc/blueHospital.png')}
                iconWidth={25.5}
                iconHeight={25}
                itemHeaderText="Adresse de travail"
                onPressItem={() =>
                  navigation.navigate('WorkAddress', {currentUser, myId})
                }
              />
            </ScrollView>
          ) : active === 'Paramètre' ? (
            <ScrollView showsVerticalScrollIndicator={false}>
              <Block style={styles.toggles}>
                <Button
                  onPress={() => {
                    Alert.alert(
                      'Alerte!',
                      'êtes-vous sûr de vouloir vous déconnecter ?',
                      [
                        {
                          text: 'Continue',
                          onPress: () => {
                            signout();
                            navigation.navigate('Welcome');
                          },
                        },
                      ],
                      {cancelable: true},
                    );
                  }}
                  style={{
                    marginTop: theme.sizes.padding / 8,
                    backgroundColor: '#5673d0',
                  }}>
                  <Text
                    center
                    caption
                    white
                    style={{
                      textDecorationLine: 'underline',
                    }}>
                    déconnecter
                  </Text>
                </Button>
              </Block>
            </ScrollView>
          ) : null}
        </View>
      )}
    </Block>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
    marginTop: '15%',
  },
  tabs: {
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: theme.sizes.base,
    // marginHorizontal: theme.sizes.base * 2
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 1,
    paddingVertical: 3,
  },
  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: 3,
    backgroundColor: theme.colors.gray2,
    width: 100,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end',
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  parentCircle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 49,
    padding: 20,

    marginBottom: 20,
    borderWidth: 0,
    borderColor: 'transparent',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',

    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  childCircle: {
    height: 39,
    width: (width - 40) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activeChildCircle: {
    height: 39,
    width: (width - 40) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 8,
  },
  btnText: {
    color: 'rgb(150,150,150)',
    fontSize: 16,
  },
  activeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
