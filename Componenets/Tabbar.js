import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ColorfulTabBar} from 'react-navigation-tabbar-collection';
import Home from '../Screens/Home';
import ChatScreen from '../Screens/ChatScreen';
import Settings from '../Screens/Settings';
import Profile from '../Screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Call from '../Screens/Call';

export const Tabbar = () => {
  const stack = createBottomTabNavigator();
  return (
    <stack.Navigator
      tabBar={props => <ColorfulTabBar {...props} />} 
      screenOptions={{headerShown: false}}
        
      >
        
      <stack.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbubbles-sharp" size={size} color={color} />
          ),
        }}
      />
      <stack.Screen
        name="Calls"
        component={Call}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="call" size={size} color={color} />
          ),
        }}
      />
      <stack.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
        }}
      />
     
    </stack.Navigator>
  );
};
