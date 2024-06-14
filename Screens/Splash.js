import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  Text,
  ActivityIndicator,
} from 'react-native';
import LottieView from 'lottie-react-native';
import {UserContext} from './UserProvider';
import {height} from '../Componenets/dimension';
import {useNavigation} from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();
  const {user} = useContext(UserContext);
  const {isLoggedIn} = user;
  const [loading, setLoading] = useState(true);

  const letterAnimations = useRef(
    [...Array(8)].map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        setLoading(false)
        navigation.reset({index: 0, routes: [{name: 'Tabbar'}]});
      }, 2000);
    } else {
      setTimeout(() => {
        setLoading(false)
        navigation.reset({index: 0, routes: [{name: 'onboard'}]});
      }, 2000);
    }
    const animations = letterAnimations.map(anim =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    );

    Animated.stagger(150, animations).start(() => setLoading(true));
  }, [user]);

  const letters = 'NeonChat'.split('').map((letter, index) => (
    <Animated.Text
      key={index}
      style={[styles.text, {opacity: letterAnimations[index]}]}>
      {letter}
    </Animated.Text>
  ));

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View></View>
      <View style={{alignItems: 'center'}}>
        <LottieView
          source={require('../assets/splash1.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
        <View style={styles.textContainer}>{letters}</View>
      </View>
      {loading ? <ActivityIndicator size={height / 28} color={'orange'} /> : <View></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottie: {
    width: height * 0.2,
    height: height * 0.2,
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: -height / 25,
  },
  text: {
    fontSize: height / 34,
    color: '#006400',
    textShadowColor: '#FFA500',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
    fontFamily: 'Nunito-Bold',
  },
});

export default Splash;
