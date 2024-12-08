import { StyleSheet, Text, View , Image , Pressable , ScrollView , TouchableOpacity , ActivityIndicator} from 'react-native'
import React , {useState ,  useEffect} from 'react';
import ImagesThemes from '../../utils/ImagesTheme';
import { ColorsTheme } from '../../utils/ColorsTheme';
import { useNavigation } from '@react-navigation/native';

// Svg Images Import
import ProfileEdit from '../../assets/svgs/profile.svg';
import TransactionIcon from '../../assets/svgs/transaction.svg';
import WalletIcon from '../../assets/svgs/wallet.svg';
import ServicesIcon from '../../assets/svgs/services-icon.svg';
import LogoutIcon from '../../assets/svgs/logout.svg';
import ChevronRight from '../../assets/svgs/black-right-chevron.svg'

import Modal from "react-native-modal";
import ChevronLeft from '../../assets/svgs/orange-left-chevron.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUserDetails();
    });

    return unsubscribe;
  }, [navigation]);
   
  const apiUrl = 'https://www.tryfew.in/try-few-v1/public/'

  const ProfileNavigatorsList = [
    // {
    //   linkName: 'Edit Profile',
    //   iconName: ProfileEdit,
    //   link: 'ProfileEdit',
    //   iconColor: '#fb6f3d',
    //   rightIcon: true
    // },
    {
      linkName: 'Wallet',
      iconName: WalletIcon,
      link: 'WalletScreen',
      iconColor: '#18CFE8',
      rightIcon: false,
      // rightAmount: '₹365',
      insideIcon: true
    },
    {
      linkName: 'Transaction History',
      iconName: TransactionIcon,
      link: 'Transactions',
      iconColor: '#FF7622',
      rightIcon: true
    },
    // {
    //   linkName: 'Number of Services',
    //   iconName: ServicesIcon,
    //   iconColor: '#18CFE8',
    //   rightIcon: false,
    //   rightAmount: '34',
    //   insideIcon: false
    // },
    {
      linkName: 'Log Out',
      link: 'logout',
      iconName: LogoutIcon,
      iconColor: '#D20F0F',
      rightIcon: false
    },

  ]

 


  const [userToken , setUserToken] = useState('');
  const [fechedUserData , setFetchedUserData] = useState('');
  const [loader , setLoader] = useState(false);

  
  const getUserDetails = async () => {
    const response = await AsyncStorage.getItem('userInfo');
    const userParse = JSON.parse(response);
    setUserToken(userParse);
    userDetailsFetch(userParse)
  };

  

  
  
const userDetailsFetch = async (tokedIn) => {
  setLoader(true)
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
            setLoader(false)
            setFetchedUserData(response?.data)
              // console.log(response);
          }
      })  
      .catch((error) => {
        setLoader(false)
          console.error(error, "error");
          throw Error(error);
      });

    } catch (error) {
      setLoader(false)
      console.log(error , 'errors')
    }
}


  const handleLogout = async () => {
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.removeItem('loggedData');
    navigation.navigate('Login')
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
      width: 80,
      height: 80,
      marginBottom: 10,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: ColorsTheme.White
    },
    profileHead: {
      fontSize: 16,
      fontFamily: 'Manrope-SemiBold',
      paddingVertical: 15,
      textAlign: "center",
      color: ColorsTheme.White
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
    innerScrollerProfile: {
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
      paddingHorizontal: 10,
      paddingVertical: 8,
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
      fontFamily: 'Manrope-SemiBold',
      fontSize: 16,
      color: ColorsTheme.Black

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
      gap: 10,
      alignItems: "center"
    },
    nextAmount: {
      fontFamily: 'Manrope-Bold',
      color: ColorsTheme.Black
    },
    iconNextOut: {
      marginRight: 10
    },
    profileBackOuter: {
      flexDirection: "row",
      paddingHorizontal: 20
  },
  profileHead: {
    fontSize: 16,
    fontFamily: 'Manrope-SemiBold',
    paddingVertical: 15,
    textAlign: "center",
    color: ColorsTheme.White,
    width:'80%'
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

  })

  return (
    <View style={styles.mainProfileContainer}>
      <View style={styles.TopProfileDisplay}>
          <View View style={styles.profileBackOuter}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('HomePage')}>
                <ChevronLeft/>
            </TouchableOpacity>
            <Text style={styles.profileHead}>Profile</Text>
          </View>
          <View style={styles.imageSectionProfile}>
            {fechedUserData?.profile_img ? <Image source={{uri: apiUrl + fechedUserData?.profile_img}} style={styles.profileImageTop}/> : <Image source={ImagesThemes.emptyImage} style={styles.profileImageTop}/> } 
            <Text style={styles.nameSec}>{fechedUserData?.name}</Text>
            {/* <Text style={styles.wallamtSec}>₹ 365.00 </Text> */}
          </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>  
        <Modal isVisible={loader}>
            <View style={styles.innerModal}>
                <View style={styles.innerLoading}>
                    <ActivityIndicator size={'large'} color={ColorsTheme.Primary}/>
                    <Text style={styles.accountReg}>Please Wait</Text>
                </View>
            </View>
        </Modal> 
        <View style={styles.innerScrollerProfile}>
          {ProfileNavigatorsList.map((items , index) => {
            return (
              <TouchableOpacity style={styles.singleMenuItemOuter} key={index} onPress={() => {items.link == 'logout' ?  handleLogout() : navigation.navigate(items.link)}}>
                  <View style={styles.iconNameOut}>
                    <View style={styles.IconOuter}>
                        <items.iconName/>
                    </View>
                    <Text style={styles.menuTextName}>{items.linkName}</Text>
                  </View>
                  <View style={styles.iconNextOut}>
                    {items.rightIcon === true ? 
                    <ChevronRight/> :
                      <View style={styles.nextIconTextComb}>
                        <Text style={styles.nextAmount}>{items.rightAmount}</Text>
                        {items.insideIcon === true ? 
                        <ChevronRight/>
                        : null}
                      </View>
                    }
                  </View>
              </TouchableOpacity>
            )
          })}
        </View>
      </ScrollView>
    </View>
  )
}

