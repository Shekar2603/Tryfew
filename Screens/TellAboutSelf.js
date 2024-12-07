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


//Svg Images Import
import LeftArrow from '../assets/svgs/left-arrow.svg';
import WhiteUp from '../assets/svgs/white-up.svg'
import CloseRemove from '../assets/svgs/close-remove.svg'
import ImagesThemes from '../utils/ImagesTheme';
import CustomDropdownStates from './ReusableComps/customDropDownStates';

export default function TellAboutSelf() {


    const navigation = useNavigation();
    const apiUrl = 'https://www.tryfew.in/try-few-v1/public/'




    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [userToken ,  setUserToken] = useState('');
    const [serviceTypeData ,  setServiceTypeData] = useState([]);
    const [serviceCateData ,  setServiceCateData] = useState([]);
    const [servicesSetter , setServiceSetter] = useState([]);
    const [selectedServices , setSelectedServices] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [stateData ,  setStateData] = useState([]);
    const [citiesData ,  setCitiesData] = useState([]);
    const [loaderVisible , setLoaderVisible] = useState(false);
    const [successLoader , setSuccessLoader] = useState(false)

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

    // console.log(selectedImage , "selectedimager===>")



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
            console.log(response)
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
            name: '08:00 AM - 12:00 PM'
        },
        {
            id: 2,
            name: '12:00 PM - 04:00 PM'
        },
        {
            id: 3,
            name: '04:00 PM - 08:00 PM'
        },
        {
            id: 4,
            name: '08:00 PM - 12:00 AM'
        },
        {
            id: 5,
            name: '12:00 AM - 04:00 AM'
        },
        {
            id: 6,
            name: '04:00 AM - 08:00 AM'
        }
    ]

    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        servicetype: '',
        servicecategory: '',
        workyoudo: '',
        wherelive: '',
        whereState: '',
        workingHours: ''
      });
      const [errors, setErrors] = useState(false);
    
      const validateForm = formData => {
        const errors = {};
        if (!formData.name) {
          errors.namee = 'required';
        } else {
          setErrors(false);
        }
        if (!formData.gender) {
          errors.gender = 'required';
        }
        if (!formData.servicetype) {
            errors.servicetype = 'required';
        }
        if (!formData.servicecategory) {
            errors.servicecategory = 'required';
        }
        if (!formData.workyoudo) {
          errors.workyoudo = 'required';
        }
        if (!formData.wherelive) {
          errors.wherelive = 'required';
        }
        if (!formData.workingHours) {
          errors.workingHours = 'required';
        }
        const isValid = Object.keys(errors).length === 0;
        return {isValid, errors};
      };
    


    const handleName = (name) => {
        formData.name = name
    }

    const handleGender = (option) => {
        formData.gender = option.id
    }


    
    const handleWork = (option) => {

        if (!selectedServices.some(service => service.id === option.id)) {
            setSelectedServices([...selectedServices, option]);
        }
        if (!selectedServiceIds.includes(option.id)) {
            setSelectedServiceIds([...selectedServiceIds, option.id]);
        }

        formData.workyoudo = option.id

        
    }
    // console.log(formData?.workyoudo , "example")

    const removeService = (index) => {
        const newSelectedServices = [...selectedServices];
        const removedService = newSelectedServices.splice(index, 1)[0];
        setSelectedServices(newSelectedServices);
        const newSelectedServiceIds = selectedServiceIds.filter(id => id !== removedService.id);
        setSelectedServiceIds(newSelectedServiceIds);
    };


    console.log(selectedServiceIds ,  "selectedServides")


    const handleState = (option) => {
        formData.whereState = option.id
    }
    const handleCity = (option) => {
        formData.wherelive = option.id
    }


    const handleHours = (option) => {
        formData.workingHours = option.id
    }

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
                    console.log(response);
                }
            })  
            .catch((error) => {
                console.error(error, "error");
                throw Error(error);
            });
     
          } catch (error) {
            console.log(error , 'errors')
          }
     formData.servicetype = options.id
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
                    console.log(response);
                }
            })  
            .catch((error) => {
                console.error(error, "error");
                throw Error(error);
            });
     
          } catch (error) {
            console.log(error , 'errors')
          }
          formData.servicecategory = options.id
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
                console.log(response?.states)
                if(response) {
                    // setCitiesData(response?.cities)
                    // console.log(response);
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
        
            // detailForm.append('name' , formData.name);
            // detailForm.append('gender' , parseInt(formData.gender));
            // detailForm.append('service_type' , parseInt(formData.servicetype));
            // detailForm.append('service_category' , parseInt(formData.servicecategory));
            // detailForm.append('service' , parseInt(formData.workyoudo));
            // detailForm.append('city' , parseInt(formData.wherelive));
            // detailForm.append('shift_timing' , parseInt(formData.workingHours));
            detailForm.append('name' , formData.name);
            detailForm.append('gender' , formData.gender);
            detailForm.append('service_type' , formData.servicetype);
            detailForm.append('service_category' , formData.servicecategory);
            selectedServiceIds.forEach((service) => {
                detailForm.append("service[]", service);
            });
            // detailForm.append('service[]' , selectedServiceIds);
            detailForm.append('city' , formData.wherelive);
            detailForm.append('shift_timing' , formData.workingHours);
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


            // console.log(detailForm , "detailForm")
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
                        setSuccessLoader(true)
                        setLoaderVisible(false);
                        // console.log('actual-response:', response)
                        navigation.navigate('SuccessFullRegist')
                        ToastAndroid.show("Error: Choose Less Quality Image" , ToastAndroid.LONG);
                    }
                    else if(response?.success === false) {
                        setLoaderVisible(false);
                        setSuccessLoader(false)
                        ToastAndroid.show("Error: Choose Less Quality Image" , ToastAndroid.LONG);
                    }
                    else if(response?.errors) {
                        setLoaderVisible(false);
                        setSuccessLoader(false)
                        ToastAndroid.show("Error: Choose Less Quality Image" , ToastAndroid.LONG);
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
            fontFamily: 'Manrope-Regular',
            color: ColorsTheme.Black
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
          }
    })

    const customStyle = StyleSheet.create({
        borderColor: 'red',
    });


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
            <View  style={[styles.singleInputOuter , styles.paddingInputs , {borderColor: errors.name ? ColorsTheme.Red : ColorsTheme.borderColor}]}>
                <Text style={styles.labelText}>Name</Text>
                <TextInput placeholder='Enter your name' style={styles.nameInput} placeholderTextColor={ColorsTheme.Black} onChangeText={text => handleName(text)} />
            </View>
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
            <View style={styles.singleInputOuter}>
                <Text style={[styles.labelText , styles.paddingLables]}>Gender</Text>
                <CustomDropdown
                    options={genderData} 
                    placeholder={'Select your gender'}
                    onSelect={handleGender}
                />
            </View>
            <View style={styles.singleInputOuter}>
                <Text style={[styles.labelText , styles.paddingLables]}>Select Service Type</Text>
                <CustomDropdown
                    options={serviceTypeData} 
                    placeholder={'Service Type'}
                    onSelect={handleServiceType}
                />
            </View>
            <View style={styles.singleInputOuter}>
                <Text style={[styles.labelText , styles.paddingLables]}>Select Service Category</Text>
                <CustomDropdown
                    options={serviceCateData} 
                    placeholder={'Select Service'}
                    onSelect={handleServiceCate}
                />
            </View>
            <View style={styles.singleInputOuter}>
                <Text style={[styles.labelText , styles.paddingLables]}>What work you do</Text>
                <CustomDropdown
                    options={servicesSetter} 
                    placeholder={'Select Work'}
                    onSelect={handleWork}
                />
            </View>
            {selectedServices && selectedServices.length > 0 ? 
                // <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                //         {selectedServices && selectedServices.length > 0 ? 
                //             selectedServices.map((items , index) => {
                //                 return (
                //                     <View style={styles.subservices} key={index}>
                //                         <Text style={styles.subservicesText}>{items.name}</Text>
                //                         <TouchableOpacity style={styles.closeBtnOuter} onPress={() => removeService(index)}>
                //                             <CloseRemove/>
                //                         </TouchableOpacity>
                //                     </View>
                //                 )   
                //             }) : null
                //         }
                // </ScrollView> : null
                <View style={styles.bottomListGrid}>
                    {selectedServices && selectedServices.length > 0 ? 
                        selectedServices.map((items , index) => {
                            return (
                                <View style={styles.subservices} key={index}>
                                    <Text style={styles.subservicesText}>{items.name}</Text>
                                    <TouchableOpacity style={styles.closeBtnOuter} onPress={() => removeService(index)}>
                                        <CloseRemove/>
                                    </TouchableOpacity>
                                </View>
                            )   
                        }) : null
                    }
                </View> : null
            }

            
            <View style={styles.singleInputOuter}>
                <Text style={[styles.labelText , styles.paddingLables]}>Where do you live</Text>
                <CustomDropdown
                    options={stateData} 
                    placeholder={'Select State'}
                    onSelect={handleCities}
                />
            </View>
            <View style={styles.singleInputOuter}>
                <Text style={[styles.labelText , styles.paddingLables]}>Where do you live</Text>
                <CustomDropdown
                    options={citiesData} 
                    placeholder={'Select City'}
                    onSelect={handleCity}
                />
            </View>
            <View style={styles.singleInputOuter}>
                <Text style={[styles.labelText , styles.paddingLables]}>What are your working hours</Text>
                <CustomDropdown
                    options={hoursData} 
                    placeholder={'Select working hours'}
                    onSelect={handleHours}
                />
            </View>
            <View style={styles.uploadphotosOuter}>
                <View style={styles.uploadProfileTopSec}>
                    <Text style={styles.photoUpHead}>Upload your ID proof</Text>
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
                    <Text style={styles.uploadText}>Upload your ID</Text>
                    <Text style={styles.UpsubText}>Photos must be less than 2 MB in size</Text>
                </TouchableOpacity> : 
                <View style={styles.imageCloserSec}>
                    <Image source={selectedImage2} style={styles.imageSec}/>
                </View>
                }
            </View>
        </View>
        {/* <LottieView source={require('../assets/animations/check.json')} autoplay resizeMode='cover' style={{width: 100 , height: 150}} loop /> */}
      </ScrollView>
      {/* <View style={styles.bottomAcceptBar}>
            <TouchableOpacity style={styles.acceptBtn} onPress={() => navigation.navigate('SuccessFullRegist')}>
                <Text style={styles.acceptBtnText}>Continue</Text>
            </TouchableOpacity>
      </View> */}
      <View style={styles.bottomAcceptBar}>
            <TouchableOpacity style={styles.acceptBtn} onPress={finalSubmission}>
                <Text style={styles.acceptBtnText}>Continue</Text>
            </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})