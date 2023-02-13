import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions, ActivityIndicator } from 'react-native';
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

const WIDTH = Dimensions.get('screen').width;

const HIGHT = Dimensions.get('screen').height;

const Certificate = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shareopen, setShareopen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [id, setId] = useState();
  const ref = useRef(null);

  const cardData = useSelector((state) => state.appstate.cardList);

  const createProof = async (id) => {

    let dataToSend = { item_id: id };

    axiosInstance
      .post('auth/create-proof-qr', dataToSend)
      .then(function (responseJson) {
        if (responseJson.status === 200) {
          let objData = responseJson?.data;
          delete objData.err;
          console.log("Response json1", objData);
          let stringData = JSON.stringify(objData);
          setId(stringData);
          setShareopen(true);
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

  useEffect(() => {
    setTimeout(() => {
      setLoader(false)
    }, 1000);
  }, [])

  const openmodal = (val) => {
    console.log('HEllo', val);
    createProof(val);
  };

  const renderItem = ({ item, index }) => {
    const insdate = item?.data?.issuanceDate;
    const memberdate = item?.data?.proof?.created;

    const insformated = moment(insdate).format('MM/DD/YYYYY');
    const memberformated = moment(memberdate).format('MM/DD/YYYYY');

    if (loader) {
      return (
        <View style={{ width: '100 %', height: '100%' }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )
    }

return (
  <View style={{ width: '100%' }}>
    <LinearGradient
      start={{ x: 0.0, y: 0.4 }}
      end={{ x: 0.85, y: 0.5 }}
      locations={[0, 0.9]}
      colors={['rgba(69, 77, 188, 0.7)', 'rgba(189, 89, 250, 0.7)']}
      style={{ borderRadius: 15, flex: 1 }}>
      <View style={{ padding: 15, width: '100%' }}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={{ color: COLOR.WHITE[100] }}>Kerry ID</Text>
            <View
              style={{
                // backgroundColor: COLOR.WHITE[100],
                // padding: 10,
                borderRadius: 5,
                marginTop: 5,
                alignSelf: 'flex-start',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#4C516D',
                  fontWeight: 'bold',
                }}>
                {item.data.credentialSubject?.filehash}
              </Text>
            </View>
          </View>

          <View style={{}}>
            <View>
              <Text style={{ color: COLOR.WHITE[100], fontSize: 15 }}>
                Member since
              </Text>
              <Text
                style={{
                  color: COLOR.WHITE[100],
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                {memberformated}
              </Text>
            </View>
            <View style={{ marginTop: 11 }}>
              <Text style={{ color: COLOR.WHITE[100], fontSize: 15 }}>
                Issurance Date
              </Text>
              <Text
                style={{
                  color: COLOR.WHITE[100],
                  fontSize: 18,
                  fontWeight: '700',
                }}>
                {insformated}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 27,
              marginTop: 15,
              textTransform: 'uppercase',
              color: COLOR.WHITE[100],
              fontWeight: 'bold',
              width: '70%',
            }}>
            {item.data.credentialSubject?.Filename}
          </Text>
          <TouchableOpacity
            style={{
              width: '30%',
              alignItems: 'center',
              justifyContent: 'center',
              height: 35,
              borderRadius: 10,
              backgroundColor: COLOR.WHITE[100],
            }}
            onPress={() => openmodal(item?.id)}>
            <Text style={{ color: COLOR.BLUE[300], fontSize: 16 }}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
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
    {cardData?.length < 1 ? (
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
        itemWidth={300}
        renderItem={renderItem}
        onSnapToItem={index => setActiveIndex(index)}
      />
    )}

    <BottomSheet
      isVisible={shareopen}
      containerStyle={{
        backgroundColor: 'rgba(255, 255, 255,0.6)',
        //alignItems:"center",
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
