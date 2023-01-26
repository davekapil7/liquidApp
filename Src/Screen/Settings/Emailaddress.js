import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Switch, TextInput} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';

import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from '../../Constant/color';
import Theambackground from '../../Components/Theambackground';
import {seetingjson} from '../../Constant/json';
const EmailAddScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, padding: 15}}>
      <Text style={{fontSize: 25, color: COLOR.BLUE[300], fontWeight: '600'}}>
        Email Address
      </Text>

      <Text style={{fontSize: 17, marginTop: 15, color: COLOR.BLACK[100]}}>
        Enter the email address for your identity card. We will send an OTP to
        with a 6-digit code to verify
      </Text>

      <View
        style={{
          marginTop: 15,
          borderWidth: 0.5,
          borderColor: COLOR.GRAY[100],
          borderRadius: 5,
          padding: 10,
        }}>
        <Text>EMAIL ADDRESS</Text>
        <TextInput
          placeholder=""
          value={email}
          onChangeText={value => setEmail(value)}
          style={{color: COLOR.BLACK[100], fontSize: 17}}
        />
      </View>

      <View
        style={{
          bottom: 15,

          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          width: '100%',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLOR.BLUE[300],
            bottom: 0,
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            marginBottom: 10,
            width: '100%',
            alignSelf: 'center',
          }}>
          <Text
            style={{fontSize: 20, color: COLOR.WHITE[100], fontWeight: '700'}}>
            SEND OTP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            bottom: 0,
            height: 55,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            marginBottom: 10,
            width: '100%',
            alignSelf: 'center',
            borderWidth:0.5,
            borderColor:COLOR.BLUE[300]
          }}
          onPress={() => navigation.goBack()}>
          <Text
            style={{fontSize: 20, color: COLOR.BLUE[300], fontWeight: '600'}}>
           CANCEL
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmailAddScreen;
