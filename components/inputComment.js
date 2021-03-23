import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View, TouchableOpacity
} from 'react-native';

export default function App({onSubmit }) {
const [text, setText] = useState({text:undefined})

  onChangeText = (text) => setText({ text });

  submit = () => {
    if (text.text) {
      onSubmit(text.text);
      setText({ text: undefined }); 
    } else {
      alert('Please enter your comment first');
    }
  };

    return (

      <KeyboardAvoidingView
        behavior='position'
      >
        <View style={styles.container}>
          <TextInput
            placeholder="Add a comment..."
            keyboardType="twitter" // keyboard with no return button
            autoFocus={true} // focus and show the keyboard
            style={styles.input}
            value={text.text}
            onChangeText={onChangeText} // handle input changes
          />
          <TouchableOpacity
            style={styles.button}
            onPress={submit}
          >
            <Text style={[styles.text, !text ? styles.inactive : []]}>Post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    color: '#CCC',
  },
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
    // fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 15,
  },
});