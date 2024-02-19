import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';

import Signup from './Signup';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Navigation = () => {
    const stack =createNativeStackNavigator();
  return (
    <stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName='Login'
    >
    <stack.Screen name="Login" component={Login} />
    <stack.Screen name="Signup" component={Signup} />
    </stack.Navigator>
  )
}

export default Navigation