import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import {
  Header as HeaderRNE,
  HeaderProps,
  Icon,
  BottomSheet,
} from '@rneui/themed';
import { COLOR } from '../../Constant/color';
import Theambackground from '../../Components/Theambackground';
import { seetingjson } from '../../Constant/json';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../Constant/axios';
const Settingscreen = () => {
  const navigation = useNavigation();

  const [sheet, setSheet] = useState(false);

  const [isTouch, setIsTouch] = useState(false);
  const [isEnable, setIsEnable] = useState(false);

  console.log('@@@@@@@@@@@@@@@', isTouch);

  const copy = parameter => {
    Clipboard.setString(parameter);
  };

  const recovery = () => {
    console.log('Under production');
  };

  const wallet = () => {
    navigation.navigate('Walletconnection');
  };

  const deletewallet = () => {
    console.log('Under production');
    setSheet(false);
  };

  const logout = () => {
    AsyncStorage.removeItem('login')
    navigation.navigate("Auth")
    axiosInstance
      .get(
        'auth/logout',
      )
      .then(function (responseJson) {
        console.log("Logged out", responseJson);
      })
      .catch(function (error) {
        //  setErrortext(responseJson?.data?.error);
        // Toast.show('Somthing Went Wrong Scan Again', Toast.LONG, {
        //   backgroundColor: 'blue',
        // });
        // setLoading(false);
      });
  }

  const click = (nav, parameter) => {
    switch (nav) {
      case 'copy':
        copy(parameter);
        break;
      case 'recovery':
        navigation.navigate('Walletpinscreen', { params: 'recovery' });
        break;

      case 'wallet':
        wallet();
        break;

      case 'delete':
        setSheet(true);
        break;

      case 'logout':
        logout()
        break;

      case 'Walletpin':
        navigation.navigate('Walletpinscreen', { params: 'Wallet' });
        break;

      case 'recover':
        navigation.navigate('Recoverscreen');
        break;
      default:
        break;
    }
  };
  return (
    <Theambackground
      title="Settings"
      subtitle="Manage your wallet security settings"
      scan={true}
      setting={false}
      back={true}>
      <View style={{ height: '100%', alignItems: 'center' }}>
        {seetingjson.map((item, i) => {
          const subdata = item.subitem;

          return (
            <View
              style={{
                width: '95%',
                backgroundColor: COLOR.WHITE[100],
                marginBottom: 10,
                borderRadius: 10,
                padding: 10,
              }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text
                  style={{
                    fontSize: 16,
                    borderBottomWidth: 0.5,
                    borderBottomColor: COLOR.GRAY[200],
                    paddingBottom: 10,
                    fontWeight: '600',
                    color: COLOR.BLACK[100],
                  }}>
                  {item.title}
                </Text>
                {item.title == 'Email Addresses' && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('EmailAddress')}>
                    <Text
                      style={{
                        backgroundColor: COLOR.BLUE[100],
                        fontSize: 12,
                        color: COLOR.BLUE[300],
                        fontWeight: '600',
                        paddingHorizontal: 3,
                        borderRadius: 2,
                      }}>
                      ADD
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {subdata.map((sub, i) => {
                const nav = sub.nav;
                const parameter = sub.stitle;
                return (
                  <TouchableOpacity
                    onPress={() => click(nav, parameter)}
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                      borderBottomWidth:
                        sub.stitle == 'RECOVER CREDENTIALS' ||
                          sub.stitle == 'VERSION 3.31.0'
                          ? 0
                          : 0.5,
                      borderBottomColor: COLOR.GRAY[200],
                    }}>
                    {sub.stitle == 'RECOVER CREDENTIALS' ? (
                      <Text
                        style={{
                          fontSize: 16,
                          color: COLOR.BLUE[300],
                          fontWeight: '600',
                          textAlign: 'center',
                          width: '100%',
                        }}>
                        {sub.stitle}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: sub.stitle == 'VERSION 3.31.0' ? 12 : 16,
                          color:
                            item.title == 'About ceal'
                              ? sub.stitle == 'VERSION 3.31.0'
                                ? COLOR.BLACK[100]
                                : COLOR.BLUE[300]
                              : COLOR.BLACK[100],
                          fontWeight: '300',
                        }}>
                        {sub.stitle}
                      </Text>
                    )}

                    {sub.stitle == 'Touch ID' ? (
                      <Switch
                        trackColor={{ false: '#767577', true: 'red' }}
                        thumbColor={isTouch === true ? '#f5dd4b' : '#f4f3f4'}
                        //  thumbColor={"red"}

                        ios_backgroundColor="#3e3e3e"
                        onValueChange={touch => setIsTouch(touch)}
                        value={isTouch}
                      />
                    ) : (
                      <>
                        {sub.stitle == 'Enable credential backup' ? (
                          <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnable ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => setIsEnable(!isEnable)}
                            value={isEnable}
                          />
                        ) : (
                          <Icon
                            name={sub.iname}
                            type={sub.itype}
                            color={COLOR.BLUE[300]}
                          />
                        )}
                      </>
                    )}

                    {/* <Icon
                      name={sub.iname}
                      type={sub.itype}
                      color={COLOR.BLUE[300]}
                    /> */}
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>

      <BottomSheet isVisible={sheet}>
        <View style={{ flex: 1 }} onPress={() => setSheet(false)}>
          <View
            style={{
              backgroundColor: COLOR.BLUE[300],
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              padding: 15,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: COLOR.WHITE[100],
                fontWeight: '700',
                lineHeight: 28,
              }}>
              Are you sure you want to delete your wallet?
            </Text>
            <Text style={{ fontSize: 17, color: COLOR.GRAY[200], marginTop: 5 }}>
              This action is irreversible and all your credentials will be
              removed. Please backup your wallet beforehand if you intend to
              recover your credentials at a later time.
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
                width: '100%',
              }}>
              <TouchableOpacity
                style={{
                  width: '49%',
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: COLOR.WHITE[100],
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                }}
                onPress={() => setSheet(false)}>
                <Text
                  style={{
                    fontSize: 17,
                    color: COLOR.WHITE[100],
                    fontWeight: '800',
                  }}>
                  CANCEL
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  width: '49%',
                  borderRadius: 10,
                  backgroundColor: COLOR.RED[100],
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                }}
                onPress={() => deletewallet()}>
                <Text
                  style={{
                    fontSize: 17,
                    color: COLOR.WHITE[100],
                    fontWeight: '800',
                  }}>
                  DELETE
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
    </Theambackground>
  );
};

export default Settingscreen;
