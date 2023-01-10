import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {COLOR} from '../../Constant/color';
import {Onbording} from '../../Constant/json';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';

const OnbordingScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.swiperView}>
        <Swiper
          dotColor={COLOR.GRAY[300]}
          activeDotColor={COLOR.BLACK[100]}
          dotStyle={{width: 6, height: 6, borderRadius: 6, marginRight: 15}}
          activeDotStyle={{
            width: 12,
            height: 12,
            borderRadius: 12,
            marginRight: 15,
          }}>
          {Onbording.map((item, i) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={item.img}
                  style={{width: '80%', height: '30%'}}
                />
                <Text style={styles.titletext}>{item.title}</Text>
                <Text style={styles.desctext}>{item.desc}</Text>

                {item.desc2 && (
                  <Text style={styles.desctext}>{item.desc2}</Text>
                )}
                {item.id == 1 && (
                  <Text style={styles.introtext}>
                    Swipe or press Get Started
                  </Text>
                )}
              </View>
            );
          })}
        </Swiper>
      </View>

      <TouchableOpacity
        style={{
          width: '65%',
          backgroundColor: COLOR.GREEN[100],
          height: 40,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigation.navigate("InfoScreen")}>
        <Text style={{fontSize:15,color:COLOR.WHITE[100],fontWeight:"400"}}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnbordingScreen;
