import { StyleSheet, Text, View , TouchableOpacity, Pressable , ScrollView } from 'react-native'
import React , {useState , useEffect}  from 'react';
import { reusableStyles } from '../../utils/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
import { ColorsTheme } from '../../utils/ColorsTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import LeftIcon from '../../assets/svgs/left-arrow.svg'




const TransactionHistory = () => {

    const navigation = useNavigation();
    const apiUrl = 'https://www.tryfew.in/try-few-v1/public/'

    const [userToken , setUserToken] = useState('');
    const [transactionsFetched , setTransactionsFetched] = useState([])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getUserDetails();
        });
    
        return unsubscribe;
      }, [navigation]);


    const getUserDetails = async () => {
      const response = await AsyncStorage.getItem('userInfo');
      const userParse = JSON.parse(response);
      setUserToken(userParse);
      userDetailsFetch(userParse)
    };

    const userDetailsFetch = async (tokedIn) => {
        try {
            await fetch(`${apiUrl}api/captain/wallet/transactions`, {
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
                  console.log(response)
                  setTransactionsFetched(response?.transactions);
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

      const formatDate = (dateString) => {
        const date = new Date(dateString);
      
        // Extract day, month, and year
        const day = date.getDate().toString().padStart(2, "0"); // Ensure 2 digits
        const month = date.toLocaleString("default", { month: "short" }); // Short month name
        const year = date.getFullYear();
      
        return `${day} ${month} ${year}`;
      };


    const styles = StyleSheet.create({
        containerForTopNav: {
            flex: 1,
            backgroundColor: ColorsTheme.White
        },
        topTextSec: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20
        },
        middleInner:{
             flexDirection: 'row',
             gap: 10
        },
        middleInner2: {
            flexDirection: 'row',
            gap: 10
        },
        middleTextOuter:{
            flexDirection: "row",
            justifyContent: 'space-between',
            marginTop: 10
        },
        lastTransact:{ 
            flexDirection: "row",
            gap: 15,
            marginTop: 10
        },
        mainServiceText: {
            fontFamily: 'Manrope_600SemiBold',
            fontSize: 16,
            color: ColorsTheme.Black
        },
        mainServiceDate: {
            fontFamily: 'Manrope_400Regular',
            opacity: 0.5
        },
        leftpartText:{ 
            fontFamily: 'Manrope_400Regular',
            color: ColorsTheme.Black,
            fontSize: 14,

        },
        rigthpartText: {
            fontFamily: 'Manrope-Regular',
            fontSize: 16
        },
        sortbuttons: {
            fontFamily: 'Manrope_700Bold',
            fontSize: 16,
            color: ColorsTheme.Primary,
            backgroundColor: ColorsTheme.lightOrange,
            paddingHorizontal: 20,
            paddingVertical: 8,
            alignSelf: 'flex-start',
            borderRadius: 20
        },
        topSorters: {
            flexDirection: 'row',
            gap: 15,
            justifyContent: "flex-end",
            marginBottom: 20
        },
        singleTransact: {
            elevation: 15,
            backgroundColor: ColorsTheme.White,
            borderRadius: 12,
            paddingHorizontal: 15,
            paddingVertical: 15,

        },
        innerScrollViewTransact: {
            paddingHorizontal: 15,
            paddingBottom: 20,
            paddingTop: 15
        },
        outerTransactionsSec: {
            flexDirection: 'column',
            gap: 20
        },
        WalletAmountDisplay: {
            fontSize: 24,
            fontFamily: 'Manrope-Bold',
            color: ColorsTheme.Black
        },
        successBand: {
            backgroundColor: "#0f9d58",
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 20,
            color: ColorsTheme.White,
            position: 'absolute',
            top: 15,
            right: 15,
            fontFamily: 'Manrope-SemiBold'
        },
        createdDate: {
            color: ColorsTheme.Primary,
            fontFamily: 'Manrope-Bold'
        },
        noTransText: {
            fontFamily: 'Manrope-SemiBold',
            color: ColorsTheme.Black,
            textAlign: 'center',
            fontSize: 18
        },
        addMoneyBtn: {
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 12,
            backgroundColor: ColorsTheme.Primary,
            width: '100%',
            marginTop: 60,
        },
        addMoneyBtnText: {
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'Manrope-Bold',
            color: ColorsTheme.White
        }
        

    })

    
    const transactionData = [
        {
            serviceTitle: 'AC Services',
            serviceDate: '30/10/2024',
            status: 'Success',
            amount: 'Rs.350',
            location: 'Rajahmundry - Y Junction'
        },
        {
            serviceTitle: 'Cleaning Services',
            serviceDate: '18/10/2024',
            status: 'Unsuccessfull',
            amount: 'Rs.000',
            location: 'Rajahmundry - Kotipalli'
        },
        {
            serviceTitle: 'AC Cleaning',
            serviceDate: '14/10/2024',
            status: 'Success',
            amount: 'Rs.450',
            location: 'Rajahmundry - Divancheruvu'
        },
        {
            serviceTitle: 'House Cleaning',
            serviceDate: '10/10/2024',
            status: 'Success',
            amount: 'Rs.700',
            location: 'Rajahmundry - IDEAL College'
        },
        {
            serviceTitle: 'House Cleaning',
            serviceDate: '10/10/2024',
            status: 'Success',
            amount: 'Rs.700',
            location: 'Rajahmundry - IDEAL College'
        },
    ]

    

  return (
    <View style={styles.containerForTopNav}>
        <View style={reusableStyles.topHeadNavigation}>
            <TouchableOpacity onPress={() => navigation.navigate('HomePage')}>
                {/* <Ionicons name='arrow-back' style={reusableStyles.backwardIcon}></Ionicons> */}
                <LeftIcon/>
            </TouchableOpacity>
            <Text style={reusableStyles.topNavmiddleText}>Transaction History</Text>
        </View>
        <ScrollView style={styles.mainScrollerTransaction}>
            <View style={styles.innerScrollViewTransact}>
                {/* <View style={styles.topSorters}>
                    <TouchableOpacity><Text style={styles.sortbuttons}>Sort A-Z</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.sortbuttons}>Sort By Date</Text></TouchableOpacity>
                </View> */}
                <View style={styles.outerTransactionsSec}>
                    {transactionsFetched && transactionsFetched?.length > 0 ? transactionsFetched.map((items , index) => {
                        return (
                        <View style={styles.singleTransact} key={index}>
                            {/* <View style={styles.topTextSec}>
                                <Text style={styles.mainServiceText}>{items.serviceTitle}</Text>
                                <Text style={styles.mainServiceDate}>{items.serviceDate}</Text>
                            </View> */}
                            <View>
                                <Text style={styles.WalletAmountDisplay}>Rs. {items?.amount}</Text>
                            </View>
                            <View style={styles.middleTextOuter}>
                                <Text style={[styles.rigthpartText , {color: items?.transaction_type === 'credit' ? ColorsTheme.green : ColorsTheme.Red}]}>{items?.transaction_type}</Text>
                                {/* <View style={styles.middleInner2}>
                                    <Text style={styles.leftpartText}>Amount</Text>
                                    <Text style={[styles.rigthpartText , {color: items.status === 'Success' ? ColorsTheme.darakBlue : ColorsTheme.Red}]}>{items.amount}</Text>
                                </View> */}
                                <Text style={styles.createdDate}>{formatDate(items?.created_at)}</Text>
                            </View>
                            {/* <View style={styles.lastTransact}>
                                <Text style={styles.leftpartText}>Location</Text>
                                <Text style={[styles.rigthpartText , {color: ColorsTheme.darakBlue}]}>{items.location}</Text>
                            </View> */}
                            <Text style={styles.successBand}>Success</Text>
                        </View>
                        )
                    }) : 
                    <View>
                        <LottieView 
                            source={require('../../assets/animations/astro.json')}
                            autoPlay
                            style={{
                                width: 320,
                                height: 320,
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}
                        />
                        <Text style={styles.noTransText}>No Transactions Found On Your Account</Text>
                        <TouchableOpacity style={styles.addMoneyBtn} onPress={() => navigation.navigate('WalletScreen')}>
                            <Text style={styles.addMoneyBtnText}>Add Money ?</Text>
                        </TouchableOpacity>
                    </View>
                    }
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default TransactionHistory

