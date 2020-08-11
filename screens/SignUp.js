import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar, 
    Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { AuthContext } from '../Redux/redux';
import { useTheme,ActivityIndicator, Colors} from 'react-native-paper'
import { cos } from 'react-native-reanimated';
import SignIn from './SignIn';

const SignUp = ({navigation}) => {

    const [data, setData] = React.useState({
        Fullname: '',
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: true,
        secureTextEntry: true,
        isValidName: true,
        isValidPassword: true,
        ConfirmSame: true,
        confirm_secureTextEntry: true,
        otp: '',
        confirmSubmit: true,
    });

    let otpresponse;
    const [BtnDisable, setBtnDisable] = React.useState(false)
    const {SignUp} = React.useContext(AuthContext)

    const textInputChange = (val) => {
        if( val.length == 10 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const textNameHandler = (val) => {
        if(val.trim().length==0) {
            setData({
                ...data,
                Fullname: val,
                isValidName: false
            });
        } else {
            setData({
                ...data,
                Fullname: val,
                isValidName: true
            })
        }
    }

    const handlePasswordChange = (val) => {
        if(val.length>=8) {
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

    const handleConfirmPasswordChange = (val) => {
        if(val!=data.password) {
            setData({
                ...data,
                confirm_password: val,
                ConfirmSame: false
            });
        } else {
            setData({
                ...data,
                confirm_password: val,
                ConfirmSame: true
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }

    const CreateHandler = () => {
        let token = null;
        return new Promise((resolve, reject) => {
            fetch('https://education4all.herokuapp.com/register', {
                "method": 'POST',
                "headers": {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                "body": JSON.stringify({
                    'userName': data.Fullname,
                    'phone': '+91'+data.username,
                    'password': data.password
                })
            }).then( (res) => {
                res.json().then((response) => {
                    console.log(response)
                    token = response.token
                    if(response.token) {
                        SignUp(token)
                    } else {
                        setBtnDisable(false)
                        setData({
                            ...data,
                            confirmSubmit: true
                        })
                        Alert.alert('Mobile Number Already exits');
                    }
                    resolve(response)
                })
            })
        })
    }

    const SubmitHandle = async () => {
        setBtnDisable(true)
        fetch('https://education4all.herokuapp.com/otpVerify', {
            "method": 'POST',
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                "userCode": data.otp,
                "to": "+91" + data.username
            })
        }).then( (res) => {
            res.json().then(async (response) => {
                if(response.message!="Wrong OTP") {
                    console.log(response)
                    await CreateHandler()
                } else {
                    console.log(response)
                    await CreateHandler()
                    // Alert.alert('Wrong OTP Entered, Try Again');
                    setBtnDisable(false)
                }
            })
        }).catch( (err) => {
            Alert.alert('Wrong OTP Entered, Try Again');
            setBtnDisable(false);
        })
    }

    const RegisterHandler = () => {
        setBtnDisable(true)
        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            setBtnDisable(false)
            return;
        }

        if(!data.isValidName || !data.isValidPassword || !data.ConfirmSame || !data.check_textInputChange) {
            setBtnDisable(false)
            return;
        }

        let token = null;

        setData({
            ...data, 
            confirmSubmit: false
        })

        setBtnDisable(false)

        fetch('https://education4all.herokuapp.com/sendSMS', {
            "method": 'POST',
            "headers": {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            "body": JSON.stringify({
                "to": "+91" + data.username
            })
        }).then((response) => {
            response.json().then((res)=> {
                console.log(res)
                setData({
                    ...data,
                    confirmSubmit: false
                })
            })
        }).catch((err)=> {
            setBtnDisable(false)
            Alert.alert('There was a Problem, Try Again');
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
        {
            (data.confirmSubmit) ? (
                <React.Fragment>
                    <View style={styles.header}>
                        <Text style={styles.text_header}>Sign Up!</Text>
                    </View>
                    <Animatable.View 
                        animation="fadeInUpBig"
                        style={styles.footer}
                    >
                        <ScrollView>
                        <Text style={styles.text_footer}>Full Name</Text>
                        <View style={styles.action}>
                            <FontAwesome 
                                name="user-o"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                placeholder="Full Name"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => textNameHandler(val)}
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
                        { data.isValidName ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.error}>Name cannot be empty</Text>
                        </Animatable.View>
                        }
                        <Text style={styles.text_footer,{marginTop: 35}}>Mobile Number</Text>
                        <View style={styles.action}>
                            <FontAwesome 
                                name="user-o"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                keyboardType='number-pad'
                                placeholder="Mobile Number"
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => textInputChange(val)}
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
                        { data.check_textInputChange ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.error}>Mobile Number must conatin 10 digits.</Text>
                        </Animatable.View>
                        }
                        <Text style={[styles.text_footer, {
                            marginTop: 35
                        }]}>Password</Text>
                        <View style={styles.action}>
                            <Feather 
                                name="lock"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                placeholder="Password"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                style={styles.textInput}
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
                        <Text style={styles.error}>Password must be 8 characters long.</Text>
                        </Animatable.View>
                        }
                        <Text style={[styles.text_footer, {
                            marginTop: 35
                        }]}>Confirm Password</Text>
                        <View style={styles.action}>
                            <Feather 
                                name="lock"
                                color="#05375a"
                                size={20}
                            />
                            <TextInput 
                                placeholder="Confirm Your Password"
                                secureTextEntry={data.confirm_secureTextEntry ? true : false}
                                style={styles.textInput}
                                autoCapitalize="none"
                                onChangeText={(val) => handleConfirmPasswordChange(val)}
                            />
                            <TouchableOpacity
                                onPress={updateConfirmSecureTextEntry}
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
                        { data.ConfirmSame ? null : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.error}>Password and Confirm password don't match.</Text>
                        </Animatable.View>
                        }
                        <View style={styles.textPrivate}>
                            <Text style={styles.color_textPrivate}>
                                By signing up you agree to our
                            </Text>
                            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                            <Text style={styles.color_textPrivate}>{" "}and</Text>
                            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
                        </View>
                        <View style={styles.button}>
                        <TouchableOpacity
                                onPress={RegisterHandler}
                                style={[styles.signIn, {
                                    borderColor: '#383838',
                                    borderWidth: 1,
                                    marginTop: 15
                                }]}
                                disabled={BtnDisable}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#383838'
                                }]}>Sign Up</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={[styles.signIn, {
                                    borderColor: '#383838',
                                    borderWidth: 1,
                                    marginTop: 15
                                }]}
                                disabled={BtnDisable}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#383838'
                                }]}>Sign In</Text>
                            </TouchableOpacity>
                        </View>
                        </ScrollView>
                    </Animatable.View>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <View style={styles.header}>
                        <Text style={styles.text_header}>Verify OTP!</Text>
                    </View>
                    <Animatable.View 
                        animation="fadeInUpBig"
                        style={styles.footer}
                    >
                        <ScrollView>
                            <View style={styles.action}>
                                <FontAwesome 
                                    name="lock"
                                    color="#05375a"
                                    size={20}
                                />
                                <TextInput 
                                    placeholder="One time Password"
                                    style={styles.textInput}
                                    autoCapitalize="none"
                                    onChangeText={(val) => setData({...data, otp: val})}
                                    keyboardType='number-pad'
                                />
                            </View>
                            <View style={styles.button}>
                            <TouchableOpacity
                                onPress={SubmitHandle}
                                style={[styles.signIn, {
                                    borderColor: '#383838',
                                    borderWidth: 1,
                                    marginTop: 15
                                }]}
                                disabled={BtnDisable}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#383838'
                                }]}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                        </ScrollView>
                    </Animatable.View>
                </React.Fragment>
            )
        }
      </View>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    loading: {
        position: 'absolute', 
        alignSelf: 'center', 
        top: '50%', 
        zIndex: 20
    },
    container: {
      flex: 1, 
      backgroundColor: '#383838'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
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
        color: '#383838',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#383838',
    },
    error: {
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
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });