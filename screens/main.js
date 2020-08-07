import React from 'react'; 
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image, 
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const MainScreen = ({navigation}) => {
    const { colors } = useTheme();

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#383838' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
                source={require('../assets/logo.jpg')}
                style={styles.logo}
                resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>Education is must to all!</Text>
            <Text style={styles.text}>Sign in Today!</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
                <Button dark mode="contained" color="#383838" contentStyle={{ height: 44, width: 200, borderRadius: '50%' }}>
                    Register
                </Button>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default MainScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#383838'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
    resizeMode: 'cover'
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});