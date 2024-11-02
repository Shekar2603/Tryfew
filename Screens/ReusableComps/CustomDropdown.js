// import { Ionicons } from '@expo/vector-icons';
import React, {useState} from 'react';
import {  View,  StyleSheet,  ScrollView,  Text,  TouchableOpacity,  Image} from 'react-native';
import { ColorsTheme } from '../../utils/ColorsTheme';

import Arrow from '../../assets/svgs/down-arrow.svg'

const CustomDropdown = ({
  options,
  onSelect,
  placeholder,
  customStyle,
  customDropdownContainerStyle,
  showPlaceHolder,
  dropDownText,
  selectedStyle,
}) => {


  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = option => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };


  const styles = StyleSheet.create({
    fieldContainer: {
      height: 30,
      width: '100%',
      borderRadius: 8,
      borderWidth: 0,
      borderColor: ColorsTheme.borderColor,
      alignSelf: 'center',
      backgroundColor: ColorsTheme.White,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomLeftRadius: isOpen ? 0 : 8,
      borderBottomRightRadius: isOpen ? 0 : 8,
      paddingHorizontal: 15,
      marginBottom: 10
    },
    dateText: {
      fontFamily: 'Manrope-Regular',
      fontSize: 16,
      color: ColorsTheme.Black,
    },
    dropDownContainer: {
      // maxHeight: 150,
      width: '100%',
      borderRadius: 8,
      borderWidth: 0,
      borderColor: ColorsTheme.borderColor,
      // alignSelf: 'center',
      backgroundColor: ColorsTheme.White,
      borderTopLeftRadius: isOpen ? 0 : 8,
      borderTopRightRadius: isOpen ? 0 : 8,
      // marginTop: -1,
    },
    dropDownText: {
      fontFamily: 'Manrope-Regular',
      fontSize: 14,
      color: ColorsTheme.Black,
      paddingVertical: 10,
      backgroundColor: ColorsTheme.inputBack,
      paddingHorizontal:15
    },
    iconContainer: {
      transform: [{rotate: isOpen ? '180deg' : '0deg'}]
    },
    img: {
        fontSize: 20,
        color: ColorsTheme.Black
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.fieldContainer, customStyle]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={1}>
        {showPlaceHolder ? (
          <Text style={styles.dateText}>{placeholder}</Text>
        ) : (
          <Text style={[styles.dateText, selectedStyle]}>
            {selectedOption ? selectedOption.name : placeholder}
          </Text>
        )}
       
        <View style={styles.iconContainer}>
          {/* <Ionicons
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            style={styles.img}
          ></Ionicons> */}
                   <Arrow/>
        </View>
      </TouchableOpacity>
      {isOpen && (
         <ScrollView
         style={[styles.dropDownContainer, customDropdownContainerStyle]}>
          {options && options.length > 0 ?  
          options?.map((option , index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(option)}>
              <Text style={[styles.dropDownText, dropDownText]}>
                {option.name}
              </Text>
            </TouchableOpacity>
          )) : null}
        </ScrollView>
      )}
    </View>
  );
};

export default CustomDropdown;
