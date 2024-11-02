import { Image, StyleSheet, Text, View , Pressable } from 'react-native'
import React, { useEffect } from 'react';
import ImagesThemes from '../utils/ImagesTheme';
import { useNavigation } from '@react-navigation/native';

export default function PreWelcomeScreen() {

    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('WelcomeScreen')
        } , 2000)
    }, [])

  return (
    <Pressable onPress={() => navigation.navigate('WelcomeScreen')} style={styles.relativeSection}>
        <Image source={ImagesThemes.PreWelcomeScreen} style={styles.prewelcomeBg}/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    relativeSection: {
        width: '100%',
        height: "100%",
        flex: 1,
    },
    prewelcomeBg: {
        width: '100%',
        height: '100%'
    }
})