import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {COLOR} from '../../Constant/color';

const Testimonial = () => {
  const [fullname, setFullname] = useState('');
  const [company, setCompany] = useState('');
  const [occupation, setOccupation] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [number, setNumber] = useState('');
  const [linkdin, setLinkdin] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [github, setGithub] = useState('');
  const [twitter, setTwitter] = useState('');
  const [tiktok, setTiktok] = useState('');

  const navigation = useNavigation()
  return (
    <SafeAreaView style={{flex: 1, width: '100%'}}>
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          padding: 15,
          backgroundColor: COLOR.WHITE[100],
        }}>
        <ScrollView style={{flex: 1, height: '100%'}}>
          <View style={{flex: 1}}>
            <Text
              style={{fontSize: 30, color: COLOR.BLUE[300], fontWeight: '600'}}>
             Send Testimonial
            </Text>
            <Text
              style={{fontSize: 18, marginTop: 10, color: COLOR.BLACK[100],fontWeight:"300"}}>
              Give a testimonal to an individual or company you worked with in your personal capacity.
            </Text>

            {/* Personal detail */}
            <View style={{marginTop: 15}}>
             
              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>RECEIVER"S NAME</Text>
                <TextInput
                  value={fullname}
                  onChangeText={text => setFullname(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={styles.inputbox}>
                <Text style={styles.inputtitle}>RECEIVER"S EMAIL ID</Text>
                <TextInput
                  value={email}
                  onChangeText={text => setEmail(text)}
                  style={styles.inputtext}
                />
              </View>

              <View style={{...styles.inputbox , minHeight:150}}>
                <Text style={styles.inputtitle}>TESTIMONIAL</Text>
                <TextInput
                  value={occupation}
                  onChangeText={text => setOccupation(text)}
                  style={styles.inputtext}
                />
              </View>
  
            </View>
            
         

            <TouchableOpacity
              style={{
                width: '100%',
                height: 60,
                backgroundColor: COLOR.BLUE[300],
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginTop: 15,
              }}>
              <Text style={{fontSize:20,fontWeight:"700",color:"white"}}>SEND</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                width: '100%',
                height: 60,
                backgroundColor: "white",
                borderWidth:1,
                borderColor:COLOR.BLUE[300],
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                marginTop: 15,
              }}
              onPress={()=>navigation.goBack()}>
              <Text style={{fontSize:20,fontWeight:"700",color:COLOR.BLUE[300]}}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Testimonial;

const styles = StyleSheet.create({
  lineView: {
    // width: '100%',
    borderWidth: 0.2,
    marginTop: 15,
    borderColor: COLOR.BLUE[400],
    backgroundColor: COLOR.BLUE[400],
  },
  linetextView: {
    backgroundColor: 'white',

    position: 'absolute',
    marginTop: 5,
    paddingRight: 10,
  },
  lineText: {fontSize: 15, color: COLOR.BLUE[300]},

  inputbox: {
    width: '100%',
    borderRadius: 10,
    minHeight: 85,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLOR.BLUE[400],
    padding: 15,
  },
  inputtitle: {
    fontSize: 15,
    color: COLOR.GRAY[100],
    fontWeight: '700',
  },
  inputtext: {color: 'black', fontSize: 22},
});
