import React, { useContext, useEffect, useState } from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../Redux/redux';

export function DrawerContent(props) {
    const { Logout } = useContext(AuthContext);
    const [image, setImage] = useState('https://api.adorable.io/avatars/80/abott@adorable.png');
    const [formData, setformData] = useState({}) 

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
    }, [])
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Avatar.Image 
                                source = {{
                                    uri: image
                                }}
                                size = {50}
                            />
                            <View style={{marginLeft: 15}}>
                                <Title style={styles.title}>{formData.userName}</Title>
                                <Caption style={styles.caption}>{formData.phone}</Caption>
                            </View>
                        </View> 
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Courses"
                            onPress={() => {props.navigation.navigate('Courses')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="My Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-check-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {props.navigation.navigate('Support')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color= 'white'
                                size={size}
                                />
                            )}
                            style={{
                                backgroundColor: '#FF6347', 
                                color: '#ffffff'
                            }}
                            label="Buy Prenium"
                            labelStyle={{color: 'white'}}
                            onPress={() => {props.navigation.navigate('Premium')}}
                        />
                    </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    onPress={Logout}
                    icon = { ({color, size}) => (
                        <Icon 
                            name='exit-to-app'
                            color={color}
                            size={size}

                        />
                    )}
                    label = 'Sign Out'
                />
            </Drawer.Section>
        </View>
    )
} 

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    }
})