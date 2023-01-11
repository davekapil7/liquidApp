import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {IMG} from '../../Constant/image';
import {STR} from '../../Constant/string';
import {styles} from './style';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from '../../Constant/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [name , setName] = useState("")
  const [prenumber, setPrenumber] = useState(91);
  const [number, setNumber] = useState();
  const [emailfocus, setemailfocus] = useState(false);
  const [type, setType] = useState(STR.LOGIN);
  const [passvisible, setPassvisible] = useState(false);

  const navigation = useNavigation();

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

  const handleLogin = () => {
    if (email.length > 0) {
      let dataToSend = {email: email};
      axios
        .post('http://142.93.213.49:8000/auth/login', dataToSend)
        .then(function (responseJson) {
          console.log(responseJson, 'ressss');

          // If server response message same as Data Matched
          if (responseJson?.data?.data === 'OTP SENT') {
            // setOtpInput(true);
            Alert.alert('OTP SENT');
            navigation.navigate('Otpscreen');
          } else {
            Alert.alert('Please check your email');
            console.log('Please check your email id or password');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    console.log('######', email);
    //  navigation.navigate('Otpscreen')
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.cardView}>
          <Text style={styles.starttext}>{STR.GET}</Text>
          <Text style={styles.starttext}>{STR.START}</Text>

          <View style={styles.tabView}>
            <TouchableOpacity
              style={{
                ...styles.tabbar,
                borderBottomColor:
                  type == STR.REGISTER ? COLOR.GREEN[100] : COLOR.GRAY[300],
              }}
              onPress={() => setType(STR.REGISTER)}>
              <View
                style={{
                  ...styles.iconView,
                  borderColor:
                    type == STR.REGISTER ? COLOR.GREEN[100] : COLOR.GRAY[300],
                }}>
                <Icon
                  name="pencil"
                  type="octicon"
                  color={
                    type == STR.REGISTER ? COLOR.GREEN[100] : COLOR.GRAY[300]
                  }
                  size={25}
                />
              </View>

              <Text style={styles.tabtitle}>{STR.REGISTER}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.tabbar,
                borderBottomColor:
                  type == STR.LOGIN ? COLOR.GREEN[100] : COLOR.GRAY[300],
              }}
              onPress={() => setType(STR.LOGIN)}>
              <View
                style={{
                  ...styles.iconView,
                  borderColor:
                    type == STR.LOGIN ? COLOR.GREEN[100] : COLOR.GRAY[300],
                }}>
                <Icon
                  name="user"
                  type="feather"
                  color={type == STR.LOGIN ? COLOR.GREEN[100] : COLOR.GRAY[300]}
                  size={42}
                />
              </View>

              <Text style={styles.tabtitle}>{STR.LOGIN}</Text>
            </TouchableOpacity>
          </View>

          {type === STR.REGISTER && (
            <View style={styles.registerView}>
              <TextInput
                placeholder={STR.FULLNAME}
                style={styles.textinputView}
                onChangeText={text => setName(text)}
                value={name}
              />

              <TextInput
                placeholder={'Enter Email'}
                placeholderTextColor={COLOR.GRAY[300]}
                style={styles.textinputView}
                onChangeText={text => setEmail(text)}
                value={email}
              />
              <TextInput
                placeholder={'Enter Mobile'}
                placeholderTextColor={COLOR.GRAY[300]}
                style={styles.textinputView}
                onChangeText={text => setNumber(text)}
                value={number}
              />
              <Text style={styles.infotext}>{STR.REGISTERINFO}</Text>

              <TouchableOpacity style={styles.buttonView}>
                <Text style={styles.bottontext}>{STR.CONTINUE}</Text>
              </TouchableOpacity>
            </View>
          )}

          {type === STR.LOGIN && (
            <View style={styles.registerView}>
              {/* <TextInput
   placeholder={STR.FULLNAME}
   style={styles.textinputView}
   onChangeText={text => setEmail(text)}
   value={email}
 />

<TextInput
   placeholder={"Enter Email"}
   style={styles.textinputView}
   onChangeText={text => setEmail(text)}
   value={email}
 /> */}
              <TextInput
                placeholder={'Enter Email'}
                placeholderTextColor={COLOR.GRAY[300]}
                style={styles.textinputView}
                onChangeText={text => setEmail(text)}
                value={email}
              />
              <Text style={styles.infotext}>{STR.REGISTERINFO}</Text>

              <TouchableOpacity
                style={styles.buttonView}
                onPress={() => handleLogin()}>
                <Text style={styles.bottontext}>{STR.CONTINUE}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
