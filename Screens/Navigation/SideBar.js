import { StyleSheet, Text, View , Image , Pressable, TouchableOpacity} from 'react-native'
import React , { useState , useEffect } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { ColorsTheme } from '../../utils/ColorsTheme';
import ImagesThemes from '../../utils/ImagesTheme';


// svgimages import

import ChevronLeft from '../../assets/svgs/left-white-chevron.svg';
import ChevronRight from '../../assets/svgs/black-right-chevron.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SideBar() {

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

          getUserDetails();
        });
    
        return unsubscribe;
      }, [navigation]);

      const apiUrl = 'https://tryfew.in/try-few-v1/public/'


    const [userToken , setUserToken] = useState('');
    const [fechedUserData , setFetchedUserData] = useState('');


  
    
    const getUserDetails = async () => {
      const response = await AsyncStorage.getItem('userInfo');
      const userParse = JSON.parse(response);
      setUserToken(userParse);
      userDetailsFetch(userParse)
    };
  

  
    // useEffect(() => {
        // getUserDetails();
    //     navigation.addListener('focus', () => {
    //         getUserDetails();
    //     });
    // }, [userToken ? userToken : null , navigation])
    
    
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
              setFetchedUserData(response?.data)
                // console.log(response);
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
        navigationOuter: {
            paddingHorizontal: 15,
            paddingVertical: 20,
        },
        username:{
            color: "#fff",
            textAlign: "center",
            marginTop: 20,
            fontSize:20,
            fontFamily: 'Manrope-Bold',
            color: ColorsTheme.White,
            textTransform: "capitalize"
        },
        singleNavs:{
          marginBottom: 15
        },
        navigators:{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: ColorsTheme.lightGray,
            paddingVertical: 7,
            paddingHorizontal: 10,
            borderRadius: 10,
            justifyContent: 'space-between'
        },
        navIcons: {
            fontSize: 20,  
            color: "#fff",      
        },
        navigationText:{
            fontFamily: 'Manrope-Bold',
            color: ColorsTheme.Black,
            fontSize: 16,
        },
        iconTextOuter: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: 'center'
        },
        iconOuter: {
            backgroundColor: ColorsTheme.White,
            marginRight: 20,
            width: 40,
            height: 40,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 50
        },
        leftIconSideBar: {
            width: 25,
            height: 25
        },
        mainSideBarScroll:{
            flex: 1,
            backgroundColor: ColorsTheme.White,
            paddingTop: 40
        },  
        scrollerView: {
            width: "100%",
            height: '100%',
        },
        imageOuter:{
            width: "100%",
            // backgroundColor: ColorsTheme.Primary,
            paddingVertical: 40,
            // borderBottomLeftRadius: 30,
            // borderBottomRightRadius: 30,
            // elevation:20,
            // shadowColor: "#000",
            position: "relative",
        },
        ProfImageOuter:{
            width: 100,
            height: 100,
            backgroundColor: ColorsTheme.White,
            marginLeft: "auto",
            marginRight: "auto",
            elevation: 30,
            borderRadius: 100,
        },
        userImage : {
            width: "100%",
            height: "100%",
            borderWidth: 3,
            borderRadius: 100,
            borderColor: ColorsTheme.Primary,
        },
        forwardIcon: {
            fontSize: 20
        },
        priceRightIcon: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5
        },
        walletText: {
            fontFamily: 'Manrope-Bold',
            fontSize: 12,
            color: ColorsTheme.Black
        },
        navCloserBtn: {
            backgroundColor: ColorsTheme.Primary,
            borderRadius: 30,
            width: 28,
            height: 28,
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 30,
            right: 20
        },
        navCloseIcon: {
            fontSize: 18,
            color: ColorsTheme.White
        },
        bottomImageAbs: {
            width: 140,
            objectFit: 'contain',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: 140
        },
        bottomAbsImageOuter: {
            position: 'absolute',
            bottom: 0,
            width: '100%'
        },
        bottomAbsImageOuter: {
            // position: 'absolute',
            // bottom: 0,
            width: '100%',
            height: 100
        }
    })

    const handleLogout = async() => {
        await AsyncStorage.removeItem('userInfo');
        await AsyncStorage.removeItem('loggedData');
        navigation.navigate('Login')
    }

    const menuList = [
        {
            name: 'Profile',
            link: 'ProfileScreen',
            icon: ImagesThemes.profileIcon,
            rightText: null,
            rightIcon: true
        },
        {
            name: 'Wallet',
            link: 'WalletScreen',
            icon: ImagesThemes.WalletSideIcon,
            rightText: null,
            rightIcon: true
        },
        {
            name: 'Transactions',
            link: 'Transactions',
            icon: ImagesThemes.WalletSideIcon,
            rightText: null,
            rightIcon: true
        },
        {
            name: 'Log Out',
            icon: ImagesThemes.logoutIcon,
            rightText: null,
            rightIcon: true
        },

    ]

  return (
    <View style={styles.mainSideBarScroll}>
            <View style={styles.imageOuter}>
                {/* {profileData?.gender == "Male" ?  */}
                {/* <View style={styles.ProfImageOuter}>
                    <Image style={styles.userImage} source={{uri: apiUrl + fechedUserData?.profile_img}}/> 
                </View> */}
                           <View style={styles.bottomAbsImageOuter}>
                <Image source={ImagesThemes.logo} style={styles.bottomImageAbs}/>
            </View>
                {/* : null}
                {profileData?.gender == "Female" ? 
                <View style={styles.ProfImageOuter}>
                    <Image style={styles.userImage} source={femaleProfile}/> 
                </View>
                : null} */}
                {/* <Text style={styles.username}>{profileData?.name}</Text> */}
            </View> 
            <Pressable style={styles.navCloserBtn} onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
                <ChevronLeft/>
            </Pressable>
            <View style={styles.navigationOuter}>
                {menuList.map((items , index) => {
                    return (
                    <View style={styles.singleNavs} key={index}>
                        <Pressable style={styles.navigators} onPress={() => {items.link ? navigation.navigate(items.link) : handleLogout()}}>
                           <View style={styles.iconTextOuter}>
                                <View style={styles.iconOuter}>
                                   <Image source={items.icon} style={styles.leftIconSideBar}/>
                                </View>
                                <Text style={styles.navigationText}>{items.name}</Text>
                           </View>
                           {items.rightIcon ? 
                           <View style={styles.priceRightIcon}>
                                <ChevronRight/>
                           </View> : null}
                           {items.rightText ? <Text style={styles.walletText}>{items.rightText}</Text> : null}
                        </Pressable>
                    </View>
                    )
                })}
            </View>    
            {/* <View style={styles.bottomAbsImageOuter}>
                <Image source={ImagesThemes.logo} style={styles.bottomImageAbs}/>
            </View> */}
    </View>
  )
}

const styles = StyleSheet.create({})