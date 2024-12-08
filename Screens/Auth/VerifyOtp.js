import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  TextInput,
  Image,
  ScrollView,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import React, { useState, useEffect } from "react";
import { otpSchema, signinschema, signupschema } from "./Validation";
import { Formik } from "formik";
import { ColorsTheme } from "../../utils/ColorsTheme";
import ImagesThemes from "../../utils/ImagesTheme";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";


export default function VerifyOtp({route}) {
  const apiUrl = 'https://www.tryfew.in/try-few-v1/public/'



  const [isActive, setIsActive] = useState(false);
//   const [isKeyboardVisible ,  setIsKeyboardVisible] = useState(false);
  const [loaderVisible , setLoaderVisible] = useState(false);
  const [successLoader , setSuccessLoader] = useState(false)

  const navigation = useNavigation();

  const registeredEmail  = route?.params?.regEmail; 

//   console.log(regEmail , "emailed")

  const otpDetails = {
    otpNumber: '',
  };


  const userSignUp = async (values) => {
     
    //   const obj = {
    //     name: values.name,
    //     email: values.email,
    //     phone: values.number,
    //     password: values.password
    //   }
      const formData = new FormData()
      formData.append('email' , registeredEmail);
      formData.append('otp' , values.otpNumber);

      console.log(formData)

      setLoaderVisible(true)
      try {
        await fetch(`${apiUrl}api/captain/verify-login-otp`, {
            method: 'post',  
            body: formData,
        })
        .then((response) => response.json())
        .then(response => {
            if(response?.data) {
                // console.log(response);
                setSuccessLoader(true)
                setTimeout(() => {
                    setLoaderVisible(false);
                    navigation.navigate('Login')
                }, 3000 )
                ToastAndroid.show(response?.message , ToastAndroid.LONG);
            }
            if(response.success == false) {
                setLoaderVisible(false);
                setSuccessLoader(false)
                // console.log(response.message)
                ToastAndroid.show(response?.message , ToastAndroid.LONG);
            }  
        })  
        .catch((error) => {
            setLoaderVisible(false);
            setSuccessLoader(false)
            // console.error(error, "error");
            throw Error(error);
        });
 
      } catch (error) {
        console.log(error , 'errors')
      }
      

    };

  useEffect (() => {
    //   const keyboardDidShowListener = Keyboard.addListener(
    //       'keyboardDidShow',
    //       () => {
    //           setIsKeyboardVisible(true)
    //       }
    //   );
    //   const keyboardDidHideListner = Keyboard.addListener(
    //       'keyboardDidHide',
    //       () => {
    //           setIsKeyboardVisible(false)
    //       }
    //   );


    //   return () => {
    //       keyboardDidShowListener.remove();
    //       keyboardDidHideListner.remove();
    //   }
  }, [])

  const styles = StyleSheet.create({
    innerModal: {
        backgroundColor: ColorsTheme.White,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 40
      },
      successGif: {
        width: 200,
        height: 200,
        objectFit: 'contain',
        marginLeft: 'auto',
        marginRight: 'auto'
      },
      accountReg: {
        fontSize: 16,
        fontFamily: 'Manrope-Bold',
        color: ColorsTheme.Black,
        textAlign: 'center',
        marginTop: 15
      },
    bottomAlready: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      justifyContent: "center",
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      backgroundColor:  ColorsTheme.White ,
      paddingVertical: 15
      
    },
    loginbuttontext: {
      color: ColorsTheme.Primary,
      fontFamily: 'Manrope-Bold',
    },
    alreadyText: {
      fontFamily: 'Manrope-Regular',
      color:ColorsTheme.Black
    },

    welcomeBgImageOuter: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
    },
    topLogoImage: {
        width: 100,
        objectFit: "contain",
        height: 100,
      },
      TopLogo: {
      //   position: "absolute",
      //   top: 30,
      //   left: 10,
      //   zIndex: 9,
      paddingHorizontal: 15,
      paddingTop: 15
      },
    loginputs: {
        backgroundColor: ColorsTheme.inputBack,
        height: 44,
        width: '100%',
        borderRadius: 10,
        fontFamily: 'Manrope-Regular',
        fontSize: 16,
        paddingLeft: 20,
        color: ColorsTheme.Black
    },
    passwordinputrow: {
        position: "relative",

    },
    mailIcon: {
        width: 24,
        height: 24,
        objectFit: "contain",
        position: "absolute",
        left: 20,
        top: 10
    },
    passwordImage: {
        width: 24,
        height: 24,
        objectFit: "contain",
        position: "absolute",
        left: 20,
        top: 16
    },
    passwordinputrow : {
        position: "relative"
    },
    numberblk: {
        width: '100%'
    },
    passwordMover: {
        position: "absolute",
        right: 20,
        top: 16
    },
    passwordshow: {
        fontSize: 24
    },
    singinHello: {
        fontFamily: "Poppins-SemiBold",
        fontSize: 40,
        lineHeight: 45
    },
    signinquote: {
        fontFamily: 'Manrope-Regular',
        fontSize: 14,
        color: ColorsTheme.Black
    },
    topHelloThere: {
        marginBottom: 50,
        marginTop: 20,
      //   opacity: isKeyboardVisible ? 0 : 1
    },
    signinbtn: {
        backgroundColor: ColorsTheme.Primary,
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    signinnertwo: {
        fontSize: 18,
        color: ColorsTheme.White,
        fontFamily: 'Manrope-Bold'
    },
    forgotLink: {
        fontFamily:  'Manrope-Medium',
        fontSize: 16
    },
    submitbtn: {
        marginTop: 20,
        marginBottom: 60 ,
    },
    signInHeadText: {
        fontFamily: "Poppins-Medium",
        fontSize: 30,
        color: ColorsTheme.Black
    },
    singinHead: {
        marginBottom: 15
    },
    scrollViewSec: {
      height: '100%',
      paddingHorizontal: 15,
      paddingBottom:  60 
    },
    mainContainer: {
      flex: 1,
      justifyContent: "center",
      position: "relative",
      backgroundColor: ColorsTheme.White

    },
    resendbtnInner: {
      backgroundColor: ColorsTheme.resendcolor,
      borderRadius: 8,
      paddingHorizontal: 25,
      paddingVertical: 12
    },
    resendinnerText: {
        fontSize: 14,
        color: ColorsTheme.White,
        fontFamily: 'Manrope-Regular',

    },
    mainotpouter: {
        flexDirection: 'row',
        gap: 10
        
    },
    outerInputOtp: {
        width: "60%"
    },
    otpResendText :{
        fontFamily: "Manrope-Medium",
        color: '#898989'
    },
    bottomTextOtp: {
        marginTop: 10
    },
    flexerSection :{
        flexDirection: 'row',
        gap: 8,
        flexWrap: "wrap"

    },
    topLogoBtnOuter :{
        width: 140
    },
  });

  return (
    <View style={styles.mainContainer}>
        <Modal isVisible={loaderVisible}>
            <View style={styles.innerModal}>
                {successLoader ? 
                    <View style={styles.innerSuccess}>
                        <LottieView 
                            source={require('../../assets/Icon/check.json')}
                            autoPlay
                            style={{
                                width: 200,
                                height: 200,
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}
                        />
                        <Text style={styles.accountReg}>Account Verified Successfully</Text>
                    </View> : 
                    <View style={styles.innerLoading}>
                        <ActivityIndicator size={'large'} color={ColorsTheme.Primary}/>
                        <Text style={styles.accountReg}>Please Wait</Text>
                    </View>
                }
            </View>
        </Modal>
        {/* <View style={styles.welcomeBgImageOuter}>
            <Image source={ImagesThemes.WelcomeBg} style={styles.welcomeBgImage} />
        </View> */}
        <View style={styles.TopLogo}>
            <TouchableOpacity style={styles.topLogoBtnOuter} onPress={() => navigation.navigate('WelcomeScreen')}><Image source={ImagesThemes.logo} style={styles.topLogoImage}/></TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollViewSec}>
            <View style={styles.topHelloThere}>
                <Text style={[styles.singinHello , {color: ColorsTheme.Primary}]}>hello</Text>
                <Text style={[styles.singinHello , {color: ColorsTheme.Black}]}>there !</Text>
                <Text style={styles.signinquote}>Enter the received otp to create and unlock more features</Text>
            </View>
            <View style={styles.singinHead}>
                <Text style={styles.signInHeadText}>Enter OTP</Text>
            </View>
            <Formik                        
                validationSchema={otpSchema}
                initialValues={otpDetails}
                onSubmit={(values) => userSignUp(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                <>
                    <View style={styles.mainotpouter}>
                        <View style={styles.numberblk}>
                            <TextInput keyboardType="numeric" style={[styles.loginputs , { borderColor: errors.otpNumber ? ColorsTheme.Red : ColorsTheme.inputBack , borderWidth: 2 }]} placeholderTextColor={errors.otpNumber ? ColorsTheme.Red : ColorsTheme.Black} name="otpNumber"  onChangeText={handleChange('otpNumber') } onBlur={handleBlur('otpNumber') } placeholder='OTP'  value={values.otpNumber} />                        
                        </View>   
                        {/* <View style={styles.resendBtn}>
                            <TouchableOpacity style={styles.resendbtnInner} onPress={() => handleSubmit()}>
                                <Text style={styles.resendinnerText}>Re-Register</Text>
                            </TouchableOpacity>      
                        </View> */}
                    </View>
                    <View style={styles.bottomTextOtp}>
                        <View style={styles.flexerSection}>
                            <Text style={styles.otpResendText}>We've sent you a code to </Text>
                            <Text style={[styles.otpResendText , {color: ColorsTheme.resendcolor}]}>{registeredEmail ? registeredEmail : 'Email'}</Text>
                        </View>
                        
                        <Text style={[styles.otpResendText , {marginTop: 5}]}>Please enter received Code and create your account</Text>
                        <View style={styles.flexerSection}>
                            <Text style={[styles.otpResendText , {marginTop: 5}]}>Didn't Recive Code </Text> 
                            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.buttonRegAgain}><Text style={[styles.otpResendText , {marginTop: 5 ,  color: ColorsTheme.Primary}]}>Register again</Text></TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.submitbtn}>
                        <TouchableOpacity style={styles.signinbtn} onPress={() => handleSubmit()}>
                            <Text style={styles.signinnertwo}>Create Account</Text>
                        </TouchableOpacity>      
                    </View>
                </>
                )}
            </Formik>
           
        </ScrollView>
        <View style={styles.bottomAlready}>
            <Text style={styles.alreadyText}>Already have an account</Text> 
            <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.loginbuttontext}>Sign In</Text></TouchableOpacity>
        </View>  
    </View>
  )
}

const styles = StyleSheet.create({})