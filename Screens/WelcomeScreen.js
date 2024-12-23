import { StyleSheet, Text, View , Image, TouchableOpacity , Pressable} from 'react-native'
import React , {useState , useEffect}from 'react';
import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from "@react-native-async-storage/async-storage";

import Swiper from 'react-native-swiper';
import { ColorsTheme } from '../utils/ColorsTheme';
import ImagesThemes from '../utils/ImagesTheme';


// Svg Images Export
import RightIcon from '../assets/svgs/right-arrow.svg'
import { ScrollView } from 'react-native-gesture-handler';




export default function WelcomeScreen() {

  const navigation  = useNavigation()

  const welcomeCards = [
      {
          id: 1,
          primaryText: 'Service',
          secondaryText: 'Provider',
          link: '',
          image: ImagesThemes.ServiceProvider,
      },
      {
          id: 2,
          primaryText: 'Sales',
          secondaryText: 'Provider',
          link: '',
          image: ImagesThemes.SalesProvider,
      },
      {
          id: 3,
          primaryText: 'User',
          secondaryText: 'Service',
          link: '',
          image: ImagesThemes.userService,
      },
      {
          id: 4,
          primaryText: 'CSP',
          thirdText: 'Customer Service Point',

          link: '',
          image: ImagesThemes.cspService,
      },


  ]



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: ColorsTheme.Primary,
      // alignItems: 'center',
      // justifyContent: 'center',
      position: "relative",
      // height: "100%"
    },
    topText: {
      marginTop: 20,
    },
    welcomeBgImageOuter: {
      position: "absolute",
      top: 0,
      left: 0,
      height: "100%",
      width: "100%",
    },
    welcomeBgImage: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    },
    TopLogo: {
      position: "absolute",
      top: 20,
      left: 5,
      zIndex: 9,
    },
    wrapperhome: {
      height: 350,
      minHeight: 350
    },
    sliderImages: {
      width: "100%",
      height: 350,
      objectFit: "cover",
      marginLeft: "auto",
      marginRight: "auto",
    },
    dot: {
      // marginBottom: 20
      marginBottom: 20
    },
    activeDot: {
      width: 30,
      marginBottom: 20
    },
    bottomAlready: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
      justifyContent: "center",
      marginBottom: 18,
    },
    loginbuttontext: {
      color: ColorsTheme.Primary,
      fontFamily: 'Manrope-Bold',
    },
    alreadyText: {
      fontFamily: 'Poppins-Regualr',
      color: ColorsTheme.Black
    },
    primaryOrangeText: {
      fontFamily: 'Manrope-Bold',
      color: ColorsTheme.Primary,
      fontSize: 20,
    },
    secondaryBlackText: {
      fontFamily: 'Manrope-SemiBold',
      color: ColorsTheme.Black,
      fontSize: 20,
    },
    thirdsmall: {
      fontFamily: 'Manrope-Regular',
      color: ColorsTheme.Black,
      fontSize: 10,
      width: '60%'
    },
    forwardIconInner: {
      fontSize: 18,
      color: ColorsTheme.Primary,
    },
    singleViewCard: {
      borderRadius: 15,
      borderColor: ColorsTheme.borderColor,
      borderWidth: 1,
      elevation: 10,
      backgroundColor: ColorsTheme.White,
      width: "48%",
      overflow: "hidden",
      position: "relative",
    },
    forwardIcon: {
      width: 30,
      height: 30,
      borderWidth: 1,
      borderRadius: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderColor: ColorsTheme.borderColor,
      overflow: "hidden",
      position: "absolute",
      bottom: 17,
      right: 15,
    },
    cardTextOut: {
      padding: 10,
    },
    mainCardsOuter: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingBottom: 30,
      paddinTop: 15,
      rowGap: 10,
      marginTop: 20
    },
    topLogoImage: {
        width: 100,
        objectFit: "contain",
        height: 60
    },
    welcomeSingleImage: {
      width: '100%',
      // maxHeight: 150,
      // height: '100%'
      height: 120
    }
  });

  return (
    <View style={styles.container}>
        <View style={styles.welcomeBgImageOuter}>
            <Image source={ImagesThemes.WelcomeBg} style={styles.welcomeBgImage} />
        </View>
        <View style={styles.TopLogo}>
          <Image source={ImagesThemes.logo} style={styles.topLogoImage} />
        </View>
        <ScrollView style={{flex: 1, height: '100%'}} showsVerticalScrollIndicator={false}>
          <Swiper
            style={styles.wrapperhome}
            autoplay={true}
            autoplayTimeout={5}
            loop={true}
            // activeDotColor={ColorsTheme.Primary}
            // dotColor={ColorsTheme.Primary}
            // dotStyle={styles.dot}
            // activeDotStyle={styles.activeDot}
            dot={false}
            showsPagination={false}
          >
            <Image source={ImagesThemes.sliderImage} style={styles.sliderImages} />
            <Image source={ImagesThemes.sliderImage2} style={styles.sliderImages} />
            <Image source={ImagesThemes.sliderImage3} style={styles.sliderImages} />
          </Swiper>
          <View style={styles.mainCardsOuter}>
              {welcomeCards.map((items , index) => {
                  return (
                      <View style={styles.singleViewCard} key={index}>
                          <Image source={items.image} style={styles.welcomeSingleImage} resizeMode='cover'/>
                          <TouchableOpacity style={styles.bottomCardDet} onPress={() => navigation.navigate('Login')}>
                              <View style={styles.cardTextOut}>
                                  <Text style={styles.primaryOrangeText}>{items.primaryText}</Text>
                                {items.secondaryText ? <Text style={styles.secondaryBlackText}>{items.secondaryText}</Text> : null } 
                                  { items.thirdText ? <Text style={styles.thirdsmall}>{items.thirdText}</Text> : null}
                              </View>
                              <View style={styles.forwardIcon}>
                                  <RightIcon/>
                              </View>
                          </TouchableOpacity>
                      </View>
                  )
              })}
          </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})