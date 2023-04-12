// import React in our code
import React, { useEffect, useState } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Modal,
  Alert,
  Image,
} from 'react-native';

import { CameraScreen } from 'react-native-camera-kit';
import axios from 'axios';
import Theambackground from '../../Components/Theambackground';
import { COLOR } from '../../Constant/color';
import axiosInstance from '../../Constant/axios';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getProofdata } from '../../Function/Apicall';
import { Toast } from 'react-native-toast-message';
const VerifyProofScreen = () => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);
  const [verifyData, setVerifyData] = useState({});
  const [verifyDetails, setVerifyDetails] = useState({});
  const [errorText, setErrortext] = useState('');
  const [loginmodal, setLoginmodal] = useState(false)
  const [validmodal, setValidmodal] = useState(false)

  const [isEnabled, setIsEnabled] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const validJson = { "isValid": true, "validationMessages": [], "validationResults": { "CredentialStatus": { "isValid": true, "messages": [] }, "IssuerIsSigner": { "isValid": true, "messages": [] }, "SchemaConformance": { "isValid": true, "messages": [] }, "SignatureVerification": { "isValid": true, "messages": [] } } }
  const validresult = validJson?.validationResults
  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = qrvalue => {
    // Called after te successful scanning of QRCode/Barcode
    let obj = JSON.parse(qrvalue);
    obj = { ...obj }
    console.log("Qr value", obj);
    if (obj.type == 'verification_request') {
      // onOpneScanner(obj);
      getProofdata(obj.data.verification_id, dispatch);
      dispatch({ type: 'ADD_EMAIL', payload: obj.email });
      dispatch({ type: 'VERIFICATION_ID', payload: obj.data.verification_id });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Tabnavigationroute' }],
      });
    } else if (obj.type == 'login-qr') {
      Toast.show({
        topOffset: 100,
        type: "error",
        text1: "ERROR",
       text2: `Login check QR`,
        visibilityTime: 3000,
        props: {
          text1NumberOfLines:2 //number of how many lines you want
        }
      });
      loginScanner(obj.id);
    }
    else {
      onOpneScanner(obj);
    }
  };

  const onOpneScanner = async (obj) => {
    // To Start Scanning
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let dataToSend = { ...obj, err: false };

    var raw = JSON.stringify({ ...dataToSend });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://api.liquid.com.hk/api/api/verifyQR", requestOptions)
      .then(response => response.text())
      .then(result => {
        let scannedObj = JSON.parse(result);
        setVerifyData(scannedObj.proof);
        let scData = JSON.parse(scannedObj.data.data);
        setVerifyDetails(scData);
        console.log("Scanned data", scData);
        console.log("Scanned proof", JSON.stringify(scannedObj.proof));
        if (scannedObj?.proof) {
        
          Toast.show({
            topOffset: 100,
            
            text1: "Success",
           text2: `Successfully Proof Created`,
            visibilityTime: 3000,
            props: {
              text1NumberOfLines:2 //number of how many lines you want
            }
          });
        }
      })
      .catch(error =>{
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
         text2: `Something went wrong , Please try again`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines:2 //number of how many lines you want
          }
        });
      });
  };

  const loginScanner = (qrVal) => {
    axiosInstance
      .get('api/create-proof-login')
      .then(function (responseJson) {
        if (responseJson.status === 200) {
          console.log("Login QR ", responseJson.data);
          console.log("Login QR type", typeof responseJson.data);
          let obj = responseJson.data;
          delete obj.err;
          obj = { ...obj, qr_id: qrVal }
          shareMobileToken(obj);
        }
      })
      .catch(error => {
        //Hide Loader
        console.error(error);
        // Alert.alert("Login didn't worked");
       
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
         text2: `Login didn't worked`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines:2 //number of how many lines you want
          }
        });
      });
  };

  const shareMobileToken = (data) => {
    console.log("Object data", data);
    axiosInstance
      .post('api/share-mobile-token', data)
      .then(function (responseJson) {
        if (responseJson.status === 200) {
         
          Toast.show({
            topOffset: 100,
            text1: "Success",
           text2: `Logged in Mobile Token Created`,
            visibilityTime: 3000,
            props: {
              text1NumberOfLines:2 //number of how many lines you want
            }
          });
          console.log("Share QR token", responseJson.data);
        }
      })
      .catch(error => {
        //Hide Loader
        console.error(error);
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
         text2: `Login didn't worked`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines:2 //number of how many lines you want
          }
        });
      });
  }

  const requestCameraPermission = async () => {

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs permission for camera access',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // If CAMERA Permission is granted

        setQrvalue('');
        setOpneScanner(true);
      } else {
       // alert('CAMERA permission denied');
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
         text2: `CAMERA permission denied`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines:2 //number of how many lines you want
          }
        });
      }
    } catch (err) {
    //  alert('Camera permission err', err);
    Toast.show({
      topOffset: 100,
      type: "error",
      text1: "ERROR",
     text2: `Camera permission err`,
      visibilityTime: 3000,
      props: {
        text1NumberOfLines:2 //number of how many lines you want
      }
    });
      console.warn(err);
    }

  }

  useEffect(() => {
    if (Platform.OS === 'android') {

      requestCameraPermission();

    } else {
      setQrvalue('');
      setOpneScanner(true);
    }

  }, []);

  return (
    // <SafeAreaView style={{flex: 1}}>
    <Theambackground
      title="Scan QR Code"
      subtitle="Please turn on the switch for login & off for credentials"
      scan={false}
      scanscreen={true}
      back={true}
      // isEnabled={isEnabled}
      // toggleSwitch={toggleSwitch}
      setting={false}>
      <View style={{ flex: 1, backgroundColor: 'pink', width: '100%' }}>
        {opneScanner ? (
          <View style={{ flex: 1 }}>
            <CameraScreen
              showFrame={false}
              // Show/hide scan frame
              scanBarcode={true}
              // Can restrict for the QR Code only
              laserColor={'blue'}
              // Color can be of your choice
              frameColor={'yellow'}
              // If frame is visible then frame color
              colorForScannerFrame={'black'}
              // Scanner Frame color
              onReadCode={event =>
                onBarcodeScan(event.nativeEvent.codeStringValue)
              }
            />
          </View>
        ) : (
          <View style={styles.container}>
            {qrvalue.includes('https://') ||
              qrvalue.includes('http://') ||
              qrvalue.includes('geo:') ? (
              <>
                <Text style={{ fontSize: 15, color: COLOR.BLACK[100] }}>
                  {qrvalue}
                </Text>
                <TouchableHighlight onPress={onOpenlink}>
                  <Text style={styles.textLinkStyle}>
                    {qrvalue.includes('geo:') ? 'Open in Map' : 'Open Link'}
                  </Text>
                </TouchableHighlight>
              </>
            ) : null}
            <TouchableHighlight
              onPress={() => setOpneScanner(true)}
              style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>Open QR Scanner</Text>
            </TouchableHighlight>
          </View>
        )}
      </View>

      {/* <Modal visible={loginmodal}  transparent={true} style={{alignItems:"center",justifyContent:"center",backgroundColor:"pink",height:"100%"}}>
  <View style={{width:"80%",height:"100%",alignSelf:"center",backgroundColor:"transparent",alignItems:"center",justifyContent:"center"}}>
   <View style={{width:"100%",height:150 , alignItems:"center",backgroundColor:"white",paddingTop:15}}>
   <Text style={{fontSize:18 , color:"black" , fontWeight:"700"}}>Login succcessfully done in web portal</Text>
   </View>
   
  </View>
  </Modal>  */}
      <Modal visible={validmodal} transparent={true} >
        <View style={{ width: "90%", height: "100%", alignSelf: "center", backgroundColor: "transparent", alignItems: "center", justifyContent: "center" }}>
          <View style={{ width: "100%", paddingVertical: 10, minHeight: 150, backgroundColor: "white", paddingTop: 15, borderRadius: 15 }}>
            <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "center" }}>
              <Image source={require("../../../Image/check.png")} />
              <Text style={{ fontSize: 22, fontWeight: "bold", color: "black", marginLeft: 5 }}>isValid</Text>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%" }}>
              {Object.entries(validresult).map((item, i) => {
                return (
                  <View style={{ width: "50%", flexWrap: "wrap" }}>
                    {item[1]?.isValid == true ?
                      <Image source={require("../../../Image/check.png")} />
                      :
                      <Image source={require("../../../Image/cross.png")} />
                    }
                    <Text numberOfLines={1}>{item[0]}</Text>
                  </View>);
              })}
            </View>

          </View>

        </View>
      </Modal>
    </Theambackground>
    // </SafeAreaView>
  );
};

export default VerifyProofScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleText: {
    marginTop: 50,
    fontSize: 22,
    width: '80%',
    color: COLOR.BLUE[300],
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    marginTop: 16,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: COLOR.BLUE[300],
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    minWidth: 250,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    fontSize: 18,
    fontWeight: '800',
    textAlign: 'center',
  },
  textLinkStyle: {
    color: COLOR.PRIMARY,
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
});
