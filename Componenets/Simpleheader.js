import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {height, width} from './dimension';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import Ioni from 'react-native-vector-icons/Ionicons';

const Simpleheader = props => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        width: '100%',
        height: height / 15,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: width / 46,
      }}>
      <TouchableOpacity
        style={{marginHorizontal: width / 25, width: width / 10}}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Tabbar'}],
          });
        }}>
        <Icon name="chevron-left" size={width / 16} color="black" />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'Nunito-SemiBold',
          color: 'black',
          fontSize: width / 18,
          width: width / 2.7,
        }}
        ellipsizeMode="tail"
        lineBreakMode="clip"
        numberOfLines={1}>
        {props.text}
      </Text>
    </View>
  );
};

export default Simpleheader;
