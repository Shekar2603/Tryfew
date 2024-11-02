import { StyleSheet, Text, View , Image , Pressable , ScrollView , TouchableOpacity , TextInput, Keyboard, ToastAndroid} from 'react-native'
import React , {useState ,  useEffect} from 'react';
import ImagesThemes from '../../utils/ImagesTheme';
import { ColorsTheme } from '../../utils/ColorsTheme';
// import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from "formik";
import { profileEditSchema } from '../Auth/Validation';
import ImagePicker from 'react-native-image-crop-picker';

// Svg Images Import
import EyeSlash from '../../assets/svgs/eye-slash.svg';
import EyeOpen from '../../assets/svgs/eye-open.svg';
import ChevronLeft from '../../assets/svgs/orange-left-chevron.svg';
import Upload from '../../assets/svgs/image-upload-orange.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProfileEdit = () => {

    const apiUrl = 'https://www.tryfew.in/try-few-v1/public/'

    const navigation = useNavigation();

    
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {

        getUserDetails();
      });
  
      return unsubscribe;
    }, [navigation]);
    

    const [isKeyboardVisible ,  setIsKeyboardVisible] = useState(false);
    const [profileImage , setProfileImage] = useState();
    const [editProfileToggle , setEditProfileToggle] = useState(false);
    const [userToken , setUserToken] = useState('');
    const [fetchedUserData , setFetchedUserData] = useState()


    const [name , setName] = useState('');
    const [phoneNumber , setPhoneNumber] = useState('');
    const [email ,  setEmail] = useState('')

    const getUserDetails = async () => {
      const response = await AsyncStorage.getItem('userInfo');
      const userParse = JSON.parse(response);
      setUserToken(userParse);
      userDetailsFetch(userParse)
    };


    const userDetailsFetch = async (tokedIn) => {

      try {
          await fetch(`${apiUrl}api/captain/get-details`, {
              method: 'GET',
              mode: 'no-cors',
              headers: {
                  "Authorization": "Bearer " + tokedIn,
                  "token": 'Bearer ' + tokedIn,
                  "Content-type": "application/json"
              }
          })
          .then((response) => response.json())
          .then(response => {
              if(response) {
                setFetchedUserData(response?.data);
                setName(response?.data?.name);
                setPhoneNumber(response?.data?.phone);
                setEmail(response?.data?.email);
              }
          })  
          .catch((error) => {
              console.error(error, "error");
              throw Error(error);
          });
    
        } catch (error) {
          console.log(error , 'errors')
        }
    }


    const pickProfileImage = async () => {
      ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: false
      }).then((image) => {
          // console.log(image)
          setProfileImage({ uri: image.path, type: 'image/jpeg', name: 'image.jpg'})
      })
  };

    const profileEditDetails = {
      name: '',
      number: '',
      email: "",
      // password: "",
      
  };

    const userUpdate = async() => {
      
      const formData = new FormData()
      formData.append('name' , name);
      formData.append('email' , email);
      formData.append('phone' , phoneNumber);
      if (profileImage) {
        formData.append('profile_img', {
            uri: profileImage.uri,
            type: 'image/jpeg',
            name: 'image.jpg'
        });
    } else if (fetchedUserData?.profile_img) {
        formData.append('profile_img', {
            uri: apiUrl + fetchedUserData?.profile_img,
            type: 'image/jpeg',
            name: 'image.jpg'
        });
    }

      // formData.append('password', data.password);

      console.log(formData)

      try {
        await fetch(`${apiUrl}api/captain/update-profile`, {
            method: 'POST',  
            body: formData,
            headers: {
              "Authorization": 'Bearer ' + userToken,
              "token": 'Bearer ' + userToken,
              "Content-type": "multipart/form-data" 
          }
        })
        .then((response) => response.json())
        .then(response => {
            if(response?.data) {
                ToastAndroid.show(response?.message , ToastAndroid.LONG);
                setEditProfileToggle(false);
                getUserDetails()
            }
            if(response?.errors) {
              ToastAndroid.show(response?.message , ToastAndroid.LONG);
            }  
        })  
        .catch((error) => {
            console.error(error, "error");
            throw Error(error);
        });
 
      } catch (error) {
        console.log(error , 'errors')
      }
      

    }


  

      

    
    const styles = StyleSheet.create({
      mainProfileContainer: {
        flex: 1,
        // position: 'relative'
        backgroundColor: ColorsTheme.White
      },
      TopProfileDisplay: {
        // position: 'absolute',
        // top: 0,
        backgroundColor: ColorsTheme.Primary,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        width:'100%',
        paddingTop: 10,
        paddingBottom: 20
      },
      profileImageTop: {
        width: 100,
        height: 100,
        borderRadius: 100
      },
      profileHead: {
        fontSize: 16,
        fontFamily: 'Manrope-SemiBold',
        paddingVertical: 15,
        textAlign: "center",
        color: ColorsTheme.White,
        width:'80%'
      },
      imageSectionProfile: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 20
      },
      nameSec: {
        fontSize: 16,
        fontFamily: 'Manrope-Regular',
        color: ColorsTheme.White
      },
      wallamtSec: {
        fontSize: 20,
        fontFamily: 'Manrope-Bold',
        color: ColorsTheme.White,
        marginTop: 5
      },
      editFromActive: {
        paddingHorizontal: 15,
        flexDirection: 'column',
        gap: 15,
        paddingVertical: 20
      },
      singleMenuItemOuter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: ColorsTheme.inputBack,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15
      },
      iconNameOut: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
      },
      iconsLeft: {
        fontSize: 25,
  
      },
      menuTextName: {
        fontFamily: 'Manrope-Regular',
        fontSize: 18,
  
      },
      nextIcon: {
        fontSize: 20
      },
      IconOuter: {
        width: 50,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: ColorsTheme.White,
        borderRadius: 50
      },
      nextIconTextComb: {
        flexDirection: 'row',
        gap: 5
      },
      nextAmount: {
        fontFamily: 'Manrope-Bold'
      },
      profileBackOuter: {
          flexDirection: "row",
          paddingHorizontal: 20
      },
      backIcon: {
          width: 25,
          height: 25,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: 'center',
          backgroundColor: ColorsTheme.White,
          borderRadius: 30,
          marginTop: 10
      },
      chevronBack:{
          fontSize: 18,
          color: ColorsTheme.Black
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
          marginBottom: 5
      },
      passwordMover: {
          position: "absolute",
          right: 20,
          top: 16
      },
      passwordshow: {
          fontSize: 24
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
          marginBottom: isKeyboardVisible ? 60 : 0
      },
      signInHeadText: {
          fontFamily: "Poppins_500Medium",
          fontSize: 30
      },
      ProfileimageIconer: {
          position: 'relative',
          marginBottom: 10
      },
      cloudUpIconOut: {
          width: 28,
          height: 28,
          flexDirection: 'row',
          justifyContent: "center",
          alignItems: 'center' ,
          backgroundColor: ColorsTheme.White,
          borderRadius: 30,
          position: 'absolute',
          right: 0,
          bottom: 0
      },
      cloudIcon: {
          fontSize: 18,
          color: ColorsTheme.Primary,
      },
      profileDetailsShower: {
        flexDirection: 'column',
        gap: 10,
        paddingVertical: 40,
        paddingHorizontal: 15,
      }

    })
    
      return (
        <View style={styles.mainProfileContainer}>
          <View style={styles.TopProfileDisplay}>
              <View style={styles.profileBackOuter}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('ProfileScreen')}>
                    <ChevronLeft/>
                </TouchableOpacity>
                <Text style={styles.profileHead}>Edit Profile</Text>
              </View>
              <View style={styles.imageSectionProfile}>
                <View style={styles.ProfileimageIconer}>
                    <Image source={profileImage ? profileImage : {uri: apiUrl + fetchedUserData?.profile_img}} style={styles.profileImageTop}/>
                    {editProfileToggle ? 
                    <TouchableOpacity style={styles.cloudUpIconOut} onPress={pickProfileImage}>
                      <Upload/>
                    </TouchableOpacity> : null }
                </View>
                <Text style={styles.nameSec}>{fetchedUserData?.name}</Text>
                <Text style={styles.wallamtSec}>₹ 365.00 </Text>
              </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.innerScrollerProfile}>
                {editProfileToggle ? 
                <View style={styles.editFromActive}>
                    <View style={styles.numberblk}>
                        <TextInput style={styles.loginputs} onChangeText={(text) => setName(text)} value={name}/>                        
                        <Image source={ImagesThemes.userIcon} style={styles.mailIcon}/>
                    </View>
                    <View style={styles.numberblk}>
                        <TextInput keyboardType="numeric" onChangeText={(text) => setPhoneNumber(text)} maxLength={10} style={styles.loginputs} value={phoneNumber} />                        
                        <Image source={ImagesThemes.callIcon} style={styles.mailIcon}/>
                    </View>
                    <View style={styles.numberblk}>
                        <TextInput style={styles.loginputs} onChangeText={(text) => setEmail(text)}  value={email} />                        
                        <Image source={ImagesThemes.mailIcon} style={styles.mailIcon}/>
                    </View>
                    <View style={styles.submitbtn}>
                      <TouchableOpacity style={styles.signinbtn} onPress={userUpdate}>
                          <Text style={styles.signinnertwo}>Update User</Text>
                      </TouchableOpacity>      
                    </View>
                </View> : 
                <View style={styles.profileDetailsShower}>
                  <View style={styles.numberblk}>
                      <TextInput style={styles.loginputs} editable={false}  value={fetchedUserData?.name} />                        
                      <Image source={ImagesThemes.userIcon} style={styles.mailIcon}/>
                  </View>
                  <View style={styles.numberblk}>
                      <TextInput keyboardType="numeric" maxLength={10} style={styles.loginputs} editable={false}  value={fetchedUserData?.phone} />                        
                      <Image source={ImagesThemes.callIcon} style={styles.mailIcon}/>
                  </View>
                  <View style={styles.numberblk}>
                      <TextInput style={styles.loginputs} editable={false} placeholder='Email' value={fetchedUserData?.email} />                        
                      <Image source={ImagesThemes.mailIcon} style={styles.mailIcon}/>
                  </View>
                  {/* <View style={styles.passwordinputrow}>
                      <TextInput style={styles.loginputs} editable={false} placeholder='Password' value={'Example@1234'} secureTextEntry={isActive ? true : false} />
                      <TouchableOpacity onPress={() => setIsActive2(!isActive2)} style={styles.passwordMover}>
                        {isActive2 ? <EyeSlash/> : <EyeOpen/>}
                      </TouchableOpacity>
                      <Image source={ImagesThemes.passwordIcon} style={styles.passwordImage}/>
                  </View>   */}
                    <View style={styles.submitbtn}>
                      <TouchableOpacity style={styles.signinbtn} onPress={() => setEditProfileToggle(!editProfileToggle)}>
                          <Text style={styles.signinnertwo}>Edit Profile</Text>
                      </TouchableOpacity>      
                    </View>
                </View> }
            </View>
          </ScrollView>
        </View>
      )
}

export default ProfileEdit
