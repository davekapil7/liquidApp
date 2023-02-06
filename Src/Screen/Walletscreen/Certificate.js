import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import {COLOR} from '../../Constant/color';
import {proof} from '../../Constant/json';

const Certificate = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  const renderItem = ({item, index}) => {
    console.log('CCCC', item);
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
                    backgroundColor: COLOR.WHITE[100],
                    padding: 10,
                    borderRadius: 5,
                    marginTop: 5,
                    alignSelf: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: COLOR.BLUE[300],
                      fontWeight: '700',
                    }}>
                    {item.kerryid}
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
                    {item.memberdata}
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
                    {item.issurancedate}
                  </Text>
                </View>
              </View>
            </View>

            <Text
              style={{
                fontSize: 27,
                marginTop: 15,
                textTransform: 'uppercase',
                color: COLOR.WHITE[100],
                fontWeight: 'bold',
              }}>
              {item.cname}
            </Text>
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
      {proof.length < 1 ? (
        <View style={{height: '100%', alignItems: 'center', width: '100%'}}>
          <Text style={{fontSize:25,color:COLOR.BLACK[100],fontWeight:"700"}}>You don't have any proof</Text>
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
            onPress={()=> Alert.alert("Under production...")}>
            <Text style={{fontSize:19,fontWeight:"700",color:COLOR.WHITE[100]}}>ADD PROOF</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Carousel
          layout="default"
          // layoutCardOffset={'18'}
          ref={ref}
          data={proof}
          sliderWidth={350}
          itemWidth={300}
          renderItem={renderItem}
          onSnapToItem={index => setActiveIndex(index)}
        />
      )}
    </View>
  );
};

export default Certificate;
