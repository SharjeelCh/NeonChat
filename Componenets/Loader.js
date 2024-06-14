import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Loader = ({size, color}) => {
  return (
    <View>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({});
