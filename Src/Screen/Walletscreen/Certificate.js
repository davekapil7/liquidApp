import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Alert, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import {COLOR} from '../../Constant/color';
import {proof} from '../../Constant/json';
import moment from 'moment';
import {
  Header as HeaderRNE,
  HeaderProps,
  Icon,
  BottomSheet,
} from '@rneui/themed';
import axios from 'axios';

import QRCode from 'react-native-qrcode-svg';
import axiosInstance from '../../Constant/axios';

const WIDTH = Dimensions.get('screen').width;

const HIGHT = Dimensions.get('screen').height;

const Certificate = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [shareopen, setShareopen] = useState(false);
  const [id, setId] = useState();
  const [apidata , setApidata] = useState([])
  const ref = useRef(null);

  useEffect(() => {
    const getData = async () => {
      // var myHeaders = new Headers();
      // myHeaders.append(
      //   'Cookie',
      //   'connect.sid=s%3AY3n2dqzNoEMs6ALedFyHtsePWk-1yTQ3.r23ydgE1Z6DO2S%2FjauP6TGr%2FPGR9hF6PWGq9GDP84Oo',
      // );

      // var requestOptions = {
      //   method: 'GET',
      //   headers: myHeaders,
      //   redirect: 'follow',
      // };

      // fetch('http://142.93.213.49:8000/api/getDid', requestOptions)
      //   .then(response => response.text())
      //   .then(result => console.log(result))
      //   .catch(error => console.log('error', error));


      axiosInstance
      .get(
        'api/getDid',

      )
      .then(function (responseJson) {
        // setLoading(false);

       // console.log("$$$$$$$",responseJson);
         if (responseJson.status === 200) {
        //   console.log(responseJson.status);
        //   if (responseJson.status === 200) {
        //     Toast.show('Successfully Proof Created', Toast.LONG, {
        //       backgroundColor: 'blue',
        //     });
        //     setVerify(true);
        //   }
        setApidata(responseJson?.data?.data?.items)
        }
      })
      .catch(function (error) {
      //  setErrortext(responseJson?.data?.error);
        Toast.show('Somthing Went Wrong Scan Again', Toast.LONG, {
          backgroundColor: 'blue',
        });
        // setLoading(false);
      });
    };
    getData();
  }, []);

  const data = [
    {
      id: 'urn:uuid:13458e14c988455c8bc91dd0259c6468',
      data: {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/bbs/v1',
          {
            '@vocab': 'https://trinsic.cloud/Liquid/',
          },
        ],
        type: ['VerifiableCredential', 'Document'],
        credentialSchema: [
          {
            id: 'https://schema.trinsic.cloud/Liquid/document',
            type: 'JsonSchemaValidator2018',
          },
        ],
        credentialSubject: {
          Filename: 'test',
          filehash: '987857345',
          id: 'urn:vc:subject:0',
        },
        id: 'urn:vc',
        issuanceDate: '2023-02-07T06:42:50.4463251Z',
        credentialStatus: {
          id: 'urn:revocation-registry:Liquid:S2QL8aGEUhCSuWcgZ4j8A2#1',
          type: 'RevocationList2020Status',
          revocationListIndex: '1',
          revocationListCredential:
            'urn:revocation-registry:Liquid:S2QL8aGEUhCSuWcgZ4j8A2',
        },
        issuer:
          'did:key:z5TcERJNex1apJFUzaWWaoYWss1woK9sj1xRyvJfZCeTPSCqwjqwL5GYGE2RH3deCZGKbDDfgUHzrsGjJTTHuR3NLEdQk4cwd8aFnJ4XMXGNuFa2ye5zwtpLsucCKUViGz5G9c3V4GhxP3cHJiAnAPppSCfJtUmqVrQX4fhNXcmRYB1f8xx4eQDe4SBpLZBcy9N7jwYeN',
        proof: {
          type: 'BbsBlsSignature2020',
          created: '2023-02-07T06:42:50Z',
          proofPurpose: 'assertionMethod',
          proofValue:
            'rXgeU39Ju9AkG7rxgBzu1RfWp+sw3LfHODhmVQX7GTz6CSUCAUmQr/BT1Erk1x+UDY9T4P0cUbY9nvrl3pWrPTbBg9gdlGBiNF14wtF20xY+rh4pM8CvUuuVywjj1snq0jodzYHDz7ChyaLz2ymVIw==',
          verificationMethod:
            'did:key:z5TcERJNex1apJFUzaWWaoYWss1woK9sj1xRyvJfZCeTPSCqwjqwL5GYGE2RH3deCZGKbDDfgUHzrsGjJTTHuR3NLEdQk4cwd8aFnJ4XMXGNuFa2ye5zwtpLsucCKUViGz5G9c3V4GhxP3cHJiAnAPppSCfJtUmqVrQX4fhNXcmRYB1f8xx4eQDe4SBpLZBcy9N7jwYeN#zUC75m4vKb55DABQjwdofMVkECXLEcXAgo7anrCdFZ2uuKc1vntL5niJwyKjoYoCYJevUsYbBHQptFVERwTxSW5tJNbJqmFJmb5rqwQ9JwULuZS4cr8UiSNGmJKiofdgkNj3nre',
        },
      },
    },
    {
      id: 'urn:uuid:9d298cae4c9b47119a840c939afb2801',
      data: {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://w3id.org/bbs/v1',
          {
            '@vocab': 'https://trinsic.cloud/Liquid/',
          },
        ],
        type: ['VerifiableCredential', 'Document'],
        credentialSchema: [
          {
            id: 'https://schema.trinsic.cloud/Liquid/document',
            type: 'JsonSchemaValidator2018',
          },
        ],
        credentialSubject: {
          Filename: 'test-123',
          filehash: '987857345',
          id: 'urn:vc:subject:0',
        },
        id: 'urn:vc',
        issuanceDate: '2023-02-07T07:02:46.8994438Z',
        credentialStatus: {
          id: 'urn:revocation-registry:Liquid:41MpPPxFM5Yz4Gks6Wb2ng#4',
          type: 'RevocationList2020Status',
          revocationListIndex: '4',
          revocationListCredential:
            'urn:revocation-registry:Liquid:41MpPPxFM5Yz4Gks6Wb2ng',
        },
        issuer:
          'did:key:z5TcCH4aruP7TGsDSbYnfiHoYwbV6LZGJwH8TPoRiL7YmgA1bBg69JNfMWgBF4T9CttjdBkrUiu3TdoKucQzYJPLjjpsw6ZBsvRVhoTzyudXtepzENxQUE1U8HAXhDPeWsZha9Gd4dnzyeCvAWVzpHcP4K6aRL2v3iGjh31zmTQbED4pNoBadfTecPV1YV5jejspe3pbN',
        proof: {
          type: 'BbsBlsSignature2020',
          created: '2023-02-07T07:02:46Z',
          proofPurpose: 'assertionMethod',
          proofValue:
            'tuU6XCS3yGlry80fUU9NOUdwCCPtvTXqRFW2Ja7UJaG/Pvgjjex7ubYDmfgmP1CFUXw8+SSaTmwyraUp7mOl9hI+FZHBWuKjmiCwvqfLiYpzl8hfqn1cTYfej94PcIJOUq46tZpPIKj6IFvfPKzuVQ==',
          verificationMethod:
            'did:key:z5TcCH4aruP7TGsDSbYnfiHoYwbV6LZGJwH8TPoRiL7YmgA1bBg69JNfMWgBF4T9CttjdBkrUiu3TdoKucQzYJPLjjpsw6ZBsvRVhoTzyudXtepzENxQUE1U8HAXhDPeWsZha9Gd4dnzyeCvAWVzpHcP4K6aRL2v3iGjh31zmTQbED4pNoBadfTecPV1YV5jejspe3pbN#zUC7L29D8h9ncZUkSco61AZMFZVcCNWGG3N2PX56Z1FpEyfJGXU4VyzDRP2SANffru93CtSu5xZSaFwz77hrBjwcAgr8uSyBihBjGonnFMmCv6dzCEvceRsDbhdVTL5nW7xKPvC',
        },
      },
    },
  ];

  console.log("@@@@@@@@@@@@@@@@@@@@",apidata);
  const openmodal = val => {
    console.log('HEllo', val);
    setId(val);
    setShareopen(true);
  };

  const renderItem = ({item, index}) => {
    const insdate = item?.data?.issuanceDate;
    const memberdate = item?.data?.proof?.created;

    const insformated = moment(insdate).format('MM/DD/YYYYY');
    const memberformated = moment(memberdate).format('MM/DD/YYYYY');

    return (
      <View style={{width: '100%'}}>
        <LinearGradient
          start={{x: 0.0, y: 0.4}}
          end={{x: 0.85, y: 0.5}}
          locations={[0, 0.9]}
          colors={['rgba(69, 77, 188, 0.7)', 'rgba(189, 89, 250, 0.7)']}
          style={{borderRadius: 15, flex: 1}}>
          <View style={{padding: 15, width: '100%'}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{color: COLOR.WHITE[100]}}>Kerry ID</Text>
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
                  <Text style={{color: COLOR.WHITE[100], fontSize: 15}}>
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
                <View style={{marginTop: 11}}>
                  <Text style={{color: COLOR.WHITE[100], fontSize: 15}}>
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
                <Text style={{color:COLOR.BLUE[300],fontSize:16}}>Share</Text>
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
      {apidata?.length < 1 ? (
        <View style={{height: '100%', alignItems: 'center', width: '100%'}}>
          <Text
            style={{fontSize: 25, color: COLOR.BLACK[100], fontWeight: '700'}}>
            You don't have any proof
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
          data={apidata}
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
