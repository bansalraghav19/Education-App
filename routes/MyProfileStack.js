import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from "../screens/home";
import MyProfile from '../screens/profile';
import {Header} from '../components/header';

const Stack = createStackNavigator()

function ProfileNavigator(props) {
  return (
      <Stack.Navigator initialRouteName='Profile' screenOptions={{
        headerTitle: () => <Header name="My Profile" seprate={true} {...props} />
      }}>
        <Stack.Screen name='Profile' component={MyProfile} />
      </Stack.Navigator>
  );
}

export default ProfileNavigator;