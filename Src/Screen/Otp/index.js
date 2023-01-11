import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import Swiper from 'react-native-swiper';
import {COLOR} from '../../Constant/color';
import {Onbording} from '../../Constant/json';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import OtpInputs from 'react-native-otp-inputs';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Otpscreen = () => {
  const navigation = useNavigation();

  const [otp , setOtp] = useState()

  const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true })
  const handleotp = () => {

    console.log("HELLO");
    let dataToSend = {otp: otp};
    // console.log(dataToSend, 'fshsh');
    axios
      .post('http://142.93.213.49:8000/auth/verify-otp', dataToSend)
      .then(function (responseJson) {
      
        console.log(responseJson, 'ressss');
        if (responseJson?.data?.data === 'Authorized') {
        
          Alert.alert('Login Successful');
          
          AsyncStorage.setItem('login', 'true');
          handlebiomatric();

        } else {
         
          Alert.alert('Please Enter Right OTP');
          console.log('Please check your email id or password');
        }
      })
      .catch(error => {
        //Hide Loader
       
        console.error(error);
       Alert.alert('Please Enter Right OTP', Toast.LONG, {
          backgroundColor: 'blue',
        });
      });
  }

  const handlebiomatric = async () => {
    // const biometryType = await rnBiometrics.isSensorAvailable()
    //   rnBiometrics.isSensorAvailable()
    //   .then((resultObject) => {
    //     const { available, biometryType } = resultObject

    //     console.log("%%%%%%%",biometryType , available);
    //  if (available && biometryType === BiometryTypes.FaceID) {
    //       console.log('FaceID is supported')
    //     } else{
    //       console.log("Not suppoted%%%%%");
    //     }
    //   })
    // Touch ID


    // console.log("@@@@",check);
    // const biometryType = await rnBiometrics.isSensorAvailable();


    await rnBiometrics.isSensorAvailable().then(resultObject => {
   

      rnBiometrics
        .simplePrompt({promptMessage: 'Confirm fingerprint' })
        .then(resultObject => {
          const {success} = resultObject;

          if (success) {
         
            navigation.navigate('DrawerNavigationRoutes');
          } else {
            Alert.alert(
              'Fingerprint not exist or were deleted . Please add fingerprint in system ',
            );
          }
        })
        .catch(e => {
          Alert.alert('Fail login with senser . Please try with login');
          AsyncStorage.removeItem('login');
        });
    });
  };

  
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginBottom: '15%',
          fontSize: 25,
          color: COLOR.WHITE[100],
          fontWeight: '700',
        }}>
        Otp verification
      </Text>
      <OtpInputs
        handleChange={code => setOtp(code)}
        numberOfInputs={6}
        style={{
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
          flexDirection: 'row',
        }}
        inputStyles={{
          width: 50,
          height: 60,
          // backgroundColor: COLOR.GRAY[300],
          borderRadius: 10,
          elevation: 5,
          alignSelf: 'center',
          textAlign: 'center',
          fontSize: 25,
          color: COLOR.WHITE[100],

          shadowColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      <TouchableOpacity
        style={{
          width: '50%',
          backgroundColor: COLOR.GREEN[100],
          height: 40,
          marginTop: '15%',
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => handleotp()}>
        <Text
          style={{
            fontSize: 15,
            color: COLOR.WHITE[100],
            fontWeight: '400',
          }}>
          CONTINUE
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Otpscreen;
