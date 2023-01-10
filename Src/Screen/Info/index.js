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

const InfoScreen = () => {
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

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.cardView}>
          <Text
            style={{
              fontSize: 27,
              fontWeight: 'bold',
              color: COLOR.BLACK[100],
              textAlign: 'center',
            }}>
            {STR.INFO.TITLE}
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: COLOR.BLACK[100],
              marginTop: 10,

              textAlign: 'center',
            }}>
            {STR.INFO.SECURELY}
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '400',
              color: COLOR.BLACK[100],
              marginTop: 10,

              textAlign: 'center',
            }}>
            {STR.INFO.CERTIFICATE}
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: COLOR.BLACK[100],
              marginTop: 10,

              textAlign: 'center',
            }}>
            {STR.INFO.PROTECT}
          </Text>

          <Text
            style={{
              fontSize: 14,
              fontWeight: '300',
              color: COLOR.BLACK[100],

              textAlign: 'center',
            }}>
            {STR.INFO.TERMCONDITION}
          </Text>

          <TouchableOpacity
            style={{
              width: '90%',
              backgroundColor: COLOR.GREEN[100],
              height: 40,
              marginTop: 15,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text
              style={{
                fontSize: 15,
                color: COLOR.WHITE[100],
                fontWeight: '400',
              }}>
              CONTINUE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InfoScreen;
