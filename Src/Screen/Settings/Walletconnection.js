import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Switch} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';

import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from '../../Constant/color';
import Theambackground from '../../Components/Theambackground';
import {seetingjson} from '../../Constant/json';
const WalletconnectionScreen = () => {
  const navigation = useNavigation();
  return (
    <Theambackground
      title="Wallet Connections"
      subtitle="Manage active or past sessions"
      scan={true}
      setting={false}
      back={true}>
      <View style={{height: '100%', alignItems: 'center'}}>
        <View
          style={{
            width: '98%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: COLOR.GRAY[100],
              paddingBottom: 10,
              fontSize:18,
              color:COLOR.BLACK[100],
              fontWeight:"600"
            }}>
            Active Connections
          </Text>
          <Text style={{paddingTop:10,}}>No active session</Text>
        </View>
      </View>
    </Theambackground>
  );
};

export default WalletconnectionScreen;
