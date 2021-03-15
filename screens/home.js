import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, StatusBar } from "react-native";
// import Orientation from 'react-native-orientation';

export default function Home({ navigation }) {
  // Orientation?.lockToPortrait?.();

  // useEffect(()=>{
  //   const initial = Orientation.getInitialOrientation();
  //   if (initial === 'PORTRAIT') {
  //     // do something
  //   } else {
  //     // do something else
  //   }  },[])
  return (
    <View style={styles.container}>
      <Text>My Courses</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
