import React, {Component} from 'react';
import {
  View,
  Platform,
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
  Alert,
} from 'react-native';

import GetLocation from 'react-native-get-location';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');
import {theme, mocks} from '../constants';

import {isEqual} from 'lodash';

const ANCHOR = {x: 0.5, y: 0.5};
const CENTER = {x: 0, y: 0};
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class PickMap extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      myPosition: {
        latitude: 36.82,
        longitude: 10.16,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }
  async componentDidMount() {
    //Check if is map screen
    // this.watchLocation();
    await this.requestCameraPermission();
  }

  componentWillUnmount() {
    if (this.watchID) navigator.geolocation.clearWatch(this.watchID);
  }
  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Autorisation',
          message: "info-Santé besoin d'accéder à votre emplacement",
          buttonNeutral: 'plus tard',
          buttonNegative: 'Annuler',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.watchLocation();
      } else {
        Alert('accès refusé');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // async getMyCurrentLocation() {
  //   if (Platform.OS === 'android') {
  //     const {status} = await Permissions.askAsync(Permissions.LOCATION);

  //     if (status !== 'granted') {
  //       error(' to access location was denied');
  //     } else {
  //       this.watchLocation();
  //     }
  //   } else {
  //     this.watchLocation();
  //   }
  // }

  async watchLocation() {
    if (Platform.OS === 'ios') {
      this.watchID = navigator.geolocation.watchPosition(
        async position => {
          const myLastPosition = this.state.myPosition;
          const Pos = position.coords;
          if (!isEqual(Pos, myLastPosition)) {
            await this.setState({
              myPosition: {
                latitude: Pos.latitude,
                longitude: Pos.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0922 * ASPECT_RATIO,
              },
            });
            this.props.onPickMap(this.state.myPosition);
          }
        },
        null,
        this.props.geolocationOptions,
      );
    } else {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      }).then(async position => {
        const myLastPosition = this.state.myPosition;
        const Pos = position.coords;
        if (!isEqual(Pos, myLastPosition)) {
          await this.setState({
            myPosition: {
              latitude: Pos.latitude,
              longitude: Pos.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0922 * ASPECT_RATIO,
            },
          });

          this.props.onPickMap(this.state.myPosition);
        }
      });
    }
  }
  componentWillUnmount() {
    if (this.watchID) navigator.geolocation.clearWatch(this.watchID);
  }
  _onDragEnd = async ({nativeEvent}) => {
    await this.setState({
      myPosition: {
        ...this.state.myPosition,
        latitude:
          nativeEvent.coordinate != null ? nativeEvent.coordinate.latitude : 0,
        longitude:
          nativeEvent.coordinate != null ? nativeEvent.coordinate.longitude : 0,
      },
    });
    this.props.onPickMap(this.state.myPosition);
  };

  render() {
    return (
      <View style={[styles.containerPick]}>
        <MapView
          style={[styles.mapPick]}
          ref={ref => (this.map = ref)}
          loadingEnabled
          showsUserLocation={true}
          // region={this.state.myPosition}
          userLocationAnnotationTitle={"You're Here"}
          loadingIndicatorColor={theme.colors.primary}>
          <MapView.Marker
            anchor={ANCHOR}
            centerOffset={CENTER}
            pinColor={theme.colors.accent}
            coordinate={this.state.myPosition}
            style={[styles.marker]}
            onDragEnd={this._onDragEnd}
            draggable
          />
        </MapView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    height: height / 2 - 65,
    width: width,
  },
  linearGradientMap: {
    top: 0,
    left: 0,
    width: width,
    height: Platform.OS == 'ios' ? height / 3 + 15 : height / 2 + 20,
    position: 'absolute',
    zIndex: 999,
  },
  seeMore: {
    position: 'absolute',
    top: 0,
    left: 15,
    zIndex: 999,
    backgroundColor: 'transparent',
    width: width,
  },
  rowHead: {
    flexDirection: 'row',
    width: width - 30,
    alignItems: 'center',
    marginTop: 10,
  },
  rowHeadLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  rowHeadRight: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    top: -40,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255, 255, 255, .9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textDesMore: {
    color: 'rgb(69,69,83)',
    fontSize: 24,
  },
  iconDirections: {
    width: 20,
    height: 18,
    marginRight: 10,
  },
  viewMapFull: {
    color: '#000',
    fontSize: 12,
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerImg: {
    // "zIndex": 9
  },
  markerImgActive: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
    zIndex: 9999,
  },
  iconFull: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 40,
    backgroundColor: 'rgb(27, 229, 141)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleChild: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  arrowDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: 'rgba(255,255,255,.8)',
    position: 'absolute',
    bottom: -10,
    right: 45,
  },
  titleBox: {
    position: 'absolute',
    backgroundColor: '#FFF',
    zIndex: 9999,
    top: 25,
    left: -30,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 12},
    elevation: 10,
  },
  title: {
    fontSize: 15,
    color: '#333',
    marginTop: 3,
    marginRight: 7,
    letterSpacing: 1.5,
    lineHeight: 14,
    textAlign: 'left',
    backgroundColor: 'transparent',
  },
  textMore: {
    fontSize: 11,
    textAlign: 'right',
    color: theme.colors.gray,
    marginTop: 12,
  },
  wrapMarker: {
    bottom: 13,
    left: 10,
    zIndex: 9999,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 12},
    elevation: 10,
  },
  imgLocatePost: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  foodMain: {
    bottom: 15,
    left: -10,
    zIndex: 9999,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 12},
    elevation: 10,
  },
  imgLocate: {
    resizeMode: 'contain',
    width: 120,
    borderRadius: 4,
  },
  youreHere: {
    fontSize: 11,
    alignSelf: 'center',
  },
  slideInnerContainer: {
    width: width / 3 + 30,
    height: Platform.OS == 'ios' ? width / 3 : width / 3 + 10,
    borderRadius: 5,
    marginBottom: 5,
    zIndex: 9999,
  },
  imageContainer: {
    height: width / 3,
    shadowColor: '#FFF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 6},
    elevation: 10,
    borderRadius: 5,
    zIndex: 9999,
  },
  image: {
    resizeMode: 'cover',
    flex: 1,
    borderRadius: 5,
    zIndex: 9999,
  },
  wrapText: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 9999,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    elevation: 10,
    shadowColor: '#FFF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    padding: 4,
    shadowOffset: {width: 0, height: -12},
  },
  //head Address
  row: {
    flexDirection: 'row',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    width: 80,
    paddingLeft: 12,
    paddingTop: Platform.OS == 'android' ? 4 : 4,
    fontSize: 10,
    color: '#212121',
    lineHeight: 18,
  },
  text: {
    color: '#555555',
    fontSize: 10,
    paddingTop: Platform.OS == 'android' ? 4 : 5,
    marginLeft: 3,
    lineHeight: 14,
    alignSelf: 'flex-start',
  },
  imageIcon: {
    resizeMode: 'contain',
    width: 14,
    height: 14,
    zIndex: 999,
  },
  containerDetail: {
    marginTop: 10,
  },
  mapDetail: {
    height: height / 3,
    width: width,
    backgroundColor: 'red',
  },
  containerPick: {
    flex: 1,
  },
  mapPick: {
    height: height * 0.79,
    width: width,
    backgroundColor: '#FFF',
  },
  searchBar: {
    backgroundColor: 'transparent',
    zIndex: 9999,
    // top: Device.isIphoneX ? 40 : 20,
    top: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    elevation: 5,
  },
});
