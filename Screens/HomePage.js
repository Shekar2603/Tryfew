import { StyleSheet, Text, View, Image , TouchableOpacity,  Pressable, ScrollView, ActivityIndicator } from 'react-native'
import React , {useState ,  useEffect} from 'react'
import {  useNavigation } from '@react-navigation/native'
import { ColorsTheme } from '../utils/ColorsTheme';
import ImagesThemes from '../utils/ImagesTheme';
// import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import Modal from "react-native-modal";
// Svg Images Import
import Menubar from '../assets/svgs/meun-icon.svg';
import CloseRemove from '../assets/svgs/close-remove.svg'
import Timer from './Timer';

export default function HomePage() {

  const navigation =  useNavigation();
  const apiUrl = 'https://www.tryfew.in/try-few-v1/public/'

  const [tabActiver , setTabActiver] = useState('KYC');
  const [cateSelect , setCateSelect] = useState('Ac Services');
  const [userToken , setUserToken] = useState('');
  const [fechedUserData , setFetchedUserData] = useState('');
  const [loader , setLoader] = useState(false);


  const getUserDetails = async () => {
    const response = await AsyncStorage.getItem('userInfo');
    const userParse = JSON.parse(response);
    setUserToken(userParse);
    userDetailsFetch(userParse);
    getData(userParse)
  };

  
    
const userDetailsFetch = async (tokedIn) => {
  console.log(tokedIn)
  // const myHeaders = new Headers();
  // myHeaders.append("token" , 'Bearer ' + tokedIn)
  // myHeaders.append("Authorization" , 'Bearer ' + tokedIn)
  // myHeaders.append("Content-type" , 'application/json')
  setLoader(true)
  try {
      // await fetch(`${apiUrl}api/captain/get-details`, {
        await fetch('https://www.tryfew.in/try-few-v1/public/api/captain/get-details', {
          method: 'GET',
          headers: {
              Accept : "application/json",
              "token": `Bearer ${tokedIn}`,
              "Authorization": `Bearer ${tokedIn}`,
              "Content-Type": "application/json",
          }
      })
      .then((response) => response.json())
      .then(response => {
        console.log(response)
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


const getData = (toked) => {
  console.log("token ===>" , toked)
  fetch('https://www.tryfew.in/try-few-v1/public/api/captain/get-details',
    {
      method: 'GET', // Specify the HTTP method as 'GET'
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',   
        "token": `Bearer ${toked}`,
        'Authorization': `Bearer ${toked}`,
      },
    }
  ).then((response) => response.json())
    .then((responseJson) => {
      console.log("responseJson", responseJson);
    })
    .catch(error => {
      console.error(error);
    })
}


  useEffect(() => {
      getUserDetails();
      navigation.addListener('focus', () => {
        getUserDetails();
    });
  }, [navigation])


  const [homeToggle , setHomeToggle] = useState(true);

  const togglerHomer = () => {
    setHomeToggle(!homeToggle)
  }




//   const handlePayament = () => {
        
//     let options = {
//         description: 'TRY Few Services Payment',
//         image: require('../assets/logo.png'),
//         currency: 'INR',
//         key: 'rzp_test_rrzcoUpUL92MBs',
//         amount: '1000' * 100,
//         name: 'Eat Zone',
//         // order_id: '7214512', 
//         prefill: {
//             email: 'sg83362@gmail.com',
//             contact: '9014579785',
//             name: 'SaiGanesh'
//         },
//         theme: {
//             color: '#fd7616'
//         }
//     }
//   RazorpayCheckout.open(options).then((data) => {        
//     // handle success
//     alert(`Success: ${data.razorpay_payment_id}`);
//     // if(data.razorpay_payment_id) {
//     //     navigation.navigate("NewHomePage")
//     // }
//   }).catch((error) => {
//     // handle failure
//     alert(`Error: ${error.code} | ${error.description}`);
//   });
// }




  const buttonsList = [
    {
      name: 'KYC'
    },
    {
      name: 'Details'
    },
    {
      name: 'Status'
    }
  ]

  const detailsList = [
    {
      leftText: 'User Name',
      rightText: fechedUserData?.name,
    },
    {
      leftText: 'Mail ID',
      rightText: fechedUserData?.email,
    },
    {
      leftText: 'Applied On',
      rightText: fechedUserData?.created_at ? fechedUserData?.created_at : 'Date Recorded',
    },
    {
      leftText: 'Applied For',
      rightText: fechedUserData?.services?.join(', '),
    },
    {
      leftText: 'KYC Status',
      rightText: fechedUserData?.kyc_verified === false ? 'Not Verified' : 'Verified',
    },
  ]



  const categories = [
    {
        name: "Ac Services",
        image: cateSelect == "Ac Services" ? ImagesThemes.acWhite : ImagesThemes.acOrange,
    },
    {
        name: "Cleaning",
        image: cateSelect == "Cleaning" ? ImagesThemes.cleaningOrange : ImagesThemes.cleaningWhite,
    },
    {
      name: "Appliances",
      image: cateSelect == "Appliances" ? ImagesThemes.appliancesWhite : ImagesThemes.appliancesOrange,
    },
    {
      name: "Painting",
      image: cateSelect == "Painting" ? ImagesThemes.paintingOrange : ImagesThemes.paintingWhite,
    },
    {
        name: "Electric",
        image: cateSelect == "Electric" ? ImagesThemes.electriWhite : ImagesThemes.electriOrange,
    },
  ]


  const cateGoryServices = [
    {
      image: ImagesThemes.cleaningHome,
      name: 'House Cleaning',
      address: 'Rajahmundry - Y Junction',
      earnings: 'Earn - ₹320/hr',
      timings: '40-50min'
    },
    {
      image: ImagesThemes.washroom,
      name: 'Washroom Cleaning',
      address: 'Rajahmundry - Kotipalli',
      earnings: 'Earn - ₹500/hr',
      timings: '60-90min'
    },
    {
      image: ImagesThemes.acService,
      name: 'AC Cleaning',
      address: 'Rajahmundry - DivanCheru',
      earnings: 'Earn - ₹200/hr',
      timings: '20-30min'
    },
    {
      image: ImagesThemes.electricService,
      name: 'Electrical',
      address: 'Rajahmundry - Y Junction',
      earnings: 'Earn - ₹320/hr',
      timings: '40-50min'
    },
    {
      image: ImagesThemes.paintingService,
      name: 'Painting',
      address: 'Rajahmundry - DivanCheru',
      earnings: 'Earn - ₹500/hr',
      timings: '60-90min'
    },
    {
      image: ImagesThemes.washroom,
      name: 'Washroom',
      address: 'Rajahmundry - Y Junction',
      earnings: 'Earn - ₹200/hr',
      timings: '20-30min'
    },
  ]




  const styles = StyleSheet.create({
      mainHomeContainer: {
        flex: 1,
        height: '100%',
        backgroundColor: ColorsTheme.White

      },
      homeTopBar: {
        // position: "absolute",
        // top: 33,
        paddingVertical: 20,
        backgroundColor: "#fff",
        width: "100%",
        // marginTop: 33
      },
      homeTextHead: {
        fontFamily: 'Manrope-Bold',
        textAlign: "center",
        fontSize: 18

      },
      bottomProfileMenu: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        justifyContent: "space-between",
        alignItems: "center"
      },
      menuIcon: {
        fontSize: 30,
        color: ColorsTheme.Primary,

      },
      helloText: {
        fontSize: 18,
        fontFamily: 'Manrope-Bold',
        textAlign: "right"
      },
      profileImageTextOuter: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 10
      },
      profileImageCardOuter: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      },
      profileImageStyle:{ 
        width: 50,
        height: 50,
        borderRadius: 50
      },  
      profileCardImage: {
        width: 40,
        height: 40,
        borderRadius: 50
      },

      inactiveText: {
        backgroundColor: ColorsTheme.lightOrange,
        color: ColorsTheme.Primary,
        fontFamily: 'Manrope-SemiBold',
        fontSize:12,
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,

      },
      mainPorfileTopCard: {
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: ColorsTheme.lightBorder,
      },
      cardTabs: {
        flexDirection: 'row',
        backgroundColor: ColorsTheme.gray,
        borderRadius: 50,
        overflow: 'hidden',
        padding: 5,
        justifyContent: "space-between",
        marginBottom: 20,
      },
      tabsBtnsText: {
        fontFamily: 'Manrope-Bold',
        fontSize: 16,
        color: ColorsTheme.Black,
        textAlign: "center"
      },
      singleTabBtn: {
        backgroundColor: ColorsTheme.White,
        borderRadius: 40,
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: "32%"
      },
      uploadphotosOuter: {
          borderWidth: 1,
          borderColor: ColorsTheme.lightBorder,
          borderRadius: 8,
          overflow: 'hidden',
      },
      uploadImage: {
          width: 40,
          height: 40,
          objectFit: 'contain'
      },
      uploadText: {
          fontFamily: 'Manrope-Medium',
          fontSize: 16,
          color: ColorsTheme.Black,
      },
      photoUpHead: {
        fontFamily: 'Manrope-SemiBold',
        fontSize: 17,
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: ColorsTheme.borderColor,
        color: ColorsTheme.Black
    },
    panImage: {
      width: "100%",
      height: 120
    },
    notKYCtext: {
      fontSize: 15,
      color: ColorsTheme.Black,
      fontFamily:'Manrope-Bold'
    },
    redClose: {
      fontSize: 20,
      color: ColorsTheme.Red
    },
    kycNotOuter: {
      backgroundColor: ColorsTheme.lightOrange,
      borderRadius: 50,
      paddingLeft: 8,
      paddingRight: 15,
      paddingVertical: 5,
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      alignSelf: "flex-start",
      marginTop: 15
    },
    profileBottomContent: {
      paddingHorizontal: 15,
      paddingVertical: 25
    },
    mainProfileCard: {
      backgroundColor: ColorsTheme.White,
      elevation: 10,
      borderRadius: 15,
      marginTop: 20
    },
    ScrollInner: {
      paddingHorizontal: 15,
      paddingBottom: 40
    },
    menuIconBtn:{ 
      marginTop: 20
    },
    singleListOut: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "space-between"
    },
    lightTextLeft: {
      fontFamily: 'Manrope-Regular',
      fontSize: 14,
      color: ColorsTheme.Black,
      opacity: 0.7
    },
    darkTextRight: {
      fontFamily: "Manrope-SemiBold",
      fontSize: 14,
      color: ColorsTheme.Black,
      width: '60%'
    }, 
    detailsCardOut: {
      backgroundColor: ColorsTheme.lightGray,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 15,
      flexDirection :'column',
      gap:15
    },
    applicationStatText: {
      fontFamily: 'Manrope-Regular',
      color: ColorsTheme.Black
    },
    backGrayBar: {
      backgroundColor: ColorsTheme.darkGray,
      padding: 3,
      borderRadius: 10,  
    },
    orangeBar: {
      backgroundColor: ColorsTheme.Primary,
      padding: 3,
      borderRadius: 5,  
      width: '50%'
    },
    cateScroll:{
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
      overflow: "hidden"
    },
    ImageOuter: {
      height: 70,
      width: 70,
      flexDirection: "row",
      alignItems : "center",
      justifyContent: "center",
      borderRadius: 10,
      marginHorizontal: 7,
      borderWidth: 1,

  },
  cateImage: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },
  cateName: {
      fontFamily: "Manrope-Medium",
      color: ColorsTheme.Black,
      fontSize: 10,
      textAlign: "center",
      marginTop: 5,
    },
  restByCate:{
      marginBottom: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 30
  },
  restNameChange :{
    color: ColorsTheme.Black,
    fontFamily: 'Manrope-Bold',
    fontSize: 18
  },
  viewallText: {
    fontFamily: 'Manrope-Regular',
    color: '#0496ff'
  },
  cateRests:{
    backgroundColor: ColorsTheme.White,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 10,
  },
  restaurantImage :{
    width: "100%",
    height: 150,
    objectFit: "cover"
  },
  restaurantImage2 :{
    width: "100%",
    height: 100,
    objectFit: "cover"
  },
  kmRest:{
    fontFamily: 'Manrope-Regular',
    color: ColorsTheme.Black
  },
  restaurantNav:{
    width: 15,
    height: 15,
    objectFit: "contain"
  },
  bottomDescRest: {
    position:"relative",
    paddingHorizontal: 15,
    paddingTop: 10, 
    paddingBottom: 20
  },
  resthead:{
    fontFamily: 'Manrope-Bold',
    color: ColorsTheme.Primary,
    fontSize: 20,
    marginBottom: 2
  },
  resthead2: {
    fontFamily: 'Manrope-Bold',
    color: ColorsTheme.Primary,
    fontSize: 15,
    marginBottom: 2
  },
  timingSection:{
    fontFamily: "Manrope-Medium",
    color: ColorsTheme.Black,
    marginBottom: 5
  },
  absRating:{
    width: 40,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor:ColorsTheme.Primary,
    position: "absolute",
    top: -20,
    right:20
  },
  ratingDes:{
    color: ColorsTheme.Black,
    fontFamily: 'Manrope-Bold'
  },
  restDistance: {
    flexDirection: "row",
    // alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  imageRater: {
    flexDirection: "row",
    
    gap: 5
  },
  smallIconImages: {
    width: 20,
    height: 20
  },
  cateRests2: {
    backgroundColor: ColorsTheme.White,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 10,
    marginBottom: 20,
    width: 150,
    marginTop: 20
  },
  bottomDescRest: {
    position:"relative",
    paddingHorizontal: 15,
    paddingTop: 10, 
    paddingBottom: 20
  },
  resthead:{
    fontFamily: 'Manrope-Bold',
    color: ColorsTheme.Primary,
    fontSize: 20,
    marginBottom: 10
  },
  timingSection:{
    fontFamily: "Manrope-Medium",
    color: ColorsTheme.Black,
    marginBottom: 5
  },
  popservhead: {
    color: ColorsTheme.Black,
    fontFamily: 'Manrope-Bold',
    fontSize: 18,
    marginTop: 20
  },

  restScroller :{
    // paddingBottom: 50
  },
  verifiedButton: {
    backgroundColor: ColorsTheme.Primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    color: ColorsTheme.White,
    fontFamily: 'Manrope-Bold',
    alignSelf: 'baseline',
    marginTop: 20
  },
  bottomVerfybutton:{
    marginBottom: 60
  },
  profileCardText: {
    color: ColorsTheme.Black
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


  const HorizontalCategories = () => {
    return (
      <ScrollView  horizontal={true}  showsHorizontalScrollIndicator={false} style={styles.cateScroll}>
          {categories.map((items , index) => {
              return(
                <Pressable style={styles.Iconouter} key={index} onPress={() => {setCateSelect(items.name)}}>
                    <View style={[styles.ImageOuter , { backgroundColor: cateSelect === items.name ? ColorsTheme.Primary : ColorsTheme.White ,       borderColor: cateSelect === items.name ?  ColorsTheme.Primary : ColorsTheme.gray}]}>
                        <Image source={items.image} style={styles.cateImage}/>
                    </View>
                    <Text style={styles.cateName}>{items.name}</Text>
                </Pressable>
              )
          })}
      </ScrollView>
    )
  }

  return (
    <View style={styles.mainHomeContainer}>
      {/* <StatusBar backgroundColor='#fff'/> */}
        <View style={styles.homeTopBar}>
            <Text style={styles.homeTextHead}>Home</Text>
            <View style={styles.bottomProfileMenu}>
              <TouchableOpacity style={styles.menuIconBtn} onPress={() => navigation.openDrawer()}>
                <Menubar/>
              </TouchableOpacity>
              <View style={styles.profileImageTextOuter}>
                <View>
                  <Text style={[styles.helloText , {color: ColorsTheme.Primary}]}>Hello !</Text>
                  <Text style={[styles.helloText , {color: ColorsTheme.Black}]}>Mr {fechedUserData?.name}</Text>
                </View>
                <Image source={{uri: apiUrl + fechedUserData?.profile_img}} style={styles.profileImageStyle}/>
              </View>
            </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.mainScrollerHome}>
          <Modal isVisible={loader}>
              <View style={styles.innerModal}>
                  <View style={styles.innerLoading}>
                      <ActivityIndicator size={'large'} color={ColorsTheme.Primary}/>
                      <Text style={styles.accountReg}>Please Wait</Text>
                  </View>
              </View>
          </Modal> 
          <View style={styles.ScrollInner}>
            {homeToggle ? 
            <View>
              <View style={styles.mainProfileCard}>
                  <View style={styles.mainPorfileTopCard}>
                    <View style={styles.profileImageCardOuter}>
                      <Image source={{uri: apiUrl + fechedUserData?.profile_img}} style={styles.profileCardImage}/>
                      <View>
                        <Text style={[styles.profileCardText , {fontFamily: 'Manrope-SemiBold' ,  fontSize: 14}]}>{fechedUserData?.name}</Text>
                        <Text style={[styles.profileCardText, {fontFamily: 'Manrope-Regular'}]}>{fechedUserData?.email}</Text>
                      </View>
                    </View>
                    <View>
                        <Text style={styles.inactiveText}>Inactive</Text>
                    </View>
                  </View>
                  <View style={styles.profileBottomContent}>
                      <View style={styles.cardTabs}>
                          {buttonsList.map((items , index) => {
                            return (
                              <TouchableOpacity style={[styles.singleTabBtn , {backgroundColor: tabActiver === items.name ? ColorsTheme.White : ColorsTheme.gray}]} key={index} onPress={() => setTabActiver(items.name)}>
                                <Text style={styles.tabsBtnsText}>{items.name}</Text>
                              </TouchableOpacity>
                            )
                          })}
                      </View>
                      {tabActiver === 'KYC' ? 
                        <View style={styles.uploadphotosOuter}>
                          <Text style={styles.photoUpHead}>Uploaded KYC Doc </Text>
                          <Image source={{uri: apiUrl + fechedUserData?.document_path}} style={styles.panImage}/>
                        </View> : null
                      }
                      {tabActiver === 'Details' ? 
                          <View style={styles.detailsCardOut}>
                              {detailsList.map((items , index) => {
                              return (
                                <View style={styles.singleListOut} key={index}>
                                  <Text style={styles.lightTextLeft}>{items.leftText}</Text>
                                  <Text style={styles.lightTextLeft}>:</Text>
                                  <Text style={styles.darkTextRight}>{items.rightText}</Text>
                                </View>
                              )
                              })} 
                          </View> : null
                      }
                      {tabActiver === 'Status' ? 
                        <View style={styles.detailsCardOut}>
                            <View style={styles.singleListOut}>
                              <Text style={styles.lightTextLeft}>KYC Status</Text>
                              <Text style={styles.darkTextRight}>Approval Pending</Text>
                            </View>
                            <View style={styles.backGrayBar}><View style={styles.orangeBar}></View></View>
                            <Text style={styles.applicationStatText}> Your Application is in progress ,  admin has to approve your application - please be patient</Text>
                        </View> : null
                      }
                      {fechedUserData.kyc_verified === false ? <View style={styles.kycNotOuter}>
                        <CloseRemove/>
                        <Text style={styles.notKYCtext}>KYC not verified</Text>
                      </View> : null }
                  </View>
              </View>
            </View> :
            <View>
              <HorizontalCategories/>
              <View style={styles.CategorySection}>
                  <View style={styles.restByCate}>
                      <Text style={styles.restNameChange}>{cateSelect + " "} For You</Text>
                      <TouchableOpacity><Text style={styles.viewallText}>View All</Text></TouchableOpacity>
                  </View>
                  <View>
                    {cateGoryServices && cateGoryServices.length > 0 ? cateGoryServices.map((items , index) => {
                      return (
                        <TouchableOpacity style={[styles.cateRests , {marginBottom: 15}]} key={index}>
                            <View style={styles.restImageSec}>
                              <Image source={items.image} style={styles.restaurantImage}/>
                            </View>
                            <View style={styles.bottomDescRest}>
                              <Text style={styles.resthead}>{items.name}</Text>
                              <Text style={styles.kmRest}>{items.address}</Text>
                              <View style={styles.restDistance}>
                                <View style={styles.imageRater}>
                                  <Image style={styles.smallIconImages} source={ImagesThemes.walletIcon}/>
                                  <Text style={styles.ratingDes}>{items?.earnings}</Text>
                                </View>
                                <View style={styles.imageRater}>
                                  <Image style={styles.smallIconImages} source={ImagesThemes.timer}/>
                                  <Text style={styles.timingSection}>{items?.timings}</Text>
                                </View>
                              </View>
                            </View>
                        </TouchableOpacity>
                      )
                    }): null}
                  </View>
              </View>
              <View><Text style={styles.popservhead}>Popular Services</Text></View>
              <ScrollView style={styles.restScroller}  scrollEventThrottle={200} horizontal={true} showsHorizontalScrollIndicator={false}>
                  {cateGoryServices.map((items, index) => {
                    const lastItem = index === cateGoryServices.length - 1;
                    const firstItem = index === 0;
                    return (
                        <TouchableOpacity key={index} style={[styles.cateRests2 , {marginLeft: firstItem ? 0 : 15 , marginRight: lastItem ? 15 : 0}]}>
                            <Image source={ items.image } style={styles.restaurantImage2}/>
                            <View style={styles.bottomDescRest}>
                                <Text style={styles.resthead2}>{items.name}</Text>
                                <Text style={styles.timingSection}>{items.earnings}</Text>
                            </View>
                    </TouchableOpacity>
                    );
                  })}
              </ScrollView>
            </View>}
            {/* <View style={styles.bottomVerfybutton}>
                <TouchableOpacity onPress={togglerHomer}><Text style={styles.verifiedButton}>Click to show {homeToggle ? 'Verified Home' : 'Non-Verified Home'}</Text></TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
          <Timer/>
    </View>
  )
}

