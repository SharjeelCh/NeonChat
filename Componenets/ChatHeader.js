import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import React, {useEffect, useState} from 'react';
import {height, width} from './dimension';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import Ioni from 'react-native-vector-icons/Ionicons';
import {getProfileImage} from './ProfileUpdateFuncs';

const ChatHeader = props => {
  const navigation = useNavigation();
  const [currenImage, setCurrentImage] = useState(null);

  const name = props.name;
  const clippedName =
    name.length > 10
      ? name.substring(0, 14) + (name.length > 14 ? '...' : '')
      : name;

  useEffect(() => {
    getProfileImage(props.id, setCurrentImage);
  }, [props.id]);

  return (
    <View
      style={{
        width: '100%',
        height: height / 15,
        backgroundColor: '#07635D',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width / 30,
        justifyContent: 'space-evenly',
      }}>
      <TouchableOpacity
        style={{marginLeft: width / 28, width: width / 10}}
        onPress={() => {
          navigation.replace('Tabbar');
        }}>
        <Icon name="chevron-left" size={width / 16} color="white" />
      </TouchableOpacity>
      <ImageBackground
        style={{
          width: width / 10,
          height: width / 10,
        }}
        borderRadius={500}
        resizeMode="cover"
        source={
          currenImage ? {uri: currenImage} : require('../assets/image.png')
        }>
        <TouchableOpacity
          style={{
            width: width / 10,
            height: width / 10,
            borderRadius: 100,
          }}></TouchableOpacity>
      </ImageBackground>
      <TouchableOpacity>
        <Text
          style={{
            fontFamily: 'Nunito-SemiBold',
            color: 'white',
            fontSize: width / 19,
            marginHorizontal: width / 28,
            width: width / 2.7,
          }}
          ellipsizeMode="tail"
          lineBreakMode="clip"
          numberOfLines={1}>
          {clippedName}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginLeft: width / 9, marginRight: width / 28}}
        onPress={props.onvideo}>
        <Ioni name="videocam" size={width / 18} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginHorizontal: width / 28}}
        onPress={props.oncallpress}>
        <Ioni name="call-sharp" size={width / 18} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ChatHeader;
