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

const Selfissue = () => {
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
    console.log('Under Production...');
  };

  const credential = () => {
    console.log('Under production...');
  };
  return (
    <Theambackground
      title="Self-issue credential"
      subtitle="Select credential type"
      scan={true}
      back={true}
      setting={true}>
      <View style={{height: '100%', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: COLOR.WHITE[100],
            width: '96%',
            borderRadius: 10,
            padding: 10,
            // alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 27,
              color: COLOR.BLACK[100],
              fontWeight: '400',
              letterSpacing: 1,
              borderBottomWidth: 0.5,
              paddingBottom: 10,
              borderBottomColor: COLOR.GRAY[200],
            }}>
            Credential Type
          </Text>

          <TouchableOpacity
            style={{
              width: '100%',
              justifyContent: 'space-between',
              paddingVertical: 10,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontSize: 20,
                color: COLOR.BLACK[100],
                fontWeight: '300',
              }}>
              Resume
            </Text>

            <Icon name="arrowright" type="antdesign" />
          </TouchableOpacity>
        </View>
      </View>
    </Theambackground>
  );
};

export default Selfissue;
