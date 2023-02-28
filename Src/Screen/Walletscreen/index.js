import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Share,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { IMG } from '../../Constant/image';
import { STR } from '../../Constant/string';
import { styles } from './style';
import {
  Header as HeaderRNE,
  HeaderProps,
  Icon,
  BottomSheet,
} from '@rneui/themed';
import { COLOR } from '../../Constant/color';
import { wallettype } from '../../Constant/json';
import Carousel from 'react-native-snap-carousel';
import Certificate from './Certificate';
import { useSelector, useDispatch } from "react-redux";

import axiosInstance from '../../Constant/axios';
import { getCarddata } from '../../Function/Apicall';

const profile = { "Eme": { "birthDate": "20090801", "businessID": "2ce8db815f15dec858f24bfeb863a4", "emailAddr": "davekapil071@gmail.com", "enName": { "UnstructuredName": "JOHANSON, Christine" }, "gender": "F", "homeTelNumber": { "CountryCode": "852", "SubscriberNumber": "918719847380" }, "idNo": { "CheckDigit": "7", "Identification": "G996960" }, "mobileNumber": { "CountryCode": "852", "SubscriberNumber": "918719847380" }, "officeTelNumber": { "CountryCode": "852", "SubscriberNumber": "918719847380" } } }


const HEIGHT = Dimensions.get("screen").height
const Walletscreen = () => {

  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [toMail, setToMail] = useState('');
  const profileData = useSelector(state => state?.appstate?.profileData);

  console.log("$$$$$", Object.keys(profile).length);

  useEffect(() => {
    console.log("I am in wallet screen");

    getData();
    setSelectedType(0);
    setTimeout(() => {
      setLoader(false)
    }, 1000);

    Linking.addEventListener('url', (url) => {
      let linkUrl = url.url;
      linkUrl = linkUrl + " ";
      if (linkUrl.includes('email=')) {
        let email = getStringBetween(linkUrl, 'email=', ' ');
        console.log("Email =", email);
        setToMail(email);
        setSelectedType(1)
      }
    });
  }, []);

  function getStringBetween(str, start, end) {
    const result = str.match(new RegExp(start + "(.*)" + end));
    return result[1];
  }

  const getData = async () => {
    axiosInstance
      .get(
        'api/getDid',
      )
      .then(function (responseJson) {
        if (responseJson.status === 200) {
          console.log("Card data", responseJson?.data?.data?.items);
          dispatch({ type: 'ADD_CARDS', payload: responseJson?.data?.data?.items });
        }
      })
      .catch(function (error) {
        //  setErrortext(responseJson?.data?.error);
        // Toast.show('Somthing Went Wrong Scan Again', Toast.LONG, {
        //   backgroundColor: 'blue',
        // });
        // setLoading(false);
      });
  };

  const iAMSmartCall = async () => {
    axiosInstance
      .get(
        'iamsmart/IAMSMART_login', {
        params: {
          source: 'android',
          redirect_uri: 'https://api.liquid.com.hk/mobile/redirect'
        }
      }
      )
      .then(function (responseJson) {
        if (responseJson.status === 200) {
          // dispatch({ type: 'ADD_CARDS', payload: responseJson?.data?.data?.items });
          console.log("Response for jump", responseJson.data.data);

          let iAmSmartRes = responseJson?.data?.data;
          if (iAmSmartRes.url && iAmSmartRes.url.length > 0) {
            Linking.openURL(iAmSmartRes.url);
          }
        }
      })
      .catch(function (error) {
        //  setErrortext(responseJson?.data?.error);
        // Toast.show('Somthing Went Wrong Scan Again', Toast.LONG, {
        //   backgroundColor: 'blue',
        // });
        // setLoading(false);
      });
  }

  const ProfileButton = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => iAMSmartCall()}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/Image/icon-dark-3x.png')}
            style={styles.ImageIconStyle}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>
            Personal Data from iAM Smart
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  const birthDayConverter = (dateString) => {
    let year = dateString.substring(0, 4);
    let month = dateString.substring(4, 6);
    let day = dateString.substring(6, 8);

    let date = new Date(year, month - 1, day);
    console.log("Date length", date.toDateString());
    return date.toDateString();
  }

  const navigation = useNavigation();
  const [selectedtype, setSelectedType] = useState(0);

  const [shareopen, setShareopen] = useState(false);
  const getmycredential = () => {
    navigation.navigate('Addscreen');
  };

  const scan = () => {
    navigation.navigate('Scanscreen');
  };
  const setting = () => {
    console.log('Under production....');
    navigation.navigate('Settingscreen');
  };

  const share = () => {
    setShareopen(true);
  };

  const editdetail = () => {
    navigation.navigate('Editdetail');
  };

  if (loader) {
    return (
      <View style={{ width: '100 %', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    )
  }

  return (
    <View style={styles.safeContainer}>
      <ScrollView style={{ flex: 1, height: "100%" }}>
        <LinearGradient
          start={{ x: 0.0, y: 0.4 }}
          end={{ x: 0.85, y: 0.5 }}
          locations={[0, 0.9]}
          colors={['#454dbc', '#bd59fa']}
          style={{ flex: 1, height: "100%" }}>
          <View style={{ flex: 1, minHeight: HEIGHT }}>
            <View style={styles.headerContainer}>
              <View>
                <Text style={styles.titletext}>{STR.WALLET.TITLE}</Text>
                <Text style={styles.welcometext}>{STR.WALLET.WELCOME} User</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => scan()}>
                  <Icon
                    name="line-scan"
                    size={25}
                    type="material-community"
                    color={COLOR.WHITE[100]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => setting()}>
                  <Icon
                    name="settings-outline"
                    size={25}
                    type="ionicon"
                    color={COLOR.WHITE[100]}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.container}>
              <View style={{ height: 45 }}>
                <ScrollView
                  horizontal={true}
                  style={{ height: 23 }}
                  contentContainerStyle={{ height: 40 }}>
                  <View style={styles.tabcontain}>
                    {wallettype.map((type, i) => {
                      return (
                        <TouchableOpacity
                          style={{
                            ...styles.tabView,
                            flexDirection: 'row',
                            alignItems: 'center',

                            backgroundColor:
                              selectedtype === i
                                ? COLOR.BLUE[300]
                                : COLOR.BLUE[200],

                            borderTopLeftRadius: i == 0 ? 10 : 0,
                            borderBottomLeftRadius: i === 0 ? 10 : 0,
                            borderBottomRightRadius: i === 3 ? 10 : 0,
                            borderTopRightRadius: i === 3 ? 10 : 0,
                          }}
                          onPress={() => setSelectedType(i)}>
                          <Icon
                            name={type.iname}
                            type={type.itype}
                            size={15}
                            color={
                              selectedtype === i
                                ? COLOR.WHITE[100]
                                : COLOR.BLUE[300]
                            }
                          />
                          <Text
                            style={{
                              marginLeft: 5,
                              fontWeight: selectedtype === i ? 'bold' : '400',
                              color:
                                selectedtype === i
                                  ? COLOR.WHITE[100]
                                  : COLOR.BLUE[300],
                              fontSize: 15,
                            }}>
                            {type.title}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
              <View
                style={{
                  flex: 1,
                  height: '100%',
                  width: '100%',
                }}>
                {selectedtype === 0 && (
                  <View
                    style={{
                      alignItems: 'flex-start',
                      width: '100%',
                      alignSelf: 'flex-start',
                      flex: 1,
                    }}>
                    <View
                      style={{
                        backgroundColor: COLOR.WHITE[100],
                        width: '100%',
                        borderRadius: 15,
                        padding: 15,
                        marginTop: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          borderBottomWidth: 0.5,
                          paddingBottom: 15,
                          borderBottomColor: COLOR.GRAY[100],
                        }}>
                        <View>
                          <Text style={{ fontSize: 20, color: COLOR.BLACK[100] }}>
                            User
                          </Text>
                          <Text
                            style={{
                              fontSize: 13,
                              marginTop: 10,
                              color: COLOR.BLACK[100],
                            }}>
                            ***@gmail.com
                          </Text>
                        </View>
                        <View
                          style={{
                            width: 85,
                            height: 85,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLOR.BLUE[200],
                          }}>
                          <Icon
                            name="emoji-happy"
                            color={COLOR.BLUE[300]}
                            size={30}
                            type="entypo"
                          />
                        </View>
                      </View>

                      <TouchableOpacity
                        style={{
                          alignSelf: 'flex-end',
                          padding: 10,
                          backgroundColor: COLOR.BLUE[300],
                          marginTop: 10,
                          borderRadius: 5,
                          flexDirection: 'row',
                        }}
                        onPress={() => share()}>
                        <Icon
                          name="qrcode-scan"
                          type="material-community"
                          size={20}
                          color={COLOR.WHITE[100]}
                        />
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: 15,
                            color: COLOR.WHITE[100],
                            fontWeight: '800',
                          }}>
                          SHARE
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ alignSelf: 'center', marginTop: 5 }}
                        onPress={() => editdetail()}>
                        <Text
                          style={{
                            fontSize: 15,
                            color: COLOR.BLUE[300],
                            fontWeight: '600',
                          }}>
                          EDIT DETAILS
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {Object.keys(profileData).length > 0 ? (
                      <View style={{ flex: 1, width: "100%", marginBottom: 35 }}>

                        <View style={styles.inputbox}>
                          <Text style={styles.inputtitle}>FULL NAME</Text>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2 }}>
                            <Text style={styles.inputtext}>{profileData.enName.UnstructuredName}</Text>
                            <Image source={require("../../../assets/Image/phone.png")}
                              style={{ width: 35, height: 35 }} />
                          </View>
                        </View>


                        <View style={styles.inputbox}>
                          <Text style={styles.inputtitle}>Birth date</Text>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2 }}>
                            <Text style={styles.inputtext}>{birthDayConverter(profileData.birthDate)}</Text>
                            <Image source={require("../../../assets/Image/phone.png")}
                              style={{ width: 35, height: 35 }} />
                          </View>
                        </View>

                        <View style={styles.inputbox}>
                          <Text style={styles.inputtitle}>Phone number</Text>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2 }}>
                            <Text style={styles.inputtext}>{`(${profileData.mobileNumber.CountryCode})-${profileData.mobileNumber.SubscriberNumber}`}</Text>
                            <Image source={require("../../../assets/Image/phone.png")}
                              style={{ width: 35, height: 35 }} />
                          </View>
                        </View>

                        <View style={styles.inputbox}>
                          <Text style={styles.inputtitle}>ID code</Text>
                          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 2 }}>
                            <Text style={styles.inputtext}>{`${profileData.idNo.Identification}-(${profileData.idNo.CheckDigit})`}</Text>
                            <Image source={require("../../../assets/Image/phone.png")}
                              style={{ width: 35, height: 35 }} />
                          </View>
                        </View>

                        <View style={{ ...styles.lastbox }}>
                          <Text style={{ ...styles.inputtitle, fontWeight: 'bold', color: '#000'}}>Profile Data Provided by iAM SMART</Text>
                        </View>

                      </View>
                    ) : (
                      <>
                        <View style={{ alignSelf: 'center' }}>
                          <ProfileButton />
                        </View>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            width: '100%',
                          }}>
                          <Icon
                            name="file-certificate-outline"
                            type="material-community"
                            size={90}
                            color={COLOR.BLUE[300]}
                          />
                          <Text
                            style={{
                              fontSize: 25,
                              color: COLOR.BLACK[100],
                              fontWeight: '600',
                            }}>
                            Let's get your first credential
                          </Text>
                          <Text
                            style={{
                              fontSize: 17,
                              color: COLOR.BLACK[100],
                              fontWeight: '400',
                              marginTop: 15,
                              width: '75%',
                              textAlign: 'center',
                            }}>
                            You can self issue your own credential or receive a
                            testimonial from your business partners or colleagues
                          </Text>

                          <TouchableOpacity
                            style={{
                              backgroundColor: COLOR.BLUE[300],
                              marginTop: 20,
                              padding: 5,
                              paddingHorizontal: 15,
                              borderRadius: 5,
                            }}
                            onPress={() => getmycredential()}>
                            <Text
                              style={{
                                color: COLOR.WHITE[100],
                                fontWeight: '700',
                                fontSize: 15,
                              }}>
                              GET MY FIRST CREDENTIAL
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </View>
                )}

                {selectedtype === 1 && (
                  <View
                    style={{
                      alignItems: 'flex-start',
                      width: '100%',
                      height: "100%",
                      alignSelf: 'flex-start',
                      flex: 1,
                    }}>
                    <Certificate toMail={toMail} setMail={setToMail} />

                  </View>
                )}
              </View>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>

      <BottomSheet
        isVisible={shareopen}
        containerStyle={{
          backgroundColor: 'rgba(255, 255, 255,0.6)',
          //alignItems:"center",
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: COLOR.WHITE[100],
            alignSelf: 'center',
            width: '85%',
            borderRadius: 25,
            alignItems: 'center',
            padding: 5,
            elevation: 5,
            shadowColor: 'black',
          }}>
          <Text style={{ fontSize: 20, color: COLOR.BLUE[300] }}>Share</Text>
          <Text
            style={{
              fontSize: 17,
              marginTop: 15,
              textAlign: 'center',
              color: COLOR.BLACK[100],
              lineHeight: 24,
            }}>
            Present this QR Code to the liquid App scanner so other may save
            your contact details on their app, or to any camera application to
            view it on a browser
          </Text>

          <Image
            source={IMG.QRCODE}
            style={{ width: 250, height: 250, resizeMode: 'stretch' }}
          />

          <TouchableOpacity
            style={{
              width: '70%',
              marginTop: 15,
              backgroundColor: COLOR.BLUE[300],
              alignItems: 'center',
              height: 50,
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: COLOR.WHITE[100],
                fontWeight: 'bold',
              }}>
              SHARE VIA WEB LINKS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '70%',
              marginTop: 15,
              borderWidth: 1,
              borderColor: COLOR.BLUE[300],
              backgroundColor: COLOR.WHITE[100],
              alignItems: 'center',
              height: 50,
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={() => setShareopen(false)}>
            <Text
              style={{
                fontSize: 20,
                color: COLOR.BLUE[300],
                fontWeight: 'bold',
              }}>
              CLOSE WINDOW
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Walletscreen;
