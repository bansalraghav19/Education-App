import React, {useState, useEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Picker, 
  ScrollView,
  AsyncStorage
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import {useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const EditProfileScreen = () => {

  const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
  const {colors} = useTheme();
  const [formData, setformData] = useState({}) 
  const [Name,SetName] = useState(formData.FullName)
  const isFocused = useIsFocused()
  const boards =  ['HP Board', 'CBSE']
  const classes = ['6', '7', '8', '9', '10']
  const [states,setStates] = useState([])

  useEffect(() => {
    const GetUser = async () => {
      var myHeaders = new Headers();
      const Token = await AsyncStorage.getItem('Token');
      myHeaders.append("authorization", "Bearer "+Token);
      fetch('https://education4all.herokuapp.com/showUser', {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      }).then((response) => {
        response.json().then((res) => {
          console.log(res.user)
          setformData(res.user)
          setImage("https://education4all.herokuapp.com/uploads/"+res.user.profilePic)
        })
      })
    }
    GetUser()
    fetch('https://raw.githubusercontent.com/bhanuc/indian-list/master/state-city.json').
      then((response) => {
        response.json().then((data) => {
          let v = []
          Object.keys(data).map((key) => {
            v.push(key)
          })
          setStates(v)
        })
      })
  }, [isFocused])

  const UpdateForm = async () => {

  }

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if(pickerResult.uri) {
      const Token = await AsyncStorage.getItem('Token')
        
      let localUri = pickerResult.uri;
      let filename = localUri.split('/').pop();
    
      let formData = new FormData();

      formData.append('sampleFile', { "uri": pickerResult.uri, "name": filename, type: 'image/jpg'});
      
      console.log(formData)

      fetch('https://education4all.herokuapp.com/uploadDP', {
        method: 'POST',
        headers: {
          "authorization": "Bearer " + Token,
          "content-type": 'multipart/form-data',
        },
        body: formData,
      }).then((res) => {
        (res).json().then((data) => {
          setImage(pickerResult.uri)
        }) 
      }).catch((e) => {
        console.log(e)
      });
    } 
  }

  return (
    <ScrollView>
      <View style={styles.container}>
      <BottomSheet
        snapPoints={[330, 0]}
        enabledGestureInteraction={true}
      />
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <TouchableOpacity
            onPress={openImagePickerAsync}
          >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri: image,
                }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            {formData.userName}
          </Text>
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
                marginTop: 0.1
              },
            ]}
            value={formData.userName}
            onChangeText={(e) => setformData({...formData, FullName: e})}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
                marginTop: 0.1
              },
            ]}
            value={formData.userName}
            onChangeText={(e) => setformData({...formData, email: e})}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome style={{marginTop: 15}} name="globe" color={colors.text} size={20} />
          <Picker
            selectedValue="Punjab"
            style={{ width: '100%' }}
          >
            {
              states.map((value, itemIndex) => {
                return <Picker.Item label={value} id={itemIndex} value={value}/>
              })
            }
          </Picker>
        </View>
        <View style={styles.action}>
          <Icon style={{marginTop: 15}} name="map-marker-outline" color={colors.text} size={20} />
          <Picker
            value={formData.State}
            style={{ width: '100%' }}
            // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </View>
        <View style={styles.action}>
          <Icon style={{marginTop: 15}} name="map-marker-outline" color={colors.text} size={20} />
          <Picker
            // selectedValue="java"
            style={{ width: '100%' }}
          >
            {
              boards.map((data, itemIndex) => {
                return <Picker.Item value={data} id={itemIndex} label={data}/>
              })
            }
          </Picker>
        </View>
        <View style={styles.action}>
          <Icon style={{marginTop: 15}} name="map-marker-outline" color={colors.text} size={20} />
          <Picker
            // selectedValue="java"
            style={{ width: '100%' }}
            // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            {
              classes.map((data, itemIndex) => {
                return <Picker.Item value={data} id={itemIndex} label={data}/>
              })
            }
          </Picker>
        </View>
        <TouchableOpacity style={styles.commandButton}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    alignContent: 'center', 
    justifyContent: 'flex-start', 
    marginBottom: 15, 
    marginTop: 10
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});