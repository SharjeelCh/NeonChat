import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {height, width} from './dimension';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Header = props => {
  const navigation = useNavigation();
  const [currenImage, setCurrentImage] = useState(null);
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
          width: width / 10.5,
          height: width / 10.5,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          marginLeft: width / 20,
        }}
        onPress={() => {
          navigation.navigate('SearchBar');
        }}>
        <Icon name="search" size={width / 20} color={'white'} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: width / 17,
          fontFamily: 'Nunito-Medium',
          color: 'white',
        }}>
        {props.title}
      </Text>

      <ImageBackground
        style={{
          borderRadius: 100,
          width: width / 9,
          height: width / 9,
          marginRight: width / 26,
        }}
        source={currenImage ? currenImage : require('../assets/image.png')}
        borderRadius={500}
        resizeMode="cover">
        <TouchableOpacity
          style={{
            borderColor: 'white',
            borderWidth: 0.2,
            width: width / 9,
            height: width / 9,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
            marginRight: width / 26,
          }}
          onPress={props.gotoprofile}></TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Header;
