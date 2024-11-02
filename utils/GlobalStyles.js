import { StyleSheet } from 'react-native';
import { ColorsTheme } from './ColorsTheme';


export const reusableStyles = StyleSheet.create({
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
        color: ColorsTheme.Black
    },    
})