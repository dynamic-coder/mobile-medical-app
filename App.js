import React, {useState, useContext, useEffect} from 'react';

import {AppLoading} from 'expo';

import {Asset} from 'react-native-unimodules';
import {
  StyleSheet,
  AsyncStorage,
  I18nManager,
  Platform,
  StatusBar,
} from 'react-native';
import Navigation from './src/navigation';
import {Block} from './src/components';
import DoctorState from './src/context/doctor/DoctorState';

import {I18nContextProvider} from './src/translations/i18n';
// import { isRTL } from 'expo-localization';
import {I18nContext} from './src/translations/i18n';

import {Provider as AuthProvider} from './src/context/auth/authContext';
import {setNavigator} from './src/navigationRef';
import SplashScreen from 'react-native-splash-screen';

const App = skipLoadingScreen => {
  const {translate, isRTL, langCode} = useContext(I18nContext);

  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [isReady, setReady] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  const images = [
    require('./assets/doc/icMessage.png'),
    require('./assets/doc/blueHospital.png'),
    require('./assets/doc/cancel.png'),
    require('./assets/doc/four.png'),
    require('./assets/doc/icCall.png'),
    require('./assets/doc/location.png'),
    require('./assets/doc/more.png'),
    require('./assets/doc/one.png'),
    require('./assets/doc/pencil1.png'),
    require('./assets/doc/phoneCall.png'),
    require('./assets/doc/three.png'),
    require('./assets/doc/transfusion.png'),
    require('./assets/doc/two.png'),
    require('./assets/doc/user2.png'),

    require('./assets/icons/male.png'),
    require('./assets/icons/adress.png'),
    require('./assets/icons/Ambulance.png'),
    require('./assets/icons/Doctor.png'),
    require('./assets/icons/email.png'),
    require('./assets/icons/female.png'),
    require('./assets/icons/Hospital.png'),
    require('./assets/icons/Labo.png'),
    require('./assets/icons/lang.png'),
    require('./assets/icons/lnch.png'),
    require('./assets/icons/logo.png'),
    require('./assets/icons/mapp.png'),
    require('./assets/icons/Nurse.png'),
    require('./assets/icons/padlock.png'),
    require('./assets/icons/pers.png'),
    require('./assets/icons/Pharmacie.png'),
    require('./assets/icons/phone.png'),
    require('./assets/icons/phone11.png'),
    require('./assets/icons/psst.png'),
    require('./assets/icons/spec.png'),
    require('./assets/icons/specplus.png'),
    require('./assets/icons/speechBubble1.png'),
    require('./assets/icons/time.png'),
    require('./assets/icons/translating.png'),

    require('./assets/images/illustration_1.png'),
    require('./assets/images/illustration_2.png'),
    require('./assets/images/illustration_3.png'),
    require('./assets/images/info.png'),
    require('./assets/images/medical.jpg'),

    require('./assets/icon.png'),
    require('./assets/splash.png'),
  ];
  const handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  };

  useEffect(() => {
    SplashScreen.hide();
    I18nManager.forceRTL(false);
  }, []);

  if (!isLoadingComplete && !skipLoadingScreen && !appIsReady) {
    return (
      <AppLoading
        startAsync={() => handleResourcesAsync()}
        onError={error => console.warn(error)}
        onFinish={() => setLoadingComplete(true)}
      />
    );
  }

  return (
    <Block white>
      {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}

      <AuthProvider>
        <I18nContextProvider>
          <DoctorState>
            <Navigation
              ref={navigator => {
                setNavigator(navigator);
              }}
            />
          </DoctorState>
        </I18nContextProvider>
      </AuthProvider>
    </Block>
  );
};
export default App;
const styles = StyleSheet.create({});
