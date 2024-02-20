
import { View, Text } from 'react-native'
import React from 'react'
import Navigation from './Screens/Navigation'
import { NavigationContainer } from '@react-navigation/native'
import { UserProvider } from './Screens/UserProvider'

const App = () => {
  return (
    <UserProvider>
    <NavigationContainer>
    <Navigation/>
    </NavigationContainer>
    </UserProvider>
  )
}

export default App