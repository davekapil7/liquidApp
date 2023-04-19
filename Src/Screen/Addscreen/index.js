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
import {useNavigation} from '@react-navigation/native';
import {IMG} from '../../Constant/image';
import {STR} from '../../Constant/string';
import {styles} from './style';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {COLOR} from '../../Constant/color';
import Theambackground from '../../Components/Theambackground';

const Addscreen = () => {
  const [email, setEmail] = useState('');
  const [prenumber, setPrenumber] = useState(91);
  const [number, setNumber] = useState();
  const [emailfocus, setemailfocus] = useState(false);
  const [type, setType] = useState(STR.REGISTER);
  const [passvisible, setPassvisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  useEffect(() => {
    Animated.spring(fadeAnim, {
      toValue: emailfocus ? 1 : 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const testimonial = () => {
   navigation.navigate('Postauth' ,{screen: "Testimonial"})
  };

  const credential = () => {
    navigation.navigate('Postauth' ,{screen: "Selfissue"})
  };
  return (
    <Theambackground
      title="Add Credential"
      subtitle="Request or self-issue new credentials"
      scan={true}
      setting={true}>
      <View style={{height: '100%', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: COLOR.WHITE[100],
            width: '95%',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Text
            style={{fontSize: 25, color: COLOR.BLACK[100], fontWeight: '500'}}>
            Self-issue credential
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: COLOR.BLACK[100],
              width: '70%',
              textAlign: 'center',
              marginTop: 15,
              fontWeight: '400',
            }}>
            Receive a new credential that you self-issue and verify on your own
          </Text>

          <TouchableOpacity
            style={{
              width: '90%',
              alignItems: 'center',
              backgroundColor: COLOR.BLUE[300],
              borderRadius: 5,
              paddingVertical: 6,
              marginTop: 10,
            }}
            onPress={() => credential()}>
            <Text
              style={{
                fontSize: 18,
                color: COLOR.WHITE[100],
                fontWeight: '700',
              }}>
              SELF-ISSUE CREDENTIAL
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: COLOR.WHITE[100],
            width: '95%',
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Text
            style={{fontSize: 25, color: COLOR.BLACK[100], fontWeight: '500'}}>
            Give Testimonial
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: COLOR.BLACK[100],
              width: '70%',
              textAlign: 'center',
              marginTop: 15,
              fontWeight: '400',
            }}>
            Send a good word for a business or colleague you worked with
          </Text>

          <TouchableOpacity
            style={{
              width: '90%',
              alignItems: 'center',
              backgroundColor: COLOR.BLUE[300],
              borderRadius: 5,
              paddingVertical: 6,
              marginTop: 10,
            }}
            onPress={() => testimonial()}>
            <Text
              style={{
                fontSize: 18,
                color: COLOR.WHITE[100],
                fontWeight: '700',
              }}>
              SEND TESTIMONIAL
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Theambackground>
  );
};

export default Addscreen;
