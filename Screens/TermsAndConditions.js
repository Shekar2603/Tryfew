import { StyleSheet, Text, View, Pressable, TouchableOpacity, ScrollView , Image  } from 'react-native'
import React from 'react'
import { ColorsTheme } from '../utils/ColorsTheme';
import { useNavigation } from '@react-navigation/native';
import ImagesThemes from '../utils/ImagesTheme';


// Svg Images Import
import LeftArrow from '../assets/svgs/left-arrow.svg'

export default function TermsAndConditions() {
    const navigation = useNavigation();

    
    const TermsParas = [
        {
            textHead: "1. Acceptance of Terms",
            textPara: 'By accessing or using our services, you agree to be bound by these terms and conditions, as well as our Privacy Policy.'
        },
        {
            textHead: "2.  Account Registration",
            textPara: 'You are responsible for maintaining the confidentiality of your account login details.'
        },
        {
            textHead: "3.  Services",
            textPara: 'Our app provides a platform to connect users with household service providers.'
        },
        {
            textHead: "4.  Payments",
            textPara: 'Payments for services are made through the app using approved payment methods. You agree to pay all charges associated with the services you receive.'
        },
        {
            textHead: "5.  Cancellations and Refunds",
            textPara: 'Cancellation policies may vary depending on the service provider.'
        },
    ]
    
    const styles = StyleSheet.create({
        conatinerForTopNav: {
            // backgroundColor: ColorsTheme.White,
            flex: 1,
        },
        topHeadNavigation: {
            // marginTop: 33,
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor:ColorsTheme.White,
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: ColorsTheme.gray
        },
        backwardIcon: {
            fontSize: 20,
            color: ColorsTheme.Primary
        },
        topNavmiddleText: {
            fontFamily: "Manrope-Medium",
            fontSize: 18,
            textAlign: 'center',
            width: '90%',
            color:ColorsTheme.Black
        },
        termsImage: {
            width: 60,
            height: 60
        },
        tcImageBgBlock: {
            padding: 15,
            backgroundColor: ColorsTheme.lightOrange,
            flexDirection: "row",
            gap: 15,
            
        },
        termscondHead: {
            fontSize: 22,
            fontFamily: 'Manrope-Bold',
            width: '70%',
            color: ColorsTheme.Black
        },
        acceptText: {
            fontSize: 16,
            fontFamily: 'Manrope-Regular',
            marginTop: 10,
            color: ColorsTheme.Black
        },
        singleListersTerms: {
            marginTop: 20
        },
        pageScrollerMain: {
            height: '100%',
            backgroundColor: ColorsTheme.White,
        },
        innerScrollViewText: {
            paddingHorizontal: 15,
            paddingBottom: 50
        },
        TermsHeadText: {
            fontFamily: 'Manrope-Bold',
            fontSize: 17,
            marginBottom: 5,
            color: ColorsTheme.Black
        },
        TermsContentText: {
            fontFamily: 'Manrope-Regular',
            fontSize: 15,
            color:  ColorsTheme.Black
        },
        bottomAcceptBar: {
            padding: 20,
            backgroundColor: ColorsTheme.White,
            borderTopColor: ColorsTheme.borderColor,
            borderTopWidth: 1,
            flexDirection: "row",
            gap: 15

        },
        declineBtn: {
            backgroundColor: ColorsTheme.White,
            width: '48%',
            padding: 6,
            borderRadius: 5,
            borderWidth: 1
        },
        acceptBtn: {
            backgroundColor: ColorsTheme.lightOrange,
            width: '48%',
            padding: 7,
            borderRadius: 5
        },
        declineBtnText: {
            fontSize: 18,
            fontFamily: 'Manrope-SemiBold',
            textAlign: "center",
            color: ColorsTheme.Black
        },
        acceptBtnText: {
            fontSize: 18,
            fontFamily: 'Manrope-SemiBold',
            textAlign: "center",
            color: ColorsTheme.Primary
        }

    })

  return (
    <View style={styles.conatinerForTopNav}>
      <View style={styles.topHeadNavigation}>
            <TouchableOpacity onPress={() => navigation.navigate('WelcomeScreen')}>
                <LeftArrow/>
            </TouchableOpacity>
            <Text style={styles.topNavmiddleText}>Terms and Conditions</Text>
      </View>
      <ScrollView style={styles.pageScrollerMain} showsVerticalScrollIndicator={false}>
        <View style={styles.tcImageBgBlock}>
            <Image source={ImagesThemes.tcImage} style={styles.termsImage}/>
            <Text style={styles.termscondHead}>Updates to our terms & conditions</Text>
        </View>
        <View style={styles.innerScrollViewText}>
            <Text style={styles.acceptText}>Review and accept our terms and conditons to continue working with TryFew</Text>
            {TermsParas.map((items , index) => {
                    return (
                        <View style={styles.singleListersTerms} key={index}>
                            <Text style={styles.TermsHeadText}>{items.textHead}</Text>
                            <Text style={styles.TermsContentText}>{items.textPara}</Text>
                        </View>
                    )
                })
            }
        </View>
      </ScrollView>
      <View style={styles.bottomAcceptBar}>
            <TouchableOpacity style={styles.declineBtn} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.declineBtnText}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptBtn} onPress={() => navigation.navigate('MoreAboutYou')}>
                <Text style={styles.acceptBtnText}>Accept</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})