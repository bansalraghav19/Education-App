import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeNavigator from './homestack'
import AboutNavigator from './aboutstack'
import ProfileNavigator from './MyProfileStack';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      shifting = {true}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'My Courses',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color='#000000' size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutNavigator}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="bell" color='#000000' size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#fff',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color='#000000' size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}