import { StyleSheet, Text, View , Pressable , TouchableOpacity , ScrollView ,Alert , SafeAreaView , Keyboard ,  Image , TextInput , ToastAndroid , ActivityIndicator} from 'react-native'
import React , { useState , useEffect } from 'react'
import { ColorsTheme } from '../utils/ColorsTheme'
import { useNavigation } from '@react-navigation/native';
import CustomDropdown from './ReusableComps/CustomDropdown';
import { reusableStyles } from '../utils/GlobalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import LottieView from 'lottie-react-native';
import Modal from "react-native-modal";
import { Dropdown , MultiSelect } from 'react-native-element-dropdown';   

//Svg Images Import
import LeftArrow from '../assets/svgs/left-arrow.svg';
import WhiteUp from '../assets/svgs/white-up.svg'
import CloseRemove from '../assets/svgs/close-remove.svg'
import ImagesThemes from '../utils/ImagesTheme';
import CustomDropdownStates from './ReusableComps/customDropDownStates';



export default function MoreAboutScreen() {

    const navigation = useNavigation();
    const apiUrl = 'https://www.tryfew.in/try-few-v1/public/'




    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [userToken ,  setUserToken] = useState('');
    const [serviceTypeData ,  setServiceTypeData] = useState([]);
    const [serviceCateData ,  setServiceCateData] = useState([]);
    const [servicesSetter , setServiceSetter] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [stateData ,  setStateData] = useState([]);
    const [citiesData ,  setCitiesData] = useState([]);
    const [loaderVisible , setLoaderVisible] = useState(false);
    const [successLoader , setSuccessLoader] = useState(false);


    // New DropDown SetStates
    const [nameEnter , setNameEnter] = useState('');
    const [numberEnter , setNumberEnter] = useState('');
    const [genderSelect , setGenderSelect] = useState('');
    const [serviceSelect , setServiceSelect] = useState('');
    const [categorySelect , setCategorySelect] = useState('');
    const [workSelect , setWorkSelect] = useState([]);
    const [statesSelect , setStatesSelect] = useState('');
    const [citiesSelect , setCitiesSelect] = useState('');
    const [hoursSelect , setHoursSelect] = useState('')

    const pickImageAsync = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: false
        }).then((image) => {
            if (image.size > 2 * 1024 * 1024) { 
                ToastAndroid.show('File Too Large' , ToastAndroid.LONG);// 2MB in bytes
                return;
            }
            console.log(image)
            setSelectedImage({ uri: image.path, type: 'image/jpeg', name: 'image.jpg'})
        })
    };

    const pickImageAsync2 = async () => {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: false
        }).then((image) => {
            if (image.size > 2 * 1024 * 1024) { 
                ToastAndroid.show('File Too Large' , ToastAndroid.LONG);// 2MB in bytes
                return;
            }
            console.log(image)
            setSelectedImage2({ uri: image.path, type: 'image/jpeg', name: 'image.jpg'})
        })
    };


    const getUserDetails = async () => {
        const response = await AsyncStorage.getItem('userInfo');
        const userParse = JSON.parse(response);
        setUserToken(userParse)
    };

  

    const genderData = [
        {
            id: 1,
            name: 'Male'
        },
        {
            id: 2,
            name: 'Fe-male'
        },
        {
            id: 3,
            name: 'Other'
        }
    ]

    const hoursData = [
        {
            id: 1,
            name: 'Shift-A 06 AM - 02 PM'
        },
        {
            id: 2,
            name: 'Shift-B 02 PM - 10 PM'
        },
        {
            id: 3,
            name: 'Shift-B 10 PM - 06 AM'
        },
        {
            id: 4,
            name: '24Hrs Shift'
        }
    ]


    console.log(workSelect ,  "selectedServides")

    const getServiceTypes = async () => {
        try {
          await fetch(`${apiUrl}api/captain/service-types`, {
              method: 'GET',
              headers: {
                  "Authorization": "Bearer" + userToken,
                  "content-type": "application/json"
              }
          })
          .then((response) => response.json())
          .then(response => {
            // console.log(response)
              if(response) {
                setServiceTypeData(response.service_types)
                //   console.log(response);
              }
          })  
          .catch((error) => {
              console.error(error, "error");
              throw Error(error);
          });
   
        } catch (error) {
          console.log(error , 'errors')
        }  
    };

    const handleServiceType = async (options) => {
        try {
            await fetch(`${apiUrl}api/captain/service-categories/${options.id}`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer" + userToken,
                    "content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then(response => {
                if(response) {
                  setServiceCateData(response.service_categories)
                    // console.log(response);
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

    const handleServiceCate = async(options) => {
        try {
            await fetch(`${apiUrl}api/captain/services/${options.id}`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer" + userToken,
                    "content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then(response => {
                if(response) {
                    setServiceSetter(response.services)
                    // console.log(response);
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

    const handleStates = async() => {
        try {
            await fetch(`${apiUrl}api/captain/states/`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer" + userToken,
                    "content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then(response => {
                // console.log(response?.states)
                if(response) {
                    setStateData(response?.states)
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

    const handleCities = async(option) => {
        try {
            await fetch(`${apiUrl}api/captain/get-cities-by-state-id/${option.id}`, {
                method: 'GET',
                headers: {
                    "Authorization": "Bearer" + userToken,
                    "content-type": "application/json"
                }
            })
            .then((response) => response.json())
            .then(response => {
                if(response) {
                    setCitiesData(response?.cities)
                    // console.log(response);
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
    
    
    useEffect(() => {
        getUserDetails();
        getServiceTypes();
        handleStates()
    }, []);


    const finalSubmission = async () => {
    
           const detailForm = new FormData();
            detailForm.append('name' , nameEnter);
            detailForm.append('phone' , numberEnter);
            detailForm.append('gender' , genderSelect);
            detailForm.append('service_type' , serviceSelect);
            detailForm.append('service_category' , categorySelect);
            workSelect.forEach((service) => {
                detailForm.append("service[]", service);
            });
            detailForm.append('city' , citiesSelect);
            detailForm.append('shift_timing' , hoursSelect);
            detailForm.append('id_proof' , {
                uri: selectedImage2.uri,
                type: 'image/jpeg',
                name: 'image.jpg'
            });
            detailForm.append('profile_img' ,  {
                uri: selectedImage.uri,
                type: 'image/jpeg',
                name: 'image.jpg'
            });


            console.log(detailForm , "Form Value")

            setLoaderVisible(true)
    
            try {
                await fetch(`${apiUrl}api/captain/v2/add-user-details` , {
                    method: 'POST',
                    body: detailForm,
                    headers: {
                        "Authorization": `Bearer ${userToken}` ,
                        "token": `Bearer ${userToken}` ,
                        "Content-type": "multipart/form-data" 
                    }
                })
                .then((response) => response.json())
                .then(response => {
                    console.log('res:', response)
                    if(response?.data) {
                        console.log('res:', response)
                        setSuccessLoader(true)
                        setLoaderVisible(false);
                        navigation.navigate('SuccessFullRegist')
                        ToastAndroid.show("Account Details Record Success" , ToastAndroid.LONG);
                    }
                    else if(response?.success === false) {
                        setLoaderVisible(false);
                        setSuccessLoader(false)
                        ToastAndroid.show("Error In Recording Details" , ToastAndroid.LONG);
                    }
                    else if(response?.errors) {
                        setLoaderVisible(false);
                        setSuccessLoader(false)
                        ToastAndroid.show("Error In Recording Details" , ToastAndroid.LONG);
                    }  
                })  
                .catch((error) => {
                    setLoaderVisible(false);
                    setSuccessLoader(false)
                    console.error(error, "error-last");
                    throw Error(error);
                });
         
              } catch (error) {
                console.log(error , 'errors')
              }
    }


    
    const styles = StyleSheet.create({

        conatinerForTopNav: {
            flex: 1,
        },
        bottomListGrid: {
            flexDirection: 'row',
            gap: 10,
            flexWrap: "wrap"
        },
        topHeadNavigation: {
            marginTop: 33,
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor:ColorsTheme.White,
            flexDirection: "row",
            alignItems: "center",
        },
        backwardIcon: {
            fontSize: 20,
            color: ColorsTheme.Primary
        },
        topNavmiddleText: {
            fontFamily: "Manrope-Medium",
            fontSize: 18,
            textAlign: 'center',
            width: '90%'
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
            marginTop: 10,
            color: ColorsTheme.Black
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
            fontSize: 17,
            color: ColorsTheme.Black
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
        nameInput: {
            fontFamily: 'Manrope-Medium',
            color: ColorsTheme.Black,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: ColorsTheme.borderColor,
            borderRadius: 10,
            paddingHorizontal: 20,
            fontSize: 18
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
            fontSize: 12,
            color:  ColorsTheme.Black
        },
        mainUploadCenter: {
            flexDirection: "column",
            gap: 10,
            alignItems:'center',
            justifyContent: 'center',
            padding: 20,
            backgroundColor: ColorsTheme.inputBack
        },
        imageSec: {
            width: '100%',
            height: 200
        },

        uploadAgainBtn: {
            position: 'absolute',
            top: 13,
            right: 13,
            flexDirection: 'row',
            gap: 5,
            backgroundColor:  ColorsTheme.Primary,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 30,
            alignItems: 'center'
        },
        uploadProfileTopSec: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        changeText: {
            fontSize: 12,
            fontFamily: 'Manrope_600SemiBold',
            color: ColorsTheme.White

        },
        uploadAgainIcon: {
            fontSize: 16,
            color: ColorsTheme.White
        },
        lottie:{ 
            width: 300,
            height: 300
        },
        subservices: {
            flexDirection: 'row',
            gap: 10,
            borderColor: ColorsTheme.Primary,
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 30,
            borderWidth: 1,
            marginRight: 10,
            alignItems: 'center',
            backgroundColor: ColorsTheme.White,
            elevation: 5
        },
        subservicesText: {
            fontFamily: 'Manrope-Bold',
            fontSize: 15,
            color: ColorsTheme.Black
        },

        subSerIcon: {
            fontSize: 20
        },
        innerModal: {
            backgroundColor: ColorsTheme.White,
            borderRadius: 15,
            paddingHorizontal: 20,
            paddingVertical: 40
          },
          accountReg: {
            fontSize: 16,
            fontFamily: 'Manrope-Bold',
            color: ColorsTheme.Black,
            textAlign: 'center',
            marginTop: 15
          },
          dropdown: {
            borderWidth: 1,
            borderRadius: 10,
            borderColor: ColorsTheme.borderColor,
            paddingHorizontal: 20,
            paddingVertical: 15,
            color: ColorsTheme.Black,
            fontSize: 16,
            fontFamily: 'Manrope-Medium',
          },
          placeholderStyle: {
            color: ColorsTheme.Black,
            fontFamily: 'Manrope-SemiBold',
            fontSize: 17,
          },
          selectedTextStyle: {
            fontFamily: 'Manrope-Medium',
            fontSize: 18,
            color: ColorsTheme.Black,
            textTransform: 'capitalize'
          },
          selectedTextStyle2: {
            fontFamily: 'Manrope-Medium',
            fontSize: 15,
            color: ColorsTheme.Black,
            textTransform: 'capitalize'
          },
          selectedTextStyle3: {
            fontFamily: 'Manrope-Medium',
            fontSize: 17,
            color: ColorsTheme.Black,
          },
          selectedMultiStyle: {
            borderRadius: 8,
            borderColor: ColorsTheme.Primary,
            borderWidth: 1,
            fontSize: 14,
            paddingHorizontal: 15
          },
          inputSearchStyle: {
            color: ColorsTheme.Black
          },
          itemTextStyle: {
            fontFamily: 'Manrope-Medium',
            fontSize: 15,
            color: ColorsTheme.Black,
            textTransform: 'capitalize'
          }
    })


  return (
    <View style={styles.conatinerForTopNav}>
        <View style={reusableStyles.topHeadNavigation}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <LeftArrow/>
            </TouchableOpacity>
            <Text style={reusableStyles.topNavmiddleText}>User Details</Text>
        </View>
        <Modal isVisible={loaderVisible}>
            <View style={styles.innerModal}>
                {successLoader ? 
                    <View style={styles.innerSuccess}>
                        <LottieView 
                            source={require('../assets/Icon/check.json')}
                            autoPlay
                            style={{
                                width: 200,
                                height: 200,
                                marginLeft: 'auto',
                                marginRight: 'auto'
                            }}
                        />
                        <Text style={styles.accountReg}>Your Details Added Successfully</Text>
                    </View> : 
                    <View style={styles.innerLoading}>
                        <ActivityIndicator size={'large'} color={ColorsTheme.Primary}/>
                        <Text style={styles.accountReg}>Please Wait</Text>
                    </View>
                }
            </View>
        </Modal>
      <ScrollView style={styles.pageScrollerMain} showsVerticalScrollIndicator={false}>
        <Text style={styles.tellaboutHead}>Tell us about yourself</Text>
        <View style={styles.allInputsOuter}>
            <TextInput placeholder='Enter your name' style={styles.nameInput} placeholderTextColor={ColorsTheme.Black} onChangeText={text => setNameEnter(text)} />
            <TextInput placeholder='Enter Mobile Number' keyboardType='numeric' maxLength={10} style={styles.nameInput} placeholderTextColor={ColorsTheme.Black} onChangeText={text => setNumberEnter(text)} />
            <View style={styles.uploadphotosOuter}>
                <View style={styles.uploadProfileTopSec}>
                    <Text style={styles.photoUpHead}>Upload your profile pic</Text>
                    {selectedImage ? 
                        <TouchableOpacity style={styles.uploadAgainBtn} onPress={() => setSelectedImage(null)}>
                            <WhiteUp/>
                            <Text style={styles.changeText}>Change</Text>
                        </TouchableOpacity> : null
                    }
                </View>
                {selectedImage === null ? 
                <TouchableOpacity style={styles.mainUploadCenter} onPress={() => pickImageAsync()}>
                    <Image source={ImagesThemes.uploadIcon} style={styles.uploadImage}/>
                    <Text style={styles.uploadText}>Upload profile pic</Text>
                    <Text style={styles.UpsubText}>Photos must be less than 2 MB in size</Text>
                </TouchableOpacity> : 
                <View style={styles.imageCloserSec}>
                    <Image source={selectedImage} style={styles.imageSec}/>
                </View>
                }
            </View>
            <Dropdown
                style={styles.dropdown}
                data={genderData}   
                labelField="name"  
                valueField="id" 
                value={genderSelect}
                placeholderStyle={styles.placeholderStyle}
                placeholder='Select Gender'
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}  
                itemTextStyle={styles.itemTextStyle}
                onChange={item => {
                    setGenderSelect(item.id);  
                    console.log(item);  
                }}
                maxHeight={200}
            />
            <Dropdown
                style={styles.dropdown}
                data={serviceTypeData}   
                labelField="name"  
                valueField="id" 
                value={serviceSelect}
                placeholderStyle={styles.placeholderStyle}
                placeholder='Select Service Type'
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}  
                itemTextStyle={styles.itemTextStyle}
                onChange={item => {
                    setServiceSelect(item.id);
                    handleServiceType(item)  
                }}
                maxHeight={300}
            />

            <Dropdown
                style={styles.dropdown}
                data={serviceCateData}  
                labelField="name" 
                valueField="id"
                value={categorySelect}
                placeholderStyle={styles.placeholderStyle}
                placeholder='Select Service Category'
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle} 
                itemTextStyle={styles.itemTextStyle}
                onChange={item => {
                    setCategorySelect(item.id); 
                    handleServiceCate(item)
                }}
                maxHeight={500}
                search
                searchPlaceholder="Search..."
            />
            <MultiSelect
                style={styles.dropdown}
                data={servicesSetter} 
                labelField="name" 
                valueField="id"   
                placeholderStyle={styles.placeholderStyle}
                placeholder='Select Your Work'
                selectedTextStyle={styles.selectedTextStyle2}
                inputSearchStyle={styles.inputSearchStyle} 
                selectedStyle={styles.selectedMultiStyle}
                itemTextStyle={styles.itemTextStyle}
                searchPlaceholder="Search..."
                value={workSelect} 
                onChange={item => {
                    setWorkSelect(item)
                }} 
                maxHeight={500}
                search
                multi
            />
            
            <Dropdown
                style={styles.dropdown}
                data={stateData}  
                labelField="name" 
                valueField="id"
                value={statesSelect}
                placeholderStyle={styles.placeholderStyle}
                placeholder='Select Your State'
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle} 
                itemTextStyle={styles.itemTextStyle}
                onChange={item => {
                    setStatesSelect(item); 
                    handleCities(item)
                }}
                maxHeight={300}
                search
                searchPlaceholder="Search..."
            />
            <Dropdown
                style={styles.dropdown}
                data={citiesData}  
                labelField="name" 
                valueField="id"
                value={citiesSelect}
                placeholderStyle={styles.placeholderStyle}
                placeholder='Select Your State'
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle} 
                itemTextStyle={styles.itemTextStyle}
                onChange={item => {
                    setCitiesSelect(item.id); 
                }}
                maxHeight={300}
                search
                searchPlaceholder="Search..."
            />
            <Dropdown
                style={styles.dropdown}
                data={hoursData}  
                labelField="name" 
                valueField="id"
                value={hoursSelect}
                placeholderStyle={styles.placeholderStyle}
                placeholder='Select Working Shift'
                selectedTextStyle={styles.selectedTextStyle3}
                inputSearchStyle={styles.inputSearchStyle} 
                itemTextStyle={styles.itemTextStyle}
                onChange={item => {
                    setHoursSelect(item.id); 
                }}
                maxHeight={300}
                search
                searchPlaceholder="Search..."
            />
            <View style={styles.uploadphotosOuter}>
                <View style={styles.uploadProfileTopSec}>
                    <Text style={styles.photoUpHead}>Upload your Aadhaar</Text>
                    {selectedImage2 ? 
                        <TouchableOpacity style={styles.uploadAgainBtn} onPress={() => setSelectedImage2(null)}>
                            <WhiteUp/>
                            <Text style={styles.changeText}>Change</Text>
                        </TouchableOpacity> : null
                    }
                </View>
                {selectedImage2 === null ? 
                <TouchableOpacity style={styles.mainUploadCenter} onPress={() => pickImageAsync2()}>
                    <Image source={ImagesThemes.uploadIcon} style={styles.uploadImage}/>
                    <Text style={styles.uploadText}>Upload your Aadhaar</Text>
                    <Text style={styles.UpsubText}>Photos must be less than 2 MB in size</Text>
                </TouchableOpacity> : 
                <View style={styles.imageCloserSec}>
                    <Image source={selectedImage2} style={styles.imageSec}/>
                </View>
                }
            </View>
        </View>
      </ScrollView>
      <View style={styles.bottomAcceptBar}>
            <TouchableOpacity style={styles.acceptBtn} onPress={finalSubmission}>
                <Text style={styles.acceptBtnText}>Continue</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})