import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const maps = ({ navigation }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLatitude(navigation.state.params.resource.location.coordinates[1]);
    setLongitude(navigation.state.params.resource.location.coordinates[0]);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.922,
          longitudeDelta: 4.21,
        }}
      >
        {latitude && !!longitude && (
          <MapView.Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={'Votre Position'}
          />
        )}
      </MapView>
    </View>
  );
};

export default maps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
