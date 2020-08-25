import React, { useEffect, useRef, useState } from 'react'; 
import { useIsFocused } from '@react-navigation/native';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity } 
from 'react-native'; 
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

function Settings(){
    return (
            <Animatable.View 
                animation="swing"
                style={styles.container}
            >
                <View style={styles.header}>
                    <View style={styles.title}>
                        <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold'}}>PREMIUM</Text>
                    </View>
                    <View style={styles.subtitle}>
                        <Text style={{ color: '#fff', fontWeight: 'bold'}}>Buy Prenium and get latest benefits</Text>
                    </View>
                </View>
                <View style={styles.body}>
                    <View style={styles.price}>
                        <Text style={{ color: '#FF6347', fontWeight: 'bold', marginBottom: 10, marginRight: '2%' , fontSize: 20, alignSelf: 'flex-end'}}>Rs</Text>
                        <Text style={{color: '#FF6347', fontWeight: 'bold', fontSize: 50}}>2500/-</Text>
                    </View>
                    <View style={styles.benefits, {marginBottom: '20%', marginTop: '10%'}}>
                        <View style={styles.benefits_item}>
                            <AntDesign name="check" size={24} color="black" style={{color: '#FF6347', marginRight: '8%'}} />
                            <Text style={{ color: '#fff', letterSpacing: 4}}>Unlimited Watch</Text>
                        </View>
                        <View style={styles.benefits_item}>
                            <AntDesign name="check" size={24} color="black" style={{color: '#FF6347', marginRight: '8%'}} />
                            <Text style={{ color: '#fff', letterSpacing: 4}}>Online Doubt Clearing</Text>
                        </View>
                        <View style={styles.benefits_item}>
                            <AntDesign name="check" size={24} color="black" style={{color: '#FF6347', marginRight: '8%'}} />
                            <Text style={{ color: '#fff', letterSpacing: 4}}>A</Text>
                        </View>
                        <View style={styles.benefits_item}>
                            <AntDesign name="check" size={24} color="black" style={{color: '#FF6347', marginRight: '8%'}} />
                            <Text style={{ color: '#fff', letterSpacing: 4}}>B</Text>
                        </View>
                        <View style={styles.benefits_item}>
                            <AntDesign name="check" size={24} color="black" style={{color: '#FF6347', marginRight: '8%'}} />
                            <Text style={{ color: '#fff', letterSpacing: 4}}>C</Text>
                        </View>
                        <View style={styles.benefits_item}>
                            <AntDesign name="check" size={24} color="black" style={{color: '#FF6347', marginRight: '8%'}} />
                            <Text style={{ color: '#fff', letterSpacing: 4}}>D</Text>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.commandButton}>
                            <Text style={styles.panelButtonTitle}>GET PRENIUM</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 20,
        display: 'flex', 
        backgroundColor: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(167,167,247,1) 35%, rgba(0,212,255,1) 100%)', 
        padding: 40, 
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    }, 
    header: {
        flex: 1, 
        alignItems: 'center'
    },
    body: {
        flex: 5, 
        alignItems: 'center'
    },
    price: {
        flexDirection: 'row',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    benefits: {
        marginTop: '10%'
    },
    benefits_item: {
        flexDirection: 'row', 
        marginBottom: '10%'
    },  
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default Settings;