import { StyleSheet, Text, View , Image , Pressable , ScrollView , TouchableOpacity , TextInput, Keyboard, ToastAndroid , ActivityIndicator} from 'react-native'
import React , {useState ,  useEffect} from 'react';
import ImagesThemes from '../../utils/ImagesTheme';
import { ColorsTheme } from '../../utils/ColorsTheme';
// import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { Formik } from 'formik';
import { walletAdderSchema } from '../Auth/Validation';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



// Svg Images Import
import CloseIcon from '../../assets/svgs/close-remove.svg';
import ChevronLeft from '../../assets/svgs/orange-left-chevron.svg';
import CheckMark from '../../assets/svgs/check.svg';
import LogoRazr from '../../assets/logo.png';
import RazorpayCheckout from 'react-native-razorpay'






const WalletScreen = ({route}) => {
    
    const apiUrl = 'https://www.tryfew.in/try-few-v1/public/'

    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getUserDetails();
        });
    
        return unsubscribe;
      }, [navigation]);

    const [isModalVisible , setModalVisible] = useState(false);

    const [isSuccessVisible ,  setIsSuccessVisible] = useState(false);
    const [razAmount ,  setRazAmount] = useState();
    const [paymentLoader ,  setPaymentLoader] = useState(false)

    const [activePackage , setActivePackage] = useState({
        title: '₹ 299',
        validity: '1 Month',
        amount: 299
    },)


    const [userToken , setUserToken] = useState('');
    const [fetchedUserData , setFetchedUserData] = useState({})

    const getUserDetails = async () => {
      const response = await AsyncStorage.getItem('userInfo');
      const userParse = JSON.parse(response);
      setUserToken(userParse);
      userDetailsFetch(userParse)
    };


    const userDetailsFetch = async (tokedIn) => {
        setPaymentLoader(true)
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
                // console.log(response)
                setPaymentLoader(false)
                setFetchedUserData(response?.data);
              }
          })  
          .catch((error) => {
            setPaymentLoader(false)
              console.error(error, "error");
              throw Error(error);
          });
    
        } catch (error) {
            setPaymentLoader(false)
          console.log(error , 'errors')
        }
    }

    // const handleAddWalletAmt = (values) => {
    //     const numericValue = Number(values.amount)
    //     console.log(numericValue)
    //     if(numericValue === 430) {
    //         setModalVisible(true)
    //     }else {
    //         setAddMoneyVisible(true)
    //         ToastAndroid.show('You need to add minimum Rs.430' , ToastAndroid.LONG);
    //         setModalVisible(false)
    //     }
    // }

    console.log(fetchedUserData, "fetched")

    const amountPackages = [
        {
            title: '₹ 299',
            validity: '1 Month',
            amount: 299
        },
        {
            title: '₹ 599',
            validity: '2 Months (56days) + 28days Free',
            amount: 599
        },
        {
            title: '₹ 999',
            validity: '3 Months (84days) + 84days Free ',
            amount: 999
        },
    ]

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const createOrderHandler = async() => {
        const obj = {
            amount: activePackage?.amount
        }
        console.log(obj , userToken ,"sjfvbhshj")
        setPaymentLoader(true)
        try {
            await fetch(`${apiUrl}api/captain/razorpay/create-order`, {
                method: 'post',  
                body: JSON.stringify(obj),
                headers: {
                    "Authorization": "Bearer " + userToken,
                    "token": 'Bearer ' + userToken,
                    "Content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then(response => {
                console.log(response)
                if(response?.success == true || response?.order_id) {
                    setPaymentLoader(false)
                    initiatePayment(activePackage?.amount , response?.key , response?.order_id)
                }
            })  
            .catch((error) => {
                setPaymentLoader(false)
                console.error(error, "error");
                throw Error(error);
            });
        
        } catch (error) {
            console.log(error , 'errors')
        }
          
    }

    const initiatePayment = (amount, razorKey, orderId) => {
        console.log(amount, razorKey, orderId)
        const options = {
        //   razorKey,
          key: razorKey,
          amount: amount * 100, 
          currency: 'INR',
          name: 'Try Few',
          description: 'Payment for your order',
          order_id: orderId, 
          prefill: {
            email: 'sg83362@gmail.com', 
            contact: '9030598490', 
            name: 'Sreedhar P', 
          },
          theme: {
            color: '#3399cc',
          },
        };
    
        RazorpayCheckout.open(options).then((data) => {
            // console.log(data , 'pay')
            // alert(`Your Payment is Success: ${data?.razorpay_payment_id}`);
            walletVerifier(data ,amount)
            setIsSuccessVisible(true)
            setRazAmount(amount)

            }).catch((error) => {
            ToastAndroid.show('Payment Got Cancelled' , ToastAndroid.LONG);
            // alert(`Error: ${error.code} | ${error.description}`);
        });
    };

    const walletVerifier = async(data , razmount) => {

        // const formData = new FormData()
        // formData.append('amount' , razmount);
        // formData.append('razorPaymentId', data.razorpay_payment_id);
        // formData.append('razorOrderId', data.razorpay_order_id);
        // formData.append('razorSignature', data.razorpay_signature);
  
        // console.log(formData)

        const verifierObj = {
            amount: razmount,
            razorPaymentId: data.razorpay_payment_id,
            razorOrderId: data.razorpay_order_id,
            razorSignature: data.razorpay_signature,
            description: null
        }
        console.log(verifierObj , "verifier-called")
        setPaymentLoader(true)
        try {
            await fetch(`https://www.tryfew.in/try-few-v1/public/api/captain/wallet/add-money`, {
                method: 'POST',  
                body: JSON.stringify(verifierObj),
                headers: {
                    "Authorization": "Bearer " + userToken,
                    "token": 'Bearer ' + userToken,
                    "Content-type": "application/json",
                }
            })
            .then((response) => response.json())
            .then(response => {
                console.log(response)
                getUserDetails()
                userDetailsFetch(userToken)
                setPaymentLoader(false)
            })  
            .catch((error) => {
                setPaymentLoader(false)
                console.error(error, "error");
                throw Error(error);
            });
        
        } catch (error) {
            setPaymentLoader(false)
            console.log(error , 'errors')
        }
    }

    

    console.log('razAmount' , razAmount)

    const formatDate = (dateString) => {
        const date = new Date(dateString);
      
        // Extract day, month, and year
        const day = date.getDate().toString().padStart(2, "0"); // Ensure 2 digits
        const month = date.toLocaleString("default", { month: "short" }); // Short month name
        const year = date.getFullYear();
      
        return `${day} ${month} ${year}`;
      };


    
    const styles = StyleSheet.create({
        mainProfileContainer: {
            flex: 1,
            // position: 'relative'
            backgroundColor: ColorsTheme.White
        },
        modalCloser: {
            width: 20,
            height: 20
        },  
        TopProfileDisplay: {
            // position: 'absolute',
            // top: 0,
            backgroundColor: ColorsTheme.Primary,
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
            width:'100%',
            paddingTop: 15,
            paddingBottom: 40
        },
        profileImageTop: {
            width: 100,
            height: 100,
            borderRadius: 100,
            borderWidth: 2,
            borderColor:  ColorsTheme.White
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
            fontFamily: 'Manrope-SemiBold',
            color: ColorsTheme.White,
            textAlign: 'center',
            marginTop: 10
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
            paddingHorizontal: 20,
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
            marginVertical: 15
        },
        walletInputText: {
            fontFamily: "Manrope-Medium",
            opacity: 1,
            color: ColorsTheme.Black,
            fontSize: 14,
        },  
        walletInputText2: {
            fontFamily: "Manrope-Medium",
            opacity: 1,
            color: ColorsTheme.Black,
            fontSize: 14
        },  
        SuccesswalletInputText:{
            fontFamily: "Manrope-Medium",
            color: ColorsTheme.Black,
            fontSize: 14,
            width: '80%',
            textAlign: 'center',
            marginLeft: "auto",
            marginRight: "auto"
        },  
        passwordMover: {
            position: "absolute",
            right: 20,
            top: 16
        },
        passwordshow: {
            fontSize: 24
        },
        submitbtn2:{
            marginTop: 10
        },
        
        signinbtn: {
            backgroundColor: ColorsTheme.Primary,
            height: 50,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
        },
        signinnertwo: {
            fontSize: 18,
            color: ColorsTheme.White,
            fontFamily: 'Manrope-Bold'
        },
        forgotLink: {
            fontFamily:  'Manrope-Medium',
            fontSize: 16,
            color: ColorsTheme.Black
        },
        submitbtn: {
            marginTop: 20,
            marginBottom:  0
        },
        signInHeadText: {
            fontFamily: "Poppins-Medium",
            fontSize: 30,
            color: ColorsTheme.Black
        },
        walletBalHead: {
            fontFamily: 'Manrope-SemiBold',
            fontSize: 20,
            textAlign: 'center',
            color: ColorsTheme.Black
        },
        walletBalText: {
            fontFamily: 'Poppins-SemiBold',
            fontSize: 35,
            textAlign: 'center',
            lineHeight: 45,
            color: ColorsTheme.Black
        },
        borderDiver: {
            width: '80%',
            height: 1,
            backgroundColor: ColorsTheme.gray,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        lastAddedServSec: {
            flexDirection: "row",
            gap: 60,
            justifyContent: "center",
            marginVertical: 30
        },
        nofServicesicons: {
            height: 30,
            width: 30,
            objectFit: 'contain'
        },
        leftServicesBlk: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5
        },
        noofServTop: {
            fontSize: 16,
            fontFamily: 'Manrope-Regular',
            color: ColorsTheme.Black
        },
        noofServBold: {
            fontFamily: 'Manrope-Bold',
            fontSize: 20,
            color: ColorsTheme.Black
        },
        modalSectionOuter: {
            backgroundColor: "#fff",
            borderRadius: 20,
            position: "relative",
            paddingTop: 20,
            paddingBottom: 15,
            paddingHorizontal: 15
        },
        modalSectionOuter2: {
            backgroundColor: "#fff",
            borderRadius: 20,
            position: "relative",
            paddingTop: 15,
            paddingBottom: 15,
            paddingHorizontal: 15
        },
        modalCloseAbs: {
            position: "absolute",
            top: 10,
            right: 10,
        },
        closeIcon: {
            color: ColorsTheme.Red,
            fontSize: 30
        },
        modalHeader: {
            fontSize: 20,
            fontFamily: 'Manrope-Bold',
            textAlign: "center",
            marginBottom: 30,
            color:ColorsTheme.Black
        },
        successModalHeader: {
            fontSize: 20,
            fontFamily: 'Manrope-Bold',
            textAlign: "center",
            marginBottom: 10,
            color: ColorsTheme.Black
        },
        successGif:{ 
            width: 200,
            height: 200,
            marginLeft: 'auto',
            marginRight: 'auto'
        },
        WalletSucAmt: {
            fontFamily: 'Manrope-Bold',
            fontSize: 30,
            textAlign: "center",
            marginTop: 20,
            marginBottom: 10,
            color: ColorsTheme.Black
        },
        groupWalletSelectors: {
            marginVertical: 15,
            flexDirection: 'colmn',
            gap: 15
        },  
        flexPlans: {
            flexDirection: 'row',
            alignItems: "center",
            gap: 15
        },
        singleWalletSelector: {
            paddingHorizontal: 20,
            borderWidth: 1,
            borderRadius: 10,
            paddingVertical: 15,
            position: 'relative'
        },
        singleSelectText :{
            fontFamily: 'Manrope-ExtraBold',
            fontSize: 22,
        },
        absCheker: {
            position: 'absolute',
            right: 15,
            top: 15
        },
        planText: {
            fontSize: 14,
            fontFamily: 'Manrope-Semibold',
            marginTop: 5,
            width: '65%'
        },
        selectedPlan: {
            fontSize: 14,
            fontFamily: 'Manrope-Semibold',
            marginBottom: 10,
            color: ColorsTheme.Black,
        },
        boldText: {
            fontFamily: "Manrope-ExtraBold",
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
    
      return (
        <View style={styles.mainProfileContainer}>
          <View style={styles.TopProfileDisplay}>
              <View style={styles.profileBackOuter}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('HomePage')}>
                    <ChevronLeft/>
                </TouchableOpacity>
                <Text style={styles.profileHead}>Wallet</Text>
              </View>
              <View style={styles.imageSectionProfile}>
                <View style={styles.ProfileimageIconer}>
                    <Image source={{uri: apiUrl + fetchedUserData?.profile_img}} style={styles.profileImageTop}/>
                    <Text style={styles.nameSec}>{fetchedUserData?.name}</Text>
                    {/* <Text style={styles.nameSec}>{fetchedUserData?.email}</Text> */}
                </View>
              </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.innerScrollerProfile}>

                <Modal isVisible={isModalVisible}>
                    <View style={styles.modalSectionOuter2}>
                        <View style={styles.modalCloseAbs}>
                            <TouchableOpacity style={styles.modalCloser} onPress={toggleModal}>
                                <CloseIcon/>
                            </TouchableOpacity>
                        </View>
                        {isSuccessVisible ?
                        <View>
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
                            <Text style={styles.successModalHeader}>Payment Success</Text>
                            <Text style={styles.SuccesswalletInputText}>Your money has been successfully added to the walley</Text>    
                            <Text style={styles.WalletSucAmt}>₹{activePackage?.amount}</Text>
                            <View style={styles.submitbtn2}>
                                {/* <TouchableOpacity style={styles.signinbtn} onPress={initiatePayment}>
                                    <Text style={styles.signinnertwo}>Okay Lets Go</Text>
                                </TouchableOpacity>       */}
                                <TouchableOpacity style={styles.signinbtn} onPress={() => {setModalVisible(false) ; setIsSuccessVisible(false)}}>
                                    <Text style={styles.signinnertwo}>Okay Lets Go</Text>
                                </TouchableOpacity>      
                            </View>
                        </View> :
                        <View>
                            <Text style={styles.modalHeader}>Select Amount</Text>
                            <Text style={styles.walletInputText}>Select Amount to Add to Wallet</Text>
                            <View style={styles.groupWalletSelectors}>
                                {amountPackages.map((items , index) => {
                                    return (
                                        <TouchableOpacity style={[styles.singleWalletSelector , {backgroundColor: activePackage?.title === items.title ? ColorsTheme.Primary : ColorsTheme.White , borderColor:activePackage?.title === items.title ? ColorsTheme.Primary : ColorsTheme.borderColor,}]} key={index} onPress={() => setActivePackage(items)}>
                                            <View style={styles.flexPlans}>
                                                <Text style={[styles.singleSelectText , {color: activePackage?.title === items.title ? ColorsTheme.White : ColorsTheme.Black}]}>{items.title}</Text>
                                                <Text style={[styles.planText , {color: activePackage?.title === items.title ? ColorsTheme.White : ColorsTheme.Black,}]}>{items.validity} Plan</Text>
                                            </View>
                                            {activePackage?.title === items.title ? <View style={styles.absCheker}>
                                                <CheckMark/>
                                            </View> : null}
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                            <Text style={styles.selectedPlan}>
                                <Text style={styles.boldText}>Note:</Text> You have Selected {activePackage?.title} Plan which is valid for an {activePackage?.validity}.
                            </Text>
                            <Text style={styles.walletInputText2}>50% Cashback Guarantee . We are using razorpay payment gateway. it will take 2-3 minutes to update the wallet balance , Terms & Conditions Apply</Text>    
                            <View style={styles.submitbtn}>
                                <TouchableOpacity style={styles.signinbtn} onPress={createOrderHandler}>
                                    <Text style={styles.signinnertwo}>Add Money</Text>
                                </TouchableOpacity>      
                                {/* <TouchableOpacity style={styles.signinbtn} onPress={() => setIsSuccessVisible(true)}>
                                    <Text style={styles.signinnertwo}>Add Money</Text>
                                </TouchableOpacity>       */}
                            </View>
                        </View>
                         }
                    </View>
                </Modal>
                <Modal isVisible={paymentLoader}>
                    <View style={styles.innerModal}>
                        <View style={styles.innerLoading}>
                            <ActivityIndicator size={'large'} color={ColorsTheme.Primary}/>
                            <Text style={styles.accountReg}>Please Wait</Text>
                        </View>
                    </View>
                </Modal>
                <Text style={styles.walletBalHead}>Wallet Balance</Text>
                <Text style={styles.walletBalText}>Rs. {fetchedUserData?.wallet?.balance ? fetchedUserData?.wallet?.balance : '0.00'}</Text>
                <View style={styles.borderDiver}></View>
                <View style={styles.lastAddedServSec}>
                    <View style={styles.leftServicesBlk}>
                        <Image source={ImagesThemes.calandarIcon} style={styles.nofServicesicons} />
                        <Text style={styles.noofServTop}>Last Added on</Text>
                        {fetchedUserData?.wallet?.updated_at ? 
                            <Text style={styles.noofServBold}>{formatDate(fetchedUserData?.wallet?.updated_at)}</Text> : 
                            <Text style={styles.noofServBold}>Not Yet Added</Text>
                        }
                    </View>
                    {/* <View style={styles.leftServicesBlk}>
                        <Image source={ImagesThemes.noServ} style={styles.nofServicesicons} />
                        <Text style={styles.noofServTop}>No of Payents</Text>
                        <Text style={styles.noofServBold}>13 Transactions</Text>
                    </View> */}
                </View>

                <View style={styles.submitbtn}>
                    <TouchableOpacity style={styles.signinbtn} onPress={() => setModalVisible(true)}>
                        <Text style={styles.signinnertwo}>Add Money</Text>
                    </TouchableOpacity>      
                </View>
            </View>
          </ScrollView>
        </View>
      )
}

export default WalletScreen

