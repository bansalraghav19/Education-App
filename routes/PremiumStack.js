import React from 'react'; 
import { View, Text } from 'react-native'; 
import { createStackNavigator } from '@react-navigation/stack';
import Premium from '../screens/buyPremium'; 
import {Header} from '../components/header';

const Stack = createStackNavigator()

const PremiumNavigator = (props) => {
    return (
      <Stack.Navigator initialRouteName='Premium' screenOptions={{
        headerTitle: () => <Header name="Buy Premium" seprate={true} {...props} />
      }}>
        <Stack.Screen name='Premium' component={Premium} />
      </Stack.Navigator>
    );
}

export default PremiumNavigator;