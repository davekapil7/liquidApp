import React, {useState} from 'react';
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
import axiosInstance from '../../Constant/axios';
import { useDispatch } from 'react-redux';
import { getCarddata } from '../../Function/Apicall';
const Otpscreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState();

  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  const initialapicall = () => {
    getCarddata(dispatch)
  }
  const handleotp = () => {
    console.log('HELLO');
    let dataToSend = {otp: otp};
    // console.log(dataToSend, 'fshsh');
    axiosInstance
      .post('auth/verify-otp', dataToSend)
      .then(function (responseJson) {
        console.log(responseJson, 'ressss');
        console.log(responseJson.data, 'responce');
        if (responseJson?.data?.data === 'Authorized') {
         
          AsyncStorage.setItem('login', 'true');

          initialapicall()
          navigation.navigate('Tabnavigationroute');
        //  handlebiomatric();
        } else {
          Alert.alert('Please Enter Right OTP');
          console.log('Please check your email id or password');
        }
      })
      .catch(error => {
        //Hide Loader

        console.error(error);
        Alert.alert('Please Enter Right OTP');
      });
  };

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
        .simplePrompt({promptMessage: 'Confirm fingerprint'})
        .then(resultObject => {
          const {success} = resultObject;

          if (success) {
            navigation.navigate('Tabnavigationroute');
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
      <View
        style={{
          backgroundColor: COLOR.WHITE[100],
          marginTop: '100%',
          height: '60%',
          width: '100%',
        }}></View>

      <View
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          flex: 1,
          width: '80%',
          height: '75%',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          alignItems: 'center',
          padding: 15,
          // marginTop: '20%',
        }}>
        <Text
          style={{fontSize: 25, color: COLOR.BLACK[100], fontWeight: '600'}}>
          Confirm OTP
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginTop: 18,
            textAlign: 'center',
            color: COLOR.BLACK[100],
            fontWeight: '300',
          }}>
          Please enter the verification code that we have sent to the mobile
          number +954875285
        </Text>

        <OtpInputs
          handleChange={code => setOtp(code)}
          numberOfInputs={6}
          style={{
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            flexDirection: 'row',
            marginTop: "10%",
          }}
          inputStyles={{
            width: 50,
            height: 60,
            // backgroundColor: COLOR.GRAY[300],
            borderRadius: 10,
            alignSelf: 'center',
            textAlign: 'center',
            borderBottomWidth: 1,
            borderBottomColor: COLOR.BLACK[100],
            fontSize: 20,
            color: COLOR.BLACK[100],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />

        <TouchableOpacity
          style={{
            width: '60%',
            backgroundColor: COLOR.GREEN[100],
            height: 40,
            marginTop: '20%',
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
            Verify
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Text
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
      </TouchableOpacity> */}
    </View>
  );
};

export default Otpscreen;
