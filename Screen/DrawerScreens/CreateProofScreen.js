// Import React and Component
import React, {useEffect, useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';

const CreateProofScreen = props => {
  const [qrvalue, setQrvalue] = useState('');
  let myQRCode = useRef();

  useEffect(() => {
    const getData = async () => {
      const paramKey = props.route.params.paramKey;
      console.log(paramKey, 'paramKey');
      if (paramKey) {
        await axios
          .post('http://142.93.213.49:8000/api/createProof', {
            itemId: paramKey,
          })
          .then(function (responseJson) {
            // setQrvalue(responseJson?.data?.data?.proof?.proofValue);
            setQrvalue(
              paramKey ? JSON.stringify(paramKey) : 'data is not valid',
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
