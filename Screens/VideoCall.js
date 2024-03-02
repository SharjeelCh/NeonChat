import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

const VideoCall = () => {
  /* const connectionData = {
    appId: '895277d2da9d4a048655d1e43637017e',
    channel: 'test',
    token: null, // enter your channel token as a string
  };
  */
  const route = useRoute();
  const callerId = route.params?.id;
  const receiverId = route.params?.data.userId;

  const createRoom = async (callerId, receiverId) => {
    // Generate a unique room ID
    //  const roomId = firebase.database().ref().child('rooms').push().key;
    const roomId = firestore().collection('rooms').doc().id;
    // Create a new room with the caller and receiver IDs
    const roomData = {
      id: roomId,
      callerId: callerId,
      receiverId: receiverId,
      channel: roomId, // Use the room ID as the channel name
    };

    // Save the room data to Firebase
    /*await firebase
      .database()
      .ref('rooms/' + roomId)
      .set(roomData);
      */
    await firestore().collection('rooms').doc(roomId).set(roomData);

    console.log('Room created with ID: ', roomId);
    return roomId;
  };

  const [connectionData, setConnectionData] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      const roomId = await createRoom(callerId, receiverId);
      const data = await getRoomData(roomId);
      setConnectionData({
        appId: '895277d2da9d4a048655d1e43637017e',
        channel: data.channel,
        // token: data.token,
      });
    };

    fetchRoomData();
    console.log(callerId,receiverId)
    console.log(connectionData);
  }, []);

  const getRoomData = async roomId => {
    // Fetch room data from Firebase
    const doc = await firestore().collection('rooms').doc(roomId).get();
    console.log('Fetched room data:', doc.data());

    return doc.data();
  };

  return connectionData ? (
    <AgoraUIKit connectionData={connectionData} />
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default VideoCall;
