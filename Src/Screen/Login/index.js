import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Animated,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { IMG } from '../../Constant/image';
import { STR } from '../../Constant/string';
import { styles } from './style';

import { COLOR } from '../../Constant/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import axiosInstance from '../../Constant/axios';
import { CountryPicker } from 'react-native-country-codes-picker';
import Toast from 'react-native-toast-message';
import CardView from '../../Components/Cardview';
import PoppinsText from '../../Components/LAText/Poppinstext';
import { login, otplogin, passwordlogin } from '../../Function/Apicall';

const LoginScreen = () => {
  const [email, setEmail] = useState('');

  const dispatch = useDispatch()

  const [firstname, setFirstName] = useState('');

  const [lastname, setLastName] = useState('');
  const [prenumber, setPrenumber] = useState(91);
  const [number, setNumber] = useState();
  const [emailfocus, setemailfocus] = useState(false);
  const [type, setType] = useState(STR.REGISTER);
  const [passvisible, setPassvisible] = useState(false);
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [password, setPassword] = useState('')
  const [confirmpass, setConfirmpas] = useState('')
  const [companyname, setCompanyname] = useState('')
  const navigation = useNavigation();

  const [firstvalid, setFirstvalid] = useState(false)
  const [lastvalid, setLastvalid] = useState(false)
  const [emailvalid, setEmailvalid] = useState(false)
  const [numbervalid, setNumbervalid] = useState(false)
  const [passwordvalid, setPasswordvalid] = useState(false)

  const [confirmpasswordvalid, setConfirmPasswordvalid] = useState(false)

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  useEffect(() => {
    AsyncStorage.getItem('login').then(value => {
      console.log('Hello acyncn', value);
      if (value === 'true') {
        handlebiomatric();
      }
    });
  }, [navigation]);

  const handleregister = () => {
    

    const fullnumber = `${countryCode}${number}`;

    let dataToSend = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      mobile: fullnumber,
      password: password,
      confirm_password: confirmpass,
      company_name: companyname
    };


    console.log('NUmber is =====> ', fullnumber);

    console.log(dataToSend, 'test');

    axios
      .post('https://api.liquid.com.hk/api/auth/signup', dataToSend)
      .then(function (responseJson) {
        console.log('Register data ====>', responseJson?.data?.data);
        // If server response message same as Data Matched
        if (responseJson?.data?.data) {
          //  storeData(responseJson?.data?.data);
          // setType(STR.LOGIN)

          // navigation.navigate('Preauth', {
          //   screen: 'Otpscreen', params: {
          //     screen: type,
          //     email: email,
          //     data: responseJson?.data?.data,
          //   }
          // });
          navigation.navigate('Otpscreen', { params: 'register', data: responseJson?.data?.data });
          console.log('Registration Successful. Please Login to proceed');
        } else {
          // setErrortext(responseJson?.data?.error);
          Toast.show({
            topOffset: 100,
            type: "error",
            text1: "ERROR",
            text2: `Somthing went wrong. Please check your connection`,
            visibilityTime: 3000,
            props: {
              text1NumberOfLines: 2 //number of how many lines you want
            }
          });
        }
      })
      .catch(function (error) {
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
          text2: `Somthing went wrong. Please check your connection`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines: 2 //number of how many lines you want
          }
        });
        console.log(error);
        //  setLoading(false);
      });
  };

  const handlepasswordlogin = async () => {
    const result = await passwordlogin(email, password, dispatch)

    if (result) {
      //handlebiomatric()
      navigation.navigate('Otpscreen');
    }

  }


  const handleotplogin = async () => {
    const result = await otplogin(email, dispatch)

    if (result) {
      //handlebiomatric()
      navigation.navigate('Otpscreen');
    }
    
  };

  const validation = (val) => {
    const nameRegex = new RegExp("^[A-Za-z ]+$")
    const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    const passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+[\]{}|;:,.<>?]).{8,}$")
    const numberRegex = new RegExp("^\d{10}$")
    if (val === "firstname") {
      if (!nameRegex.test(firstname)) {
        setFirstvalid(true)
      } else {
        setFirstvalid(false)
      }
    } else if (val === "lastname") {
      if (!nameRegex.test(lastname)) {
        setLastvalid(true)
      } else {
        setLastvalid(false)
      }
    } else if (val === "email") {
      if (!emailRegex.test(email)) {
        setEmailvalid(true)
      } else {
        setEmailvalid(false)
      }
    } else if (val === "number") {
      if (!numberRegex.test(number)) {
        setNumbervalid(true)
      } else {
        setNumbervalid(false)
      }
    } else if (val === "password") {
      if (!passRegex.test(password)) {
        setPasswordvalid(true)
      } else {
        setPasswordvalid(false)
      }
    } else if (val === "confirmpass") {
      if (password !== confirmpass) {
        setConfirmPasswordvalid(true)
      } else {
        setConfirmPasswordvalid(false)
      }
    }
  }

  // const handlebiomatric = async () => {
  //   await rnBiometrics.isSensorAvailable().then(resultObject => {
  //     rnBiometrics
  //       .simplePrompt({ promptMessage: 'Confirm fingerprint' })
  //       .then(resultObject => {
  //         const { success } = resultObject;

  //         if (success) {
  //           dispatch({
  //             type: "SET_LOGIN",
  //             payload: true
  //           })
  //           // navigation.navigate('Postauth' ,{screen: 'Tabnavigationroute'});
  //         } else {

  //           Toast.show({
  //             topOffset: 100,
  //             type: "error",
  //             text1: "ERROR",
  //             text2: `Fingerprint not exist or were deleted . Please add fingerprint in system`,
  //             visibilityTime: 3000,
  //             props: {
  //               text1NumberOfLines: 2 //number of how many lines you want
  //             }
  //           });
  //         }
  //       })
  //       .catch(e => {
  //         //   Alert.alert('Fail login with senser . Please try with login');
  //         Toast.show({
  //           topOffset: 100,
  //           type: "error",
  //           text1: "ERROR",
  //           text2: `Fail login with senser . Please try with login`,
  //           visibilityTime: 3000,
  //           props: {
  //             text1NumberOfLines: 2 //number of how many lines you want
  //           }
  //         });
  //         AsyncStorage.removeItem('login');
  //         dispatch({
  //           type: "SET_LOGIN",
  //           payload: false
  //         })
  //       });
  //   });
  // };

  const handlecontinue = () => {
    if (STR.LOGIN === type) {
      handlepasswordlogin()
    } else {
      handleregister()
    }
  }

  const changetype = () => {
    if (type === STR.REGISTER) {
      setFirstName('')
      setLastName('')
      setCompanyname('')
      setEmail('')
      setNumber('')
      setPassword('')
      setConfirmpas('')
      setType(STR.LOGIN)
    } else {
      setEmail('')
      setPassword('')
      setType(STR.REGISTER)
    }
  }


  return (

    <CardView>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-70}
          style={styles.keyContainer}>
          <View style={styles.cordContain}>
            <PoppinsText title={"Let’s Get Started!"}
              textstyle={{ ...styles.title }} />

            <View>
              <View style={styles.tabcontain}>

                <TouchableOpacity style={styles.tabview} onPress={() => {
                  setType(STR.REGISTER), setEmail(''), setPassword('');
                }} >
                  <PoppinsText title={"Register Account"}
                    textstyle={{ ...styles.tabtext, color: type == STR.REGISTER ? COLOR.BLACK[100] : COLOR.GRAY[500], }} />


                </TouchableOpacity>
                <View style={{ width: "20%" }}></View>

                <TouchableOpacity style={styles.tabview} onPress={() => changetype()}>
                  <PoppinsText title={"Login"}
                    textstyle={{ ...styles.tabtext, color: type == STR.LOGIN ? COLOR.BLACK[100] : COLOR.GRAY[500], }} />


                </TouchableOpacity>
              </View>


              <View style={{ ...styles.tabcontain, marginTop: 0 }}>

                <View style={styles.tabview} onPress={() => changetype()} >

                  <View style={{
                    ...styles.borderview, backgroundColor:
                      type == STR.REGISTER ? COLOR.PRIMARY : COLOR.GRAY[500],
                  }} />

                </View>
                <View style={{ width: "20%" }}></View>

                <View style={styles.tabview}>

                  <View style={{
                    ...styles.borderview, backgroundColor:
                      type == STR.LOGIN ? COLOR.PRIMARY : COLOR.GRAY[500],
                  }} />

                </View>
              </View>
            </View>

            {type === STR.REGISTER &&
              <View style={{ width: "100%" }}>
                <View style={{ width: '100%' }}>
                  <TextInput
                    placeholder="First name"
                    placeholderTextColor={COLOR.GRAY[500]}

                    style={{ ...styles.textinputView, width: '100%' }}
                    onChangeText={text => setFirstName(text)}
                    onEndEditing={() => validation("firstname")}
                    value={firstname}
                  />
                  {firstvalid &&
                    <Text style={{ color: "red", marginTop: 2 }}>{firstname.length > 0 ? "*First Name must be alphabet" : "*Please enter your first name"} </Text>
                  }
                </View>

                <View style={{ width: '100%' }}>
                  <TextInput
                    placeholder="Last name"
                    placeholderTextColor={COLOR.GRAY[500]}

                    style={{ ...styles.textinputView, width: '100%' }}
                    onChangeText={text => setLastName(text)}
                    onEndEditing={() => validation("lastname")}
                    value={lastname}
                  />
                  {lastvalid &&
                    <Text style={{ color: "red", marginTop: 2 }}>{lastname.length > 0 ? "*Lastname Name must be alphabet" : "*Please enter your first name"} </Text>
                  }
                </View>

                <View style={{ width: '100%' }}>
                  <TextInput
                    placeholder="Company Name"
                    placeholderTextColor={COLOR.GRAY[500]}

                    style={{ ...styles.textinputView, width: '100%' }}
                    onChangeText={text => setCompanyname(text)}
                    onEndEditing={() => validation("firstname")}
                    value={companyname}
                  />

                </View>
                <View style={{ width: '100%' }}>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor={COLOR.GRAY[500]}
textContentType='emailAddress'
                    style={{ ...styles.textinputView, width: '100%' }}
                    onChangeText={text => setEmail(text)}
                    onEndEditing={() => validation("email")}
                    value={email}
                  />
                  {emailvalid &&
                    <Text style={{ color: "red", marginTop: 2 }}>{emailvalid.length > 0 ? "*Enter correct email formate" : "*Please enter your email"} </Text>
                  }

                </View>

                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={() => setShow(true)}
                    style={{
                      ...styles.textinputView,
                      justifyContent: 'center',
                      padding: 10,
                      width: '22%',
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderRightWidth: 1,
                      borderColor: COLOR.GRAY[500]
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontSize: 12,
                      }}>
                      {countryCode && countryCode.length > 0 ? countryCode : '95'}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ width: "78%" }}>
                    <TextInput
                      placeholder={'Phone Number'}
                      placeholderTextColor={COLOR.GRAY[300]}
                      style={{
                        ...styles.textinputView,
                        width: '100%',
                        borderTopLeftRadius: 0,
                        borderTopLeftRadius: 0
                        //  marginLe 10,
                      }}
                      onChangeText={text => setNumber(text)}

                      onEndEditing={() => validation("number")}
                      value={number}
                      keyboardType={'numeric'}
                      maxLength={10}
                    />
                    {/* {numbervalid &&
                      <Text style={{ color: "red", marginTop: 2, marginLeft: 10, }}>{number.length > 0 ? "*Ener 10 digit number" : "*Please enter your number"} </Text>
                    } */}
                  </View>
                  <CountryPicker
                    show={show}
                    // when picker button press you will get the country object with dial code
                    pickerButtonOnPress={item => {
                      setCountryCode(item.dial_code);
                      setShow(false);
                    }}
                  />
                </View>


                <View style={{ width: '100%' }}>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor={COLOR.GRAY[500]}

                    style={{ ...styles.textinputView, width: '100%' }}
                    onChangeText={text => setPassword(text)}
                    // onEndEditing={() => validation("password")}
                    value={password}
                  />
                  {passwordvalid &&
                    <Text style={{ color: "red", marginTop: 2 }}>{password.length > 0 ? "*Please enter strong password" : "*Please enter your password name"} </Text>
                  }

                </View>

                <View style={{ width: '100%' }}>
                  <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor={COLOR.GRAY[500]}

                    style={{ ...styles.textinputView, width: '100%' }}
                    onChangeText={text => setConfirmpas(text)}
                    onEndEditing={() => validation("confirmpass")}
                    value={confirmpass}
                  />
                  {confirmpasswordvalid &&
                    <Text style={{ color: "red", marginTop: 2 }}>{confirmpass.length > 0 ? "*" : "*Please enter your first name"} </Text>
                  }

                </View>


                {type === STR.REGISTER && passwordvalid &&
                  <Text style={{ color: "red", marginTop: 2, marginLeft: 10, }}>{password.length > 0 ? "*Password does nit match" : "*Please enter your password"} </Text>
                }

                <PoppinsText title={"We need your details as your LIQUID WALLET will be based on it. We are not going to send you ads or spam email, or sell your information to a 3rd party."}
                  textstyle={{ ...styles.infotext }}
                  viewStyle={{ width: "100%" }}
                />

                <View style={{ flexDirection: "row", marginTop: 15, justifyContent: "center", alignItems: "center", width: "100%" }}>
                  <PoppinsText title={"Already have an account? "}
                    textstyle={{ ...styles.alreadytext }}

                  />
                  <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => changetype()}>
                    <PoppinsText title={"LOGIN"}
                      textstyle={{ ...styles.logintext }}

                    />
                  </TouchableOpacity>

                </View>
              </View>
            }


            {type === STR.LOGIN &&
              <View style={{ width: '100%' }}>
                <TextInput
                  placeholder={'Enter Email'}
                  placeholderTextColor={COLOR.GRAY[500]}
                  style={styles.textinputView}
                  textContentType='emailAddress'
                  onChangeText={text => setEmail(text)}
                  onEndEditing={() => validation("email")}
                  value={email}
                />
                {emailvalid &&
                  <Text style={{ color: "red", marginTop: 2 }}>{email.length > 0 ? "*Enter valid email id" : "*Please enter your email"} </Text>
                }


                <TextInput
                  placeholder={'Password'}
                  placeholderTextColor={COLOR.GRAY[500]}
                  style={styles.textinputView}
                  onChangeText={text => setPassword(text)}
              //    onEndEditing={() => validation("password")}
                  value={password}
                />
                {/* {password &&
                  <Text style={{ color: "red", marginTop: 2 }}>{email.length > 0 ? "*Enter valid email id" : "*Please enter your email"} </Text>
                } */}
                <PoppinsText title={"We need your details as your LIQUID WALLET will be based on it. We are not going to send you ads or spam email, or sell your information to a 3rd party."}
                  textstyle={{ ...styles.infotext }}
                  viewStyle={{ width: "100%" }}
                />

                <View style={{ flexDirection: "row", marginTop: 15, justifyContent: "center", alignItems: "center", width: "100%" }}>
                  <PoppinsText title={"New to LIQUID?"}
                    textstyle={{ ...styles.alreadytext }}

                  />
                  <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => changetype()}>
                    <PoppinsText title={" REGISTER"}
                      textstyle={{ ...styles.logintext }}

                    />
                  </TouchableOpacity>

                </View>

                <View style={{ flexDirection: "row", marginTop: 15, justifyContent: "center", alignItems: "center", width: "100%" }}>
                  <PoppinsText title={"Login with"}
                    textstyle={{ ...styles.alreadytext }}

                  />
                  <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => handleotplogin()}>
                    <PoppinsText title={" OTP"}
                      textstyle={{ ...styles.logintext }}

                    />
                  </TouchableOpacity>

                </View>
              </View>
            }



            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                //  console.log("HEllo")
                handlecontinue()
              }>
              <PoppinsText title={"CONTINUE"}
                textstyle={{ ...styles.buttontext }}
              />
            </TouchableOpacity>

          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </CardView>

    //  <SafeAreaView style={styles.safeContainer}>
    // <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //     keyboardVerticalOffset={-70}
    //     style={styles.keyContainer}>
    //     <View style={styles.container}>
    //       <View style={styles.cardView}>
    //         <Text style={styles.starttext}>{STR.GET}</Text>
    //         <Text style={styles.starttext}>{STR.START}</Text>

    //         <View style={styles.tabView}>
    //           <TouchableOpacity
    //             style={{
    //               ...styles.tabbar,
    //               borderBottomColor:
    //                 type == STR.REGISTER ? COLOR.GREEN[100] : COLOR.GRAY[300],
    //             }}
    //             onPress={() => {
    //               setType(STR.REGISTER), setEmail(''), setPassword('');
    //             }}>
    //             <View
    //               style={{
    //                 ...styles.iconView,
    //                 borderColor:
    //                   type == STR.REGISTER ? COLOR.GREEN[100] : COLOR.GRAY[300],
    //               }}>
    //               <Icon
    //                 name="pencil"
    //                 type="octicon"
    //                 color={
    //                   type == STR.REGISTER ? COLOR.GREEN[100] : COLOR.GRAY[300]
    //                 }
    //                 size={25}
    //               />
    //             </View>

    //             <Text style={styles.tabtitle}>{STR.REGISTER}</Text>
    //           </TouchableOpacity>
    //           <TouchableOpacity
    //             style={{
    //               ...styles.tabbar,
    //               borderBottomColor:
    //                 type == STR.LOGIN ? COLOR.GREEN[100] : COLOR.GRAY[300],
    //             }}
    //             onPress={() => {
    //               setType(STR.LOGIN), setEmail('');
    //             }}>
    //             <View
    //               style={{
    //                 ...styles.iconView,
    //                 borderColor:
    //                   type == STR.LOGIN ? COLOR.GREEN[100] : COLOR.GRAY[300],
    //               }}>
    //               <Icon
    //                 name="user"
    //                 type="feather"
    //                 color={type == STR.LOGIN ? COLOR.GREEN[100] : COLOR.GRAY[300]}
    //                 size={42}
    //               />
    //             </View>

    //             <Text style={styles.tabtitle}>{STR.LOGIN}</Text>
    //           </TouchableOpacity>
    //         </View>

    //         {type === STR.REGISTER && (
    //           <View style={styles.registerView}>
    //             <View
    //               style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    //               <View style={{ width: "50%" }}>
    //                 <TextInput
    //                   placeholder="First name"
    //                   placeholderTextColor={'gray'}

    //                   style={{ ...styles.textinputView, width: '94%' }}
    //                   onChangeText={text => setFirstName(text)}
    //                   onEndEditing={() => validation("firstname")}
    //                   value={firstname}
    //                 />
    //                 {firstvalid &&
    //                   <Text style={{ color: "red", marginTop: 2 }}>{firstname.length > 0 ? "*First Name must be alphabet" : "*Please enter your first name"} </Text>
    //                 }
    //               </View>
    //               <View style={{ width: "50%", alignItems: "flex-end" }}>
    //                 <TextInput
    //                   placeholder="Last name"
    //                   placeholderTextColor={'gray'}
    //                   style={{ ...styles.textinputView, width: '94%' }}
    //                   onChangeText={text => setLastName(text)}
    //                   onEndEditing={() => validation("lastname")}
    //                   value={lastname}
    //                 />
    //                 {lastvalid &&
    //                   <Text style={{ color: "red", marginTop: 2 }}>{lastname.length > 0 ? "*Last Name must be alphabet" : "*Please enter your last name"} </Text>
    //                 }
    //               </View>
    //             </View>

    //             <TextInput
    //               placeholder={'Enter Email'}
    //               placeholderTextColor={COLOR.GRAY[300]}
    //               style={styles.textinputView}
    //               onChangeText={text => setEmail(text)}
    //               onEndEditing={() => validation("email")}
    //               value={email}
    //             />
    //             {emailvalid &&
    //               <Text style={{ color: "red", marginTop: 2 }}>{email.length > 0 ? "*Enter valid email id" : "*Please enter your email"} </Text>
    //             }
    //             <View style={{ flexDirection: 'row' }}>
    //               <TouchableOpacity
    //                 onPress={() => setShow(true)}
    //                 style={{
    //                   ...styles.textinputView,
    //                   justifyContent: 'center',
    //                   padding: 10,
    //                   width: '22%',
    //                 }}>
    //                 <Text
    //                   style={{
    //                     color: 'black',
    //                     fontSize: 12,
    //                   }}>
    //                   {countryCode && countryCode.length > 0 ? countryCode : '--'}
    //                 </Text>
    //               </TouchableOpacity>
    //               <View style={{ width: "75%" }}>


    //                 <TextInput
    //                   placeholder={'Enter Mobile'}
    //                   placeholderTextColor={COLOR.GRAY[300]}
    //                   style={{
    //                     ...styles.textinputView,
    //                     width: '100%',
    //                     marginLeft: 10,
    //                   }}
    //                   onChangeText={text => setNumber(text)}

    //                   onEndEditing={() => validation("number")}
    //                   value={number}
    //                   keyboardType={'numeric'}
    //                   maxLength={10}
    //                 />
    //                 {/* 
    //               {numbervalid &&
    //                 <Text style={{ color: "red", marginTop: 2, marginLeft: 10, }}>{number.length > 0 ? "*Ener 10 digit number" : "*Please enter your email"} </Text>
    //               } */}
    //               </View>
    //             </View>

    //             <TextInput
    //               placeholder="Password"
    //               placeholderTextColor={'gray'}
    //               style={styles.textinputView}
    //               secureTextEntry={true}
    //               onChangeText={text => setPassword(text)}
    //               value={password}
    //             />

    //             {/* {passwordvalid &&
    //             <Text style={{ color: "red", marginTop: 2, marginLeft: 10, }}>{password.length > 0 ? "*" : "*Please enter your password"} </Text>
    //           } */}
    //             <TextInput
    //               placeholder="Confirm password"
    //               placeholderTextColor={'gray'}
    //               style={styles.textinputView}
    //               secureTextEntry={true}
    //               onChangeText={text => setConfirmpas(text)}
    //               value={confirmpass}
    //             />
    //             {/* {confirmpasswordvalid &&
    //             <Text style={{ color: "red", marginTop: 2, marginLeft: 10, }}>{confirmpass.length > 0 ? "*Ener 10 digit number" : "*Please enter your password"} </Text>
    //           } */}
    //             <TextInput
    //               placeholder={'company name'}
    //               placeholderTextColor={COLOR.GRAY[300]}
    //               style={styles.textinputView}
    //               onChangeText={text => setCompanyname(text)}
    //               value={companyname}
    //             />
    //             <Text style={styles.infotext}>{STR.REGISTERINFO}</Text>

    //             <TouchableOpacity
    //               style={{ ...styles.buttonView, backgroundColor: firstname.length === 0 || lastname.length === 0 || email.length === 0 || password.length === 0 || confirmpass.length === 0 || companyname.length === 0 ? "rgba(49,195,151,0.2)" : "#31C397" }}
    //               onPress={() => handleregister()}
    //               disabled={firstname.length === 0 || lastname.length === 0 || email.length === 0 || password.length === 0 || confirmpass.length === 0 || companyname.length === 0 ? true : false}>
    //               <Text style={styles.bottontext}>{STR.CONTINUE}</Text>
    //             </TouchableOpacity>

    //             <CountryPicker
    //               show={show}
    //               // when picker button press you will get the country object with dial code
    //               pickerButtonOnPress={item => {
    //                 setCountryCode(item.dial_code);
    //                 setShow(false);
    //               }}
    //             />
    //           </View>
    //         )}

    //         {type === STR.LOGIN && (
    //           <View style={styles.registerView}>
    //             <TextInput
    //               placeholder={'Enter Email'}
    //               placeholderTextColor={COLOR.GRAY[300]}
    //               style={styles.textinputView}
    //               onChangeText={text => setEmail(text)}
    //               value={email}
    //             />
    //             <Text style={styles.infotext}>{STR.REGISTERINFO}</Text>

    //             <TouchableOpacity
    //               style={{ ...styles.buttonView, height: 45 }}
    //               onPress={() => handleLogin()}>
    //               <Text style={{ ...styles.bottontext }}>Login with OTP</Text>
    //             </TouchableOpacity>
    //             <Text style={{ fontSize: 18, textAlign: "center", color: "black", fontWeight: "bold" }}>Or </Text>
    //             <Text style={{ fontSize: 18, textAlign: "center", color: "black", fontWeight: "bold" }}>login with Password</Text>

    //             <TextInput
    //               placeholder={'Enter Password'}
    //               placeholderTextColor={COLOR.GRAY[300]}
    //               style={styles.textinputView}
    //               secureTextEntry={true}
    //               onChangeText={text => setPassword(text)}
    //               value={password}
    //             />



    //             <TouchableOpacity
    //               style={{ ...styles.buttonView, height: 45 }}
    //               onPress={() => handlepasswordLogin()}>
    //               <Text style={styles.bottontext}>{STR.CONTINUE}</Text>
    //             </TouchableOpacity>
    //           </View>
    //         )}
    //       </View>
    //     </View>
    //     {/* </SafeAreaView> */}
    //   </KeyboardAvoidingView>
    // </ScrollView>
  );
};

export default LoginScreen;
