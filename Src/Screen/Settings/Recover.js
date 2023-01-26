import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  TextInput,
  Image,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';

import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from '../../Constant/color';
import Theambackground from '../../Components/Theambackground';
import {seetingjson} from '../../Constant/json';
import {IMG} from '../../Constant/image';
const RecoverScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, padding: 15}}>
      <Text style={{fontSize: 25, color: COLOR.BLUE[300], fontWeight: '600'}}>
        Recover credentials
      </Text>

      <Text style={{fontSize: 17, marginTop: 15, color: COLOR.BLACK[100]}}>
        If you have a backup of your credentials, select the method that was
        used for backup. You can always recover your credentials at a later
        time.
      </Text>

      <TouchableOpacity
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: '20%',
          borderRadius: 10,
          borderColor: COLOR.BLUE[300],
          height: 55,
        }}>
        <Image
          source={IMG.DRIVE}
          style={{width: 40, height: 40, marginHorizontal: 15}}
        />
        <Text style={{fontSize:22,fontWeight:"bold",color:COLOR.BLACK[100]}}>Google Drive</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 15,
          borderRadius: 10,
          borderColor: COLOR.BLUE[300],
          height: 55,
        }}>
        <Image
          source={IMG.FILE}
          style={{width: 40, height: 40, marginHorizontal: 15}}
        />
        <Text style={{fontSize:22,fontWeight:"bold",color:COLOR.BLACK[100]}}>Browse for file</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecoverScreen;
