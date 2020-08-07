import React from 'react'; 
import { View, Text } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from '../screens/settings'; 
import {Header} from '../components/header';

const Stack = createStackNavigator()

const SettingsNavigator = (props) => {
    return (
      <Stack.Navigator initialRouteName='Settings' screenOptions={{
        headerTitle: () => <Header name="Settings" seprate={true} {...props} />
      }}>
        <Stack.Screen name='Settings' component={SettingsScreen} />
      </Stack.Navigator>
    );
}

export default SettingsNavigator;