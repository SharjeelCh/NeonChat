import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
import StartButton from '../Componenets/StartButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {width} from '../Componenets/dimension';
import {height} from '../Componenets/dimension';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
const Signup = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setrepeat] = useState('');
  const [loading, setLoading] = useState(false);
  const handleRegister = () => {
    setLoading(true);
    const userId = uuid.v4();
    const lowercasedUsername = username.toLowerCase();

    firestore()
      .collection('users')
      .doc(userId)
      .set({
        username: lowercasedUsername,
        email: email,
        password: password,
        userId: userId,
        profileImage: '',
      })
      .then(res => {
        console.log('data: ', res);
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };
  const validate = () => {
    let valid = true;
    if (username == '' || email == '' || password == '') valid = false;
    if (password !== repeatPass) valid = false;
    return valid;
  };
  return (
    <View style={{flex: 1, backgroundColor: '#07635D'}}>
      <StatusBar backgroundColor={'#07635D'} />
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
            style={{marginLeft: width / 28, marginTop: height / 70}}
            onPress={() => {
              navigation.goBack();
            }}>
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
              Register
            </Text>
            <Text
              style={{
                fontFamily: 'Nunito-Bold',
                fontSize: width / 10,
                color: 'white',
                marginLeft: width / 28,
              }}>
              Now
            </Text>
          </View>
          <View></View>
        </View>
        <View
          style={[
            styles.circle2,
            {
              width: width / 1.8,
              height: width / 1.8,
              //borderBottomLeftRadius: 250,
              borderRadius: 300,
              left: width / 1.55,
              top: -width / 210,
            },
          ]}></View>
      </View>
      <Fumi
        label={'Username'}
        iconClass={FontAwesomeIcon}
        iconName={'user'}
        iconColor={'#FF7A30'}
        iconSize={17}
        passiveIconColor="white"
        labelStyle={{
          color: 'white',
          fontFamily: 'Nunito-Light',
          fontSize: width / 26,
        }}
        iconWidth={35}
        onChangeText={text => {
          setUsername(text);
        }}
        value={username}
        inputStyle={{
          color: 'white',
          fontFamily: 'Nunito-Medium',
          letterSpacing: 2.2,
        }}
        inputPadding={16}
        style={{
          marginHorizontal: width / 20,
          backgroundColor: 'transparent',
          marginTop: -width / 13,
          borderBottomWidth: 0.2,
          borderBottomColor: 'white',
        }}
      />
      <Fumi
        label={'Email Address'}
        iconClass={FontAwesomeIcon}
        iconName={'envelope'}
        iconColor={'#FF7A30'}
        iconSize={17}
        passiveIconColor="white"
        labelStyle={{
          color: 'white',
          fontFamily: 'Nunito-Light',
          fontSize: width / 26,
        }}
        iconWidth={35}
        onChangeText={text => {
          setEmail(text);
        }}
        value={email}
        inputStyle={{
          color: 'white',
          fontFamily: 'Nunito-Medium',
          letterSpacing: 2.2,
        }}
        inputPadding={16}
        style={{
          marginHorizontal: width / 20,
          backgroundColor: 'transparent',
          borderBottomWidth: 0.2,
          borderBottomColor: 'white',
          marginTop: height / 70,
        }}
      />
      <Fumi
        label={'Password'}
        iconClass={FontAwesomeIcon}
        iconName={'lock'}
        secureTextEntry
        iconColor={'#FF7A30'}
        passiveIconColor="white"
        onChangeText={text => {
          setPassword(text);
        }}
        value={password}
        inputStyle={{
          color: 'white',
          fontFamily: 'Nunito-Medium',
          letterSpacing: 2.2,
        }}
        iconSize={20}
        labelStyle={{
          color: 'white',
          fontFamily: 'Nunito-Light',
          fontSize: width / 26,
        }}
        iconWidth={35}
        inputPadding={16}
        style={{
          marginHorizontal: width / 20,
          backgroundColor: 'transparent',
          borderBottomWidth: 0.2,
          borderBottomColor: 'white',
          marginTop: height / 70,
        }}
      />
      <Fumi
        label={'Repeat Password'}
        iconClass={FontAwesomeIcon}
        iconName={'key'}
        secureTextEntry
        iconColor={'#FF7A30'}
        passiveIconColor="white"
        onChangeText={text => {
          setrepeat(text);
        }}
        value={repeatPass}
        inputStyle={{
          color: 'white',
          fontFamily: 'Nunito-Medium',
          letterSpacing: 2.2,
        }}
        iconSize={20}
        labelStyle={{
          color: 'white',
          fontFamily: 'Nunito-Light',
          fontSize: width / 26,
        }}
        iconWidth={35}
        inputPadding={16}
        style={{
          marginHorizontal: width / 20,
          backgroundColor: 'transparent',
          borderBottomWidth: 0.2,
          borderBottomColor: 'white',
          marginTop: height / 70,
        }}
      />
      <StartButton
        text="Sign Up"
        background="#FF7A30"
        loading={loading}
        onpress={() => {
          if (validate()) handleRegister();
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
            color: 'white',
            marginTop: height / 40,
          }}>
          or sign up with
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: width,
          height: height / 10,
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          style={{
            borderWidth: 0.2,
            borderRadius: 100,
            borderColor: 'white',
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="logo-facebook" size={width / 11} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 0.2,
            borderRadius: 100,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'white',
          }}>
          <Icon name="logo-google" size={width / 11} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Signup;
const styles = StyleSheet.create({
  circle1: {
    backgroundColor: '#07635D',
    position: 'relative',
  },
  circle2: {
    backgroundColor: '#FF7A30',
    position: 'absolute',
  },
});
