import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import About from '../screens/about'
import {Header} from '../components/header'
import Home from '../screens/home';
import Profile from '../screens/profile';

const Stack = createStackNavigator()

export default function ProfileNavigator({navigation}) {
  return (
      <Stack.Navigator initialRouteName='About' screenOptions={{
          headerTintColor: '#fff', 
          headerStyle: {
              backgroundColor: '#fff', 
          }, 
          headerTitleStyle: {
              fontWeight: 'bold', 
          }
      }}>
        <Stack.Screen name='Home' component={Home} options={{ 
          headerTitle: () => <Header navigation={navigation} color='1f65ff' />
        }}/>
        <Stack.Screen name='About' component={About} options={{ 
          headerTitle: () => <Header navigation={navigation} color='1f65ff' />
        }}/>
        <Stack.Screen name='Profile' component={Profile} options={{ 
          headerTitle: () => <Header navigation={navigation} color='1f65ff' />
        }}/>
      </Stack.Navigator>
  );
}