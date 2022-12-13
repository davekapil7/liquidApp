import React, {useState, useEffect, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './Components/Loader';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [otpInput, setOtpInput] = useState(false);

  const passwordInputRef = createRef();
  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem('access_token');
      setAccessToken(value);
      console.log(value, 'val');
    };
    fetchData();
  }, []);

  const handleSubmitPress = () => {
    setErrortext('');
    // if (!userEmail) {
    //   alert('Please fill Email');
    //   return;
    // }
    // if (!otp) {
    //   alert('Please fill OTP');
    //   return;
    // }
    setLoading(true);
    if (userEmail && !otp) {
      let dataToSend = {email: userEmail};
      axios
        .post('http://142.93.213.49:8000/auth/login', dataToSend)
        .then(function (responseJson) {
          setLoading(false);
          console.log(responseJson, 'ressss');
          // If server response message same as Data Matched
          if (responseJson?.data?.data === 'OTP SENT') {
            setOtpInput(true);
          } else {
            setErrortext(responseJson?.data?.error);
            console.log('Please check your email id or password');
          }
        })
        .catch(function (error) {
          console.log(error);
          setLoading(false);
        });
    } else {
      let dataToSend = {otp: otp};
      console.log(dataToSend, 'fshsh');
      axios
        .post('http://142.93.213.49:8000/auth/verify-otp', dataToSend)
        .then(function (responseJson) {
          setLoading(false);
          console.log(responseJson, 'ressss');
          if (responseJson?.data?.data === 'Authorized') {
            setOtpInput(false);
            AsyncStorage.setItem('login', 'true');
            navigation.replace('DrawerNavigationRoutes');
          } else {
            setErrortext(responseJson?.data?.data?.error);
            console.log('Please check your email id or password');
          }
        })
        .catch(error => {
          //Hide Loader
          setLoading(false);
          console.error(error);
        });
    }
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../Image/liquid.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
            </View>
            {!otpInput ? (
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={UserEmail => setUserEmail(UserEmail)}
                  placeholder="Enter Email" //dummy@abc.com
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
            ) : (
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChangeText={otp => setOtp(otp)}
                  placeholder="Enter OTP" //12345
                  placeholderTextColor="#8b9cb5"
                  keyboardType="number"
                  ref={passwordInputRef}
                  onSubmitEditing={Keyboard.dismiss}
                  blurOnSubmit={false}
                  secureTextEntry={true}
                  underlineColorAndroid="#f000"
                  returnKeyType="next"
                />
              </View>
            )}
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              {!otpInput ? (
                <Text style={styles.buttonTextStyle}>GET OTP</Text>
              ) : (
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              )}
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
