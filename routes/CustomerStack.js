import React from 'react'; 
import { View, Text } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack';
import {Header} from '../components/header';
import Customer from '../screens/CustomerSupport';

const Stack = createStackNavigator()

const CustomerNavigator = (props) => {
    return (
      <Stack.Navigator initialRouteName="Support" screenOptions={{
        headerTitle: () => <Header name="Help Center" seprate={true} {...props} />
      }}>
        <Stack.Screen name="Support" component={Customer} />
      </Stack.Navigator>
    );
}

export default CustomerNavigator;