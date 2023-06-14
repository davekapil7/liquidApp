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
            style={styles.starttext}>
            {STR.INFO.TITLE}
          </Text>

          <Text
            style={styles.securetext}>
            {STR.INFO.SECURELY}
          </Text>

          <Text
            style={styles.securetext}>
            {STR.INFO.CERTIFICATE}
          </Text>

          <Text
            style={styles.protecttext}>
            {STR.INFO.PROTECT}
          </Text>

          <Text
            style={{...styles.securetext , color:COLOR.GRAY[500]}}>
            {STR.INFO.TERMCONDITION}
          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => 
            //  console.log("HEllo")
           navigation.navigate('Preauth' ,{screen:'LoginScreen'})
            }>
            <Text
              style={{
                fontSize: 12,
                color: COLOR.WHITE[100],
                fontWeight: '700',
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
