import {View, Text, FlatList, StatusBar, TouchableOpacity} from 'react-native';
import React from 'react';
import {height, width} from '../Componenets/dimension';
import Header from '../Componenets/Header';

const Home = () => {
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
        <FlatList
          data={'fdsgghjgjhghjgjgj'}
          renderItem={() => {
            return (
              <TouchableOpacity
                style={{
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
                <View style={{marginLeft: width / 20, marginRight: width / 20,width:width/1.4}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontFamily:'Nunito-Bold',fontSize:width/18,color:'black'}}>Sharjeel Fida</Text>
                    <Text style={{fontFamily:'Nunito-Medium',color:'grey'}}>2 min ago</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems:'center',
                      marginTop:height/220,
                    }}>
                    <Text style={{fontFamily:'Nunito-Medium',color:'grey'}}>hello how are you now</Text>
                    <View
                      style={{
                        width: width / 18,
                        height: width / 18,
                        backgroundColor: 'red',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: width / 7,
                        borderColor:'red'
                      }}>
                      <Text style={{color: 'white',fontFamily:'Nunito-Bold'}}>3</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'#07635D'}/>
      <Header title='Home'/>
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
