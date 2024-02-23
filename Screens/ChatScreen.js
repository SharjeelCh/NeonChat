import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const ChatScreen = () => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();

  const {data, id} = route.params;

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querysnapshot => {
        const allmessages = querysnapshot.docs.map(item => {
          return {...item._data, createdAt: item._data.createdAt, _id: item.id};
        });
        setMessageList(allmessages);
      });
    console.log(route.params);

    return () => subscriber();
  }, []);

  const onSend = useCallback(async (messages = []) => {
    const msg = messages[0];
    const myMsg = {
      _id: uuid.v4(),
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userId,
      createdAt: Date.parse(msg.createdAt),
    };

    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userId)
      .collection('messages')
      .add(myMsg);
    firestore()
      .collection('chats')
      .doc('' + route.params.data.userId + route.params.id)
      .collection('messages')
      .add(myMsg);

    console.log('msg: ', myMsg);
  }, []);

  const renderInputToolbar = props => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={styles.textInput}
          placeholder="Type your message..."
          placeholderTextColor="#616161"
        />
      </View>
    );
  };
  

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messageList}
        
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
        renderInputToolbar={renderInputToolbar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color:'black'
  },
});

export default ChatScreen;
