import React from 'react'; 
import { View, Text } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack';
import Prenium from '../screens/settings'; 
import {Header} from '../components/header';

const Stack = createStackNavigator()

const SettingsNavigator = (props) => {
    return (
      <Stack.Navigator initialRouteName='Prenium' screenOptions={{
        headerTitle: () => <Header name="Buy Prenium" seprate={true} {...props} />
      }}>
        <Stack.Screen name='Prenium' component={Prenium} />
      </Stack.Navigator>
    );
}

export default SettingsNavigator;