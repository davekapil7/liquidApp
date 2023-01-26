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

const Contactscreen = () => {
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
      title="Contacts"
      subtitle="List of all your contacts"
      scan={true}
      setting={true}>
      <View style={{height: '100%', alignItems: 'center'}}>
        <Icon
          name="file-certificate-outline"
          type="material-community"
          size={90}
          color={COLOR.BLUE[300]}
        />

        <Text
          style={{
            marginTop: 15,
            fontSize: 25,
            color: COLOR.BLACK[100],
            fontWeight: '600',
          }}>
          No contacts yet
        </Text>
        <Text
          style={{
            width: '80%',
            textAlign: 'center',
            fontSize: 17,
            marginTop: 10,
            color: COLOR.BLACK[100],
            fontWeight: '300',
          }}>
          Create your own business card to start exchanging with others!
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: COLOR.BLUE[300],
            padding: 5,
            paddingHorizontal: 15,
            borderRadius: 5,
            marginTop: 15,
          }}>
          <Text
            style={{fontSize: 15, color: COLOR.WHITE[100], fontWeight: '700'}}>
            CREATE BUSINESS CARD
          </Text>
        </TouchableOpacity>
      </View>
    </Theambackground>
  );
};

export default Contactscreen;
