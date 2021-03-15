import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Chapters from "../screens/chapters";
import Video from "../screens/video";

import { Header } from "../components/header";

const Stack = createStackNavigator();

const CourseNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Chapters">
      <Stack.Screen
        name="Chapters"
        component={Chapters}
        options={{
          headerTitle: () => <Header navigation={navigation} />,
        }}
      />
      <Stack.Screen name="Video" component={Video} />
    </Stack.Navigator>
  );
};

export default CourseNavigator;
