import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { COLOR } from '../../Constant/color';
import { Onbording } from '../../Constant/json';
import { styles } from './style';
import { useNavigation } from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../Constant/axios';
import { useDispatch, useSelector } from 'react-redux';
import { getCarddata, handlebiomatric, loginotp } from '../../Function/Apicall';
import Toast from 'react-native-toast-message';
import CardView from '../../Components/Cardview';
import PoppinsText from '../../Components/LAText/Poppinstext';
const Otpscreen = params => {
  const navigation = useNavigation();
  const [fingerauth  , setFingerauth]  = useState(false)
  const dispatch = useDispatch();
  const cardData = useSelector(state => state.appstate.cardList);
  
  const datatoken = params?.route?.params?.data;
  const register =  params?.route?.params?.params

 

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  const initialapicall = () => {
    if (cardData.length == 0) {
      getCarddata(dispatch);
    }
  };

  useEffect(() => {
    
    AsyncStorage.getItem('fingerlogin').then(value => {
      console.log('Hello acyncn', value);
      if (value === 'true') {
        setFingerauth(true)
      }
    });
  }, [navigation]);

  const handleotp = () => {

    const cardlength = cardData.length

    if(register === "register"){
      handleregisterotp()
    }else{
      loginotp(otp , fingerauth,  dispatch , cardlength)
    }

  };



  const handleregisterotp = () => {
  
    let dataToSend = { data: datatoken, otp: otp };
    console.log(dataToSend, datatoken, 'fshsh');
    axiosInstance
      .post('auth/verifySignupOtp', dataToSend)
      .then(function (responseJson) {
        console.log('Verified user', responseJson.data, 'responce');
        if (responseJson?.data?.error === false) {
         
          dispatch({
            type: "ADD_PROFILE",
            payload: responseJson.data?.user
          })
          AsyncStorage.setItem('login', 'true');

          AsyncStorage.setItem('loginExpiry', responseJson.data.expires);

          AsyncStorage.setItem(
            'isIamSmartCreated',
            JSON.stringify(responseJson.data.user.isIamSmartCredentialCreated),
          );
          dispatch({
            type: "SET_LOGIN",
            payload: true
          })
      
          initialapicall();
       
        } else {
          Toast.show({
            topOffset: 100,
            type: "error",
            text1: "ERROR",
            text2: `Please enter right otp`,
            visibilityTime: 3000,
            props: {
              text1NumberOfLines: 2 //number of how many lines you want
            }
          });
          // Alert.alert('Please Enter Right OTP');
          // console.log('Please check your email id or password');
        }
      })
      .catch(error => {
        //Hide Loader

        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
          text2: `Please enter right OTP`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines: 2 //number of how many lines you want
          }
        });
      });
  };

  return (
    <CardView>
      <View style={{ flex: 1, alignItems: "center" }}>
        <PoppinsText title={"Confirm OTP"}
          textstyle={styles.titletext} />

        <PoppinsText title={"Please enter the verification code that we have sent to the email address!"}
          textstyle={styles.infotext} />

        <OtpInputs
          handleChange={code => setOtp(code)}
          numberOfInputs={6}
          
          style={{
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            flexDirection: 'row',

            marginTop: 25,
          }}
          inputStyles={{
            width: 30,
            height: 60,
            // backgroundColor: COLOR.GRAY[300],
            borderBottomWidth: 2,
         //   elevation: 5,
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 25,
            color: COLOR.BLACK[100],

            alignItems: 'center',
            justifyContent: 'center',
          }}
        />

        <TouchableOpacity style={styles.button} onPress={() => handleotp()}>

          <PoppinsText title={"VERIFY"}
            textstyle={styles.buttontext} />
        </TouchableOpacity>
      </View>
    </CardView>
    // <View style={styles.container}>
    //   <View
    //     style={{
    //       backgroundColor: COLOR.WHITE[100],
    //       marginTop: '100%',
    //       height: '60%',
    //       width: '100%',
    //     }}></View>

    //   <View
    //     style={{
    //       position: 'absolute',
    //       backgroundColor: 'white',
    //       flex: 1,
    //       width: '90%',
    //       height: '75%',
    //       borderTopLeftRadius: 25,
    //       borderTopRightRadius: 25,
    //       alignItems: 'center',
    //       padding: 15,
    //       // marginTop: '20%',
    //     }}>
    //     <Text
    //       style={{fontSize: 25, color: COLOR.BLACK[100], fontWeight: '600'}}>
    //       Confirm OTP
    //     </Text>
    //     <Text
    //       style={{
    //         fontSize: 16,
    //         marginTop: 18,
    //         textAlign: 'center',
    //         color: COLOR.BLACK[100],
    //         fontWeight: '300',
    //       }}>
    //       Please enter the verification code that we have sent to the email id{' '}
    //       {email}
    //     </Text>

    //     {/* <OtpInputs
    //       handleChange={code => setOtp(code)}
    //       numberOfInputs={6}
    //       style={{
    //         alignItems: 'center',
    //         justifyContent: 'space-evenly',
    //         width: '100%',
    //         flexDirection: 'row',
    //         marginTop: "10%",
    //       }}
    //       inputStyles={{
    //         width: 50,
    //         height: 60,
    //         // backgroundColor: COLOR.GRAY[300],
    //         borderRadius: 10,
    //         alignSelf: 'center',
    //         textAlign: 'center',
    //         borderBottomWidth: 1,
    //         borderBottomColor: COLOR.BLACK[100],
    //         fontSize: 20,
    //         color: COLOR.BLACK[100],
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //       }}
    //     /> */}
    //     <View style={styles.otpContainer}>
    //       {otp.map((value, index) => (
    //         <TextInput
    //           key={index}
    //           ref={ref => (inputs.current[index] = ref)}
    //           style={styles.otpInput}
    //           keyboardType="number-pad"
    //           maxLength={1}
    //           value={value}
    //           onChangeText={text => handleOtpChange(index, text)}
    //         />
    //       ))}
    //     </View>

    //     <TouchableOpacity
    //       style={{
    //         width: '60%',
    //         backgroundColor: COLOR.GREEN[100],
    //         height: 40,
    //         marginTop: '20%',
    //         borderRadius: 25,
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //       }}
    //       onPress={() => {
    //         if (screen === 'Register Account') {
    //           handleregisterotp();
    //         } else {
    //           handleotp();
    //         }
    //       }}>
    //       <Text
    //         style={{
    //           fontSize: 15,
    //           color: COLOR.WHITE[100],
    //           fontWeight: '400',
    //         }}>
    //         Verify
    //       </Text>
    //     </TouchableOpacity>
    //   </View>
    //   {/* <Text
    //     style={{
    //       marginBottom: '15%',
    //       fontSize: 25,
    //       color: COLOR.WHITE[100],
    //       fontWeight: '700',
    //     }}>
    //     Otp verification
    //   </Text>
    //   <OtpInputs
    //     handleChange={code => setOtp(code)}
    //     numberOfInputs={6}
    //     style={{
    //       alignItems: 'center',
    //       justifyContent: 'space-evenly',
    //       width: '100%',
    //       flexDirection: 'row',
    //     }}
    //     inputStyles={{
    //       width: 50,
    //       height: 60,
    //       // backgroundColor: COLOR.GRAY[300],
    //       borderRadius: 10,
    //       elevation: 5,
    //       alignSelf: 'center',
    //       textAlign: 'center',
    //       fontSize: 25,
    //       color: COLOR.WHITE[100],

    //       shadowColor: 'white',
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //     }}
    //   />

    //   <TouchableOpacity
    //     style={{
    //       width: '50%',
    //       backgroundColor: COLOR.GREEN[100],
    //       height: 40,
    //       marginTop: '15%',
    //       borderRadius: 25,
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //     }}
    //     onPress={() => handleotp()}>
    //     <Text
    //       style={{
    //         fontSize: 15,
    //         color: COLOR.WHITE[100],
    //         fontWeight: '400',
    //       }}>
    //       CONTINUE
    //     </Text>
    //   </TouchableOpacity> */}
    // </View>
  );
};

// const styles = StyleSheet.create({
//   keyContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   container: {
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//   },
//   otpMsg: {
//     marginTop: 30,
//   },
//   mobContainer: {
//     marginTop: 10,
//   },
//   mobNumber: {
//     color: '#182958',
//     fontSize: 20,
//     fontWeight: '700',
//   },
//   subtitle: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
//   otpContainer: {
//     marginTop: 30,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   timerText: {
//     color: '#465479',
//     fontSize: 15,
//   },
//   resendBox: {
//     marginTop: 10,
//   },
//   resendText: {
//     color: '#4A4BFE',
//     fontSize: 18,
//   },
//   otpInput: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     borderWidth: 1,
//     borderColor: '#A3A9BC',
//     borderRadius: 10,
//     alignSelf: 'center',
//     // paddingHorizontal: 10,
//     // paddingVertical: 10,
//     width: 50,
//     height: 50,
//     marginHorizontal: 4,
//   },
//   buttonDisabled: {
//     backgroundColor: '#E5E5E5',
//     width: '90%',
//     borderRadius: 25,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//   },
//   bottomLink: {
//     position: 'absolute',
//     bottom: '5%',
//     width: '100%',
//   },
//   horizontal: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 15,
//   },
//   accLink1: {
//     color: '#465479',
//     fontSize: 16,
//   },
//   accLink2: {
//     color: '#4A4BFE',
//     fontSize: 16,
//   },
//   button: {
//     backgroundColor: '#4A4BFE',
//     width: '90%',
//     borderRadius: 25,
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 17,
//     fontWeight: '700',
//   },
//   disabledButtonText: {
//     color: '#747E9B',
//     fontSize: 17,
//     fontWeight: '700',
//   },
// });

export default Otpscreen;
