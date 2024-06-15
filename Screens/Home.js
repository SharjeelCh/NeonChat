import {
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {height, width} from '../Componenets/dimension';
import Header from '../Componenets/Header';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Componenets/Loader';
const Home = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [id, setId] = useState('');
  const [loading, setloading] = useState(false);
  const [currenImage, setCurrentImage] = useState(null);
  useEffect(() => {
    getUsers();
    console.log(id);
  }, []);

  const getUsers = async () => {
    setloading(true);
    const userid = await AsyncStorage.getItem('USERID');
    /* await AsyncStorage.setItem('isloggedin', JSON.stringify(false));
    await AsyncStorage.setItem('NAME', JSON.stringify(''));
    await AsyncStorage.setItem('EMAIL', JSON.stringify(''));
    await AsyncStorage.setItem('USERID', JSON.stringify(''));
    */
    setId(userid);
    console.log(id);

    let tempdata = [];
    try {
      firestore()
        .collection('users')
        .where('userId', '!=', userid)
        .get()
        .then(res => {
          if (res.docs != []) {
            res.docs.map(doc => {
              tempdata.push(doc.data());
            });
            setUsers(tempdata);
          }
        });
      if (tempdata) {
        setTimeout(() => {
          setloading(false);
        }, 2000);
      }
    } catch (Error) {
      ToastAndroid.show('Check ur internet connection', 2000);
    }
  };
  const chatlist = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginTop: -height / 20,
          borderTopLeftRadius: width / 18,
          borderTopRightRadius: width / 18,
          paddingTop: height / 28,
        }}>
        {loading ? (
          <Loader size={width / 24} color={'black'}></Loader>
        ) : (
          <FlatList
            data={users}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    width: width,
                    height: height / 9.5,
                    alignItems: 'center',
                    marginLeft: width / 20,
                    marginRight: width / 20,
                  }}>
                  <ImageBackground
                    style={{
                      borderRadius: width / 3,
                      width: width / 7.5,
                      height: width / 7.5,
                    }}
                    source={
                      item.profileImage
                        ? {uri: item.profileImage}
                        : require('../assets/image.png')
                    }
                    borderRadius={500}
                    resizeMode="cover">
                    <TouchableOpacity
                      style={{
                        borderRadius: width / 3,
                        width: width / 7.5,
                        height: width / 7.5,
                      }}></TouchableOpacity>
                  </ImageBackground>
                  <TouchableOpacity
                    style={{
                      marginLeft: width / 20,
                      marginRight: width / 20,
                      width: width / 1.4,
                    }}
                    onPress={() => {
                      navigation.navigate('ChatScreen', {data: item, id: id});
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Nunito-Bold',
                          fontSize: width / 18,
                          color: 'black',
                        }}>
                        {item.username}
                      </Text>
                      <Text
                        style={{fontFamily: 'Nunito-Medium', color: 'grey'}}>
                        2 min ago
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: height / 220,
                      }}>
                      <Text
                        style={{fontFamily: 'Nunito-Medium', color: 'grey'}}>
                        hello how are you now
                      </Text>
                      <View
                        style={{
                          width: width / 18,
                          height: width / 18,
                          backgroundColor: 'red',
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: width / 7,
                          borderColor: 'red',
                        }}>
                        <Text
                          style={{color: 'white', fontFamily: 'Nunito-Bold'}}>
                          3
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </View>
    );
  };
  const hanfleprofile = () => {
    console.log('id home: ', id);
    navigation.navigate('Profile', {id: id});
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#07635D'} />
      <Header title="Home" gotoprofile={hanfleprofile} id={id} />
      <View
        style={{
          width: width,
          height: height / 16,
          backgroundColor: '#07635D',
        }}></View>
      {chatlist()}
    </View>
  );
};

export default Home;
