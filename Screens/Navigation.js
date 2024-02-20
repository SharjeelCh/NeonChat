import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from './UserProvider';
import { Tabbar } from '../Componenets/Tabbar';
const Navigation = () => {
  const stack = createNativeStackNavigator();

  const {user, setUser} = useContext(UserContext);
  const {isLoggedIn} = user;

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        if (storedLoginStatus !== null) {
          const parsedLoginStatus = JSON.parse(storedLoginStatus);
          setUser({ ...user, isLoggedIn: parsedLoginStatus });
        } else {
          // Handle the case where storedLoginStatus is undefined/null
          setUser({ ...user, isLoggedIn: false }); // Assuming false when login status is not stored
        }
      } catch (error) {
        console.error('Error reading login status from AsyncStorage', error);
      } finally {
      }
    };

    checkLoginStatus();
  }, [setUser]);
  return (
    <stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      {isLoggedIn ? (
        <>
        <stack.Screen name="Tabbar" component={Tabbar} />
        </>
      ) : (
        <>
          <stack.Screen name="Login" component={Login} />
          <stack.Screen name="Signup" component={Signup} />
          <stack.Screen name="Tabbar" component={Tabbar} />


        </>
      )}
    </stack.Navigator>
  );
};

export default Navigation;
