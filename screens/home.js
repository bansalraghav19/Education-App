import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, StatusBar } from 'react-native'

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
        <Text>My Courses</Text>
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