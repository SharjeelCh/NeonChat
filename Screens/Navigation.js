import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login';
import Signup from './Signup';

const Navigation = () => {
    const stack = createStackNavigator();
  return (
    <stack.Navigator>
    <stack.Screen name="Login" component={Login} />
    <stack.Screen name="Signup" component={Signup} />
    </stack.Navigator>
  )
}

export default Navigation