import React, {useState, useRef, useEffect} from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {IMG} from '../../Constant/image';
import {STR} from '../../Constant/string';
import {styles} from './style';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from '../../Constant/color';
import {wallettype} from '../../Constant/json';

const Walletscreen = () => {
  const navigation = useNavigation();
  const [selectedtype, setSelectedType] = useState(0);
  const getmycredential = () => {
    console.log('Under production....');
  };

  const scan = () => {
    navigation.navigate("Scanscreen")
  };
  const setting = () => {
    console.log('Under production....');
    navigation.navigate('Settingscreen');
  };

  const share = () => {
    console.log('Under production....');
  };

  const editdetail = () => {
    console.log('Under production....');
  };

  return (
    <View style={styles.safeContainer}>
      <ScrollView style={{flex: 1}}>
        <LinearGradient
          start={{x: 0.0, y: 0.4}}
          end={{x: 0.85, y: 0.5}}
          locations={[0, 0.9]}
          // start={{x: 0.0, y: 0.4}}
          // end={{x: 0.8, y: 0.5}}
          // locations={[0, 0.9]}
          // colors={['#5d0981', '#e30cd1']}
          colors={['#454dbc', '#bd59fa']}
          style={{flex: 1}}>
          <View style={styles.headerContainer}>
            <View>
              <Text style={styles.titletext}>{STR.WALLET.TITLE}</Text>
              <Text style={styles.welcometext}>{STR.WALLET.WELCOME} User</Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => scan()}>
                <Icon
                  name="line-scan"
                  size={25}
                  type="material-community"
                  color={COLOR.WHITE[100]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={() => setting()}>
                <Icon
                  name="settings-outline"
                  size={25}
                  type="ionicon"
                  color={COLOR.WHITE[100]}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.container}>
            <View style={{height: 45}}>
              <ScrollView
                horizontal={true}
                style={{height: 23}}
                contentContainerStyle={{height: 40}}>
                <View style={styles.tabcontain}>
                  {wallettype.map((type, i) => {
                    return (
                      <TouchableOpacity
                        style={{
                          ...styles.tabView,
                          flexDirection: 'row',
                          alignItems: 'center',

                          backgroundColor:
                            selectedtype === i
                              ? COLOR.BLUE[300]
                              : COLOR.BLUE[200],

                          borderTopLeftRadius: i == 0 ? 10 : 0,
                          borderBottomLeftRadius: i === 0 ? 10 : 0,
                          borderBottomRightRadius: i === 3 ? 10 : 0,
                          borderTopRightRadius: i === 3 ? 10 : 0,
                        }}
                        onPress={() => setSelectedType(i)}>
                        <Icon
                          name={type.iname}
                          type={type.itype}
                          size={15}
                          color={
                            selectedtype === i
                              ? COLOR.WHITE[100]
                              : COLOR.BLUE[300]
                          }
                        />
                        <Text
                          style={{
                            marginLeft: 5,
                            fontWeight: selectedtype === i ? 'bold' : '400',
                            color:
                              selectedtype === i
                                ? COLOR.WHITE[100]
                                : COLOR.BLUE[300],
                            fontSize: 15,
                          }}>
                          {type.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>

            {selectedtype === 0 && (
              <View
                style={{
                  alignItems: 'flex-start',
                  width: '100%',
                  alignSelf: 'flex-start',
                  flex: 1,
                }}>
                <View
                  style={{
                    backgroundColor: COLOR.WHITE[100],
                    width: '100%',
                    borderRadius: 15,
                    padding: 15,
                    marginTop: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomWidth: 0.5,
                      paddingBottom: 15,
                      borderBottomColor: COLOR.GRAY[100],
                    }}>
                    <View>
                      <Text style={{fontSize: 20, color: COLOR.BLACK[100]}}>
                        User
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          marginTop: 10,
                          color: COLOR.BLACK[100],
                        }}>
                        user@gmail.com
                      </Text>
                    </View>
                    <View
                      style={{
                        width: 85,
                        height: 85,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLOR.BLUE[200],
                      }}>
                      <Icon
                        name="emoji-happy"
                        color={COLOR.BLUE[300]}
                        size={30}
                        type="entypo"
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={{
                      alignSelf: 'flex-end',
                      padding: 10,
                      backgroundColor: COLOR.BLUE[300],
                      marginTop: 10,
                      borderRadius: 5,
                      flexDirection: 'row',
                    }}
                    onPress={() => share()}>
                    <Icon
                      name="qrcode-scan"
                      type="material-community"
                      size={20}
                      color={COLOR.WHITE[100]}
                    />
                    <Text
                      style={{
                        marginLeft: 5,
                        fontSize: 15,
                        color: COLOR.WHITE[100],
                        fontWeight: '800',
                      }}>
                      SHARE
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{alignSelf: 'center', marginTop: 5}}
                    onPress={() => editdetail()}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: COLOR.BLUE[300],
                        fontWeight: '600',
                      }}>
                      EDIT DETAILS
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    width: '100%',
                    marginTop: 25,
                  }}>
                  <Icon
                    name="file-certificate-outline"
                    type="material-community"
                    size={90}
                    color={COLOR.BLUE[300]}
                  />
                  <Text
                    style={{
                      fontSize: 25,
                      color: COLOR.BLACK[100],
                      fontWeight: '600',
                    }}>
                    Let's get your first credential
                  </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      color: COLOR.BLACK[100],
                      fontWeight: '400',
                      marginTop: 15,
                      width: '75%',
                      textAlign: 'center',
                    }}>
                    You can self issue your own credential or receive a
                    testimonial from your business partners or colleagues
                  </Text>

                  <TouchableOpacity
                    style={{
                      backgroundColor: COLOR.BLUE[300],
                      marginTop: 20,
                      padding: 5,
                      paddingHorizontal: 15,
                      borderRadius: 5,
                    }}
                    onPress={() => getmycredential()}>
                    <Text
                      style={{
                        color: COLOR.WHITE[100],
                        fontWeight: '700',
                        fontSize: 15,
                      }}>
                      GET MY FIRST CREDENTIAL
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default Walletscreen;
