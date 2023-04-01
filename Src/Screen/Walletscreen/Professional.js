import React, { useEffect } from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { useSelector } from 'react-redux';
import { findIndex } from 'lodash';

const proof = {
  data: {
    _id: '64239bba773ec0693f7368d4',
    raisedTo: 'davekapil071@gmail.com',
    askedFor: ['Address_proof', 'Delivery_proof'],
    did: [],
    __v: 0,
  },
  error: false,
};
const Professional = ({changetype , setProof}) => {

    
//  const proofdata = proof?.data;
//  const prrofarr = proofdata?.askedFor;

  const proofitem = useSelector(state => state?.certificate.proofdata)
  const proofdata = useSelector(state => state?.certificate.verification)

  const prrofarr = proofdata?.askedFor;

  console.log("#####",prrofarr.length);

  const handlepress = (item) =>{
    setProof(item)
    changetype(1)
  }

  const press = ()=>{
    var formdata = new FormData();
formdata.append("to", "prashantbarge22@gmail.com");
formdata.append("data", "{verificaitonId:\"\"}");
formdata.append("message", "hello from form data ");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://api.liquid.com.hk/api/mail/transferDID", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  }
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
          PAYMART CAPILAT LTD.
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'normal',
            marginTop: 5,
            color: 'black',
          }}>
          Documents requested from the bank
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
          Message:
        </Text>
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
          Loan Application for ABC company. Lorem Ipsum is simply dummy text of
          theprining and typesetting industry. Lorem lpsum has been the industry
          standard dummy text ever since the 1500s,
        </Text>
        <View style={{flex: 1, width: '100%'}}>
          <ScrollView style={{flex: 1, height: '100%'}}>
            <View style={{flex: 1, alignItems: 'center', marginTop: 25}}>
              {prrofarr.map((item, i) => {
                console.log("Proofitem====>",proofitem , typeof proofitem) ;
                //  const pindex = proofitem?.map((pitem ,i )=> {
                //     if(pitem.proof == item){
                //         console.log("###",pitem.proof , item);
                //         return i
                //     }else{
                //         return -1
                //     }
                    
                //  }) 
                const pindex = findIndex(proofitem, function(chr) {
                    return chr.proof == item;
                  }); 
                 
                 console.log("%%%",pindex, item , pindex);

                return (
                    <View style={{width:"100%",alignItems:"center",marginBottom: 20,}}>
                  <TouchableOpacity
                  disabled={pindex === -1 ? false : true}
                    style={{
                      width: '70%',
                      marginBottom: 5,
                      alignItems: 'center',
                      backgroundColor:pindex === -1 ? '#427BC8' : '#3EA492',
                      padding: 8,
                      borderRadius: 15,
                    }} onPress={() =>handlepress(item)}>
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
                  {pindex !== -1 && pindex !== undefined &&(
                    <>
                  <Text style={{color:"black" , fontSize:14}}> Selected Card : </Text>
                  <Text style={{color:"black" , fontSize:14}}>{proofitem[pindex].card}</Text>
                  </> 
                  )
                  }
                  </View>
                );
              })}
            </View>

            {proofitem?.length === prrofarr.length && 
            <TouchableOpacity
            style={{
              width: '70%',
              marginBottom: 5,
              alignSelf:"center",
              alignItems: 'center',
              backgroundColor:'#427BC8',
              padding: 8,
              borderRadius: 15,
            }} onPress={() => press()}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                textTransform: 'uppercase',
                fontWeight: 'bold',
              }}>
              Next
            </Text>
          </TouchableOpacity>
            }
          </ScrollView>
        </View>
      </View>
      ) : (
        <View style={{marginTop:15 ,}}>
            <Text style={{clor:"black"}}>Not active right now</Text>
        </View>
      )}
    </View>
  );
};

export default Professional;
