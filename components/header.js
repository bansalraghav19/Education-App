import React from 'react'
import { StyleSheet, View, Text, StatusBar } from 'react-native'
import Icons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Ionicons'

export function Header(props) { 
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <View style={styles.btn_back}>
                {
                    !props.seprate ? (
                        <Icons.Button color='#000000' name='ios-menu' style={styles.vc_icon} size={26} onPress={() => props.navigation.openDrawer()} />
                    ) : (
                        <Icon.Button color='#000000' name="ios-arrow-back" style={styles.vc_icon} size={26} onPress={() => props.navigation.goBack()}></Icon.Button>
                    )
                }
            </View>
            <View style={styles.HeaderText}>
                <Text style={styles.TitleText}>{props.name}</Text>
            </View>
        </View>
    )
}  

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center',
        display: 'flex',
    }, 
    TitleText: {
        fontWeight: 'bold', 
        color: '#000000', 
        fontSize: 20, 
        letterSpacing: 1
    }, 
    btn_back: {
        position: 'absolute', 
        left: '1%', 
        backgroundColor: '#fff'
    },
    vc_icon: {
        backgroundColor: '#fff',
    }
})