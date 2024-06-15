import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  Image,
  Platform,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  Modal,
  ToastAndroid,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import {height, width} from '../Componenets/dimension';
import {Fumi, Jiro, Sae} from 'react-native-textinput-effects';
import Simpleheader from '../Componenets/Simpleheader';
import {launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {
  AboutMe,
  updateEmailName,
  updateUserName,
} from '../Componenets/ProfileUpdateFuncs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [imageUri, setImageUri] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [tick, showTick] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const route = useRoute();
  const [isFocused, setIsFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempname, setTempname] = useState('');
  const [tempemail, setTempemail] = useState('');
  const [tempabout, setTempabout] = useState('i am availible');
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isAboutFocused, setIsAboutFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [showactivity, setactivity] = useState(false);
  const navigation = useNavigation();

  const handleLogOut = async () => {
    setactivity(true);
    await AsyncStorage.setItem('NAME', '');
    await AsyncStorage.setItem('EMAIL', '');
    await AsyncStorage.setItem('USERID', '');
    await AsyncStorage.setItem('isloggedin', JSON.stringify(false));

    setTimeout(() => {
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
      setactivity(false);
    }, 1000);
  };

  const handleLongPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const handlenewname = newname => {
    setTempname(newname);
  };
  const handlenewnameFunc = () => {
    updateUserName(route.params?.id, tempname);
  };

  const handlenewabout = newabout => {
    setTempabout(newabout);
  };
  const handlenewaboutFunc = () => {
    AboutMe(route.params?.id, tempabout);
  };

  const handlenewemail = newemail => {
    setTempemail(newemail);
  };
  const handlenewemailFunc = () => {
    updateEmailName(route.params?.id, tempemail);
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await request(PERMISSIONS.ANDROID.CAMERA);
      return result === RESULTS.GRANTED;
    } else if (Platform.OS === 'ios') {
      const result = await request(PERMISSIONS.IOS.CAMERA);
      return result === RESULTS.GRANTED;
    }
    return false;
  };

  const handleChoosePhoto = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      Alert.alert('Error', 'Camera permission is required to take photos');
      return;
    }

    try {
      const result = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
        quality: 0.5,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.errorCode) {
        console.log('ImagePicker Error: ', result.errorMessage);
        Alert.alert('Error', result.errorMessage);
      } else if (result.assets && result.assets.length > 0) {
        console.log(result.assets);
        const uri = result.assets[0].uri;
        if (uri) {
          console.log(uri);
          setImageUri(uri);
          setCurrentImage(uri);
          showTick(true);
        }
      }
    } catch (error) {
      console.log('Error launching camera: ', error);
      Alert.alert('Error', 'Failed to launch camera');
    }
  };

  useEffect(() => {
    getProfileImage();
  }, []);

  const uploadImageToFirebase = async uri => {
    if (!uri) return null;

    const fileName = `${uuid.v4()}.jpg`;
    const reference = storage().ref(fileName);
    const task = reference.putFile(uri);

    try {
      await task;
      const url = await reference.getDownloadURL();
      return url;
    } catch (error) {
      console.error('Error uploading image: ', error);
      return null;
    }
  };

  const handleSavePhoto = async () => {
    const imageUrl = await uploadImageToFirebase(imageUri);

    if (imageUrl) {
      firestore()
        .collection('users')
        .doc(route.params?.id)
        .update({
          profileImage: imageUrl,
        })
        .then(() => {
          showTick(false);
          ToastAndroid.show('Profile Image Updated', ToastAndroid.SHORT);
          getProfileImage();
        })
        .catch(error => {
          console.error('Error saving data: ', error);
        });
    } else {
      Alert.alert('Error', 'Failed to upload image');
    }
  };
  const getProfileImage = () => {
    firestore()
      .collection('users')
      .where('userId', '==', route.params?.id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setCurrentImage(doc.data().profileImage);
          setUsername(doc.data().username);
          setEmail(doc.data().email);
        });
      })
      .catch(error => {
        console.error('Error saving data: ', error);
      });
  };

  const info = (
    label,
    value,
    icon,
    icondefault,
    handle,
    update,
    setIsFocused,
    isFocused,
  ) => {
    return (
      <View
        style={{
          width: '100%',
          height: height / 12,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Icon
          name={icon}
          size={width / 16.5}
          color={'#07635D'}
          style={{marginRight: width / 30, marginTop: height / 37}}
        />
        <Sae
          label={label}
          labelStyle={{
            color: !isFocused ? 'rgba(255, 255, 255, 0)' : 'grey',
            fontFamily: 'Nunito-Regular',
          }}
          iconClass={FontAwesome}
          style={{width: width / 1.2}}
          placeholder={value}
          iconName={icondefault}
          iconColor={'#07635D'}
          placeholderTextColor={'black'}
          inputPadding={16}
          labelHeight={24}
          borderHeight={0.3}
          onChangeText={text => {
            handle(text);
          }}
          inputStyle={{
            color: 'black',
            fontFamily: 'Nunito-SemiBold',
          }}
          autoCapitalize={'none'}
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={update}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      <Simpleheader text="Profile" />
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'rgba(255, 255, 255, 0.95)'}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginBottom: height / 30,
        }}>
        <TouchableWithoutFeedback
          onLongPress={handleLongPress}
          onPress={handleLongPress}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View
              style={{
                width: width / 2.1,
                height: width / 2.1,
                borderRadius: width,
                marginTop: height / 40,
                elevation: 1,
              }}>
              <Image
                source={
                  currentImage
                    ? {uri: currentImage}
                    : require('../assets/image.png')
                }
                resizeMode="cover"
                style={{
                  width: width / 2.1,
                  height: width / 2.1,
                  borderRadius: width / 3,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => {}}>
          <TouchableWithoutFeedback onPress={closeModal}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.88)',
              }}>
              <Image
                source={{uri: currentImage}}
                resizeMode="contain"
                style={{width: width, height: height}}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {tick && (
          <TouchableOpacity
            style={{
              backgroundColor: '#07635D',
              elevation: 2,
              width: width / 7,
              height: width / 7,
              borderRadius: width / 3,
              position: 'absolute',
              left: width / 3.4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleSavePhoto}>
            <Icon name="checkmark" size={width / 15} color="white" />
          </TouchableOpacity>
        )}
        {!tick && (
          <TouchableOpacity
            style={{
              backgroundColor: '#07635D',
              elevation: 2,
              width: width / 7,
              height: width / 7,
              borderRadius: width / 3,
              position: 'absolute',
              left: width / 3.1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handleChoosePhoto}>
            <Icon name="camera" size={width / 15} color="white" />
          </TouchableOpacity>
        )}
      </View>
      {info(
        'Username',
        username,
        'person',
        'pencil',
        handlenewname,
        handlenewnameFunc,
        setIsUsernameFocused,
        isUsernameFocused,
      )}
      {info(
        'About',
        tempabout,
        'information-circle',
        'pencil',
        handlenewabout,
        handlenewaboutFunc,
        setIsAboutFocused,
        isAboutFocused,
      )}
      {info(
        'Email',
        email,
        'mail',
        'pencil',
        handlenewemail,
        handlenewemailFunc,
        setIsEmailFocused,
        isEmailFocused,
      )}
      {!showactivity ? (
        <TouchableOpacity
          style={{
            backgroundColor: '#07635D',
            width: width / 2.3,
            height: height / 17,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: height / 55,
            marginTop: height / 3.7,
          }}
          onPress={handleLogOut}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Nunito-SemiBold',
              fontSize: height / 42,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator
          size={height / 28}
          color={'orange'}
          style={{marginTop: height / 3.7}}
        />
      )}
    </View>
  );
};

export default Profile;
