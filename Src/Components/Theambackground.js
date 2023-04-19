import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Animated,
  TouchableOpacity,
  ScrollView,
  Share,
  Switch,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { STR } from '../Constant/string';
import { Header as HeaderRNE, HeaderProps, Icon } from '@rneui/themed';
import { COLOR } from '../Constant/color';
import { Dimensions } from 'react-native';

const Theambackground = ({ children, scan, scanscreen, setting, back, title, subtitle, }) => {
  const navigation = useNavigation();
  const handlescan = () => {
    navigation.navigate( 'Postauth' ,{screen: "Scanscreen"})
  };
  const handlesetting = () => {
    navigation.navigate('Postauth' ,{screen:'Settingscreen'});
  };

  const HEIGHT = Dimensions.get('window').height;

  return (
    <View style={{ flex: 1, height: '100%' }}>
      <ScrollView style={{ flex: 1, height: '100%' }}>
        <View style={{ flex: 1, minHeight: HEIGHT }}>
          <LinearGradient
            start={{ x: 0.0, y: 0.4 }}
            end={{ x: 0.85, y: 0.5 }}
            locations={[0, 0.9]}
            // start={{x: 0.0, y: 0.4}}
            // end={{x: 0.8, y: 0.5}}
            // locations={[0, 0.9]}
            // colors={['#5d0981', '#e30cd1']}
            colors={['#454dbc', '#bd59fa']}
            style={{ flex: 1 }}>
            <View
              style={{
                marginTop: 25,
                paddingHorizontal: 15,
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {back &&
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Icon
                    name="chevron-back"
                    type="ionicon"
                    color={COLOR.WHITE[100]}
                    size={35}
                  />
                </TouchableOpacity>
              }
              <View style={{ width: '70%' }}>
                <Text
                  style={{
                    fontSize: 25,
                    color: COLOR.WHITE[100],
                    fontWeight: 'bold',
                  }}>
                  {title}
                </Text>
                <Text
                  style={{
                    fontSize: 17,
                    marginTop: 3,
                    color: COLOR.WHITE[100],
                    fontWeight: '400',
                  }}>
                  {subtitle}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {scan && (
                  <TouchableOpacity onPress={() => handlescan()}>
                    <Icon
                      name="line-scan"
                      size={25}
                      type="material-community"
                      color={COLOR.WHITE[100]}
                    />
                  </TouchableOpacity>
                )}
                {setting && (
                  <TouchableOpacity
                    style={{ marginLeft: 10 }}
                    onPress={() => handlesetting()}>
                    <Icon
                      name="settings-outline"
                      size={25}
                      type="ionicon"
                      color={COLOR.WHITE[100]}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View
              style={{
                backgroundColor: COLOR.BLUE[100],

                marginTop: 15,
                height: '100%',
                borderTopLeftRadius: scanscreen ? 0 : 15,
                borderTopRightRadius: scanscreen ? 0 : 15,
                padding: scanscreen ? 0 : 8,
                paddingTop: scanscreen ? 0 : 15,
              }}>
              {children}
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
});
export default Theambackground;
