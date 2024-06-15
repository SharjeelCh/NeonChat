import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {height, width} from '../Componenets/dimension';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../Componenets/Loader';
export const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [id, setId] = useState('');
  const [loading, setloading] = useState(false);

  const navigation = useNavigation();
  const handleSearch = () => {
    // onSearch(searchText);
  };

  const handleClear = () => {
    setSearchText('');
    // onClear();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (searchText.trim() === '') {
        setSearchResult([]);
        return;
      }

      try {
        setloading(true);
        const currentUserId = await AsyncStorage.getItem('USERID');
        setId(currentUserId);
        console.log('Current User ID:', currentUserId);

        const snapshot = await firestore()
          .collection('users')
          .where('username', '>=', searchText.toLowerCase())
          .where('username', '<=', searchText.toLowerCase() + '\uf8ff')
          .get();

        const data = snapshot.docs
          .map(doc => doc.data())
          .filter(user => user.userId !== currentUserId);

        setSearchResult(data);
        console.log(snapshot.docs);
        if (snapshot.docs !== null) setloading(false);
      } catch (error) {}
    };

    fetchData();
  }, [searchText]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#07635D',
        paddingHorizontal: width / 40,
      }}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginTop: height / 90,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{marginLeft: width / 50}}>
            <Icon name="arrow-back-sharp" size={width / 13} color={'white'} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={'white'}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity
              onPress={handleClear}
              style={{marginRight: width / 30}}>
              <Icon name="close-sharp" size={width / 16} color={'white'} />
            </TouchableOpacity>
          ) : (
            <Pressable style={{marginRight: width / 30}}>
              <Icon name="close-sharp" size={width / 16} color={'#07635D'} />
            </Pressable>
          )}
          <TouchableOpacity
            onPress={handleSearch}
            style={{marginRight: width / 50}}>
            <Icon name="search" size={width / 13} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResult.length > 0 ? (
        <View style={{width: '100%', padding: width / 20}}>
          <Text style={{color: 'rgba(255,255,255,0.8)'}}>Chats</Text>
          {loading ? (
            <Loader size={width / 24} color={'white'}></Loader>
          ) : (
            <FlatList
              data={searchResult}
              renderItem={({item}) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      width: width,
                      height: height / 9.5,
                      alignItems: 'center',
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
                      <View
                        style={{
                          borderRadius: width / 3,
                          width: width / 7.5,
                          height: width / 7.5,
                        }}></View>
                    </ImageBackground>
                    <TouchableOpacity
                      style={{
                        marginLeft: width / 20,
                        marginRight: width / 20,
                        width: width / 1.4,
                        height: height / 13,
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        navigation.navigate('ChatScreen', {
                          data: item,
                          id: id,
                        });
                        setSearchResult('');
                        setSearchText('');
                      }}>
                      <Text
                        style={{
                          color: 'white',
                          fontFamily: 'Nunito-Bold',
                          fontSize: width / 18,
                        }}>
                        {item.username}
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'Nunito-Medium',
                          color: 'rgba(255,255,255,0.8)',
                        }}>
                        {item.aboutme}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={item => item.userId}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    // borderRadius: 10,
    //  borderBottomEndRadius:10,
    //  borderBottomLeftRadius:10,
    padding: 5,
  },
  input: {
    marginLeft: width / 20,
    marginRight: width / 20,
    width: width / 1.6,
    fontSize: height / 45,
    fontFamily: 'Nunito-Medium',
  },
  backButton: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  clearButton: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchButton: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default SearchBar;
