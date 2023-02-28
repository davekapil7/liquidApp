import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, Switch, TextInput} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useNavigation} from '@react-navigation/native';

import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from '../../Constant/color';
import Theambackground from '../../Components/Theambackground';
import {number, seetingjson} from '../../Constant/json';
const WalletPinscreen = props => {
  const recovery = props?.route?.params?.params === 'recovery' ? true : false;
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();
  const navigation = useNavigation();

  console.log('%%%%%%', recovery);
  const pressdata = val => {
    if (value1 === undefined) {
      console.log('WWWW');
      setValue1(val);
    } else if (value2 === undefined) {
      setValue2(val);
    } else if (value3 === undefined) {
      setValue3(val);
    } else if (value4 === undefined) {
      setValue4(val);
    } else {
      return;
    }
  };

  const returnclick = () => {
    if (value4 !== undefined) {
      setValue4();
    } else if (value3 !== undefined) {
      setValue3();
    } else if (value2 !== undefined) {
      setValue2();
    } else if (value1 !== undefined) {
      setValue1();
    } else {
      return;
    }
  };
  return (
    <View style={{flex: 1, padding: 15, width: '100%'}}>
      <Text style={{fontSize: 25, color: COLOR.BLUE[300], fontWeight: '600'}}>
        {recovery ? 'Enter Pin' : 'Current Wallet Pin'}
      </Text>
      <Text style={{marginTop: 10, fontSize: 18, color: COLOR.BLACK[100]}}>
        {recovery
          ? 'Use your four digit pin to access your recovery'
          : 'Please enter your current pin to authenticate'}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          marginTop: '15%',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: 45,
            height: 65,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: COLOR.BLUE[300],
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <TextInput
            value={value1}
            onChangeText={text => setValue1(text)}
            maxLength={1}
            style={{color: COLOR.BLACK[100], fontSize: 25}}
          /> */}
          <Text style={{color: COLOR.BLACK[100], fontSize: 25}}>{value1}</Text>
        </View>
        <View
          style={{
            width: 45,
            height: 65,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: COLOR.BLUE[300],
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <TextInput
            value={value2}
            onChangeText={text => setValue2(text)}
            maxLength={1}
            style={{color: COLOR.BLACK[100], fontSize: 25}}
          /> */}
          <Text style={{color: COLOR.BLACK[100], fontSize: 25}}>{value2}</Text>
        </View>
        <View
          style={{
            width: 45,
            height: 65,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: COLOR.BLUE[300],
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <TextInput
            value={value3}
            onChangeText={text => setValue3(text)}
            maxLength={1}
            style={{color: COLOR.BLACK[100], fontSize: 25}}
          /> */}
          <Text style={{color: COLOR.BLACK[100], fontSize: 25}}>{value3}</Text>
        </View>
        <View
          style={{
            width: 45,
            height: 65,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: COLOR.BLUE[300],
            marginLeft: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {/* <TextInput
            value={value4}
            onChangeText={text => setValue4(text)}
            maxLength={1}
            style={{color: COLOR.BLACK[100], fontSize: 25}}
          /> */}
          <Text style={{color: COLOR.BLACK[100], fontSize: 25}}>{value4}</Text>
        </View>
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: '15%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '60%',
            alignItems: 'center',
            marginLeft: 5,
            justifyContent: 'space-between',
          }}>
          {number.map(num => {
            if (num.id === 1 || num.id === 2 || num.id === 3)
              return (
                <View
                  style={{
                    alignItems: 'center',
                    width: '30%',
                    marginLeft: 5,
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      paddingHorizontal: 8,
                      borderBottomColor: COLOR.BLUE[400],
                    }}
                    onPress={() => pressdata(num.id)}>
                    <Text style={{fontSize: 28, color: COLOR.BLUE[300]}}>
                      {num.id}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '60%',
            alignItems: 'center',
            marginLeft: 5,
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          {number.map(num => {
            if (num.id === 4 || num.id === 5 || num.id === 6)
              return (
                <View
                  style={{
                    alignItems: 'center',
                    width: '30%',
                    marginLeft: 5,
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      paddingHorizontal: 8,
                      borderBottomColor: COLOR.BLUE[400],
                    }}
                    onPress={() => pressdata(num.id)}>
                    <Text style={{fontSize: 28, color: COLOR.BLUE[300]}}>
                      {num.id}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '60%',
            alignItems: 'center',
            marginLeft: 5,
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          {number.map(num => {
            if (num.id === 7 || num.id === 8 || num.id === 9)
              return (
                <View
                  style={{
                    alignItems: 'center',
                    width: '30%',
                    marginLeft: 5,
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      paddingHorizontal: 8,
                      borderBottomColor: COLOR.BLUE[400],
                    }}
                    onPress={() => pressdata(num.id)}>
                    <Text style={{fontSize: 28, color: COLOR.BLUE[300]}}>
                      {num.id}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '60%',
            alignItems: 'center',
            marginLeft: 5,
            marginTop: 20,
            justifyContent: 'space-between',
          }}>
          {number.map(num => {
            if (num.id === null || num.id === 0 || num.id === 'return')
              return (
                <View
                  style={{
                    alignItems: 'center',
                    width: '30%',
                    marginLeft: 5,
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: num.id == 0 ? 1 : 0,
                      paddingHorizontal: 8,
                      borderBottomColor: COLOR.BLUE[400],
                    }}
                    disabled={num.id == 'return' ? true : false}
                    onPress={() => pressdata(num.id)}>
                    {num.id == 'return' ? (
                      <TouchableOpacity
                        style={{
                          width: 25,
                          height: 25,
                          borderRadius: 8,
                          borderWidth: 1,
                          borderColor: COLOR.BLUE[400],
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() => returnclick()}>
                        <Icon
                          name="back"
                          color={COLOR.BLUE[300]}
                          type="antdesign"
                          size={18}
                        />
                      </TouchableOpacity>
                    ) : (
                      <Text style={{fontSize: 28, color: COLOR.BLUE[300]}}>
                        {num.id}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              );
          })}
        </View>
      </View>
{recovery &&
      <View
        style={{
          alignSelf: 'center',
          width: '90%',
          position: 'absolute',
          bottom: 15,
        }}>
        <TouchableOpacity
          style={{
            width: '100%',
            borderRadius: 10,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: COLOR.BLUE[300],
            opacity : value1 === undefined || value2 === undefined || value3 === undefined || value4 === undefined ? 0.4 : 1
          }}
          disabled = {value1 === undefined || value2 === undefined || value3 === undefined || value4 === undefined ? true : false}>
          <Text
            style={{fontSize: 18, color: COLOR.WHITE[100], fontWeight: '700'}}>
            VERIFY PIN
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: '100%',
            borderRadius: 10,
            height: 50,
            marginTop:8,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth:1,
            borderColor:COLOR.BLUE[300]
          }} onPress={() => navigation.goBack()}>
          <Text
            style={{fontSize: 18, color: COLOR.BLUE[300], fontWeight: '700'}}>
            BACK
          </Text>
        </TouchableOpacity>
      </View>
       }
    </View>
  );
};

export default WalletPinscreen;
