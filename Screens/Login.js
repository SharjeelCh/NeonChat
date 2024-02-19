import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Fumi} from 'react-native-textinput-effects';
const Login = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return (
    <View style={{flex: 1, height: height}}>
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
              justifyContent: 'center',
            },
          ]}>
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
        <View
          style={[
            styles.circle2,
            {
              width: width / 1.6,
              height: width / 1.4,
              borderBottomLeftRadius: 250,
              left: width / 2.2,
            },
          ]}></View>
      </View>
      <Fumi
        label={'Email Address'}
        iconClass={FontAwesomeIcon}
        iconName={'envelope'}
        iconColor={'#f95a25'}
        iconSize={17}
        iconWidth={35}
        inputPadding={16}
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
        style={{
          marginHorizontal: width / 20,
          marginTop: height / 35,
          backgroundColor: 'transparent',
          borderBottomWidth: 0.2,
          borderBottomColor: '#f95a25',
        }}
      />
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
