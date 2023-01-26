import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CameraScreen} from 'react-native-camera-kit';
import {IMG} from '../../Constant/image';
import {STR} from '../../Constant/string';
import {styles} from './style';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from '../../Constant/color';
import Theambackground from '../../Components/Theambackground';

const Scanscreen = () => {
  const navigation = useNavigation();

  return (
    <Theambackground
      title="Scan OR Code"
      subtitle="Scan the recipient's QR to send a credential"
      scan={false}
      scanscreen={true}
      back={true}
      setting={false}>
      <View style={{flex: 1, backgroundColor: 'pink', width: '100%'}}>
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
          // onReadCode={event =>
          //   onBarcodeScan(event.nativeEvent.codeStringValue)
          // }
        />
      </View>
    </Theambackground>
  );
};

export default Scanscreen;
