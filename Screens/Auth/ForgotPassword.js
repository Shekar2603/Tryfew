import { StyleSheet, Text, View , TouchableOpacity , TextInput ,Image , ScrollView , ActivityIndicator , ToastAndroid} from 'react-native'
import React, { useEffect, useState } from 'react';
import ImagesThemes from '../../utils/ImagesTheme';
import { ColorsTheme } from '../../utils/ColorsTheme';
import EyeSlash from '../../assets/svgs/eye-slash.svg';
import EyeOpen from '../../assets/svgs/eye-open.svg';
import ChevronLeft from '../../assets/svgs/orange-left-chevron.svg';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";

export default function ForgotPassword() {

    const navigation = useNavigation();

    // const [otpInput , setOtpInput] = useState(false);
    const [emailInput , setEmailInput] = useState('');
    const [otpValue , setOtpValue] = useState('');
    const [newPasswordValue , setNewPasswordValue] = useState('')
    const [passwordChange , setPasswordChange] = useState(false);
    const [loaderVisible , setLoaderVisible] = useState(false);
    const [eyeActive , setEyeActive] = useState(false);


    useEffect(() => {
        navigation.addListener('focus', () => {
            setPasswordChange(false)
        });
    }, [navigation])

    const emailChecker = () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailInput || !emailRegex.test(emailInput)) {
            ToastAndroid.show('Invalid Email Address', ToastAndroid.LONG);
        } else {
            sendOtp();
        }
    }

    const apiUrl = 'https://www.tryfew.in/try-few-v1/public/'

    
    const sendOtp = async() => {
         
        const formData = new FormData()
        formData.append('email' , emailInput);
    
        console.log(formData)
        setLoaderVisible(true)

        try {
            await fetch(`${apiUrl}api/captain/forgot-password`, {
                method: 'post',  
                body: formData,
            })
            .then((response) => response.json())
            .then(response => {
                console.log(response)
                if (response?.success == true) {
                    setPasswordChange(true)
                    setLoaderVisible(false);
                    ToastAndroid.show('OTP Has been sent to your mail' , ToastAndroid.LONG);
                }else if (response?.success == false || response?.message == "Your TryFew account does not exist. Please register."){
                    setLoaderVisible(false);
                    ToastAndroid.show('Account does not exists' , ToastAndroid.LONG);
                }
            })  
            .catch((error) => {
                setLoaderVisible(false)
                ToastAndroid.show('Please Check Your Internet or Connect to 5G' , ToastAndroid.LONG);
                console.error(error, "error");
                throw Error(error);
            });
    
        } catch (error) {
        console.log(error , 'errors')
        }
    
    };



    const handleChangPassword = async() => {
        const formData = new FormData()
        formData.append('email' , emailInput);
        formData.append('otp' , otpValue);
        formData.append('new_password' , newPasswordValue);

        console.log(formData)
        setLoaderVisible(true)

        try {
            await fetch(`${apiUrl}api/captain/change-password`, {
                method: 'post',  
                body: formData,
            })
            .then((response) => response.json())
            .then(response => {
                console.log(response)
                if (response?.success == true || response?.message == "Password changed successfully.") {
                    setLoaderVisible(false);
                    ToastAndroid.show('Password Changed Successfully' , ToastAndroid.LONG);
                    navigation.navigate('Login')                }
                else if (response?.success == false || response?.message == "Invalid OTP. Please try again."){
                    setLoaderVisible(false);
                    ToastAndroid.show('Invalid OTP , Enter Again' , ToastAndroid.LONG);
                }
            })  
            .catch((error) => {
                setLoaderVisible(false)
                ToastAndroid.show('Please Check Your Internet or Connect to 5G' , ToastAndroid.LONG);
                console.error(error, "error");
                throw Error(error);
            });
    
        } catch (error) {
        console.log(error , 'errors')
        } 
    }

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1,
            // justifyContent: "center",
            position: "relative",
            backgroundColor: ColorsTheme.White
        },
        TopLogo: {
            paddingHorizontal: 15,
            paddingTop: 15,
            flexDirection:"row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        backText: {
            fontFamily: 'Manrope-Bold',
            color: ColorsTheme.Black,
            fontSize: 14
        },
        loginBack: {
            backgroundColor: ColorsTheme.White,
            borderRadius: 20,
            elevation: 8,
            flexDirection: "row",
            alignItems:'center',
            gap: 10,
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderColor: ColorsTheme.borderColor,
            borderWidth: 1
        },
        topLogoImage: {
            width: 100,
            objectFit: "contain",
            height: 100,
            marginLeft: 'auto'
        },
        topLogoBtnOuter :{
            width: 140,
            marginLeft: 'auto'
        },
        forgotPassHead: {
            fontSize: 25,
            fontFamily: 'Poppins-SemiBold',
            color: ColorsTheme.Black,
            
        },
        forgotpassOuter: {
            paddingHorizontal: 15,
            paddingTop: 20,
            paddingBottom: 40
        },
        forgotHeadTag: {
            fontFamily: 'Manrope-Regular',
            fontSize: 14,
            color: ColorsTheme.Black
        },
        inputBlocks: {
            fontFamily: "Manrope-Medium",
            fontSize: 18,
            color: ColorsTheme.Black,
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderColor: ColorsTheme.borderColor,
        },
        similarOuterSec: {
            paddingVertical: 30
        },
        confirmBtn: {
            backgroundColor: ColorsTheme.Primary,
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 10,
            marginTop: 20
        },
        confirmText: {
            fontFamily: 'Poppins-SemiBold',
            color: ColorsTheme.White,
            fontSize: 18,
            textAlign: 'center'
        },
        innerModal:{
            backgroundColor: ColorsTheme.White,
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderRadius: 10
        },
        innerLoading: {
            flexDirection: 'row',
            alignItems: "center",
            gap: 20
        },
        accountReg: {
            color: ColorsTheme.Black,
            fontSize: 18,
            fontFamily: 'Manrope-Bold'
        },
        passwordinputrow : {
            position: "relative",
            marginTop: 15
        },
        passwordMover: {
            position: "absolute",
            right: 20,
            top: 14,
        },
    })

  return (
    <View style={styles.mainContainer}>
        <View style={styles.TopLogo}>
            <TouchableOpacity style={styles.loginBack} onPress={() => navigation.navigate('WelcomeScreen')}>
                <ChevronLeft/>
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topLogoBtnOuter} >
                <Image source={ImagesThemes.logo} style={styles.topLogoImage}/>
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.forgotpassOuter}>
            <Modal isVisible={loaderVisible}>
                <View style={styles.innerModal}>
                    <View style={styles.innerLoading}>
                        <ActivityIndicator size={'large'} color={ColorsTheme.Primary}/>
                        <Text style={styles.accountReg}>Please Wait</Text>
                    </View>
                </View>
            </Modal>
            <Text style={styles.forgotPassHead}>{passwordChange ? 'Change Password' : 'Forgot Password'}</Text>
            <Text style={styles.forgotHeadTag}>Enter your email address to receive an OTP & Use the OTP to reset your password.</Text>
            <View style={[styles.forgotPassInner , styles.similarOuterSec]}>
                <TextInput style={styles.inputBlocks} placeholderTextColor={ColorsTheme.Black} onChangeText={text => setEmailInput(text)} editable={passwordChange ? false : true} placeholder='Enter Email'  />
                {passwordChange ? 
                    <View style={styles.passwordToggleBlock}>
                        <TextInput style={[styles.inputBlocks , {marginTop: 15}]} placeholderTextColor={ColorsTheme.Black} keyboardType='numeric' maxLength={6} onChangeText={text => setOtpValue(text)} placeholder='Enter OTP'  />
                        <View style={styles.passwordinputrow}>
                            <TextInput style={[styles.inputBlocks , styles.passwordInput]} placeholderTextColor={ColorsTheme.Black} onChangeText={text => setNewPasswordValue(text)}  placeholder='Enter New Password' secureTextEntry={eyeActive ? false : true} />
                            <TouchableOpacity onPress={() => setEyeActive(!eyeActive)} style={styles.passwordMover}>
                                {eyeActive ? <EyeSlash/> : <EyeOpen/>}
                            </TouchableOpacity>
                        </View> 
                    </View> :  
                null}    
                {passwordChange ? 
                    <TouchableOpacity style={styles.confirmBtn} onPress={() => handleChangPassword()}>
                        <Text style={styles.confirmText}>Submit</Text>
                    </TouchableOpacity> :
                    <TouchableOpacity style={styles.confirmBtn} onPress={() => emailChecker()}>
                        <Text style={styles.confirmText}>Send OTP</Text>
                    </TouchableOpacity> 
                }
            </View>
        </ScrollView>
    </View>
  )
}

