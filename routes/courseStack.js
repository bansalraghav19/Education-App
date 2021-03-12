import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Chapters from "../screens/chapters";
import Video from "../screens/video";

import { Header } from "../components/header";

const Stack = createStackNavigator();

const CourseNavigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Chapters"
      // screenOptions={{
      //   headerTitle: () => {
      //     return <Header />;
      //   },
      // }}
    >
      <Stack.Screen name="Chapters" component={Chapters} />
      <Stack.Screen name="Video" component={Video} />
    </Stack.Navigator>
  );
};

export default CourseNavigator;
