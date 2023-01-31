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
import {Header as HeaderRNE, HeaderProps, Icon, BottomSheet,} from '@rneui/themed';
import {COLOR} from '../../Constant/color';
import Theambackground from '../../Components/Theambackground';

const Contactscreen = () => {
  const [email, setEmail] = useState('');
  const [prenumber, setPrenumber] = useState(91);
  const [number, setNumber] = useState();
  const [emailfocus, setemailfocus] = useState(false);
  const [type, setType] = useState(STR.REGISTER);
  const [passvisible, setPassvisible] = useState(false);

  const [shareopen, setShareopen] = useState(false);
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
          Present your card QR code to start exchanging your business card with others!
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: COLOR.BLUE[300],
            padding: 5,
            paddingHorizontal: 15,
            borderRadius: 5,
            marginTop: 15,
          }}
          onPress={()=> setShareopen(true)}>
          <Text
            style={{fontSize: 15, color: COLOR.WHITE[100], fontWeight: '700'}}>
           SHARE MY CARD
          </Text>
        </TouchableOpacity>

        <BottomSheet
        isVisible={shareopen}
        containerStyle={{
          backgroundColor: 'rgba(255, 255, 255,0.6)',
          //alignItems:"center",
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: COLOR.WHITE[100],
            alignSelf: 'center',
            width: '85%',
            borderRadius: 25,
            alignItems: 'center',
            padding: 5,
            elevation: 5,
            shadowColor: 'black',
          }}>
          <Text style={{fontSize: 20, color: COLOR.BLUE[300]}}>Share</Text>
          <Text
            style={{
              fontSize: 17,
              marginTop: 15,
              textAlign: 'center',
              color: COLOR.BLACK[100],
              lineHeight: 24,
            }}>
            Present this QR Code to the liquid App scanner so other may save
            your contact details on their app, or to any camera application to
            view it on a browser
          </Text>

          <Image
            source={IMG.QRCODE}
            style={{width: 250, height: 250, resizeMode: 'stretch'}}
          />

          <TouchableOpacity
            style={{
              width: '70%',
              marginTop: 15,
              backgroundColor: COLOR.BLUE[300],
              alignItems: 'center',
              height: 50,
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: COLOR.WHITE[100],
                fontWeight: 'bold',
              }}>
              SHARE VIA WEB LINKS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: '70%',
              marginTop: 15,
              borderWidth: 1,
              borderColor: COLOR.BLUE[300],
              backgroundColor: COLOR.WHITE[100],
              alignItems: 'center',
              height: 50,
              justifyContent: 'center',
              borderRadius: 10,
            }}
            onPress={()=>setShareopen(false)}>
            <Text
              style={{
                fontSize: 20,
                color: COLOR.BLUE[300],
                fontWeight: 'bold',
              }}>
              CLOSE WINDOW
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      </View>
    </Theambackground>
  );
};

export default Contactscreen;
