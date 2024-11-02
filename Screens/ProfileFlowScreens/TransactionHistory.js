import { StyleSheet, Text, View , TouchableOpacity, Pressable , ScrollView } from 'react-native'
import React from 'react';
import { reusableStyles } from '../../utils/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
import { ColorsTheme } from '../../utils/ColorsTheme';


import LeftIcon from '../../assets/svgs/left-arrow.svg'



const TransactionHistory = () => {

    const navigation = useNavigation();


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
            marginBottom: 10
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
            fontFamily: 'Manrope_600SemiBold',
            fontSize: 14
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
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                {/* <Ionicons name='arrow-back' style={reusableStyles.backwardIcon}></Ionicons> */}
                <LeftIcon/>
            </TouchableOpacity>
            <Text style={reusableStyles.topNavmiddleText}>Transaction History</Text>
        </View>
        <ScrollView style={styles.mainScrollerTransaction}>
            <View style={styles.innerScrollViewTransact}>
                <View style={styles.topSorters}>
                    <TouchableOpacity><Text style={styles.sortbuttons}>Sort A-Z</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.sortbuttons}>Sort By Date</Text></TouchableOpacity>
                </View>
                <View style={styles.outerTransactionsSec}>
                    {transactionData.map((items , index) => {
                        return (
                        <View style={styles.singleTransact} key={index}>
                            <View style={styles.topTextSec}>
                                <Text style={styles.mainServiceText}>{items.serviceTitle}</Text>
                                <Text style={styles.mainServiceDate}>{items.serviceDate}</Text>
                            </View>
                            <View style={styles.middleTextOuter}>
                                <View style={styles.middleInner}>
                                    <Text style={styles.leftpartText}>Status</Text>
                                    <Text style={[styles.rigthpartText , {color: items.status === 'Success' ? ColorsTheme.green : ColorsTheme.Red}]}>{items.status}</Text>
                                </View>
                                <View style={styles.middleInner2}>
                                    <Text style={styles.leftpartText}>Amount</Text>
                                    <Text style={[styles.rigthpartText , {color: items.status === 'Success' ? ColorsTheme.darakBlue : ColorsTheme.Red}]}>{items.amount}</Text>
                                </View>
                            </View>
                            <View style={styles.lastTransact}>
                                <Text style={styles.leftpartText}>Location</Text>
                                <Text style={[styles.rigthpartText , {color: ColorsTheme.darakBlue}]}>{items.location}</Text>
                            </View>
                        </View>
                        )
                    })}
                </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default TransactionHistory

