import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {findIndex} from 'lodash';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {sendToverification, updateVerification} from '../../Function/Apicall';
import { useNavigation } from '@react-navigation/native';

// const proofdata = {
//   _id: '64239bba773ec0693f7368d4',
//   raisedTo: 'davekapil071@gmail.com',
//   askedFor: ['Address_proof', 'Delivery_proof'],
//   did: [],
//   __v: 0,
// };

const Professional = ({changetype, setProof, setcheck}) => {
  const proofitem = useSelector(state => state?.certificate?.proofdata);

  const proofdata = useSelector(state => state?.certificate?.verification);
  const verificationId = useSelector(
    state => state?.certificate?.verificationId,
  );
  const prrofapi = useSelector(state => state?.certificate?.prrofdataApi);
const email = useSelector(state => state?.appstate?.email)
  const [clickNext, setClickNext] = useState(false);
  const [clickconfirm, setClickconfirm] = useState(false);
  const [modalVisible, setModalvisible] = useState(false);

  const prrofarr = proofdata?.askedFor ? proofdata?.askedFor : [];

  const dispatch = useDispatch()
  const navigation = useNavigation()
  // const prrofarr = ['Address_proof', 'Delivery_proof']
  const handlepress = item => {
    setProof(item);
    changetype(1);
    setcheck(true);
  };


  const press = async () => {
    // const email = "pankajswami69@gmail.com"
    // const verificationId = '641be1020eee6edc32da2fba';
    if (clickNext == true) {
      if(clickconfirm === true ){
       const res = await sendToverification(verificationId , email)
        console.log("##########res",res);
        if(res == true){
        setModalvisible(true)
        dispatch({
          type : "CLEAR_ALL",
          palyload : "Clear"
        })
        setTimeout(() => {
          setModalvisible(false)
          navigation.navigate("Tabnavigationroute")
        }, 2000);
       
        }
      }else{
      console.log('$$$$$,', verificationId);
    //  const verificationId = '641be1020eee6edc32da2fba';
      const res = await updateVerification(verificationId, prrofapi);
      console.log('$$', res);
      if (res !== 'error') {
        setClickconfirm(true);
        // setModalvisible(true)
      }
    }
    } else {
      setClickNext(true);
    }
  };

  console.log('#####,', proofitem.length, prrofarr.length);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 110,
      }}>
      {prrofarr?.length > 0 ? (
        <View
          style={{
            width: '95%',
            backgroundColor: '#D2DAFF',
            padding: 15,
            alignItems: 'center',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 10,
              color: 'black',
            }}>
            {clickNext ? 'CONFIRMATION' : 'PAYMART CAPILAT LTD.'}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'normal',
              marginTop: 5,
              color: 'black',
            }}>
            {clickNext ? null : 'Documents requested from the bank'}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginTop: 15,
              color: 'black',
              alignSelf: 'flex-start',
              marginLeft: 10,
            }}>
            {clickNext ? null : 'Message:'}
          </Text>
          {clickNext ? (
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'normal',
                marginTop: 15,
                color: 'black',
                alignSelf: 'flex-start',
                marginLeft: 10,
                marginRight: 10,
              }}>
              When you click on submit you confirm that you are sharing these
              credentials to the verifier{' '}
              <Text style={{fontWeight: 'bold'}}>(Paysmart Capital Ltd.)</Text>
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'normal',
                marginTop: 5,
                color: 'black',
                alignSelf: 'flex-start',
                marginLeft: 10,
                marginRight: 10,
              }}>
              Loan Application for ABC company. Lorem Ipsum is simply dummy text
              of theprining and typesetting industry. Lorem lpsum has been the
              industry standard dummy text ever since the 1500s,
            </Text>
          )}
          <View style={{flex: 1, width: '100%'}}>
            <ScrollView style={{flex: 1, height: '100%'}}>
              <View style={{flex: 1, alignItems: 'center', marginTop: 25}}>
                {prrofarr.map((item, i) => {
                  console.log('Proofitem====>', proofitem, typeof proofitem);

                  const pindex = findIndex(proofitem, function (chr) {
                    return chr.name == item;
                  });

                  console.log('%%%', pindex, item, pindex);

                  return (
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        marginBottom: 20,
                      }}>
                      <TouchableOpacity
                        disabled={pindex === -1 ? false : true}
                        style={{
                          width: '70%',
                          marginBottom: 5,
                          alignItems: 'center',
                          backgroundColor:
                            pindex === -1 ? '#427BC8' : '#3EA492',
                          padding: 8,
                          borderRadius: 15,
                        }}
                        onPress={() => handlepress(item)}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 18,
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                          }}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                      {pindex !== -1 && pindex !== undefined && (
                        <>
                          <Text style={{color: 'black', fontSize: 14}}>
                            {' '}
                            Selected Card :{' '}
                          </Text>
                          <Text style={{color: 'black', fontSize: 14}}>
                            {proofitem[pindex].card}
                          </Text>
                        </>
                      )}
                    </View>
                  );
                })}
              </View>

              {proofitem?.length === prrofarr.length && (
                <TouchableOpacity
                  style={{
                    width: '70%',
                    marginTop: '10%',
                    marginBottom: 5,
                    alignSelf: 'center',
                    alignItems: 'center',
                    backgroundColor: '#427BC8',
                    padding: 8,
                    borderRadius: 15,
                  }}
                  onPress={() => press()}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 18,
                      textTransform: 'uppercase',
                      fontWeight: 'bold',
                    }}>
                    {clickNext ? (clickconfirm ? 'SUBMIT' : 'confirm') : 'NEXT'}
                  </Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() => setModalvisible(false)}>
              <View
                style={{
                  height: 150,
                  marginTop: '90%',
                  width: '95%',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: 'black',
                  alignSelf: 'center',

                  backgroundColor: '#ECF2FF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: -999,
                }}></View>
              <View
                style={{
                  marginTop: '75%',
                  position: 'absolute',
                  zIndex: 999,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                }}>
                <Icon
                  name="water"
                  type="material-community"
                  color="black"
                  size={280}
                />
                <View style={{}}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontWeight: 'bold',
                      marginTop: 110,
                      marginLeft: -35,
                      marginRight: 35,
                    }}>
                    SUCCESSFULLY
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'black',
                      fontWeight: 'bold',
                      marginLeft: -18,
                      marginRight: 35,
                    }}>
                    SUBMITTED
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
      ) : (
        <View style={{marginTop: 15}}>
          <Text style={{color: 'black'}}>Not active right now</Text>
        </View>
      )}
    </View>
  );
};

export default Professional;
