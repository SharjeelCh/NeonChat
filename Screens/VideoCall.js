import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const VideoCall = () => {
 
  const callerId = route.params?.id;
  const receiverId = route.params?.data.userId;

 

 
  return(
    <View>
      
    </View>
  )
};

export default VideoCall;
