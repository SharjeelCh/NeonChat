import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Touchable} from 'react-native';
import {height, width} from './dimension';

const StartButton = props => {
  return (
    <View
      style={{
        alignItems: 'center',
        width: '100%',
        marginTop: height / 35,
        paddingHorizontal: width / 20,
      }}>
      <TouchableOpacity
        style={[{
          width: '100%', 
          maxWidth: width - (width / 20) * 2,
          height:height/15,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: width / 27,
          backgroundColor:props.background
        },
        
      ]
      }
        onPress={props.onpress}
        >
        <Text
          style={{
            color: 'white',
            fontFamily: 'Nunito-Bold',
            fontSize: width / 19,
          }}>
          {props.text}
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default StartButton;
