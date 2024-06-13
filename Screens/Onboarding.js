import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useRef, useState} from 'react';
import { useNavigation } from '@react-navigation/native';

const Onboarding = () => {
    const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const screenWidth = Dimensions.get('window').width; 

  const handlePress = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < 3) {
      flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
      setCurrentIndex(nextIndex);
    } else {
      navigation.reset({index:0,routes:[{name:'Login'}]})
    }
  };

  const renderPagination = () => {
    const dots = [];
    for (let i = 0; i < 3; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            {
              backgroundColor: currentIndex === i ? '#FF7A30' : '#e0e0e0',

              width: currentIndex === i ? 30 : 10,
            },
          ]}
        />,
      );
    }
    return <View style={styles.pagination}>{dots}</View>;
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar backgroundColor="white" barStyle='dark-content' />
      <FlatList
        ref={flatListRef}
        data={[
          {
            key: '1',
            image: require('../assets/img1.png'),
            description: 'Stay connected with your loved ones seamlessly',
          },
          {
            key: '2',
            image: require('../assets/img2.jpg'),
            description: 'Enjoy real-time messaging with instant notifications',
          },
          {
            key: '3',
            image: require('../assets/img3.jpg'),
            description: "Experience secure and private conversations with Neon Chat!",
          },
        ]}
        renderItem={({item, index}) => (
          <View style={{width: screenWidth, backgroundColor: 'white'}}>
            <Image
              source={item.image}
              style={{width: '100%', height: '70%', resizeMode: 'contain'}}
            />
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                marginTop: 10,
                alignSelf: 'center',
                paddingHorizontal: 20,
                color: 'black',
                textAlign: 'center',
                fontFamily: 'Nunito-Bold',

              }}>
              {item.description}
            </Text>
          </View>
        )}
        horizontal
        pagingEnabled
        keyExtractor={item => item.key}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        onMomentumScrollEnd={e => {
          const newIndex = Math.round(
            e.nativeEvent.contentOffset.x / screenWidth,
          );
          setCurrentIndex(newIndex);
        }}
      />
      {renderPagination()}
      <TouchableOpacity
        onPress={handlePress}
        style={{
          backgroundColor: '#07635D',
          padding: 10,
          borderRadius: 50,
          marginHorizontal: 20,
          alignItems: 'center',
          marginBottom: 40,
        }}>
        <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold',fontFamily: 'Nunito-Bold',}}>
          {currentIndex === 2 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});

export default Onboarding;
