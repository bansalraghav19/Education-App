import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from "../screens/home";
import Profile from '../screens/profile'
import {Header} from '../components/header'

const Stack = createStackNavigator()

export default function HomeNavigator({navigation}) {
  return (
      <Stack.Navigator initialRouteName='Home' screenOptions={{
        headerTitle: () => <Header navigation={navigation} name="G33kChef" seprate={false} color='009387'/>
      }}>
        <Stack.Screen name='Home' component={Home}/>
      </Stack.Navigator>
  );
}