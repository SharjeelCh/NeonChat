import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import StartButton from '../Componenets/StartButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {UserContext} from './UserProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
const Login = () => {
  const {user, setUser} = useContext(UserContext);
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const navigation = useNavigation();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handlelogin = () => {
    setLoading(true);
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        if (querySnapshot.empty) {
          Alert.alert('Error', 'Email not found', [{text: 'OK'}]);
        } else {
          let userFound = false;
          querySnapshot.forEach(doc => {
            const userData = doc.data();
            if (userData.password === password) {
              userFound = true;
              asyncdata(userData.username, userData.email, userData.userId);
              navigation.navigate('Tabbar');
            }
          });

          if (!userFound) {
            Alert.alert('Error', 'Incorrect password', [{text: 'OK'}]);
          }
        }
      })
      .catch(error => {
        Alert.alert('Error', 'Error logging in', [{text: 'OK'}]);
      })
      .finally(() => setLoading(false));

    const asyncdata = async (name, email, userId) => {
      await AsyncStorage.setItem('NAME', name);
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('USERID', userId);
      await AsyncStorage.setItem('isloggedin', JSON.stringify(true));
    };
  };

  const validate = () => {
    let valid = true;
    if (email == '' || password == '') valid = false;
    return valid;
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#FF7A30'} />
      <View
        style={{
          flexDirection: 'row',
          width: width,
        }}>
        <View
          style={[
            styles.circle1,
            {
              width: width / 1.1,
              height: width / 1.3,
              borderBottomEndRadius: 320,
              justifyContent: 'space-between',
            },
          ]}>
          <TouchableOpacity
            style={{marginLeft: width / 28, marginTop: height / 70}}>
            <FontAwesomeIcon
              name="chevron-left"
              color={'white'}
              size={width / 15}
            />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontFamily: 'Nunito-Bold',
                fontSize: width / 10,
                color: 'white',
                marginLeft: width / 28,
              }}>
              Welcome
            </Text>
            <Text
              style={{
                fontFamily: 'Nunito-Bold',
                fontSize: width / 10,
                color: 'white',
                marginLeft: width / 28,
              }}>
              Back
            </Text>
          </View>
          <View></View>
        </View>
        <View
          style={[
            styles.circle2,
            {
              width: width / 1.4,
              height: width / 1.4,
              //borderBottomLeftRadius: 250,
              borderRadius: 300,
              left: width / 1.8,
              top: -width / 90,
            },
          ]}></View>
      </View>
      <Fumi
        label={'Email Address'}
        iconClass={FontAwesomeIcon}
        iconName={'envelope'}
        iconColor={'#f95a25'}
        iconSize={17}
        labelStyle={{
          color: 'grey',
          fontFamily: 'Nunito-Light',
          fontSize: width / 26,
        }}
        iconWidth={35}
        inputPadding={16}
        onChangeText={text => {
          setemail(text);
        }}
        value={email}
        inputStyle={{
          color: 'black',
          fontFamily: 'Nunito-Medium',
          letterSpacing: 2.2,
        }}
        style={{
          marginHorizontal: width / 20,
          marginTop: height / 20,
          backgroundColor: 'transparent',
          borderBottomWidth: 0.2,
          borderBottomColor: '#f95a25',
        }}
      />
      <Fumi
        label={'Password'}
        iconClass={FontAwesomeIcon}
        iconName={'lock'}
        iconColor={'#f95a25'}
        iconSize={20}
        iconWidth={35}
        inputPadding={16}
        onChangeText={text => {
          setpassword(text);
        }}
        value={password}
        labelStyle={{
          color: 'grey',
          fontFamily: 'Nunito-Light',
          fontSize: width / 26,
        }}
        secureTextEntry
        inputStyle={{
          color: 'black',
          fontFamily: 'Nunito-Medium',
          letterSpacing: 2.2,
        }}
        style={{
          marginHorizontal: width / 20,
          marginTop: height / 35,
          backgroundColor: 'transparent',
          borderBottomWidth: 0.2,
          borderBottomColor: '#f95a25',
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontFamily: 'Nunito-Bold',
            fontSize: width / 28,
            color: '#f95a25',
            marginTop: height / 40,
            marginLeft: width / 20,
          }}>
          Forgot Password?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text
            style={{
              fontFamily: 'Nunito-Bold',
              fontSize: width / 28,
              color: '#f95a25',
              marginTop: height / 40,
              marginRight: width / 20,
            }}>
            Don't have an account?
          </Text>
        </TouchableOpacity>
      </View>

      <StartButton
        background="#07635D"
        loading={loading}
        text="Login"
        onpress={() => {
          if (validate()) handlelogin();
          else Alert.alert('Please enter correct data');
        }}
      />
      <View
        style={{
          height: height / 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Nunito-Bold',
            fontSize: width / 28,
            color: '#f95a25',
            marginTop: height / 40,
          }}>
          or sign in with
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: width,
          height: height / 10,
          marginTop: height / 50,
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          style={{
            borderWidth: 0.2,
            borderRadius: 100,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="logo-facebook" size={width / 11} color={'black'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 0.2,
            borderRadius: 100,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="logo-google" size={width / 11} color={'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  circle1: {
    backgroundColor: '#FF7A30',
    position: 'relative',
  },
  circle2: {
    backgroundColor: '#07635D',
    position: 'absolute',
  },
});
