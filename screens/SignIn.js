import React from 'react'; 
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useTheme, Button,ActivityIndicator, Colors } from 'react-native-paper';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../Redux/redux';

const SignIn = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const [BtnDisable, setBtnDisable] = React.useState(false)
    const { colors } = useTheme();

    const { Login } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if( val.trim().length == 10 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }
    const loginHandle = async (userName, password) => {
        setBtnDisable(true)
        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            setBtnDisable(false)
            return;
        }

        if(!data.isValidUser) {
            setBtnDisable(false)
            return;
        }

        let token = null;

        fetch('https://education4all.herokuapp.com/login', {
            "method": 'POST',
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                'phone': '+91'+data.username,
                'password': data.password
            })
        }).then((response) => {
            response.json().then((data)=> {
                token = data.token 
                if(data.token==null) {
                    Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                        {text: 'Okay'}
                    ]);
                    setBtnDisable(false)
                } else {
                    Login(data.token)
                }
            })
        }).catch((err)=> {
            setBtnDisable(false)
            console.log(err)
        });
    }

    return (
      <View style={styles.container}>
        {
           BtnDisable ? (
            <View style={styles.loading}>
                <ActivityIndicator animating={true} color={Colors.red800}  size="large" />
            </View>
           ) : null
        }
          <StatusBar backgroundColor='#383838' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Welcome User!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
        >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Mobile Number</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Mobile Number"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    keyboardType='phone-pad'
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Mobile Number must conatin 10 digits.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: '#383838', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    disabled={BtnDisable}
                    onPress={loginHandle}
                    style={[styles.signIn, {
                        borderColor: '#383838',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#383838'
                    }]}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={BtnDisable}
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#383838',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#383838'
                    }]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    loading: {
        position: 'absolute', 
        alignSelf: 'center', 
        top: '50%', 
        zIndex: 20
    },
    container: {
        flex: 1, 
        backgroundColor: '#383838',
        position: 'relative'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#383838',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#383838',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});