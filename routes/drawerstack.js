import React, { useState, useEffect, useMemo, useReducer } from "react";
import { View, AsyncStorage } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./tabnavigator";
import { DrawerContent } from "../components/drawercontents";
import MainStack from "../routes/mainStack";
import { ActivityIndicator, Colors } from "react-native-paper";
import { StyleSheet } from "react-native";
import { AuthContext } from "../Redux/redux";
import Profile from "../routes/MyProfileStack";
import Premium from "../routes/PremiumStack";
import Courses from "../routes/courseStack";
import Support from "../routes/CustomerStack";
import Video from '../screens/video'

const Drawer = createDrawerNavigator();

function DrawNavigator(props) {
  // const [isLoading,setisLoading] = useState(true);
  // const [userToken,setuserToken] = useState(null);

  const initialStates = {
    isLoading: true,
    number: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case "TOKEN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGIN":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "REGISTER":
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case "LOGOUT":
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialStates);

  const Auth = useMemo(
    () => ({
      Login: async (token) => {
        await AsyncStorage.setItem("Token", token);
        dispatch({ type: "LOGIN", token });
      },
      SignUp: async (token) => {
        await AsyncStorage.setItem("Token", token);
        dispatch({ type: "REGISTER", token });
      },
      Logout: async () => {
        await AsyncStorage.removeItem("Token");
        dispatch({ type: "LOGOUT" });
      },
    }),
    []
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      userToken = await AsyncStorage.getItem("Token");
      dispatch({ type: "TOKEN", token: userToken });
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          animating={true}
          color={Colors.red800}
          size="large"
        />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={Auth}>
      <NavigationContainer>
        {loginState.userToken === null ? (
          <MainStack />
        ) : (
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="Home" component={TabNavigator} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="Support" component={Support} />
            <Drawer.Screen name="Premium" component={Premium} />
            <Drawer.Screen name="Courses" component={Courses} />
            {/* <Drawer.Screen name="Video" component={Video} /> */}
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default DrawNavigator;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
