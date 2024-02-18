
import { View, Text } from 'react-native'
import React from 'react'
import Navigation from './Screens/Navigation'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (
    <NavigationContainer>
    <Navigation/>
    </NavigationContainer>
  )
}

export default App