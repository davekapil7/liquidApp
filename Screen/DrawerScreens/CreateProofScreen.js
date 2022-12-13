// Import React and Component
import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  // TouchableOpacity,
  // Share,
} from 'react-native';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';

const CreateProofScreen = () => {
  const [qrvalue, setQrvalue] = useState('');
  let myQRCode = useRef();

  useEffect(() => {
    const getData = async () => {
      const getDid = await axios.get(`http://142.93.213.49:8000/api/getDid`);
      console.log(getDid);
      console.log(getDid?.data?.data?.items[0]['id'], 'a');
      if (getDid) {
        await axios
          .post('http://142.93.213.49:8000/api/createProof', {
            itemId: getDid?.data?.data?.items[0]['id'],
          })
          .then(function (responseJson) {
            // setQrvalue(responseJson?.data?.data?.proof?.proofValue);
            setQrvalue(
              getDid?.data?.data?.items[0]['id']
                ? JSON.stringify(getDid?.data?.data?.items[0]['id'])
                : 'data is not valid',
            );
            // const data = JSON.stringify(responseJson?.data?.data);
            // console.log(data, 'ressss');
            // console.log(JSON.parse(data), 'ssss');
          })
          .catch(function (error) {
            setQrvalue(JSON.stringify('Please Scan again'));
            console.log(error);
          });
      }
      // setDid(getDid?.data?.data?.items[0]['id']);
    };
    getData();
  }, []);

  // const shareQRCode = () => {
  //   myQRCode.toDataURL(dataURL => {
  //     console.log(JSON.stringify(dataURL));
  //     let shareImageBase64 = {
  //       title: 'Proof QR',
  //       type: 'image/jpg',
  //       // url: `data:image/png;base64,${dataURL}`,
  //       message: `data:image/png;base64,${dataURL}`,
  //       subject: 'Please verify the proof', //  for email
  //     };
  //     Share.share(shareImageBase64).catch(error =>
  //       console.log(error, 'eeojkk'),
  //     );
  //   });
  // };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Proof Created!</Text>
        <QRCode
          getRef={ref => (myQRCode = ref)}
          // ref={myQRCode}
          //QR code value
          value={qrvalue ? qrvalue : 'NA'}
          //size of QR Code
          size={250}
          //Color of the QR Code (Optional)
          color="black"
          //Background Color of the QR Code (Optional)
          backgroundColor="white"
          //Center Logo size  (Optional)
          logoSize={30}
          //Center Logo margin (Optional)
          logoMargin={2}
          //Center Logo radius (Optional)
          logoBorderRadius={15}
          //Center Logo background (Optional)
          logoBackgroundColor="yellow"
        />

        {/* <TouchableOpacity style={styles.buttonStyle} onPress={shareQRCode}>
          <Text style={styles.buttonTextStyle}>Share QR Code</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default CreateProofScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  // textStyle: {
  //   textAlign: 'center',
  //   margin: 10,
  // },
  // textInputStyle: {
  //   flexDirection: 'row',
  //   height: 40,
  //   marginTop: 20,
  //   marginLeft: 35,
  //   marginRight: 35,
  //   margin: 10,
  // },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
