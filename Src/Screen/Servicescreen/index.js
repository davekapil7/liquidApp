import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from '../../Constant/color';
import Theambackground from '../../Components/Theambackground';

const Servicescreen = () => {
  
  const testimonial = () => {
    console.log('Under Production...');
  };

  const credential = () => {
    console.log('Under production...');
  };
  return (
    <Theambackground
      title="Services"
      subtitle="A marketplace where you can access services"
      scan={true}
      setting={true}>
      <View style={{height: '100%', alignItems: 'center'}}>
        <Icon
          name="file-certificate-outline"
          type="material-community"
          size={90}
          color={COLOR.BLUE[300]}
        />

        <Text
          style={{
            marginTop: 15,
            fontSize: 25,
            color: COLOR.BLACK[100],
            fontWeight: '600',
          }}>
         Services marketplace
        </Text>
        <Text
          style={{
            width: '80%',
            textAlign: 'center',
            fontSize: 17,
            marginTop: 10,
            color: COLOR.BLACK[100],
            fontWeight: '300',
          }}>
          Use your credentials to access services in our VC powered marketplace
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: COLOR.BLUE[300],
            padding: 5,
            paddingHorizontal: 15,
            borderRadius: 5,
            marginTop: 15,
            width:"80%",
            alignItems:"center"
          }}>
          <Text
            style={{fontSize: 15, color: COLOR.WHITE[100], fontWeight: '700'}}>
            EXPLORE
          </Text>
        </TouchableOpacity>
      </View>
    </Theambackground>
  );
};

export default Servicescreen;
