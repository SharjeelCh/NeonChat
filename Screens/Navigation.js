import {View, Text} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './Login';
import Signup from './Signup';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from './UserProvider';
import {Tabbar} from '../Componenets/Tabbar';
import {SearchBar} from './SearchBar';
import Profile from './Profile';
import ChatScreen from './ChatScreen';
import VideoCall from './VideoCall';
import AudioCall from './AudioCall';
import Onboarding from './Onboarding';
import Splash from './Splash';
const Navigation = () => {
  const stack = createNativeStackNavigator();

  const {user, setUser} = useContext(UserContext);
  const {isLoggedIn} = user;

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const storedLoginStatus = await AsyncStorage.getItem('isloggedin');
        if (storedLoginStatus !== null) {
          const parsedLoginStatus = JSON.parse(storedLoginStatus);
          setUser({...user, isLoggedIn: parsedLoginStatus});
        } else {
          setUser({...user, isLoggedIn: false});
        }
      } catch (error) {
        console.error('Error reading login status from AsyncStorage', error);
      } finally {
      }
    };

    checkLoginStatus();
  }, [setUser]);
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="splash" component={Splash} />

      {isLoggedIn ? (
        <>
          <stack.Screen name="Login" component={Login} />
          <stack.Screen name="Signup" component={Signup} />
          <stack.Screen name="Tabbar" component={Tabbar} />
          <stack.Screen name="SearchBar" component={SearchBar} />
          <stack.Screen name="ChatScreen" component={ChatScreen} />
          <stack.Screen name="VideoCall" component={VideoCall} />
          <stack.Screen name="AudioCall" component={AudioCall} />
          <stack.Screen name="Profile" component={Profile} />
        </>
      ) : (
        <>
          <stack.Screen name="onboard" component={Onboarding} />
          <stack.Screen name="Login" component={Login} />
          <stack.Screen name="Signup" component={Signup} />
          <stack.Screen name="Tabbar" component={Tabbar} />
          <stack.Screen name="SearchBar" component={SearchBar} />
          <stack.Screen name="ChatScreen" component={ChatScreen} />
          <stack.Screen name="VideoCall" component={VideoCall} />
          <stack.Screen name="AudioCall" component={AudioCall} />
          <stack.Screen name="Profile" component={Profile} />
        </>
      )}
    </stack.Navigator>
  );
};

export default Navigation;
