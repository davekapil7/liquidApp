import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions, ActivityIndicator, ImageBackground, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
import { useSelector, useDispatch } from "react-redux";

import QRCode from 'react-native-qrcode-svg';
import axiosInstance from '../../Constant/axios';
import { sendToverification } from '../../Function/Apicall';

const WIDTH = Dimensions.get('screen').width;

const HIGHT = Dimensions.get('screen').height;

const Certificate = ({ toMail, setMail }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shareopen, setShareopen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState();
  const [emailApproval, setEmailapproval] = useState(false)
  const [emailIcon, setEmailicon] = useState([])
  const [apiloader, setApiloader] = useState(false)

  const ref = useRef(null);

  const cardData = useSelector((state) => state.appstate.cardList);

  const createProof = async (id) => {

    let dataToSend = { item_id: id };

    axiosInstance
      .post('auth/create-proof-qr', dataToSend)
      .then(async function (responseJson) {
        if (responseJson.status === 200) {
          let objData = responseJson?.data;
          delete objData.err;

          const id = objData?.id

          let stringData = JSON.stringify(objData);
          console.log("Response json1", objData);
          setId(stringData)
          setApiloader(false)
          setShareopen(true);
        }
      })
      .catch(function (error) {
      });
  };

  const openmodal = (val) => {
    setApiloader(true)
    createProof(val);
  };

  useEffect(() => {
    setTimeout(() => {
      setEmailapproval(false)
    }, 3000);
  }, [emailApproval === true]);

  const handlemailicon = async (id) => {
    setApiloader(true)

    let dataToSend = { item_id: id };

    axiosInstance
      .post('auth/create-proof-qr', dataToSend)
      .then(async function (responseJson) {
        if (responseJson.status === 200) {
          let objData = responseJson?.data;
          delete objData.err;
          console.log("Response json1", objData);

          const id = objData?.id
          const iv = objData?.iv
          let stringData = JSON.stringify(objData);
          const res = await sendToverification(toMail, id, iv)
          console.log("Response from mail", res);
          if (res) {
            setApiloader(false)
            setEmailapproval(true)
            setId(stringData);
            setMail("")
          } else {
            setMail("")
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


    // let oldarr = emailIcon

    // let fillterarr = oldarr.filter(val => val !== id)

    // console.log("@@@@@@@", fillterarr);
    // setEmailicon(fillterarr)

  }

  const renderItem = ({ item, index }) => {
    const insdate = item?.data?.issuanceDate;
    const memberdate = item?.data?.proof?.created;

    const insformated = moment(insdate).format('MM/DD/YYYYY');
    const memberformated = moment(memberdate).format('MM/DD/YYYYY');

    const id = item?.id

    const emailid = emailIcon.findIndex(value => value === id)

    if (loader) {
      return (
        <View style={{ width: '100 %', height: '100%' }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
    }

    return (
      <View style={{ width: '100%', height: 300 }}>
        {toMail && toMail.length > 0 &&
          <View style={{ alignItems: "flex-start", marginBottom: -5, marginLeft: 25, }}>
            <TouchableOpacity onPress={() => handlemailicon(id)}>
              <Icon name='mail-unread-outline'
                type='ionicon'
                color={COLOR.BLUE[300]}
                size={35} />
            </TouchableOpacity>
          </View>
        }

        <View style={{ flex: 1, width: 360, height: 250 }}>
          <Image source={require("../../../assets/Image/card/card7.png")}
            style={{ width: "100%", height: "100%", resizeMode: "stretch" }} />
          <View style={{ position: "absolute", width: "80%", height: "80%", margin: 25, alignSelf: "center" }}>

            <View style={{ position: "absolute", width: "100%", right: 0, alignItems: 'flex-end' }}>
              <Image source={require("../../../assets/Image/card/Kerry-Logistics.png")} />
            </View>

            <View style={{ position: "absolute", width: "100%", bottom: 30, right: 0, alignItems: 'flex-end' }}>
              <Image source={require("../../../assets/Image/card/logo-liquid-white.png")} />
            </View>

            <View style={{ position: "absolute", width: "100%", height: "100%", marginTop: -10, justifyContent: "center" }}>
              <View style={{ flexDirection: "row", alignContent: 'space-between' }}>
                <View style={{ width: '50%' }}>
                  <Text style={{ fontWeight: "600", color: "#FFFFFF", fontSize: 20 }}>UID</Text>
                  <Text style={{ fontWeight: "600", color: "#FFFFFF", fontSize: 12 }}>{item.id.split(":")[2].slice(0, 6)}...{item.id.split(":")[2].slice(24, 32)}</Text>
                </View>
                <View style={{ position: 'absolute', right: 0, flexDirection: 'row' }} >
                  <TouchableOpacity style={{
                    width: 80,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    height: 40,
                  }}
                    onPress={() => openmodal(item?.id)}>
                    <Text style={{ fontWeight: "600", color: "black" }}>SHARE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{
                    width: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderLeftWidth: 0,
                    borderBottomRightRadius: 25,
                    borderTopRightRadius: 25,
                    height: 40
                  }}>
                    <Icon name='chevron-small-down'
                      type='entypo'
                      size={35} />
                  </TouchableOpacity>
                </View>
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
        paddingTop: '30%',
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
        <Carousel
          layout="default"
          // layoutCardOffset={'18'}
          ref={ref}
          data={cardData}
          sliderWidth={350}
          itemWidth={350}
          //  style={{backgroundColor:"pink",width:"100%"}}
          renderItem={renderItem}
          onSnapToItem={index => setActiveIndex(index)}
        />
      )}
      {apiloader &&

        <View style={{ flex: 1, position: "absolute", paddingTop: "30%", backgroundColor: "rgba(255, 255, 255,0.5)", width: "100%", height: "100%", }}>
          <ActivityIndicator size={40}
            color={COLOR.BLUE[300]} />
        </View>
      }

      <BottomSheet isVisible={emailApproval}
        containerStyle={{
          backgroundColor: 'rgba(255, 255, 255,0.5)',
          //alignItems:"center",
          justifyContent: 'center',
        }}>

        <View style={{ width: "80%", alignItems: "flex-start", paddingLeft: 15, backgroundColor: "white", alignSelf: "center", paddingVertical: 30, borderRadius: 15 }}>
          <Text style={{ fontSize: 18, color: COLOR.BLUE[300], fontWeight: "bold", textAlign: "center" }}>Your Card have been successfully sent</Text>
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
            <QRCode
              value={id ? id : null}
              size={WIDTH - 100}
            />
          </View>

        </TouchableOpacity>
      </BottomSheet>
    </View>
  );
};

export default Certificate;
