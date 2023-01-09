import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {IMG} from '../../Constant/image';
import {STR} from '../../Constant/string';
import {styles} from './style';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from '../../Constant/color';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [prenumber, setPrenumber] = useState(91);
  const [number, setNumber] = useState();
  const [emailfocus, setemailfocus] = useState(false);
  const [type, setType] = useState(STR.REGISTER);
  const [passvisible, setPassvisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(fadeAnim, {
      toValue: emailfocus ? 1 : 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.cardView}>
          <Text style={styles.starttext}>{STR.GET}</Text>
          <Text style={styles.starttext}>{STR.START}</Text>

          <View style={styles.tabView}>
            <TouchableOpacity
              style={{
                ...styles.tabbar,
                borderBottomColor:
                  type == STR.REGISTER ? COLOR.GREEN[100] : COLOR.GRAY[300],
              }}
              onPress={() => setType(STR.REGISTER)}>
              <View
                style={{
                  ...styles.iconView,
                  borderColor:
                    type == STR.REGISTER ? COLOR.GREEN[100] : COLOR.GRAY[300],
                }}>
                <Icon
                  name="pencil"
                  type="octicon"
                  color={COLOR.GRAY[300]}
                  size={25}
                />
              </View>

              <Text style={styles.tabtitle}>{STR.REGISTER}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.tabbar}
              onPress={() => setType(STR.LOGIN)}>
              <View style={styles.iconView}>
                <Icon
                  name="user"
                  type="feather"
                  color={COLOR.GRAY[300]}
                  size={42}
                />
              </View>

              <Text style={styles.tabtitle}>{STR.LOGIN}</Text>
            </TouchableOpacity>
          </View>

          {type === STR.REGISTER && (
            <View style={styles.registerView}>
              <TextInput
                placeholder={STR.FULLNAME}
                style={styles.textinputView}
                onChangeText={text => setEmail(text)}
                value={email}
              />

              <View style={styles.numberView}>
                <View style={styles.prenumber}>
                  <TextInput
                    placeholder="+95"
                    value={prenumber}
                    onChangeText={text => setPrenumber(text)}
                  />
                </View>

                <TextInput
                  placeholder=""
                  value={number}
                  onChangeText={text => setNumber(text)}
                  style={{flex: 1}}
                />
              </View>

              <Text style={styles.passtext}>{STR.PASSWORDMSG}</Text>

              <View style={styles.passview}>
                <TextInput
                  placeholder={STR.PASSWORD}
                  style={styles.passinput}
                  secureTextEntry={passvisible ? false : true}
                />
                <TouchableOpacity onPress={() => setPassvisible(!passvisible)}>
                  <Icon
                    name={passvisible ? 'eye' : 'eye-with-line'}
                    type="entypo"
                    style={{alignSelf: 'flex-end'}}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.infotext}>{STR.REGISTERINFO}</Text>

              <TouchableOpacity style={styles.buttonView}>
                <Text style={styles.bottontext}>{STR.CONTINUE}</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* {type === STR.LOGIN && 
          } */}
        </View>

        {/* <Image source={IMG.LOGO} style={styles.image} />

        <Text style={styles.title}>{STR.TITLE}</Text>
        <Text style={styles.loginmsg}>{STR.LOGINMSG}</Text>

        <TouchableOpacity onPress={() => setemailfocus(!emailfocus)}>
          <Text>Click</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <View style={styles.roundView}></View>
          <View style={styles.inputView}>
            <TextInput
              placeholder="Enter you email"
              value={email}
              onChangeText={text => {
                setemailfocus(true);
              }}
            />

            <Animated.Text
              style={{
                position: 'absolute',
                marginLeft: 27,
                marginTop: emailfocus ? -10 : 0,
              }}>
              Hello
            </Animated.Text>
           
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
