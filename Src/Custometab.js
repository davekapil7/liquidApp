import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from './Constant/color';
import {tabbar} from './Constant/json';
import {useNavigation} from '@react-navigation/native';

export const Tabbar = (props) => {
  const navigation = useNavigation();
  return (
    <View
    style={{
      width: '100%',
     // height: 65,
     padding:10,
      borderTopLeftRadius: 40,
      borderTopRightRadius:40,
   //   paddingHorizontal: 15,
   paddingVertical:15,
      backgroundColor: '#427bc7',
      position: 'absolute',
      bottom: 0,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
    }}>
    {tabbar.map((tab, i) => {
      return (
        <TouchableOpacity onPress={() => navigation.navigate(tab.nav)} style={{justifyContent:"space-evenly"}}>
          <Icon
            name={props?.state?.index === i ? tab.activename : tab.inactivename}
            type={tab.inactivetype}
            color={COLOR.WHITE[100]}
            size={27}
          />

          <Text style={{color: COLOR.WHITE[100] ,fontWeight:"300", fontSize:13,marginTop:10}}>{tab.title}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
    // <View
    //   style={{
    //     width: '90%',
    //    // height: 65,
    //    padding:10,
    //     borderRadius: 15,
    //     paddingHorizontal: 15,
    //     backgroundColor: 'rgba(0,0,0,0.7)',
    //     position: 'absolute',
    //     bottom: 25,
    //     alignItems: 'center',
    //     alignSelf: 'center',
    //     justifyContent: 'space-evenly',
    //     flexDirection: 'row',
    //   }}>
    //   {tabbar.map((tab, i) => {
    //     return (
    //       <TouchableOpacity onPress={() => navigation.navigate(tab.nav)}>
    //         <Icon
    //           name={props?.state?.index === i ? tab.activename : tab.inactivename}
    //           type={tab.inactivetype}
    //           color={COLOR.WHITE[100]}
    //           size={20}
    //         />

    //         <Text style={{color: COLOR.WHITE[100] ,fontWeight:"300", fontSize:12,marginTop:5}}>{tab.title}</Text>
    //       </TouchableOpacity>
    //     );
    //   })}
    // </View>
  );
};
