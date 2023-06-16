import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Animated,
  TouchableOpacity,
  ScrollView,
  Share,
  Switch,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { STR } from '../Constant/string';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { COLOR } from '../Constant/color';
import { Dimensions } from 'react-native';
import { uppertabbar } from '../Constant/json';
import { IMG } from '../Constant/image';

const Theambackground = ({ children, scan, scanscreen, setting, radius,back, title, subtitle, }) => {
  const navigation = useNavigation();
  const handlescan = () => {
    navigation.navigate('Postauth', { screen: "Scanscreen" })
  };
  const handlesetting = () => {
    navigation.navigate('Postauth', { screen: 'Settingscreen' });
  };

  const HEIGHT = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{ flex: 1, height: '100%', backgroundColor: COLOR.PRIMARY }}>
      <ScrollView style={{ flex: 1, height: '100%',backgroundColor:COLOR.WHITE[100] }}>
        <View style={{
          flex: 1,
          minHeight: HEIGHT,
height:"100%"
        }}>

          <View
            style={{
              //marginTop: 25,
              padding: 19,

              backgroundColor: COLOR.PRIMARY,
              borderBottomLeftRadius: radius === false ? 0 : 40,
              borderBottomRightRadius: radius === false ? 0 :  40,
              width: '100%',
          


            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
              {back &&
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon
                    name="arrowleft"
                    type="antdesign"
                    color={COLOR.WHITE[100]}
                    size={25}
                  />
                </TouchableOpacity>
              }
              <View style={{ width: '65%' }}>
                <Text
                  style={{
                    fontSize: 25,
                    color: COLOR.WHITE[100],
                    fontWeight: 'bold',
                  }}>
                  {title}
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    marginTop: 3,
                    color: COLOR.WHITE[100],
                    fontWeight: '400',
                  }}>
                  {subtitle}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                {scan && (
                  <TouchableOpacity onPress={() => handlescan()}>
                    <Icon
                      name="qrcode-scan"
                      size={25}
                      type="material-community"
                      color={COLOR.WHITE[100]}
                    />
                  </TouchableOpacity>
                )}
                {setting && (
                  <TouchableOpacity
                    style={{ marginLeft: 15 }}
                    onPress={() => handlesetting()}>
                    <Icon
                      name="settings-outline"
                      size={25}
                      type="ionicon"
                      color={COLOR.WHITE[100]}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={{
              height: 43,
              marginTop: 20,
              borderColor: COLOR.WHITE[100],
              width: "100%",
              borderRadius: 20,
              borderWidth: 2,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}>
              {/* <Image source={require("../../assets/Image/tabbar/home copy 1.png")} /> */}
              {uppertabbar.map((tab, i) => {
                return (
                  <View>
                   
                    <Image source={tab.img} style={{ width: 25, height: 25, resizeMode: "" }} />
                    {/* <Icon name={tab.activename}
                      type={tab.activetype}
                      color={COLOR.WHITE[100]}
                      size={25}
                    /> */}
                  </View>
                );
              })}
            </View>
          </View>

          <View
            style={{
              backgroundColor: COLOR.WHITE[100],
              flex:1
              // backgroundColor: COLOR.BLUE[100],

              // marginTop: 15,
              // height: '100%',
              // borderTopLeftRadius: scanscreen ? 0 : 15,
              // borderTopRightRadius: scanscreen ? 0 : 15,
              // padding: scanscreen ? 0 : 8,
              // paddingTop: scanscreen ? 0 : 15,
            }}>
            {children}
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
export default Theambackground;
