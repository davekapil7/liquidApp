import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet, Modal } from 'react-native';
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
import { Toast } from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import PoppinsText from '../../Components/LAText/Poppinstext';
import { Image } from 'react-native';
import { IMG } from '../../Constant/image';
const Settingscreen = () => {
  const navigation = useNavigation();

  const [sheet, setSheet] = useState(false);

  const [isTouch, setIsTouch] = useState(false);
  const [isEnable, setIsEnable] = useState(false);
  const [fingermodal, setFingermodal] = useState(false)
  const dispatch = useDispatch();


  useEffect(() => {
    
    AsyncStorage.getItem('fingerlogin').then(value => {
      console.log('Hello acyncn', value);
      if (value === 'true') {
        setIsTouch(true)
      }
    });
  }, [navigation]);

  const copy = parameter => {
    Clipboard.setString(parameter);
  };

  const recovery = () => {
    console.log('Under production');
  };

  const wallet = () => {
    navigation.navigate('Postauth', { screen: 'Walletconnection' });
  };

  const deletewallet = () => {
    console.log('Under production');
    setSheet(false);
  };

  const logout = () => {

    // navigation.navigate("Preauth")
    axiosInstance
      .get(
        'auth/logout',
      )
      .then(function (responseJson) {
        dispatch({
          type: "CLEAR_ALL",
        })
        console.log("Logged out");
        AsyncStorage.removeItem('login')
        //  navigation.navigate('Preauth' ,{screen: "OnbordingScreen"})
      })
      .catch(function (error) {
        console.log("####",error);
        //  setErrortext(responseJson?.data?.error);
        // Toast.show('Somthing Went Wrong Scan Again', Toast.LONG, {
        //   backgroundColor: 'blue',
        // });
        // setLoading(false);
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
          text2: `Somthing Went Wrong Scan Again`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines: 2 //number of how many lines you want
          }
        });
      });
  }

  const click = (nav, parameter) => {
    switch (nav) {
      case 'copy':
        copy(parameter);
        break;
      case 'recovery':
        navigation.navigate('Postauth', { screen: 'Walletpinscreen', params: 'recovery' });
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
        navigation.navigate('Postauth', { screen: 'Walletpinscreen', params: 'Wallet' });
        break;

      case 'recover':
        navigation.navigate('Postauth', { screen: 'Recoverscreen' });
        break;
      default:
        break;
    }
  };

  const handletouch = (touch) => {
    console.log("$$$", touch);
    if (touch === true) {
      AsyncStorage.setItem("fingerlogin", "true")
      setFingermodal(true)
      setIsTouch(true)
      setTimeout(() => {
        setFingermodal(false)
      }, 2000)

    } else {
      AsyncStorage.setItem("fingerlogin", "false")
      setIsTouch(false)

      setFingermodal(true)

      setTimeout(() => {
        setFingermodal(false)
      }, 2000)
    }
  }
  return (
    <Theambackground
      title="Settings"
      subtitle="Manage your wallet security settings"
      scan={true}
      setting={false}
      back={true}>
      <View style={{ height: '100%', alignItems: 'center', marginTop: 20 }}>
        {seetingjson.map((item, i) => {
          const subdata = item.subitem;

          return (
            <View
              style={{
                width: '95%',
                backgroundColor: COLOR.SECONDRY,
                marginBottom: 10,
                borderRadius: 20,
                padding: 10,
                paddingVertical: 20
              }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                <PoppinsText title={item.title} textstyle={styles.title} />
                {item.title == 'Email Addresses' && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Postauth', { screen: 'EmailAddress' })}>

                    <Image source={IMG.PLUS} style={{ width: 20, height: 20 }} />
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

                      <PoppinsText title={sub.stitle} textstyle={styles.subtitle} viewStyle={{ width: "100%" }} />
                    ) : (

                      <PoppinsText title={sub.stitle} textstyle={{
                        ...styles.subtitle,
                        color:
                          item.title == 'About ceal' ? COLOR.PRIMARY : COLOR.BLACK[100]

                      }} />
                    )}

                    {sub.stitle == 'Touch ID' ? (
                      <Switch
                        trackColor={{ false: '#767577', true: 'red' }}
                        thumbColor={isTouch === true ? '#f5dd4b' : '#f4f3f4'}


                        ios_backgroundColor="#3e3e3e"
                        onValueChange={touch => handletouch(touch)}
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
                            color={COLOR.PRIMARY}
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

        <Modal transparent={true} visible={fingermodal} style={{ height: "100%", paddingTop: "40%", width: "100%", justifyContent: "center", alignItems: "center" }}>
          <View style={{ padding: 15, marginTop: "100%", backgroundColor: "white", width: "90%", alignSelf: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>Biomatric Login</Text>

            <Text style={{ fontSize: 15, marginTop: 15, fontWeight: "500", color: "black" }}>{isTouch ? "Now you able to login with your biomatric (FingerPrint)" : "Your biomatric login disapiar"}</Text>
          </View>
        </Modal>
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


export const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "700"
  },
  subtitle: {
    textAlign: "center", width: "100%"
  }
})
