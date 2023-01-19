import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from '../../Constant/color';
import Theambackground from '../../Components/Theambackground';
import {seetingjson} from '../../Constant/json';
const Settingscreen = () => {
  return (
    <Theambackground
      title="Settings"
      subtitle="Manage your wallet security settings"
      scan={true}
      setting={false}
      back={true}>
      <View style={{height: '100%', alignItems: 'center'}}>
        {seetingjson.map((item, i) => {
          const subdata = item.subitem;
          return (
            <View
              style={{
                width: '95%',
                backgroundColor: COLOR.WHITE[100],
                marginBottom: 10,
                borderRadius: 10,
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  borderBottomWidth: 0.5,
                  borderBottomColor: COLOR.GRAY[200],
                  paddingBottom: 10,
                  fontWeight: '600',
                  color: COLOR.BLACK[100],
                }}>
                {item.title}
              </Text>

              {subdata.map((sub, i) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      padding: 5,
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                      borderBottomWidth:
                        sub.stitle == 'RECOVER CREDENTIALS' || sub.stitle == 'VERSION 3.31.0' ? 0 : 0.5,
                      borderBottomColor: COLOR.GRAY[200],
                    }}>
                    
                    {sub.stitle == 'RECOVER CREDENTIALS' ? (
                      <Text
                        style={{
                          fontSize: 16,
                          color: COLOR.BLUE[300],
                          fontWeight: '600',
                          textAlign: 'center',
                          width: '100%',
                        }}>
                        {sub.stitle}
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontSize: sub.stitle == 'VERSION 3.31.0' ? 13 : 16,
                          color:
                            item.title == 'About ceal'
                              ? sub.stitle == 'VERSION 3.31.0'
                                ? COLOR.BLACK[100]
                                : COLOR.BLUE[300]
                              : COLOR.BLACK[100],
                          fontWeight: '300',
                        }}>
                        {sub.stitle}
                      </Text>
                    )}
                   
                    <Icon
                      name={sub.iname}
                      type={sub.itype}
                      color={COLOR.BLUE[300]}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    </Theambackground>
  );
};

export default Settingscreen;
