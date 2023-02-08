// import React in our code
import React, {useEffect, useState} from 'react';

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
} from 'react-native';

import {CameraScreen} from 'react-native-camera-kit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import Theambackground from '../../Components/Theambackground';
import {COLOR} from '../../Constant/color';

const VerifyProofScreen = () => {
  const [qrvalue, setQrvalue] = useState('');
  const [opneScanner, setOpneScanner] = useState(false);
  const [verify, setVerify] = useState(false);

  const onOpenlink = () => {
    // If scanned then function to open URL in Browser
    Linking.openURL(qrvalue);
  };

  const onBarcodeScan = qrvalue => {
    // Called after te successful scanning of QRCode/Barcode
    setQrvalue(qrvalue);
    onOpneScanner();
    setOpneScanner(false);
  };

  const onOpneScanner = async () => {
    // To Start Scanning
    // if (Platform.OS === 'android') {
    //   async function requestCameraPermission() {
    //     try {
    //       const granted = await PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.CAMERA,
    //         {
    //           title: 'Camera Permission',
    //           message: 'App needs permission for camera access',
    //         },
    //       );
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         // If CAMERA Permission is granted
    //         setQrvalue('');
    //         setOpneScanner(true);
    //       } else {
    //         alert('CAMERA permission denied');
    //       }
    //     } catch (err) {
    //       alert('Camera permission err', err);
    //       console.warn(err);
    //     }
    //   }
    //   // Calling the camera permission function
    //   requestCameraPermission();
    //   // } else {
    //   setQrvalue('');
    //   setOpneScanner(true);
    // }
    axios
      .post(
        'http://142.93.213.49:8000/api/verifyProof',

        {
          itemId: qrvalue,
        },
      )
      .then(function (responseJson) {
        // setLoading(false);
        if (responseJson) {
          console.log(responseJson.status);
          if (responseJson.status === 200) {
            Toast.show('Successfully Proof Created', Toast.LONG, {
              backgroundColor: 'blue',
            });
            setVerify(true);
          }
        } else {
          setErrortext(responseJson?.data?.error);
          Toast.show('Somthing Went Wrong Scan Again', Toast.LONG, {
            backgroundColor: 'blue',
          });
        }
      })
      .catch(function (error) {
        setErrortext(responseJson?.data?.error);
        Toast.show('Somthing Went Wrong Scan Again', Toast.LONG, {
          backgroundColor: 'blue',
        });
        // setLoading(false);
      });
    // console.log(qrvalue, 'value');
  };

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

        console.log("$$$$$$",granted);
        setQrvalue('');
        setOpneScanner(true);
      } else {
        alert('CAMERA permission denied');
      }
    } catch (err) {
      alert('Camera permission err', err);
      console.warn(err);
    }
  
}

  useEffect(() => {
    if (Platform.OS === 'android') {

      requestCameraPermission();
      
    }else{
      setQrvalue('');
      setOpneScanner(true);
    }
  
  }, []);

  return (
    // <SafeAreaView style={{flex: 1}}>
    <Theambackground
      title="Scan OR Code"
      subtitle="Scan the recipient's QR to send a credential"
      scan={false}
      scanscreen={true}
      back={true}
      setting={false}>
      <View style={{flex: 1, backgroundColor: 'pink', width: '100%'}}>
        {opneScanner ? (
          <View style={{flex: 1}}>
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
            {/* <Text style={styles.titleText}>
            Scan the barcode and verify your proof
          </Text>
          <Text style={styles.textStyle}>
            {verify ? 'Proof Verified ' : ''}
          </Text> */}
            {qrvalue.includes('https://') ||
            qrvalue.includes('http://') ||
            qrvalue.includes('geo:') ? (
              <>
                <Text style={{fontSize: 15, color: COLOR.BLACK[100]}}>
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
