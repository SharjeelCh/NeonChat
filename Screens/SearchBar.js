import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {height, width} from '../Componenets/dimension';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
export const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);
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

      const snapshot = await firestore()
        .collection('users')
        .where('username', '>=', searchText.toLowerCase())
        .where('username', '<=', searchText.toLowerCase() + '\uf8ff')
        .get();

      const data = snapshot.docs.map(doc => doc.data());
      setSearchResult(data);
    };
    console.log(searchResult);

    fetchData();
  }, [searchText]);

  return (
    <View style={{flex: 1, backgroundColor: '#07635D'}}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: height / 90,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{marginLeft: width / 50}}>
            <Icon name="arrow-back-sharp" size={width / 17} color={'white'} />
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
              <Icon name="close-sharp" size={width / 20} color={'white'} />
            </TouchableOpacity>
          ) : (
            <Pressable style={{marginRight: width / 30}}>
              <Icon name="close-sharp" size={width / 20} color={'#07635D'} />
            </Pressable>
          )}
          <TouchableOpacity
            onPress={handleSearch}
            style={{marginRight: width / 50}}>
            <Icon name="search" size={width / 17} color={'white'} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResult.length > 0 && (
        <View>
          <Text>Chats</Text>
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
                    marginLeft: width / 20,
                    marginRight: width / 20,
                  }}>
                  <View
                    style={{
                      borderRadius: width / 3,
                      width: width / 7.5,
                      height: width / 7.5,
                      borderWidth: 0.2,
                      borderColor: 'black',
                    }}></View>
                  <View
                    style={{
                      marginLeft: width / 20,
                      marginRight: width / 20,
                      width: width / 1.4,
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'Nunito-Bold',
                        fontSize: width / 18,
                      }}>
                      {item.username}
                    </Text>
                    <Text style={{fontFamily: 'Nunito-Medium', color: 'grey'}}>
                      {item.aboutme}
                    </Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={item => item.username}
          />
        </View>
      )}
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
