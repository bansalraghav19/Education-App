import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native'

export default function AboutUs({ navigation }) {

  return (
    <View style={styles.container}>
        <Text>About Screen</Text>
    </View>
  )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    }
})