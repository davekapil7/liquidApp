import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
  Image,
  Modal
} from 'react-native';
import Toast from 'react-native-toast-message';

import Carousel from 'react-native-snap-carousel';
import { COLOR } from '../../Constant/color';
import { proof } from '../../Constant/json';
import moment from 'moment';
import {
  Header as HeaderRNE,
  HeaderProps,
  Icon,
  BottomSheet,
} from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';

import QRCode from 'react-native-qrcode-svg';
import axiosInstance from '../../Constant/axios';
import { createProofforOR, sendToverification } from '../../Function/Apicall';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

const WIDTH = Dimensions.get('screen').width;

const HIGHT = Dimensions.get('screen').height;

const Certificate = ({
  toMail,
  setMail,
  setCard,
  check,
  setType,
  handleproof,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shareopen, setShareopen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState();
  const [emailApproval, setEmailapproval] = useState(false);
  const [emailIcon, setEmailicon] = useState([]);
  const [apiloader, setApiloader] = useState(false);
  const [dropdown, setDropdown] = useState('')
  const [modal, setModal] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [DIDid, setDIDid] = useState('')
  const [DIDiv, setDIDiv] = useState('')
  const [submitloader, setSubmitloader] = useState(false)
  const profileData = useSelector(state => state?.appstate?.profileData);

  const ref = useRef(null);

  const navigation = useNavigation();

  const cardData = useSelector(state => state.appstate.cardList);

  const createProof = async id => {
    let dataToSend = { item_id: id };

    axiosInstance
      .post('auth/create-proof-qr', dataToSend)
      .then(async function (responseJson) {
        if (responseJson.status === 200) {
          let objData = responseJson?.data;
          delete objData.err;

          const id = objData?.id;

          let stringData = JSON.stringify(objData);
          console.log('Response json1', objData);
          setId(stringData);
          setApiloader(false);
          setShareopen(true);
        }
      })
      .catch(function (error) {
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
          text2: `Something went wrong , Please try again`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines: 2 //number of how many lines you want
          }
        });
      });
  };

  const openmodal = val => {
    setApiloader(true);
    createProof(val);
  };

  useEffect(() => {
    setTimeout(() => {
      setEmailapproval(false);
    }, 3000);
  }, [emailApproval === true]);

  const handlemailicon = async id => {
    setApiloader(true);

    let dataToSend = { item_id: id };

    axiosInstance
      .post('auth/create-proof-qr', dataToSend)
      .then(async function (responseJson) {
        if (responseJson.status === 200) {
          let objData = responseJson?.data;
          delete objData.err;
          console.log('Response json1', objData);

          const id = objData?.id;
          const iv = objData?.iv;
          let stringData = JSON.stringify(objData);
          const res = await sendToverification(toMail, id, iv);
          console.log('Response from mail', res);
          if (res) {
            setApiloader(false);
            setEmailapproval(true);
            setId(stringData);
            setMail('');
          } else {
            setMail('');
          }
        }
      })
      .catch(function (error) {
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
          text2: `Something went wrong , Please try again`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines: 2 //number of how many lines you want
          }
        });
      });
  };
  let imgbkg = require('../../../assets/Image/card/card5.png');
  let company = require('../../../assets/Image/card/iamsmart.png');

  const imageReplacer = type => {
    if (type[1] && type[1].includes('IamSmart')) {
      (imgbkg = require('../../../assets/Image/card/card8.png')),
        (company = require('../../../assets/Image/card/iamsmart.png'));
    } else if (type[1] && type[1].includes('Document')) {
      (imgbkg = require('../../../assets/Image/card/card7.png')),
        (company = require('../../../assets/Image/card/Kerry-Logistics.png'));
    }
  };

  const hndlecancle = () => {
    setModal(false)
    setDropdown('')
  }

  const handlesendmail = async () => {
    setModal(true)
    const id = dropdown
    const result = await createProofforOR(id);

    const resid = result?.id;
    const resiv = result?.iv;
    setDIDid(resid)
    setDIDiv(resiv)

  }

  const sendmail = async () => {
    setSubmitloader(true)

    let dataToSend = {
      "to": email,
      "data": {
        "type": "verification-email",
        "email": profileData?.email
      },
      "message": message,
      "askedFor": ["DID"],
      "did": [{ "id": DIDid, "iv": DIDiv, "name": "DID" }]
    };

    axiosInstance
      .post('mail/sendSingleDid', dataToSend)
      .then(async function (responseJson) {
        if (responseJson.status === 200) {
          console.log("$$$$$$", responseJson.data?.err);
          setModal(false)
          setDropdown(false)
          setEmail('')
          setMessage('')
          setDIDid('')
          setDIDiv('')
          setSubmitloader(false)
        }
      })
      .catch(function (error) {
        Toast.show({
          topOffset: 100,
          type: "error",
          text1: "ERROR",
          text2: `Something went wrong , Please try again`,
          visibilityTime: 3000,
          props: {
            text1NumberOfLines: 2 //number of how many lines you want
          }

        });
        setSubmitloader(false)
      });
  }

  const renderItem = ({ item, index }) => {
    const insdate = item?.data?.issuanceDate;
    const memberdate = item?.data?.proof?.created;

    imageReplacer(item.data.type);

    const insformated = moment(insdate).format('MM/DD/YYYYY');
    const memberformated = moment(memberdate).format('MM/DD/YYYYY');

    const id = item?.id;

    const emailid = emailIcon.findIndex(value => value === id);
    // console.log("%%%%%", item, id);

    if (loader) {
      return (
        <View style={{ width: '80 %', height: 150 }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      );
    }

    return (
      <View style={{ width: '100%', height: 300, flexDirection: 'row' }}>
        {check &&
          <TouchableOpacity
            onPress={() => {
              handleproof(id);
            }}
            style={{
              width: 25,
              height: 25,
              marginTop: 60,
              borderRadius: 25 / 2,
              backgroundColor: 'gray',
            }}></TouchableOpacity>
        }
        {/* {toMail && toMail.length > 0 &&
          <View style={{ alignItems: "flex-start", marginBottom: -5, marginLeft: 25, }}>
            <TouchableOpacity onPress={() => handlemailicon(id)}>
              <Icon name='mail-unread-outline'
                type='ionicon'
                color={COLOR.BLUE[300]}
                size={35} />
            </TouchableOpacity>
          </View>
        } */}

        <View style={{ flex: 1, width: 320, height: 250 }}>
          <Image
            source={imgbkg}
            style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
          />
          <View
            style={{
              position: 'absolute',
              width: '80%',
              height: '80%',
              margin: 25,
              alignSelf: 'center',
            }}>
            <View
              style={{
                position: 'absolute',
                width: '100%',
                right: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Postauth', { screen: 'Cardinfo', params: { data: item } })}>
                <Icon
                  name="information-circle-outline"
                  type="ionicon"
                  color={COLOR.BLACK[100]}
                  size={40}
                />
              </TouchableOpacity>
              <Image source={company} />
            </View>

            <View
              style={{
                position: 'absolute',
                width: '100%',
                bottom: 30,
                right: 0,
                alignItems: 'flex-end',
              }}>
              <Image
                source={require('../../../assets/Image/card/logo-liquid-white.png')}
              />
            </View>

            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                marginTop: -10,
                justifyContent: 'center',
              }}>
              <View
                style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                <View style={{ width: '50%' }}>
                  <Text
                    style={{ fontWeight: '600', color: '#FFFFFF', fontSize: 20 }}>
                    UID
                  </Text>
                  <Text
                    style={{ fontWeight: '600', color: '#FFFFFF', fontSize: 12 }}>
                    {item.id.split(':')[2].slice(0, 6)}...
                    {item.id.split(':')[2].slice(24, 32)}
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 80,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderTopLeftRadius: 25,
                      borderBottomLeftRadius: 25,
                      height: 40,
                    }}
                    onPress={() => openmodal(item?.id)}>
                    <Text style={{ fontWeight: '600', color: 'black' }}>
                      SHARE
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderLeftWidth: 0,
                      borderBottomRightRadius: 25,
                      borderTopRightRadius: 25,
                      height: 40,
                    }} onPress={() => dropdown.length > 0 ? dropdown === id ? setDropdown('') : setDropdown(id) : setDropdown(id)}>
                    <Icon name="chevron-small-down" type="entypo" size={35} />
                  </TouchableOpacity>
                </View>
                {dropdown === id &&
                  <View style={{
                    marginTop: 45,
                    backgroundColor: "white",
                    position: "absolute",
                    right: 10,
                    elevation: 5,
                    width: 110,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderTopRightRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",

                    height: 40,
                  }}>
                    <TouchableOpacity onPress={() => handlesendmail()}>
                      <Text style={{ color: COLOR.BLUE[300], fontWeight: "bold", fontSize: 15 }}>Send Mail</Text>
                    </TouchableOpacity>
                  </View>
                }
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingTop: '10%',
        justifyContent: 'center',
      }}>
      {cardData && cardData?.length < 1 ? (
        <View style={{ height: '100%', alignItems: 'center', width: '100%' }}>
          <Text
            style={{ fontSize: 25, color: COLOR.BLACK[100], fontWeight: '700' }}>
            You don't have any wallet data
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 15,
              backgroundColor: COLOR.BLUE[300],
              padding: 15,
              width: '60%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
            }}
            onPress={() => Alert.alert('Under production...')}>
            <Text
              style={{
                fontSize: 19,
                fontWeight: '700',
                color: COLOR.WHITE[100],
              }}>
              ADD PROOF
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          {cardData.map((item, i) => {
            return renderItem({ item });
          })}
        </View>
        // <Carousel
        //   layout="default"
        //   // layoutCardOffset={'18'}
        //   ref={ref}
        //   data={cardData}
        //   sliderWidth={350}
        //   itemWidth={350}
        //   //  style={{backgroundColor:"pink",width:"100%"}}
        //   renderItem={renderItem}
        //   onSnapToItem={index => setActiveIndex(index)}
        // />
      )}
      {apiloader && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            paddingTop: '30%',
            backgroundColor: 'rgba(255, 255, 255,0.5)',
            width: '100%',
            height: '100%',
          }}>
          <ActivityIndicator size={40} color={COLOR.BLUE[300]} />
        </View>
      )}

      <BottomSheet
        isVisible={emailApproval}
        containerStyle={{
          backgroundColor: 'rgba(255, 255, 255,0.5)',
          //alignItems:"center",
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '80%',
            alignItems: 'flex-start',
            paddingLeft: 15,
            backgroundColor: 'white',
            alignSelf: 'center',
            paddingVertical: 30,
            borderRadius: 15,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: COLOR.BLUE[300],
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Your Card have been successfully sent
          </Text>
        </View>
      </BottomSheet>

      <BottomSheet
        isVisible={shareopen}
        containerStyle={{
          backgroundColor: 'rgba(255, 255, 255,0.6)',
          //alignItems:"center",
          flex: 1,
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            width: '100%',
            height: HIGHT,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={1}
          onPress={() => {
            setShareopen(false), setId();
          }}>
          <View
            style={{
              backgroundColor: COLOR.WHITE[100],
              alignSelf: 'center',
              //  width: '85%',

              borderRadius: 25,
              alignItems: 'center',
              padding: 15,
              elevation: 5,
              // shadowColor: 'black',
              // paddingVertical: 150,
            }}>
            <QRCode value={id ? id : null} size={WIDTH - 100} />
          </View>
        </TouchableOpacity>
      </BottomSheet>

      <Modal
        transparent={true}
        animationType={'none'}
        visible={modal}
        onRequestClose={() => {
          setModal(false)
        }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={{ width: "80%", backgroundColor: "white", borderRadius: 15, padding: 15, elevation: 15 }}>
            <Text style={{ color: COLOR.BLUE[500], fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>Email ID</Text>
            <TextInput placeholder='Enter Email Address'
              placeholderTextColor={"gray"}
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{ borderWidth: 0.5, borderRadius: 10, marginTop: 5, paddingHorizontal: 15, borderColor: COLOR.GRAY[100] }} />

            <Text style={{ color: COLOR.BLUE[500], fontSize: 18, fontWeight: "bold", marginLeft: 10, marginTop: 15 }}>Message</Text>
            <TextInput placeholder='Email Id'
              placeholderTextColor={"gray"}
              value={message}
              onChangeText={(text) => setMessage(text)}
              style={{ borderWidth: 0.5, borderRadius: 10, marginTop: 5, paddingHorizontal: 15, borderColor: COLOR.GRAY[100] }} />

            <TouchableOpacity style={{
              width: "70%",
              alignSelf: "center",
              backgroundColor: COLOR.BLUE[500],
              marginTop: 20,
              alignItems: "center", justifyContent: "center", paddingVertical: 10, borderRadius: 15
            }} onPress={() => sendmail()}>
              {submitloader ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Submit</Text>
              )}


            </TouchableOpacity>

            <TouchableOpacity style={{
              width: "70%",
              alignSelf: "center",
              backgroundColor: "red",
              marginTop: 10,
              alignItems: "center", justifyContent: "center", paddingVertical: 10, borderRadius: 15
            }} onPress={() => hndlecancle()}>
              <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>Cancle
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Certificate;
