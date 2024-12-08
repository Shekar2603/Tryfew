import { StyleSheet, Text, View, Keyboard, TextInput , TouchableOpacity, ToastAndroid, Pressable, Image , ScrollView,  ActivityIndicator} from 'react-native'
import React, {useState , useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';
import { ColorsTheme } from '../../utils/ColorsTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagesThemes from '../../utils/ImagesTheme';
import { signinschema } from './Validation';
import { Formik } from 'formik';
import Modal from "react-native-modal";
// Svg Images Import
import EyeSlash from '../../assets/svgs/eye-slash.svg';
import EyeOpen from '../../assets/svgs/eye-open.svg';
import ChevronLeft from '../../assets/svgs/orange-left-chevron.svg';




export default function Login() {
  const [isActive, setIsActive] = useState(false);
//  const [isKeyboardVisible ,  setIsKeyboardVisible] = useState(false)
  const [userToken , setUserToken] = useState('');
  const [userLogData , setUserLogData] = useState('')
  const [loaderVisible , setLoaderVisible] = useState(false);
  const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserDetails() 
            checkLoggedUserLogin()
        });

        return unsubscribe;
    }, [navigation]);



  const getUserDetails = async () => {
    const response = await AsyncStorage.getItem('userInfo');
    const userLog = await AsyncStorage.getItem('loggedData');
    const userParse = JSON.parse(response);
    const userLogParse = JSON.parse(userLog);
    setUserLogData(userLogParse);
    setUserToken(userParse);
  };

  console.log(userLogData , "usertoken")

  const signindata = {
    email: "",
    password: "",
  };

  const apiUrl = 'https://www.tryfew.in/try-few-v1/public/'

    
const userLogin = async (values , {resetForm}) => {
     
    const formData = new FormData()
    formData.append('email' , values.email);
    formData.append('password', values.password);

    console.log(formData)

    setLoaderVisible(true)
    try {
        await fetch(`${apiUrl}api/captain/login`, {
            method: 'post',  
            body: formData,
        })
        .then((response) => response.json())
        .then(response => {
            console.log(response)

            if(response?.data?.token) {
                setLoaderVisible(false)
                AsyncStorage.setItem('userInfo', JSON.stringify(response?.data?.token));
                AsyncStorage.setItem('loggedData' , JSON.stringify(response?.data))
                if(response?.data?.tell_me_about_yourself === true) {
                    navigation.navigate('HomePage') 
                }else {
                    navigation.navigate('TermsConditions')
                }
                ToastAndroid.show('Logged in successfully' , ToastAndroid.LONG);
            }
            else if (response?.success == false) {
                setLoaderVisible(false)
                ToastAndroid.show('Invalid Credentials' , ToastAndroid.LONG);
            }
            else if (response?.data?.error) {
                setLoaderVisible(false)
                ToastAndroid.show('Invalid Credentials' , ToastAndroid.LONG);
            }
            else if(response?.errors) {
                setLoaderVisible(false)
                ToastAndroid.show('Invalid Credentials', ToastAndroid.LONG);
            }  
        })  
        .catch((error) => {
            setLoaderVisible(false)
            console.error(error, "error");
            throw Error(error);
        });

    } catch (error) {
    console.log(error , 'errors')
    }

};


const checkLoggedUserLogin = async () => {
    setLoaderVisible(true)
    try {
        const userLog = await AsyncStorage.getItem('loggedData');
        if (userLog) {
          const userLogParse = JSON.parse(userLog);
          if (userLogParse.token && userLogParse.tell_me_about_yourself === true) {
            setLoaderVisible(false)
            ToastAndroid.show('Logged in successfully' , ToastAndroid.LONG);
            navigation.navigate('HomePage');
          } else {
            setLoaderVisible(false)
            ToastAndroid.show('Login in Again' , ToastAndroid.LONG);
            navigation.navigate('Login'); 
          }
        } else {
            setLoaderVisible(false)
            ToastAndroid.show('Error Logging you In , Login Again' , ToastAndroid.LONG);
            navigation.navigate('Login');
        }
      } catch (error) {
        setLoaderVisible(false)
        console.error("Error fetching user data:", error);
        navigation.navigate('Login');
      }
}
  





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
        backgroundColor: ColorsTheme.White ,
        paddingVertical: 15
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
    loginbuttontext: {
      color: ColorsTheme.Primary,
      fontFamily: 'Manrope-Bold',
    },
    alreadyText: {
      fontFamily: 'Manrope-Regular',
      color:ColorsTheme.Black
    },
    container: {
      flex: 1,
      position: "relative",
    },
    centerLoginView: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20
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
      marginLeft: 'auto'
    },
    topLogoBtnOuter :{
        width: 140,
        marginLeft: 'auto'
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
        top: 16,

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
        marginTop: 30,
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
        color: ColorsTheme.Black
    },
    singinHead: {
        marginBottom: 15
    },
    mainContainer: {
        flex: 1,
        justifyContent: "center",
        position: "relative",
        backgroundColor: ColorsTheme.White
      },
      scrollViewSec: {
        height: '100%',
        paddingHorizontal: 15,
        paddingBottom:  60 
      },
      scrollViewSec: {
        height: '100%',
        paddingHorizontal: 15,
        paddingBottom:  60 
      },
  });

  return (
    <View style={styles.mainContainer}>
        {/* <View style={styles.welcomeBgImageOuter}>
            <Image source={ImagesThemes.WelcomeBg} style={styles.welcomeBgImage} />
        </View> */}
        <View style={styles.TopLogo}>
            <TouchableOpacity style={styles.loginBack} onPress={() => navigation.navigate('WelcomeScreen')}>
                <ChevronLeft/>
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.topLogoBtnOuter} >
                <Image source={ImagesThemes.logo} style={styles.topLogoImage}/>
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollViewSec}>
            <Modal isVisible={loaderVisible}>
                <View style={styles.innerModal}>
                    <View style={styles.innerLoading}>
                        <ActivityIndicator size={'large'} color={ColorsTheme.Primary}/>
                        <Text style={styles.accountReg}>Please Wait</Text>
                    </View>
                </View>
            </Modal>
            <View style={styles.topHelloThere}>
                <Text style={[styles.singinHello , {color: ColorsTheme.Primary}]}>hello</Text>
                <Text style={[styles.singinHello , {color: ColorsTheme.Black}]}>there !</Text>
                <Text style={styles.signinquote}>Sign in to access your service packages, receive real-time updates , and unlock unlimited offers</Text>
            </View>
            <View style={styles.singinHead}>
                <Text style={styles.signInHeadText}>Sign In</Text>
            </View>
            <Formik                        
                validationSchema={signinschema}
                initialValues={signindata}
                onSubmit={(values , {resetForm}) => userLogin(values , {resetForm})}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, resetForm }) => (
                <>
                    <View style={styles.numberblk}>
                        <TextInput style={[styles.loginputs , { borderColor: errors.email ? ColorsTheme.Red : ColorsTheme.inputBack , borderWidth: 2 }]} placeholderTextColor={errors.email ? ColorsTheme.Red : ColorsTheme.Black} name="email"  onChangeText={handleChange('email') } onBlur={handleBlur('email') } placeholder='Email'  value={values.email} />                        
                        <Image source={ImagesThemes.mailIcon} style={styles.mailIcon}/>
                    </View>
                    <View style={styles.passwordinputrow}>
                        <TextInput style={[styles.loginputs , {borderColor: errors.password ? ColorsTheme.Red : ColorsTheme.inputBack , borderWidth: 2}]} name="password" placeholderTextColor={errors.password ? ColorsTheme.Red : ColorsTheme.Black} onChangeText={handleChange('password')} onBlur={handleBlur('password')} placeholder='Password' value={values.password} secureTextEntry={isActive ? false : true} />
                        <TouchableOpacity onPress={() => setIsActive(!isActive)} style={styles.passwordMover}>
                            {isActive ? <EyeSlash/> : <EyeOpen/>}
                            {/* <Ionicons style={styles.passwordshow} name={isActive ? "eye" : "eye-off"}></Ionicons> */}
                        </TouchableOpacity>
                        <Image source={ImagesThemes.passwordIcon} style={styles.passwordImage}/>
                    </View>     
                    {/* <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text style={styles.forgotLink}>Forgot Password?</Text>
                    </TouchableOpacity> */}
                    <View style={styles.submitbtn}>
                        <TouchableOpacity style={styles.signinbtn} onPress={() => handleSubmit()}>
                            <Text style={styles.signinnertwo}>Sign In</Text>
                        </TouchableOpacity>      
                    </View>
                </>
                )}
            </Formik>
        </ScrollView>
        <View style={styles.bottomAlready}>
            <Text style={styles.alreadyText}>Don't have an account</Text> 
            <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={styles.loginbuttontext}>Sign Up</Text></TouchableOpacity>
        </View>  
    </View>
  )
}

const styles = StyleSheet.create({})