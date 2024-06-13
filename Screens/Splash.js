import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';
import {UserContext} from './UserProvider';
import {height} from '../Componenets/dimension';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  const {user} = useContext(UserContext);
  const {isLoggedIn} = user;

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigation.reset({index: 0, routes: [{name: 'Tabbar'}]});
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.reset({index: 0, routes: [{name: 'onboard'}]});
      }, 2000);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'}/>
      <LottieView
        source={require('../assets/splash1.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottie: {
    width: height * 0.2,
    height: height * 0.2,
  },
});

export default Splash;
