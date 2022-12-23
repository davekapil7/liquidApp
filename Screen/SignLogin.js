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
import Toast from 'react-native-simple-toast';

const SignLoginScreen = ({navigation}) => {
  const [userOtp, setUserOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const value = await AsyncStorage.getItem('access_token');
      setAccessToken(value);
      console.log(value, 'val');
    };
    fetchData();
  }, []);

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userOtp) {
      alert('Please fill OTP');
      return;
    }
    setLoading(true);
    let dataToSend = {
      otp: userOtp,
      data: accessToken,
    };

    axios
      .post('http://142.93.213.49:8000/auth/verifySignupOtp', dataToSend)
      .then(async function (responseJson) {
        setLoading(false);
        console.log(responseJson, 'ressss');
        console.log(responseJson?.data?.error);
        console.log(responseJson?.data?.data);

        if (responseJson?.data?.data) {
          const cData = await axios.get(`http://142.93.213.49:8000/auth/info`);
          console.log(cData, 'profile');
          if (cData?.data?.data?.details) {
            AsyncStorage.setItem('login', 'true');
            navigation.replace('DrawerNavigationRoutes');
            Toast.show('Successfully Registered', Toast.LONG, {
              backgroundColor: 'blue',
            });
          }
        } else {
          setErrortext(responseJson?.data?.error);
          Toast.show('Please Enter Right OTP', Toast.LONG, {
            backgroundColor: 'blue',
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        Toast.show('Please Enter Right OTP', Toast.LONG, {
          backgroundColor: 'blue',
        });
      });
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
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={userOtp => setUserOtp(userOtp)}
                placeholder="Enter OTP" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="number"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
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
export default SignLoginScreen;

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
