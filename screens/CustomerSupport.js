import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper';

function Support() {
    const [text, setText] = React.useState('');
    return (
        <View style={styles.container}>
            <TextInput
                label="Email"
                value={text}
                style={styles.seprate}
                onChangeText={text => setText(text)}
            />
            <TextInput
                label="Subject"
                value={text}
                style={styles.seprate}
            />
            <TextInput 
                style={styles.seprate}
                numberOfLines={10}
                multiline={true}
                label="Issue Faced"
            />
            <Button mode="contained" onPress={() => console.log('Pressed')}>
                Submit
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        padding: 20
    }, 
    seprate: {
        marginBottom: 20
    }
})

export default Support;