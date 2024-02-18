import {View, Text, Dimensions} from 'react-native';
import React from 'react';

const Login = () => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View
          style={{
            width: width / 2,
            height: height / 3,
            backgroundColor: '#FF7A30',
          }}>
            hello
          </View>
      </View>
    </View>
  );
};

export default Login;
