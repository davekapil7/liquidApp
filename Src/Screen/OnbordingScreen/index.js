import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Swiper from 'react-native-swiper';
import {COLOR} from '../../Constant/color';
import {Onbording} from '../../Constant/json';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import LAText from '../../Components/LAText';

const OnbordingScreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.swiperView}>
        <Swiper
          dotColor={COLOR.GRAY[400]}
          activeDotColor={COLOR.BLACK[100]}
          dotStyle={{width: 6, height: 6, borderRadius: 6, marginRight: 20}}
          activeDotStyle={{
            width: 6,
            height: 6,
            borderRadius: 6,
            marginRight: 15,
          }}>
          {Onbording.map((item, i) => {
            return (
              <View
                style={styles.swipercontainer}>
                <Image
                  source={item.img}
                  style={styles.image}
                />
                <Text style={styles.titletext}>{item.title}</Text>
                {/* <LAText title={item.title}/> */}
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
        style={styles.button}
        onPress={() => navigation.navigate('Preauth' ,{screen: "InfoScreen"})}>
        <Text style={{fontSize:15,color:COLOR.WHITE[100],fontWeight:"400"}}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnbordingScreen;
