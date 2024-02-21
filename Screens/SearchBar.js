import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {height, width} from '../Componenets/dimension';
import {useNavigation} from '@react-navigation/native';
export const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const handleSearch = () => {
    // onSearch(searchText);
  };

  const handleClear = () => {
    setSearchText('');
    // onClear();
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#07635D',
    // borderRadius: 10,
    //  borderBottomEndRadius:10,
    //  borderBottomLeftRadius:10,
    padding: 5,
    height: '100%',
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
