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
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { signinschema, signupschema } from "./Validation";
import { Formik } from "formik";
import { ColorsTheme } from "../../utils/ColorsTheme";

import ImagesThemes from "../../utils/ImagesTheme";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";
import LottieView from "lottie-react-native";


// Svg Images Import
import EyeSlash from '../../assets/svgs/eye-slash.svg';
import EyeOpen from '../../assets/svgs/eye-open.svg';
import ChveronLeft from '../../assets/svgs/left-arrow.svg'

export default function Register() {


  const apiUrl = 'https://www.tryfew.in/try-few-v1/public/'

    const [isActive, setIsActive] = useState(false);
    // const [isKeyboardVisible ,  setIsKeyboardVisible] = useState(false)
    const navigation = useNavigation();
    const [successResp , setSuccessResp] = useState('');
    const [loaderVisible , setLoaderVisible] = useState(false);
    const [successLoader , setSuccessLoader] = useState(false)
  
    const signUpDetails = {
      name: '',
      number: '',
      email: "",
      password: "",
      
    };
  
    const userSignUp = async (values) => {
     
      const formData = new FormData()
      formData.append('name' , values.name);
      formData.append('email' , values.email);
      formData.append('phone' , values.number);
      formData.append('password', values.password);

    //   console.log(formData)

      setLoaderVisible(true);
      
      try {
        await fetch(`${apiUrl}api/captain/register`, {
            method: 'post',  
            body: formData,
        })
        .then((response) => response.json())
        .then(response => {
            if(response?.data) {
                console.log(response);
                setSuccessLoader(true)
                setTimeout(() => {
                    setLoaderVisible(false);
                    navigation.navigate('VerifyOtp' , {regEmail: response?.data?.email})
                }, 3000 )
                ToastAndroid.show('Please Verify Email Id' , ToastAndroid.LONG);
            }
            if(response.errors) {
                setLoaderVisible(false);
                setSuccessLoader(false)
                console.log(response.errors)
                ToastAndroid.show(response?.errors?.email[0] , ToastAndroid.LONG);
            }  
        })  
        .catch((error) => {
            setLoaderVisible(false);
            setSuccessLoader(false)
            console.error(error, "error");
            throw Error(error);
        });
 
      } catch (error) {
        console.log(error , 'errors')
      }
      

    };

    useEffect (() => {
        // const keyboardDidShowListener = Keyboard.addListener(
        //     'keyboardDidShow',
        //     () => {
        //         setIsKeyboardVisible(true)
        //     }
        // );
        // const keyboardDidHideListner = Keyboard.addListener(
        //     'keyboardDidHide',
        //     () => {
        //         setIsKeyboardVisible(false)
        //     }
        // );


        // return () => {
        //     keyboardDidShowListener.remove();
        //     keyboardDidHideListner.remove();
        // }
    }, [])
  
    const styles = StyleSheet.create({
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
        backgroundColor:  ColorsTheme.White,
        paddingVertical: 15
      },
      loginbuttontext: {
        color: ColorsTheme.Primary,
        fontFamily: 'Manrope-Bold',
      },
      alreadyText: {
        fontFamily: 'Manrope-Regular',
        color: ColorsTheme.Black
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
      paddingLeft: 15,
      paddingTop: 15,
      flexDirection: 'row',
      justifyContent: "space-between",
      paddingRight: 20
      },
      loginputs: {
          backgroundColor: ColorsTheme.inputBack,
          height: 56,
          width: '100%',
          borderRadius: 10,
          fontFamily: 'Manrope-Regular',
          fontSize: 16,
          paddingLeft: 57,
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
          top: 16
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
          marginBottom: 16
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
          marginBottom: 60 
      },
      signInHeadText: {
          fontFamily: "Poppins-Medium",
          fontSize: 30,
          color:ColorsTheme.Black
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
      },
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
      backButtonOuter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      },
      backText: {
        color: ColorsTheme.Black,
        fontSize: 18,
        fontFamily: 'Manrope-Bold'
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
                        <Text style={styles.accountReg}>Account Registered Successfully</Text>
                    </View> : 
                    <View style={styles.innerLoading}>
                        <ActivityIndicator size={'large'} color={ColorsTheme.Primary}/>
                        <Text style={styles.accountReg}>Please Wait</Text>
                    </View>
                }
            </View>
        </Modal>
        <View style={styles.welcomeBgImageOuter}>
            <Image source={ImagesThemes.WelcomeBg} style={styles.welcomeBgImage} />
        </View>
        <View style={styles.TopLogo}>
            <TouchableOpacity style={styles.topLogoBtnOuter} onPress={() => navigation.navigate('WelcomeScreen')}><Image source={ImagesThemes.logo} style={styles.topLogoImage}/></TouchableOpacity>
            {/* <TouchableOpacity style={styles.backButtonOuter}>
                    <ChveronLeft/>
                    <Text style={styles.backText}>Back</Text>
            </TouchableOpacity> */}
        </View>
        <ScrollView style={styles.scrollViewSec}>
            <View style={styles.topHelloThere}>
                <Text style={[styles.singinHello , {color: ColorsTheme.Primary}]}>hello</Text>
                <Text style={[styles.singinHello , {color: ColorsTheme.Black}]}>there !</Text>
                <Text style={styles.signinquote}>Create an account to access your services packages and receives real-time updates.</Text>
            </View>
            <View style={styles.singinHead}>
                <Text style={styles.signInHeadText}>Sign Up</Text>
            </View>
            <Formik                        
                validationSchema={signupschema}
                initialValues={signUpDetails}
                onSubmit={(values) => userSignUp(values)}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                <>
                    <View style={styles.numberblk}>
                        <TextInput style={[styles.loginputs , { borderColor: errors.name ? ColorsTheme.Red : ColorsTheme.inputBack , borderWidth: 2 }]} placeholderTextColor={errors.name ? ColorsTheme.Red : ColorsTheme.Black} name="name"  onChangeText={handleChange('name') } onBlur={handleBlur('name') } placeholder='Name'  value={values.name} />                        
                        <Image source={ImagesThemes.userIcon} style={styles.mailIcon}/>
                    </View>
                    <View style={styles.numberblk}>
                        <TextInput keyboardType="numeric" maxLength={10} style={[styles.loginputs , { borderColor: errors.number ? ColorsTheme.Red : ColorsTheme.inputBack , borderWidth: 2 }]} placeholderTextColor={errors.number ? ColorsTheme.Red : ColorsTheme.Black} name="number"  onChangeText={handleChange('number') } onBlur={handleBlur('number') } placeholder='Number'  value={values.number} />                        
                        <Image source={ImagesThemes.callIcon} style={styles.mailIcon}/>
                    </View>
                    <View style={styles.numberblk}>
                        <TextInput style={[styles.loginputs , { borderColor: errors.email ? ColorsTheme.Red : ColorsTheme.inputBack , borderWidth: 2 }]} placeholderTextColor={errors.email ? ColorsTheme.Red : ColorsTheme.Black} name="email"  onChangeText={handleChange('email') } onBlur={handleBlur('email') } placeholder='Email'  value={values.email} />                        
                        <Image source={ImagesThemes.mailIcon} style={styles.mailIcon}/>
                    </View>
                    <View style={styles.passwordinputrow}>
                        <TextInput style={[styles.loginputs , {borderColor: errors.password ? ColorsTheme.Red : ColorsTheme.inputBack , borderWidth: 2}]} name="password" placeholderTextColor={errors.password ? ColorsTheme.Red : ColorsTheme.Black} onChangeText={handleChange('password')} onBlur={handleBlur('password')} placeholder='Password' value={values.password} secureTextEntry={isActive ? false : true} />
                        <TouchableOpacity onPress={() => setIsActive(!isActive)} style={styles.passwordMover}>
                            {isActive ? <EyeSlash/> : <EyeOpen/>}
                        </TouchableOpacity>
                        <Image source={ImagesThemes.passwordIcon} style={styles.passwordImage}/>
                    </View>     
                    <View style={styles.submitbtn}>
                        <TouchableOpacity style={styles.signinbtn} onPress={() => handleSubmit()}>
                            <Text style={styles.signinnertwo}>Sign Up</Text>
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