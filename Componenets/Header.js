import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {height, width} from './dimension';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Header = props => {
  const navigation=useNavigation();
  return (
    <View
      style={{
        width: width,
        height: height / 10,
        backgroundColor: '#07635D',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={{
          borderColor: 'white',
          borderWidth: 0.2,
          width: width / 12,
          height: width / 12,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          marginLeft:width/20,

        }}
        onPress={()=>{navigation.navigate('SearchBar')}}
        >
        <Icon name="search" size={width / 20} color={'white'} />
      </TouchableOpacity>
      <Text style={{fontSize:width/17,fontFamily:'Nunito-Medium',color:'white'}}>{props.title}</Text>

      <TouchableOpacity
        style={{
          borderColor: 'white',
          borderWidth: 0.2,
          width: width / 9,
          height: width / 9,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          marginRight:width/26

        }}
        onPress={()=>{navigation.navigate('Profile')}}
        ></TouchableOpacity>
    </View>
  );
};

export default Header;
