import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import React, { useEffect } from 'react';
import {height, width} from '../Componenets/dimension';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';
const AudioCall = () => {
  const route=useRoute();

  return (
    <View style={{flex: 1, alignItems: 'center',backgroundColor:'white'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View style={{flexDirection: 'row', marginTop: height / 44}}>
        <Icon name="lock-closed" size={width / 21} color={'grey'} />
        <Text
          style={{
            fontFamily: 'Nunito-Regular',
            color: 'grey',
            fontSize: width / 25,
            marginLeft: width / 55,
          }}>
          End-to-end encrypted
        </Text>
      </View>

      <View
        style={{
          width: width / 3,
          height: width / 3,
          borderWidth: 1,
          borderRadius: width,
          marginTop: height / 40,
        }}></View>
      <Text
        style={{
          fontFamily: 'Nunito-SemiBold',
          color: 'black',
          fontSize: width / 16,
          marginTop: height / 40,
        }}>
        {route.params.data.username}
      </Text>
      <Text
        style={{
          fontFamily: 'Nunito-Regular',
          color: 'grey',
          fontSize: width / 23,
          marginTop: height / 40,
        }}>
        Calling...
      </Text>
      <TouchableOpacity
        style={{
          width: width / 7,
          height: width / 7,
          backgroundColor: 'red',
          borderRadius: width,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: height / 3,
          elevation:1
        }}>
        <Icon name="call-sharp" size={width / 14} color={'white'} />
      </TouchableOpacity>
    </View>
  );
};

export default AudioCall;
