import { StyleSheet, Text, View , Pressable , TouchableOpacity , ScrollView , SafeAreaView , Keyboard ,  Image , TextInput} from 'react-native'
import React , { useState , useEffect } from 'react'
import { ColorsTheme } from '../utils/ColorsTheme'
import ImagesThemes from '../utils/ImagesTheme';
import { useNavigation } from '@react-navigation/native';

import { reusableStyles } from '../utils/GlobalStyles';
import LottieView from 'lottie-react-native';


//Svg Images Import
import LeftArrow from '../assets/svgs/left-arrow.svg';



export default function SuccessfullRegistration() {


    const navigation = useNavigation();

    
    const styles = StyleSheet.create({

        conatinerForTopNav: {
            flex: 1,
            backgroundColor: ColorsTheme.White
        },  
        pageScrollerMain: {
            height: '100%',
            backgroundColor: ColorsTheme.White,
            paddingHorizontal: 15
        },
        innerScrollViewText: {
            paddingHorizontal: 15,
            paddingBottom: 50
        },
        TermsHeadText: {
            fontFamily: 'Manrope-Bold',
            fontSize: 17,
            marginBottom: 5
        },
        TermsContentText: {
            fontFamily: 'Manrope-Regular',
            fontSize: 15
        },
        bottomAcceptBar: {
            padding: 20,
            backgroundColor: ColorsTheme.White,
            borderTopColor: ColorsTheme.borderColor,
            borderTopWidth: 1,
        },
        acceptBtn: {
            backgroundColor: ColorsTheme.Primary,
            width: '100%',
            padding: 12,
            borderRadius: 5
        },
        acceptBtnText: {
            fontSize: 18,
            fontFamily: 'Manrope-Bold',
            textAlign: "center",
            color: ColorsTheme.White
        },
        tellaboutHead: {
            fontSize: 24,
            fontFamily: 'Manrope-Bold',
            marginTop: 10
        },
        singleInputOuter: {
            borderWidth: 1,
            borderRadius: 8,
            overflow: 'hidden',
            borderColor: ColorsTheme.borderColor
            // paddingHorizontal: 15,
            // paddingVertical: 10,
        },
        labelText: {
            fontFamily: 'Manrope-SemiBold',
            fontSize: 17
        },
        photoUpHead: {
            fontFamily: 'Manrope-SemiBold',
            fontSize: 17,
            width: '100%',
            paddingHorizontal: 15,
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: ColorsTheme.borderColor
        },
        nameInput: {
            fontFamily: 'Manrope-Regular',
        },
        allInputsOuter: {
            marginTop: 20,
            flexDirection: 'column',
            gap: 15,
            paddingBottom: 40
        },
        paddingInputs: {
            paddingHorizontal: 15,
            paddingVertical: 10
        },
        paddingLables: {
            paddingHorizontal: 15,
            paddingTop: 10
        },
        uploadphotosOuter: {
            borderWidth: 1,
            borderColor: ColorsTheme.borderColor,
            borderRadius: 8,
            overflow: 'hidden'
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
        UpsubText: {
            fontSize: 12
        },
        mainUploadCenter: {
            flexDirection: "column",
            gap: 10,
            alignItems:'center',
            padding: 20,
            backgroundColor: ColorsTheme.inputBack
        },
        successMiddle: {
            flex: 1,
            height: '100%',
            alignItems: 'center'
        },
        successImage: {
            width: '100%',
            height: "50%",
            objectFit: 'contain'
        },
        applicationSent: {
            position: "absolute",
            bottom:  20,
            fontFamily: 'Manrope-Bold',
            left: 20,
            right: 20,
            textAlign: 'center',
            fontSize: 16,
            color: ColorsTheme.Black
        },
        lottie:{ 
            width: 300,
            height: 300
        },
        topNavmiddleText: {
            fontFamily: "Manrope-Medium",
            fontSize: 18,
            textAlign: 'center',
            width: '100%',
            color: ColorsTheme.Black
        },    
    })

  return (
    <View style={styles.conatinerForTopNav}>
        <View style={reusableStyles.topHeadNavigation}>
            <Text style={styles.topNavmiddleText}>User Details</Text>
        </View>
        <View style={styles.successMiddle}>
        {/* <LottieView/> */}
        <LottieView 
            source={require('../assets/Icon/check.json')}
            autoPlay
            style={{
                width: 500,
                height: 500
            }}
        />
            <Text style={styles.applicationSent}>Your application sent successfully, explore home to know more</Text>
        </View>
        <View style={styles.bottomAcceptBar}>
            <TouchableOpacity style={styles.acceptBtn} onPress={() => navigation.navigate('HomePage')}>
                <Text style={styles.acceptBtnText}>Go to Home</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({})