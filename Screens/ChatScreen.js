import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/Ionicons';
import {height, width} from '../Componenets/dimension';
import ChatHeader from '../Componenets/ChatHeader';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

const ChatScreen = () => {
  const [messageList, setMessageList] = useState([]);
  const route = useRoute();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const navigation=useNavigation();
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

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
      setLoading(false);
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

  const handleTextInputChange = text => {
    setInputText(text);
  };

  const handleSendCustomMessage = () => {
    if (inputText.trim() !== '') {
      const customMessage = {
        _id: uuid.v4(),
        text: inputText.trim(),
        createdAt: new Date(),
        user: {
          _id: route.params.id,
        },
      };
      onSend([customMessage]);
      setInputText('');
    }
  };

  const renderBubble = props => {
    return (
     
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: '#07635D',
              elevation: 1,
            },
            left: {
              backgroundColor: '#f9f9f9',
              elevation: 1,
            },
          }}
          textStyle={{
            right: {
              color: 'white',
              fontFamily: 'Nunito-Regular',
            },
            left: {
              color: 'black',
              fontFamily: 'Nunito-Regular',
            },
          }}
        />
    );
  };

  const handleaudioCall=()=>{
    navigation.navigate('AudioCall',{data:route.params.data, id:route.params.id});
  }
  const handlevideoCall=()=>{
    navigation.navigate('VideoCall',{data:route.params.data,id:route.params.id});
  }

  return (
    <View style={{flex: 1, marginBottom: height / 70}}>
      <ChatHeader name={route.params.data.username} onvideo={handlevideoCall} oncallpress={handleaudioCall}/>

      <GiftedChat
        messages={messageList}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={() => {
          return (
            <View style={styles.customInputContainer}>
              <View
                style={{
                  width: width / 1.2,
                  height: height / 16,
                  flexDirection: 'row',
                  backgroundColor: '#f9f9f9',
                  marginRight: width * 0.01,
                  borderRadius: width * 0.05,
                  elevation: 1,
                  alignItems: 'center',
                }}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Type your message..."
                  multiline={true}
                  numberOfLines={2}
                  value={inputText}
                  onChangeText={handleTextInputChange}
                  placeholderTextColor={'#07635D'}
                />
                <TouchableOpacity
                  style={{marginRight: width / 40}}
                  onPress={() => {}}>
                  <Icon name="camera-sharp" size={width / 15} color="grey" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendCustomMessage}>
                <Icon name="send-sharp" size={width / 18} color="#fff" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  customInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    // paddingVertical: height*0.01,
    position: 'relative',
  },
  textInput: {
    flex: 1,
    marginRight: width * 0.02,
    // paddingVertical: height*0.01,
    paddingHorizontal: width * 0.03,
    backgroundColor: '#f9f9f9',
    borderRadius: width * 0.05,
    color: 'black',
    fontFamily: 'Nunito-Regular',
  },
  sendButton: {
    padding: width * 0.03,
    backgroundColor: '#07635D',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
});

export default ChatScreen;
